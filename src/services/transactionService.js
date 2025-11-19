import * as transactionApi from "../api/transactionApi";
import ApiError from "../helper/ApiError";

export const getAll = async () => {
  try {
    return await transactionApi.fetchTransactions();
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Failed to fetch transactions";
    throw new ApiError(message, code);
  }
};

export const create = async (payload) => {
  try {
    const newTransaction = await transactionApi.createTransactions(payload);
    return newTransaction;
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Failed to create transactions";
    const reason = err.response?.data?.reason || null;
    throw new ApiError(message, code, reason);
  }
};

export const update = async (id, payload) => {
  try {
    const updatedTransaction = await transactionApi.updateTransaction(id, payload);
    return updatedTransaction;
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Failed to update transactions";
    const reason = err.response?.data?.reason || null;
    throw new ApiError(message, code, reason);
  }
}

export const remove = async (id) => {
  try {
    await transactionApi.deleteTransaction(id);
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Failed to delete transactions";
    throw new ApiError(message, code);
  }
};

