import MetricCard from "./MetricCard";

export default function MetricsDashboard({ data }) {
    const before = data?.original_metrics;
    const after = data?.optimized_metrics;

    if (!before || !after) {
        return <p className="text-gray-400">No metrics available</p>;
    }

    return (
        <div className="grid grid-cols-3 gap-4">
            <MetricCard
                title="Maintainability"
                before={before.maintainability_score}
                after={after.maintainability_score}
            />
            <MetricCard
                title="Time Complexity"
                before={before.estimated_time_complexity}
                after={after.estimated_time_complexity}
            />
            <MetricCard
                title="Space Complexity"
                before={before.estimated_space_complexity}
                after={after.estimated_space_complexity}
            />
        </div>
    );
}