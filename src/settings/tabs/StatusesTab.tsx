import { GetContentComponent } from "../types";
import * as React from "react";
import { ColumnHelper, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

export interface StatusSettingItem {
	value: string,
	label: string,
	color: string,
	isCompleted: boolean
}

export const DEFAULT_STATUSES_SETTINGS: StatusSettingItem[] = [
	{ value: "none", label: "None", color: "#CCCCCC", isCompleted: false },
	{ value: "open", label: "Open", color: "#808080", isCompleted: false },
	{ value: "in-progress", label: "In progress", color: "#0066CC", isCompleted: false },
	{ value: "closed", label: "Closed", color: "#00AA00", isCompleted: true }
]

const columnHelper: ColumnHelper<StatusSettingItem> = createColumnHelper<StatusSettingItem>();
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
	columnHelper.accessor("isCompleted", {
		cell: info => <input type="checkbox" defaultChecked={info.getValue()}/>
	})
]

export const StatusSettingComponent: GetContentComponent = (props): React.JSX.Element => {
	const [data] = React.useState(() => [...DEFAULT_STATUSES_SETTINGS]);

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
				<button>
					Добавить статус
				</button>
			</div>
		</div>
	)
}
