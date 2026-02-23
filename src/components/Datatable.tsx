import { useMemo, useState } from "react";

export interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: number;
}

interface DataTableProps<T extends { symbol?: string }> {
  data: T[];
  columns: Column<T>[];
  rowKey: keyof T;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
}

function DataTable<T extends { symbol?: string }>({
  data,
  columns,
  rowKey,
  onRowClick,
  emptyMessage = "No Data Found",
}: DataTableProps<T>) {
  /* =========================
        SEARCH STATE
  ========================== */
  const [search, setSearch] = useState("");

  /* =========================
        SORT STATE
  ========================== */
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [asc, setAsc] = useState(true);

  /* =========================
        PAGINATION STATE
  ========================== */
  const [page, setPage] = useState(1);
  const pageSize = 10;

  /* =========================
        FILTER DATA
  ========================== */
  const filtered = useMemo(() => {
    if (!search) return data;
    return data.filter((row) =>
      String(row.symbol ?? "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [data, search]);

  /* =========================
        SORT DATA
  ========================== */
  const sorted = useMemo(() => {
    if (!sortKey) return filtered;

    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return asc ? aVal - bVal : bVal - aVal;
      }

      return asc
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filtered, sortKey, asc]);

  /* =========================
        PAGINATED DATA
  ========================== */
  const totalPages = Math.ceil(sorted.length / pageSize);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page]);

  if (data.length === 0) return <p>{emptyMessage}</p>;

  return (
    <div>
    
      <div style={{ padding: 12 }}>
        <input
          placeholder="Search symbol..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          style={{
            padding: "8px 12px",
            border: "1px solid #dae1e9",
            borderRadius: 6,
            width: 220,
          }}
        />
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                onClick={() => {
                  if (!col.sortable) return;

                  if (sortKey === col.key) setAsc(!asc);
                  else {
                    setSortKey(col.key);
                    setAsc(true);
                  }
                }}
                style={{
                  width: col.width,
                  textAlign: "left",
                  padding: 12,
                  borderBottom: "2px solid #c9cfd7",
                  cursor: col.sortable ? "pointer" : "default",
                  userSelect: "none",
                  color:"#d3cbcb",
                }}
              >
                {col.header}
                {col.sortable && sortKey === col.key && (asc ? " ▲" : " ▼")}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginated.map((row, ri) => (
            <tr
              key={String(row[rowKey])}
              onClick={() => onRowClick?.(row)}
              style={{
                background: ri % 2 === 0 ? "#090404" : "#030a11",
                color:'#ffffff',
                cursor: onRowClick ? "pointer" : "default",
              }}
            >
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  style={{ padding: 12, borderBottom: "1px solid #bfc5ce" }}
                >
                  {col.render
                    ? col.render(row[col.key], row)
                    : String(row[col.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* =========================
            PAGINATION
      ========================== */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
          padding: 14,
          alignItems: "center",
        }}
      >
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>

        <span>
          Page {page} / {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default DataTable;