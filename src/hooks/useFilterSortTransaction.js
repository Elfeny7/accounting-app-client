import { useMemo } from "react";

export const useFilterSortTransaction = ({
    transactions,
    search,
    sortField,
    sortOrder,
    currentPage,
    itemsPerPage,
}) => {
    const filteredTransactions = useMemo(() => {
        const searchTerm = search.toLowerCase();
        return transactions.filter((transactions) => {
            return (
                transactions.id.toString().includes(searchTerm) ||
                transactions.transaction_date.toLowerCase().includes(searchTerm) ||
                transactions.type.toLowerCase().includes(searchTerm) ||
                transactions.description.toLowerCase().includes(searchTerm) ||
                transactions.amount.toString().includes(searchTerm)
            );
        });
    }, [transactions, search]);

    const sortedTransactions = useMemo(() => {
        return [...filteredTransactions].sort((a, b) => {
            const fieldA = a[sortField];
            const fieldB = b[sortField];

            if (typeof fieldA === "number" && typeof fieldB === "number") {
                return sortOrder === "asc" ? fieldA - fieldB : fieldB - fieldA;
            }

            const valueA = String(fieldA).toLowerCase();
            const valueB = String(fieldB).toLowerCase();

            if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
            if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
    }, [filteredTransactions, sortField, sortOrder]);

    const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedTransactions = sortedTransactions.slice(startIndex, startIndex + itemsPerPage);

    return {
        paginatedTransactions,
        totalPages,
    };
}