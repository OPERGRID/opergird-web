import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export const OPERGRID_PERMISSIONS = {
  platformAccess: "PLATFORM.ACCESS",
  platformAdmin: "PLATFORM.ADMIN",
  userManagementRead: "USER_MANAGEMENT.READ",
  userManagementManage: "USER_MANAGEMENT.MANAGE",
  accessControlRead: "ACCESS_CONTROL.READ",
  accessControlManage: "ACCESS_CONTROL.MANAGE",
  auditRead: "AUDIT.READ",
} as const;

export type OpergridPermission =
  (typeof OPERGRID_PERMISSIONS)[keyof typeof OPERGRID_PERMISSIONS];

export type OpergridRole = {
  roleId: string;
  roleCode: string;
  roleName: string;
};

export type OpergridAssignment = {
  assignmentId: string;
  roleId: string;
  positionId: string | null;
  sectionId: string | null;
  scopeType: string | null;
  scopeRef: string | null;
  includeChildren: boolean;
  isPrimary: boolean;
  validFrom: string;
  validUntil: string | null;
};

export type OpergridAuthorizationContext =
  | {
      allowed: false;
      reason:
        | "UNAUTHENTICATED"
        | "PROFILE_MISSING"
        | "ACCOUNT_INACTIVE"
        | "MFA_REQUIRED"
        | "NO_ACTIVE_ASSIGNMENT"
        | "MISSING_PLATFORM_ACCESS"
        | "AUTHORIZATION_UNAVAILABLE";
    }
  | {
      allowed: true;
      userId: string;
      displayName: string;
      roles: OpergridRole[];
      assignments: OpergridAssignment[];
      permissions: string[];
    };

type ProfileRow = {
  user_id: string;
  full_name: string;
  display_name: string | null;
  account_status: string;
};

type AssignmentRow = {
  assignment_id: string;
  role_id: string;
  position_id: string | null;
  section_id: string | null;
  scope_type: string | null;
  scope_ref: string | null;
  include_children: boolean;
  is_primary: boolean;
  is_active: boolean;
  valid_from: string;
  valid_until: string | null;
};

type RoleRow = {
  role_id: string;
  role_code: string;
  role_name: string;
  is_active: boolean;
};

type RolePermissionRow = {
  role_id: string;
  permission_id: string;
};

type PermissionRow = {
  permission_id: string;
  permission_code: string;
  is_active: boolean;
};

function isAssignmentCurrentlyValid(assignment: AssignmentRow, nowMs: number) {
  if (!assignment.is_active) {
    return false;
  }

  const validFromMs = Date.parse(assignment.valid_from);

  if (!Number.isFinite(validFromMs) || validFromMs > nowMs) {
    return false;
  }

  if (assignment.valid_until === null) {
    return true;
  }

  const validUntilMs = Date.parse(assignment.valid_until);

  return Number.isFinite(validUntilMs) && validUntilMs >= nowMs;
}

export function hasOpergridPermission(
  authorization: OpergridAuthorizationContext,
  permission: OpergridPermission | string,
) {
  return authorization.allowed && authorization.permissions.includes(permission);
}

export async function getCurrentAuthorizationContext(): Promise<OpergridAuthorizationContext> {
  const supabase = await createSupabaseServerClient();

  /*
   * SECURITY:
   * Verify identity cryptographically. Never replace this with getSession()
   * for server-side authorization.
   */
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;

  if (claimsError || !userId) {
    return {
      allowed: false,
      reason: "UNAUTHENTICATED",
    };
  }

  /*
   * SECURITY:
   * OPERGRID requires Authenticator Assurance Level 2 before any workspace
   * authorization queries are executed.
   */
  if (claimsData?.claims?.aal !== "aal2") {
    return {
      allowed: false,
      reason: "MFA_REQUIRED",
    };
  }

  const { data: profileData, error: profileError } = await supabase
    .from("user_profile")
    .select("user_id, full_name, display_name, account_status")
    .eq("user_id", userId)
    .maybeSingle();

  if (profileError) {
    return {
      allowed: false,
      reason: "AUTHORIZATION_UNAVAILABLE",
    };
  }

  const profile = profileData as ProfileRow | null;

  if (!profile) {
    return {
      allowed: false,
      reason: "PROFILE_MISSING",
    };
  }

  if (profile.account_status.toUpperCase() !== "ACTIVE") {
    return {
      allowed: false,
      reason: "ACCOUNT_INACTIVE",
    };
  }

  const { data: assignmentData, error: assignmentError } = await supabase
    .from("user_assignment")
    .select(
      "assignment_id, role_id, position_id, section_id, scope_type, scope_ref, include_children, is_primary, is_active, valid_from, valid_until",
    )
    .eq("user_id", userId)
    .eq("is_active", true);

  if (assignmentError) {
    return {
      allowed: false,
      reason: "AUTHORIZATION_UNAVAILABLE",
    };
  }

  const nowMs = Date.now();
  const assignments = ((assignmentData ?? []) as unknown as AssignmentRow[]).filter(
    (assignment) => isAssignmentCurrentlyValid(assignment, nowMs),
  );

  if (assignments.length === 0) {
    return {
      allowed: false,
      reason: "NO_ACTIVE_ASSIGNMENT",
    };
  }

  const roleIds = [...new Set(assignments.map((assignment) => assignment.role_id))];

  const { data: roleData, error: roleError } = await supabase
    .from("access_role")
    .select("role_id, role_code, role_name, is_active")
    .in("role_id", roleIds)
    .eq("is_active", true);

  if (roleError) {
    return {
      allowed: false,
      reason: "AUTHORIZATION_UNAVAILABLE",
    };
  }

  const roles = ((roleData ?? []) as unknown as RoleRow[]).filter(
    (role) => role.is_active,
  );
  const activeRoleIds = new Set(roles.map((role) => role.role_id));

  const authorizedAssignments = assignments.filter((assignment) =>
    activeRoleIds.has(assignment.role_id),
  );

  if (authorizedAssignments.length === 0 || roles.length === 0) {
    return {
      allowed: false,
      reason: "NO_ACTIVE_ASSIGNMENT",
    };
  }

  const { data: rolePermissionData, error: rolePermissionError } = await supabase
    .from("access_role_permission")
    .select("role_id, permission_id")
    .in("role_id", [...activeRoleIds]);

  if (rolePermissionError) {
    return {
      allowed: false,
      reason: "AUTHORIZATION_UNAVAILABLE",
    };
  }

  const rolePermissions = (rolePermissionData ?? []) as unknown as RolePermissionRow[];
  const permissionIds = [...new Set(rolePermissions.map((item) => item.permission_id))];

  if (permissionIds.length === 0) {
    return {
      allowed: false,
      reason: "MISSING_PLATFORM_ACCESS",
    };
  }

  const { data: permissionData, error: permissionError } = await supabase
    .from("access_permission")
    .select("permission_id, permission_code, is_active")
    .in("permission_id", permissionIds)
    .eq("is_active", true);

  if (permissionError) {
    return {
      allowed: false,
      reason: "AUTHORIZATION_UNAVAILABLE",
    };
  }

  const permissions = [
    ...new Set(
      ((permissionData ?? []) as unknown as PermissionRow[])
        .filter((permission) => permission.is_active)
        .map((permission) => permission.permission_code),
    ),
  ];

  if (!permissions.includes(OPERGRID_PERMISSIONS.platformAccess)) {
    return {
      allowed: false,
      reason: "MISSING_PLATFORM_ACCESS",
    };
  }

  return {
    allowed: true,
    userId,
    displayName: profile.display_name?.trim() || profile.full_name.trim(),
    roles: roles.map((role) => ({
      roleId: role.role_id,
      roleCode: role.role_code,
      roleName: role.role_name,
    })),
    assignments: authorizedAssignments.map((assignment) => ({
      assignmentId: assignment.assignment_id,
      roleId: assignment.role_id,
      positionId: assignment.position_id,
      sectionId: assignment.section_id,
      scopeType: assignment.scope_type,
      scopeRef: assignment.scope_ref,
      includeChildren: assignment.include_children,
      isPrimary: assignment.is_primary,
      validFrom: assignment.valid_from,
      validUntil: assignment.valid_until,
    })),
    permissions,
  };
}
