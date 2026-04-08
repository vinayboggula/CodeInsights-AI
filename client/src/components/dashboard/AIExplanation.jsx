export default function AIExplanation({ explanation, summary }) {
    if (!summary) return null;

    return (
        <div className="p-4 border rounded-xl shadow space-y-3">
            <h2 className="font-bold text-lg">AI Optimization Summary</h2>

            <p className="text-gray-300">{explanation}</p>

            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">

                <div>
                    <span className="font-semibold">Summary:</span>
                    <p>{summary.summary}</p>
                </div>

                <div>
                    <span className="font-semibold">Verdict:</span>
                    <p
                        className={
                            summary.verdict === "improved"
                                ? "text-green-400"
                                : summary.verdict === "qualitative_improvement"
                                    ? "text-yellow-400"
                                    : "text-red-400"
                        }
                    >
                        {summary.verdict}
                    </p>
                </div>

                <div>
                    <span className="font-semibold">LOC Change:</span>
                    <p>{summary.loc_change_percent}%</p>
                </div>

                <div>
                    <span className="font-semibold">Maintainability:</span>
                    <p>{summary.maintainability_gain}</p>
                </div>

                <div>
                    <span className="font-semibold">Time Complexity:</span>
                    <p>{summary.time_complexity_change}</p>
                </div>

                <div>
                    <span className="font-semibold">Nesting:</span>
                    <p>{summary.nesting_reduction_percent}%</p>
                </div>

                <div>
                    <span className="font-semibold">Complexity:</span>
                    <p>{summary.complexity_reduction_percent}%</p>
                </div>

                <div>
                    <span className="font-semibold">Accuracy:</span>
                    <p className={
                        summary.accuracy_score > 80
                            ? "text-green-400"
                            : summary.accuracy_score > 50
                                ? "text-yellow-400"
                                : "text-red-400"
                    }>{summary.accuracy_score}%</p>
                </div>

            </div>
        </div>
    );
}