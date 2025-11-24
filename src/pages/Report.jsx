import { useSearchParams } from "react-router-dom";
import { useReport } from "../hooks/useReport";
import ModalError from "../components/ModalError";

export default function Report() {
    const [params] = useSearchParams();
    const date = params.get("date");

    const {
        report,
        initialLoading,
        error,
        clearReport
    } = useReport(date);

    if (initialLoading) return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="p-6 flex justify-center">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Daily Report
                </h2>

                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">Date</span>
                        <span className="font-semibold text-gray-800">
                            {report.date}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">Total Income</span>
                        <span className="text-green-600 font-semibold">
                            Rp {report.total_income.toLocaleString()}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">Total Expense</span>
                        <span className="text-red-500 font-semibold">
                            Rp {report.total_expense.toLocaleString()}
                        </span>
                    </div>

                    <div className="flex justify-between border-t pt-4 mt-2">
                        <span className="text-gray-700 font-semibold text-lg">
                            Balance
                        </span>
                        <span className="font-bold text-lg text-gray-900">
                            Rp {report.balance.toLocaleString()}
                        </span>
                    </div>
                </div>

                {error && (
                    <ModalError
                        message={error}
                        onClose={clearReport}
                    />
                )}
            </div>
        </div>
    );

}
