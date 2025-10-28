import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Copy, RotateCcw } from "lucide-react";

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  title?: string;
  onCodeChange?: (code: string) => void;
}

export default function CodeEditor({
  initialCode = "// اكتب الكود الخاص بك هنا\nconsole.log('مرحباً بك في محرر الكود التفاعلي!');",
  language = "javascript",
  title = "محرر الكود",
  onCodeChange,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      onCodeChange?.(value);
    }
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput("");

    try {
      // Create a custom console for capturing output
      const logs: string[] = [];
      const customConsole = {
        log: (...args: any[]) => {
          logs.push(args.map((arg) => String(arg)).join(" "));
        },
        error: (...args: any[]) => {
          logs.push(`❌ Error: ${args.map((arg) => String(arg)).join(" ")}`);
        },
        warn: (...args: any[]) => {
          logs.push(`⚠️ Warning: ${args.map((arg) => String(arg)).join(" ")}`);
        },
      };

      // Execute the code in a controlled environment
      const func = new Function("console", code);
      func(customConsole);

      setOutput(logs.length > 0 ? logs.join("\n") : "✅ تم تنفيذ الكود بنجاح!");
    } catch (error) {
      setOutput(`❌ خطأ: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsRunning(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    alert("تم نسخ الكود!");
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput("");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Editor */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border border-border rounded-lg overflow-hidden">
            <Editor
              height="400px"
              language={language}
              value={code}
              onChange={handleCodeChange}
              theme="light"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
          <div className="flex gap-2 p-4">
            <Button
              onClick={runCode}
              disabled={isRunning}
              className="gap-2 flex-1"
            >
              <Play className="h-4 w-4" />
              {isRunning ? "جاري التنفيذ..." : "تنفيذ الكود"}
            </Button>
            <Button
              onClick={copyCode}
              variant="outline"
              className="gap-2"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              onClick={resetCode}
              variant="outline"
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Output */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">النتيجة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg h-96 overflow-y-auto font-mono text-sm">
            {output ? (
              <pre className="whitespace-pre-wrap break-words text-foreground">
                {output}
              </pre>
            ) : (
              <p className="text-muted-foreground">
                اضغط على "تنفيذ الكود" لرؤية النتيجة هنا
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
