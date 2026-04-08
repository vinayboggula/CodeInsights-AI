export default function MetricCard({ title, before, after }) {
    const diff = after - before;
    const improved = diff < 0;

    return (
        <div className="p-4 border rounded-xl shadow">
            <h3 className="font-semibold">{title}</h3>

            <p>Before: {before}</p>
            <p>After: {after}</p>

            <p style={{ color: improved ? "green" : "red" }}>
                {improved ? "↓ Improved" : "↑ Increased"} ({Math.abs(diff)})
            </p>
        </div>
    );
}