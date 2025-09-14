import { GetContentComponent } from "../types";
import { ColumnHelper, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import * as React from "react";
import { useState } from "react";

export interface PrioritySetting {
	value: string,
	label: string,
	color: string,
	weight: number
}

export const DEFAULT_PRIORITIES_SETTINGS: PrioritySetting[] = [
	{value: "high", label: "High", color: "#C23636", weight: 3},
	{value: "normal", label: "Normal", color: "#FDA900", weight: 2},
	{value: "low", label: "Low", color: "#00A900", weight: 1},
	{value: "none", label: "None", color: "#E8E7E7", weight: 0}
]

const columnHelper: ColumnHelper<PrioritySetting> = createColumnHelper<PrioritySetting>();
const columns = [
	columnHelper.accessor("value", {
		cell: info => <input type="text" defaultValue={info.getValue()}/>
	}),
	columnHelper.accessor("label", {
		cell: info => <input type="text" defaultValue={info.getValue()}/>
	}),
	columnHelper.accessor("color", {
		cell: info => <input type="color" defaultValue={info.getValue()}/>
	}),
	columnHelper.accessor("weight", {
		cell: info => <input type="number" defaultValue={info.getValue()}/>
	})
]

export const PriorityComponent: GetContentComponent = (props): React.JSX.Element => {
	const [data] = useState(() => [...DEFAULT_PRIORITIES_SETTINGS]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<div>
			<table>
				<thead>
				{table.getHeaderGroups().map(headerGroup => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map(header => (
							<th key={header.id}>
								{flexRender(header.column.columnDef.header, header.getContext())}
							</th>
						))}
					</tr>
				))}
				</thead>
				<tbody>
				{table.getRowModel().rows.map(row => (
					<tr key={row.id}>
						{row.getVisibleCells().map(cell => (
							<td key={cell.id}>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</td>
						))}
					</tr>
				))}
				</tbody>
			</table>

			<div className="form-actions">
				<button title="Add new priority">
					Добавить приоритет
				</button>
			</div>
		</div>
	)
}
