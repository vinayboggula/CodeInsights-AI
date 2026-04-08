import Editor from "@monaco-editor/react";

export default function CodeEditor({ code, setCode }) {
    return (
        <div className="border rounded-lg">
            <Editor
                height="300px"
                defaultLanguage="python"
                value={code}
                onChange={(value) => setCode(value)}
            />
        </div>
    );
}