import Button from "../components/Button";
import { ChevronDown } from "lucide-react";

export default function TransactionFormModal({
    isEditing,
    form,
    handleChange,
    handleSubmit,
    loading,
    error,
    onClose
}) {

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
                <h2 className="text-xl font-semibold mb-4">
                    {isEditing ? "Edit Transaction" : "Add Transaction"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-2">
                    <input
                        type="text"
                        name="transaction_date"
                        placeholder="Transaction Date"
                        value={form.transaction_date}
                        onChange={handleChange}
                        disabled={loading}
                        className="p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                    {error?.transaction_date && (
                        <p className="text-red-500 text-sm">{error.transaction_date[0]}</p>
                    )}
                    <div className="relative">
                        <select name="type" value={form.type} onChange={handleChange} disabled={loading} className="appearance-none p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed">
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                        <ChevronDown
                            size={18}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                        />
                    </div>
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        disabled={loading}
                        className="p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                    {error?.description && (
                        <p className="text-red-500 text-sm">{error.description[0]}</p>
                    )}
                    <input
                        type="text"
                        name="amount"
                        placeholder="Amount"
                        value={form.amount}
                        onChange={handleChange}
                        disabled={loading}
                        className="p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                    {error?.amount && (
                        <p className="text-red-500 text-sm">{error.amount[0]}</p>
                    )}
                    <div className="flex gap-2 pt-2">
                        <Button type="submit" disabled={loading} loading={loading} className="flex-1">{isEditing ? "Update Transaction" : "Add Transaction"}</Button>
                        <Button type="button" disabled={loading} onClick={onClose} closeButton={true} className="flex-1">Close</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}