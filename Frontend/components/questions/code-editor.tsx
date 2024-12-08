"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, RotateCcw } from "lucide-react";
import { submitCode } from "@/lib/judge0";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const defaultCode = `function twoSum(nums, target) {
    // Write your solution here
    
}`;

export function CodeEditor() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setOutput(null);
      setError(null);

      const result = await submitCode(code, language);

      if (result.stderr || result.compile_output) {
        setError(result.stderr || result.compile_output);
      } else {
        setOutput(result.stdout || "Program executed successfully!");
      }
    } catch (err) {
      setError("An error occurred while running your code.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-4 flex items-center justify-between">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="cpp">C++</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => {
            setCode(defaultCode);
            setOutput(null);
            setError(null);
          }}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button size="sm" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Play className="h-4 w-4 mr-2" />
            )}
            Run
          </Button>
        </div>
      </div>
      <div className="flex-1 grid grid-rows-2">
        <div className="p-4 bg-muted font-mono text-sm">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full bg-transparent resize-none focus:outline-none"
            spellCheck="false"
          />
        </div>
        <div className="border-t p-4 font-mono text-sm overflow-auto">
          <h3 className="font-semibold mb-2">Output:</h3>
          {error && (
            <Alert variant="destructive">
              <AlertDescription className="whitespace-pre-wrap font-mono">
                {error}
              </AlertDescription>
            </Alert>
          )}
          {output && (
            <pre className="whitespace-pre-wrap">{output}</pre>
          )}
        </div>
      </div>
    </div>
  );
}