"use client";

import {
  ChevronDown,
  ChevronLeft,
  FileClock,
  KeyRound,
  LayoutDashboard,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  ShieldCheck,
  UserRound,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";
import { Dialog as AriaDialog, Modal, ModalOverlay } from "react-aria-components";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { UserMenu } from "@/components/layout/user-menu";
import { Button } from "@/components/ui/button";
import { isNavigationItemActive, toolsNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils/cn";

type AppShellProps = {
  children: ReactNode;
};

const userManagementIcons = {
  "user-management-overview": LayoutDashboard,
  "user-management-users": UserRound,
  "user-management-roles": KeyRound,
  "user-management-scope": ShieldCheck,
  "user-management-audit": FileClock,
} as const;

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const userManagement = toolsNavigation[0];

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userManagementOpen, setUserManagementOpen] = useState(true);

  const userManagementActive = isNavigationItemActive(pathname, userManagement.href);
  const topbarTitle = userManagementActive ? "User Management" : "Operational Workspace";

  const sidebar = (
    <aside
      className={cn("og-sidebar", mobileOpen && "og-sidebar--mobile-open")}
      aria-label="Navigasi utama"
    >
      <div className="og-sidebar__brand">
        <Link
          href="/"
          className="og-brand"
          onClick={() => {
            setMobileOpen(false);
          }}
        >
          <span className="og-brand__mark" aria-hidden="true">
            <span className="og-brand__mark-fallback">OG</span>
          </span>

          <span className="og-brand__copy">
            <strong className="og-brand__name">OPERGRID</strong>
            <span className="og-brand__descriptor">Operational Grid</span>
          </span>
        </Link>

        <Button
          className="og-sidebar__mobile-close"
          variant="ghost"
          iconOnly
          aria-label="Tutup navigasi"
          onClick={() => {
            setMobileOpen(false);
          }}
        >
          <X size={18} strokeWidth={1.8} aria-hidden="true" />
        </Button>
      </div>

      <nav className="og-sidebar__nav">
        <p className="og-sidebar__section-label">TOOLS</p>

        <ul className="og-sidebar__list">
          <li>
            <button
              type="button"
              className={cn(
                "og-nav-item",
                "og-nav-item--group",
                userManagementActive && "og-nav-item--active",
              )}
              aria-expanded={userManagementOpen}
              aria-controls="user-management-submenu"
              title={sidebarCollapsed ? userManagement.label : undefined}
              onClick={() => {
                if (sidebarCollapsed) {
                  setSidebarCollapsed(false);
                  setUserManagementOpen(true);
                  return;
                }

                setUserManagementOpen((current) => !current);
              }}
            >
              <span className="og-nav-item__icon" aria-hidden="true">
                <Users size={18} strokeWidth={1.8} />
              </span>

              <span className="og-nav-item__content">
                <span className="og-nav-item__label">{userManagement.label}</span>
              </span>

              <ChevronDown
                className={cn(
                  "og-nav-item__group-chevron",
                  userManagementOpen && "og-nav-item__group-chevron--open",
                )}
                size={15}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </button>

            <ul
              id="user-management-submenu"
              className={cn(
                "og-nav-submenu",
                userManagementOpen && "og-nav-submenu--open",
              )}
            >
              {userManagement.children?.map((item) => {
                const active =
                  item.href === userManagement.href
                    ? pathname === item.href
                    : isNavigationItemActive(pathname, item.href);
                const Icon = userManagementIcons[item.id as keyof typeof userManagementIcons];

                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className={cn(
                        "og-nav-subitem",
                        active && "og-nav-subitem--active",
                      )}
                      aria-current={active ? "page" : undefined}
                      onClick={() => {
                        setMobileOpen(false);
                      }}
                    >
                      <span className="og-nav-subitem__icon" aria-hidden="true">
                        {Icon ? <Icon size={16} strokeWidth={1.8} /> : null}
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </nav>

      <div className="og-sidebar__footer">
        <button
          type="button"
          className="og-sidebar__collapse"
          onClick={() => {
            setSidebarCollapsed((current) => !current);
          }}
          aria-label={sidebarCollapsed ? "Perluas sidebar" : "Ciutkan sidebar"}
          title={sidebarCollapsed ? "Perluas sidebar" : "Ciutkan sidebar"}
        >
          {sidebarCollapsed ? (
            <PanelLeftOpen size={18} strokeWidth={1.8} aria-hidden="true" />
          ) : (
            <PanelLeftClose size={18} strokeWidth={1.8} aria-hidden="true" />
          )}

          <span>Ciutkan sidebar</span>

          <ChevronLeft
            className="og-sidebar__collapse-chevron"
            size={15}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </button>
      </div>
    </aside>
  );

  return (
    <div className={cn("og-app-shell", sidebarCollapsed && "og-app-shell--collapsed")}>
      <div className="og-sidebar-desktop">{sidebar}</div>

      <ModalOverlay
        isOpen={mobileOpen}
        onOpenChange={setMobileOpen}
        isDismissable
        className="og-sidebar-overlay"
      >
        <Modal className="og-sidebar-modal">
          <AriaDialog className="og-sidebar-dialog" aria-label="Navigasi utama">
            {sidebar}
          </AriaDialog>
        </Modal>
      </ModalOverlay>

      <div className="og-workspace">
        <header className="og-topbar">
          <div className="og-topbar__leading">
            <Button
              className="og-topbar__menu"
              variant="ghost"
              iconOnly
              aria-label="Buka navigasi"
              aria-expanded={mobileOpen}
              aria-haspopup="dialog"
              onClick={() => {
                setMobileOpen(true);
              }}
            >
              <Menu size={19} strokeWidth={1.8} aria-hidden="true" />
            </Button>

            <div className="og-topbar__context">
              <span className="og-topbar__eyebrow">OPERGRID</span>
              <span className="og-topbar__title">{topbarTitle}</span>
            </div>
          </div>

          <div className="og-topbar__actions">
            <ThemeToggle />
            <UserMenu />
          </div>
        </header>

        <main className="og-workspace__content">{children}</main>
      </div>
    </div>
  );
}
