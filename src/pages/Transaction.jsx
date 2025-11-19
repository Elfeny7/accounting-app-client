import { useState } from "react";
import { useTransactions } from "../hooks/useTransactions";
import { useFilterSortTransaction } from "../hooks/useFilterSortTransaction";
import { useNavigate } from "react-router-dom";
import ModalError from "../components/ModalError";
import ModalConfirm from "../components/ModalConfirm";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import Button from "../components/Button";
import TransactionTable from "../components/TransactionTable";
import TransactionFormModal from "../components/TransactionFormModal";
import ReportDateModal from "../components/ReportDateModal";

export default function Transaction() {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reportModalOpen, setReportModalOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const defaultForm = {
        transaction_date: "",
        type: "income",
        description: "",
        amount: "",
        created_by: "",
    };
    const [form, setForm] = useState(defaultForm);

    const {
        transactions,
        loading,
        initialLoading,
        valError,
        error,
        clearError,
        deleteTransaction,
        createTransaction,
        updateTransaction
    } = useTransactions();

    const { paginatedTransactions, totalPages } = useFilterSortTransaction({
        transactions,
        search,
        sortField,
        sortOrder,
        currentPage,
        itemsPerPage,
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearError();
        if (isEditing) {
            await updateTransaction(form);
        } else {
            await createTransaction(form);
        }
        setForm(defaultForm);
    };

    const handleEdit = (transaction) => {
        clearError();
        setIsModalOpen(true);
        setIsEditing(true);
        setForm({ ...transaction });
    };

    const handleDelete = async (id) => {
        clearError();
        await deleteTransaction(id);
        setConfirmOpen(false);
    };

    if (initialLoading) return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="p-6">
            {isModalOpen && (
                <TransactionFormModal
                    onClose={() => {
                        setIsModalOpen(false);
                        setIsEditing(false);
                        setForm(defaultForm);
                    }}
                    form={form}
                    isEditing={isEditing}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    loading={loading}
                    error={valError}
                />
            )}
            {reportModalOpen && (
                <ReportDateModal
                    onClose={() => setReportModalOpen(false)}
                    onSubmit={(date) => {
                        setReportModalOpen(false);
                        navigate(`/report?date=${date}`);
                    }}
                />
            )}

            <div className="flex items-center justify-between mb-5">
                <h1 className="text-3xl font-bold">Transaction Management</h1>
                <div className="flex items-center gap-2">
                    <Button onClick={() => setReportModalOpen(true)} className="bg-green-600 hover:bg-green-700">Daily Report</Button>
                    <Button onClick={() => setIsModalOpen(true)} >Add Transaction</Button>
                    <Search value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            <TransactionTable
                paginatedTransactions={paginatedTransactions}
                sortField={sortField}
                sortOrder={sortOrder}
                setSortField={setSortField}
                setSortOrder={setSortOrder}
                onEdit={handleEdit}
                onDelete={(id) => {
                    setSelectedId(id);
                    setConfirmOpen(true);
                }}
                loading={loading}
            />
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
            {error && (
                <ModalError
                    message={error}
                    onClose={clearError}
                />
            )}
            {confirmOpen && (
                <ModalConfirm
                    message="Are you sure you want to delete this transaction?"
                    onConfirm={async () => {
                        await handleDelete(selectedId);
                    }}
                    onCancel={() => setConfirmOpen(false)}
                    loading={loading}
                />
            )}
        </div >
    );
}