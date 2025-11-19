import { SquarePen, Trash2} from "lucide-react";

export default function TransactionTable({
    paginatedTransactions,
    sortField,
    sortOrder,
    setSortField,
    setSortOrder,
    onEdit,
    onDelete,
    loading
}) {
    const toggleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    const getSortIcon = (field) => sortField === field ? (sortOrder === "asc" ? "↑" : "↓") : "";

    return (
        <table className="table-fixed w-full text-sm text-left">
            <thead className="bg-blue-200 text-gray-700 border border-blue-300 uppercase text-xs">
                <tr>
                    <th onClick={() => toggleSort("id")} className="w-[5%] p-2 py-3 text-center cursor-pointer hover:bg-blue-300">ID {getSortIcon("id")}</th>
                    <th onClick={() => toggleSort("transaction_date")} className="w-[15%] p-2 text-center cursor-pointer hover:bg-blue-300">Transaction Date {getSortIcon("transaction_date")}</th>
                    <th onClick={() => toggleSort("type")} className="w-[15%] p-2 text-center cursor-pointer hover:bg-blue-300">Type {getSortIcon("type")}</th>
                    <th onClick={() => toggleSort("description")} className="w-[35%] p-2 text-center cursor-pointer hover:bg-blue-300">Description {getSortIcon("description")}</th>
                    <th onClick={() => toggleSort("amount")} className="w-[10%] p-2 text-center cursor-pointer hover:bg-blue-300">Amount {getSortIcon("amount")}</th>
                    <th className="w-[10%] p-2 text-center">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
                {paginatedTransactions.map((t) => {
                    return (
                        <tr key={t.id} className="hover:bg-blue-100 transition">
                            <td className="p-2 text-center">{t.id}</td>
                            <td className="p-2 text-center">{t.transaction_date}</td>
                            <td className="p-2 text-center">{t.type}</td>
                            <td className="p-2">{t.description}</td>
                            <td className="p-2 text-center">{t.amount}</td>
                            <td className="p-2 space-x-4 text-center">
                                <button onClick={() => onEdit(t)} disabled={loading} className="cursor-pointer">
                                    <SquarePen size={20} />
                                </button>
                                <button onClick={() => onDelete(t.id)} disabled={loading} className="cursor-pointer">
                                    <Trash2 size={20} />
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}