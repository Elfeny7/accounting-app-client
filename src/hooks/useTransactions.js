import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import * as transactionService from "../services/transactionService";

export const useTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [valError, setValError] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                const data = await transactionService.getAll();
                setTransactions(data);
            } catch (err) {
                setError(err.message || "Failed to load transactions");
            } finally {
                setInitialLoading(false);
            }
        };

        loadTransactions();
    }, []);

    const createTransaction = async (form) => {
        try {
            setLoading(true);
            const newTransaction = await transactionService.create(form);
            setTransactions((prev) => [...prev, newTransaction]);
            toast.success("Create Transaction Success");
        } catch (err) {
            if (err.code == 422)
                setValError(err.error);
            else
                setError(err.message || "Failed to create transaction");
        } finally {
            setLoading(false);
        }
    };

    const updateTransaction = async (form) => {
        try {
            setLoading(true);
            const updatedTransaction = await transactionService.update(form.id, form);
            console.log(updatedTransaction);
            setTransactions((prevTransactions) =>
                prevTransactions.map((item) =>
                    item.id === updatedTransaction.id ? updatedTransaction : item
                )
            );
            toast.success("Update Transaction Success");
        } catch (err) {
            if (err.code == 422)
                setValError(err.error);
            else
                setError(err.message || "Failed to update transaction");
        } finally {
            setLoading(false);
        }
    };

    const deleteTransaction = async (id) => {
        const prev = transactions;
        try {
            setLoading(true);
            await transactionService.remove(id);
            setTransactions((prev) => prev.filter((c) => c.id !== id));
            toast.success("Delete Transaction Success");
        } catch (err) {
            setTransactions(prev);
            setError(err.message || "Failed to delete transaction");
        } finally {
            setLoading(false);
        }
    };

    const clearError = () => { setValError(null); setError(null); };

    return {
        transactions,
        loading,
        initialLoading,
        valError,
        error,
        clearError,
        deleteTransaction,
        createTransaction,
        updateTransaction
    };
};