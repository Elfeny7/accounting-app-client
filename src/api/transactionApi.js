import api from "./api";

export const fetchTransactions = async () => api.get("/transactions").then(res => res.data.data);

export const createTransactions = async ({ transaction_date, type, description, amount }) => {
  const res = await api.post("/transactions", { transaction_date, type, description, amount });
  return res.data.data;
};

export const updateTransaction = async (id, payload) => {
  const res = await api.put(`/transactions/${id}`, payload);
  return res.data.data;
};

export const deleteTransaction = async (id) => {
  await api.delete(`/transactions/${id}`);
};

export const dailyReport = async (date) => {
  const res = await api.get(`/report/daily/${date}`);
  return res.data.data;
}