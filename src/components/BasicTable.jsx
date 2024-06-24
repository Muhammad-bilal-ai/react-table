import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import axios from "axios";
import { useState } from "react";

export const Data = async () => {
  const response = await axios.get("https://dummyjson.com/users");
  console.log("DATA--", response.data.users);
  return response.data.users;
};

export const BasicTable = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: Data,
  });
  /**@type import('@tanstack/react-table').columnDef<any> */
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "First Name",
      accessorKey: "firstName",
    },
    {
      header: "Last Name",
      accessorKey: "lastName",
    },
    {
      header: "Age",
      accessorKey: "age",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
  ];

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4 border-spacing-2 border-cyan-900">
      <div>
        <h1 className="px-4 py-4 flex justify-center font-extrabold text-xl">
          Users List
        </h1>
      </div>
      <div className="overflow-x-auto">
        <div className="flex items-start bg-gray-50 px-4 py-2">
          <input
            className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            placeholder="Search here"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
          />
        </div>
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-sky-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    onClick={header.column.getToggleSortingHandler()}
                    key={header.id}
                    className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {
                      { asc: " (Asc)", desc: " (Desc)" }[
                        header.column.getIsSorted() ?? null
                      ]
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 whitespace-nowrap text-sm text-gray-900"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-justify-center mt-4">
        <button
          onClick={() => table.setPageIndex(0)}
          className="mx-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          First Page
        </button>
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={table.previousPage}
          className="mx-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Previous Page
        </button>
        <button
          disabled={!table.getCanNextPage()}
          onClick={table.nextPage}
          className="mx-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Next Page
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          className="mx-2 px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600"
        >
          Last Page
        </button>
      </div>
    </div>
  );
};
