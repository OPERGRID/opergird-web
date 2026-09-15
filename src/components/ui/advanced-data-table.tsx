"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import {
  flexRender,
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type RowData,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useLegacyTable,
  type LegacyColumnDef,
} from "@tanstack/react-table/legacy";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { EmptyState } from "@/components/ui/empty-state";
import { Popover } from "@/components/ui/overlays";
import { SearchField } from "@/components/ui/search-field";
import { Select } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";

export type DataTableFilter = {
  columnId: string;
  label: string;
  options: readonly { value: string; label: string }[];
};
export type AdvancedDataTableProps<T extends RowData> = {
  data: readonly T[];
  columns: LegacyColumnDef<T>[];
  getRowId?: (row: T) => string;
  keyColumnId?: string;
  actionColumnId?: string;
  numericColumnIds?: readonly string[];
  monoColumnIds?: readonly string[];
  title?: string;
  searchPlaceholder?: string;
  filters?: readonly DataTableFilter[];
  bulkActions?: (selectedRows: T[]) => ReactNode;
  toolbarActions?: ReactNode;
  pageSize?: number;
  density?: "comfortable" | "standard" | "compact";
  loading?: boolean;
  error?: string;
  emptyTitle?: string;
  onRetry?: () => void;
};

export function AdvancedDataTable<T extends RowData>({
  data,
  columns,
  getRowId,
  keyColumnId,
  actionColumnId,
  numericColumnIds = [],
  monoColumnIds = [],
  title = "Data",
  searchPlaceholder = "Cari data",
  filters = [],
  bulkActions,
  toolbarActions,
  pageSize = 10,
  density = "standard",
  loading = false,
  error,
  emptyTitle = "Tidak ada data",
  onRetry,
}: AdvancedDataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const tableData = useMemo(() => [...data], [data]);
  const table = useLegacyTable({
    data: tableData,
    columns,
    getRowId,
    state: { sorting, globalFilter, columnFilters, columnVisibility, rowSelection },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    initialState: { pagination: { pageIndex: 0, pageSize } },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
  return (
    <section
      className="og-data-table"
      data-density={density}
      aria-label={title}
      aria-busy={loading}
    >
      <div className="og-data-table__toolbar">
        <div className="og-data-table__search">
          <SearchField
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            onClear={() => setGlobalFilter("")}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
          />
        </div>
        <div className="og-data-table__tools">
          {filters.map((filter) => (
            <div className="og-data-table__filter" key={filter.columnId}>
              <Select
                label={filter.label}
                options={[{ value: "__all__", label: "Semua" }, ...filter.options]}
                value={String(
                  table.getColumn(filter.columnId)?.getFilterValue() ?? "__all__",
                )}
                onChange={(value) =>
                  table
                    .getColumn(filter.columnId)
                    ?.setFilterValue(value === "__all__" ? undefined : value)
                }
              />
            </div>
          ))}
          <Popover label="Tampilkan kolom" triggerLabel="Kolom">
            <div className="og-data-table__column-menu">
              {table.getAllLeafColumns().map((column) => (
                <Checkbox
                  key={column.id}
                  label={String(column.columnDef.header ?? column.id)}
                  checked={column.getIsVisible()}
                  onChange={column.getToggleVisibilityHandler()}
                  disabled={!column.getCanHide()}
                />
              ))}
            </div>
          </Popover>
          {toolbarActions}
        </div>
      </div>
      {selectedRows.length > 0 ? (
        <div className="og-data-table__bulk">
          <strong>{selectedRows.length} dipilih</strong>
          {bulkActions?.(selectedRows)}
          <Button variant="ghost" onClick={() => table.resetRowSelection()}>
            Batal pilih
          </Button>
        </div>
      ) : null}
      {error ? (
        <div className="og-data-table__state" role="alert">
          <strong>Data gagal dimuat</strong>
          <p>{error}</p>
          {onRetry ? (
            <Button variant="secondary" onClick={onRetry}>
              Coba lagi
            </Button>
          ) : null}
        </div>
      ) : null}
      {loading ? (
        <div className="og-data-table__state" role="status">
          <Spinner /> Memuat data…
        </div>
      ) : null}
      {!error && !loading ? (
        <>
          <div className="og-table-viewport">
            <div
              className="og-table-wrap"
              tabIndex={0}
              role="region"
              aria-label={`${title}, gulir horizontal untuk kolom lain`}
            >
              <table className="og-table">
                <thead className="og-table__head">
                  {table.getHeaderGroups().map((group) => (
                    <tr key={group.id} className="og-table__row">
                      <th className="og-table__select">
                        <Checkbox
                          label="Pilih semua baris pada halaman"
                          visuallyHiddenLabel
                          checked={table.getIsAllPageRowsSelected()}
                          onChange={table.getToggleAllPageRowsSelectedHandler()}
                        />
                      </th>
                      {group.headers.map((header) => (
                        <th
                          key={header.id}
                          scope="col"
                          aria-sort={
                            header.column.getIsSorted() === "asc"
                              ? "ascending"
                              : header.column.getIsSorted() === "desc"
                                ? "descending"
                                : "none"
                          }
                          className={`og-table__header-cell ${header.column.id === keyColumnId ? "og-table__sticky" : ""} ${header.column.id === actionColumnId ? "og-table__action-sticky" : ""}`}
                        >
                          {header.isPlaceholder ? null : header.column.getCanSort() ? (
                            <button
                              type="button"
                              className="og-table__sort"
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                              {header.column.getIsSorted() === "asc" ? (
                                <ArrowUp size={13} />
                              ) : header.column.getIsSorted() === "desc" ? (
                                <ArrowDown size={13} />
                              ) : null}
                            </button>
                          ) : (
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="og-table__body">
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="og-table__row"
                      data-selected={row.getIsSelected()}
                    >
                      <td className="og-table__select">
                        <Checkbox
                          label={`Pilih baris ${row.id}`}
                          visuallyHiddenLabel
                          checked={row.getIsSelected()}
                          onChange={row.getToggleSelectedHandler()}
                        />
                      </td>
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className={`og-table__cell ${cell.column.id === keyColumnId ? "og-table__sticky" : ""} ${cell.column.id === actionColumnId ? "og-table__action-sticky" : ""}`}
                          data-numeric={
                            numericColumnIds.includes(cell.column.id) ? "true" : undefined
                          }
                          data-mono={
                            monoColumnIds.includes(cell.column.id) ? "true" : undefined
                          }
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {table.getFilteredRowModel().rows.length === 0 ? (
            <EmptyState
              title={emptyTitle}
              description={globalFilter ? "Coba kata kunci lain." : undefined}
              compact
            />
          ) : null}
          <div className="og-data-table__footer">
            <span>
              {table.getFilteredRowModel().rows.length} baris · Halaman{" "}
              {table.getState().pagination.pageIndex + 1} dari{" "}
              {Math.max(1, table.getPageCount())}
            </span>
            <div>
              <Button
                variant="secondary"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Sebelumnya
              </Button>
              <Button
                variant="secondary"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Berikutnya
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}
