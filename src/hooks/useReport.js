import { useState } from "react";
import { daily } from "../services/transactionService";

export function useReport() {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchDailyReport = async (date) => {
        try {
            setLoading(true);
            setError("");

            const data = await daily(date);
            setReport(data);
        } catch (err) {
            setError("Failed to fetch daily report");
        } finally {
            setLoading(false);
        }
    };

    const clearReport = () => {
        setReport(null);
        setError("");
    };

    return {
        report,
        loading,
        error,
        fetchDailyReport,
        clearReport
    };
}
