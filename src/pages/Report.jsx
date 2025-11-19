// Report.jsx
import { useEffect } from "react";
import { useReport } from "../hooks/useReport";
import ModalError from "../components/ModalError";

export default function Report() {
    const {
        report,
        loading,
        error,
        fetchDailyReport,
        clearReport
    } = useReport();

    useEffect(() => {
        fetchDailyReport("2025-10-08"); // fetch otomatis sekali
    }, []);

    if (loading) return <p className="text-gray-600">Loading...</p>;
    if (error) return <p className="text-red-600">{error}</p>;
    if (!report) return null;

    return (
        <div className="max-w-md mx-auto mt-6 p-6 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4">Daily Report</h2>

            <div className="space-y-3">
                <div>
                    <label className="font-semibold">Date:</label>
                    <p>{report.date}</p>
                </div>

                <div>
                    <label className="font-semibold">Total Income:</label>
                    <p className="text-green-600 font-medium">
                        Rp {report.total_income.toLocaleString()}
                    </p>
                </div>

                <div>
                    <label className="font-semibold">Total Expense:</label>
                    <p className="text-red-600 font-medium">
                        Rp {report.total_expense.toLocaleString()}
                    </p>
                </div>

                <div>
                    <label className="font-semibold">Balance:</label>
                    <p className="font-bold">
                        Rp {report.balance.toLocaleString()}
                    </p>
                </div>
            </div>
            {error && (
                <ModalError
                    message={error}
                    onClose={clearReport}
                />
            )}
        </div>
    );
}
