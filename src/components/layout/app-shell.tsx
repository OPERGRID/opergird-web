"use client";

import {
  ChevronLeft,
  ChevronRight,
  Grid2X2,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { isNavigationItemActive, workspaceNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils/cn";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={cn("og-app-shell", sidebarCollapsed && "og-app-shell--collapsed")}>
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
              <Grid2X2 size={20} strokeWidth={1.8} />
            </span>

            <span className="og-brand__copy">
              <strong className="og-brand__name">OPERGRID</strong>

              <span className="og-brand__descriptor">Operational Grid</span>
            </span>
          </Link>

          <Button
            className="og-sidebar__mobile-close"
            variant="ghost"
            size="icon"
            aria-label="Tutup navigasi"
            onClick={() => {
              setMobileOpen(false);
            }}
          >
            <X size={18} strokeWidth={1.8} aria-hidden="true" />
          </Button>
        </div>

        <nav className="og-sidebar__nav">
          <p className="og-sidebar__section-label">Workspace</p>

          <ul className="og-sidebar__list">
            {workspaceNavigation.map((item) => {
              const active = isNavigationItemActive(pathname, item.href);

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={cn("og-nav-item", active && "og-nav-item--active")}
                    aria-current={active ? "page" : undefined}
                    title={sidebarCollapsed ? item.label : undefined}
                    onClick={() => {
                      setMobileOpen(false);
                    }}
                  >
                    <span className="og-nav-item__icon" aria-hidden="true">
                      <Grid2X2 size={18} strokeWidth={1.8} />
                    </span>

                    <span className="og-nav-item__content">
                      <span className="og-nav-item__label">{item.label}</span>

                      {item.description ? (
                        <span className="og-nav-item__description">
                          {item.description}
                        </span>
                      ) : null}
                    </span>

                    <ChevronRight
                      className="og-nav-item__chevron"
                      size={15}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
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

      {mobileOpen ? (
        <button
          type="button"
          className="og-sidebar-backdrop"
          aria-label="Tutup navigasi"
          onClick={() => {
            setMobileOpen(false);
          }}
        />
      ) : null}

      <div className="og-workspace">
        <header className="og-topbar">
          <div className="og-topbar__leading">
            <Button
              className="og-topbar__menu"
              variant="ghost"
              size="icon"
              aria-label="Buka navigasi"
              onClick={() => {
                setMobileOpen(true);
              }}
            >
              <Menu size={19} strokeWidth={1.8} aria-hidden="true" />
            </Button>

            <div className="og-topbar__context">
              <span className="og-topbar__eyebrow">OPERGRID</span>

              <span className="og-topbar__title">Operational Workspace</span>
            </div>
          </div>

          <div className="og-topbar__actions">
            <ThemeToggle />

            <div className="og-user-placeholder" aria-label="Area profil pengguna">
              <span className="og-user-placeholder__avatar" aria-hidden="true">
                OP
              </span>

              <span className="og-user-placeholder__copy">
                <strong>Operator</strong>
                <span>Workspace</span>
              </span>
            </div>
          </div>
        </header>

        <main className="og-workspace__content">{children}</main>
      </div>
    </div>
  );
}
