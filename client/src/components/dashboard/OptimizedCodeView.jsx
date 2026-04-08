import Editor from "@monaco-editor/react";

export default function OptimizedCodeView({ code }) {
    return (
        <div className="border rounded-lg">
            <h2 className="p-2 font-bold">Optimized Code</h2>
            <Editor
                height="300px"
                defaultLanguage="python"
                value={code}
                options={{ readOnly: true }}
            />
        </div>
    );
}