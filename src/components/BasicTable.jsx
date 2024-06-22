import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { fetchedUsers } from "./Users";
import { useMemo } from "react";

export const BasicTable = () => {
  const data = useMemo(() => fetchedUsers, []);

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
  const table = useReactTable({ data, columns });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
