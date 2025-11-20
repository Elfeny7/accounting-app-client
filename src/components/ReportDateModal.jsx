import { useState } from "react";
import Button from "./Button";

export default function ReportDateModal({ onClose, onSubmit }) {
    const [date, setDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (date) onSubmit(date);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
                <h2 className="text-xl font-bold mb-4">Select Report Date</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="date"
                        className="p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />

                    <div className="flex justify-end gap-3">
                        <Button type="button" closeButton={true} onClick={onClose} className="flex-1">Close</Button>
                        <Button type="submit" className="flex-1">View Report</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
