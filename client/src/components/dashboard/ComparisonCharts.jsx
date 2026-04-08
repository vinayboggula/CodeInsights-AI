import {
    Bar,
    BarChart,
    Cell,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export default function ComparisonCharts({ data }) {
    const before = data?.original_metrics || 0;
    const after = data?.optimized_metrics || 0;

    if (!data?.original_metrics || !data?.optimized_metrics) {
        return <p className="text-gray-400">No metrics available</p>;
    }

    const chartData = [
        {
            name: "LOC",
            before: before.loc,
            after: after.loc,
            improved: after.loc < before.loc
        },
        {
            name: "Cyclomatic complexity",
            before: before.cyclomatic_complexity,
            after: after.cyclomatic_complexity,
            improved: after.cyclomatic_complexity < before.cyclomatic_complexity
        },
        {
            name: "Smells",
            before: before.code_smells,
            after: after.code_smells,
            improved: after.code_smells < before.code_smells
        },
        {
            name: "Maintainability",
            before: before.maintainability_score,
            after: after.maintainability_score,
            improved: after.maintainability_score > before.maintainability_score // reverse
        },
    ];

    return (
        <div className="p-4 border rounded-xl shadow">
            <h2 className="font-bold mb-4">Comparison Chart</h2>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    {/* BEFORE BAR */}
                    <Bar dataKey="before" name="Before">
                        {chartData.map((entry, index) => {
                            let color = "#9ca3af"; // gray

                            if (entry.before === entry.after) {
                                color = "#9ca3af"; // same
                            } else if (entry.before > entry.after) {
                                color = "#ef4444"; // red (old worse)
                            } else {
                                color = "#22c55e"; // green (old better)
                            }

                            return <Cell key={`before-${index}`} fill={color} />;
                        })}
                    </Bar>

                    {/* AFTER BAR */}
                    <Bar dataKey="after" name="After">
                        {chartData.map((entry, index) => {
                            let color = "#9ca3af"; // gray

                            if (entry.before === entry.after) {
                                color = "#9ca3af";
                            } else if (entry.before > entry.after) {
                                color = "#22c55e"; // green (new better)
                            } else {
                                color = "#ef4444"; // red (new worse)
                            }

                            return <Cell key={`after-${index}`} fill={color} />;
                        })}
                    </Bar>

                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}