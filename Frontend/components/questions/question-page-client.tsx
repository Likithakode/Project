"use client";

import { QuestionDetails } from "@/components/questions/question-details";
import { CodeEditor } from "@/components/questions/code-editor";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";


interface Example {
  input: string;
  output: string;
  explanation: string;
}

interface Question {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  examples: Example[]; // Updated to include the examples array
  constraints: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  points: number;
}

interface QuestionPageClientProps {
  question: Question;
}

export function QuestionPageClient({ question }: QuestionPageClientProps) {
  return (
    <div className="h-[calc(100vh-4rem)]">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={40} minSize={30}>
          <QuestionDetails question={question} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={60} minSize={30}>
          <CodeEditor />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}