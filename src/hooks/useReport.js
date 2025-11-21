import { useState, useEffect } from "react";
import { daily } from "../services/transactionService";

export function useReport(date) {
    const [report, setReport] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDailyReport = async () => {
            try {
                const data = await daily(date);
                setReport(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setInitialLoading(false);
            }
        };

        fetchDailyReport();
    }, [date]);

    const clearReport = () => {
        setReport(null);
        setError(null);
    };

    return {
        report,
        initialLoading,
        error,
        clearReport
    };
}
