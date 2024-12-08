"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";


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

interface QuestionDetailsProps {
  question: Question;
}

export function QuestionDetails({ question }: QuestionDetailsProps) {
  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{question.title}</h1>
          <Badge
            variant={
              question.difficulty === "Easy"
                ? "default"
                : question.difficulty === "Medium"
                ? "secondary"
                : "destructive"
            }
          >
            {question.difficulty}
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Problem Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{question.detailedDescription}</p>
          </CardContent>
        </Card>

        {/* Display Examples */}
        {question.examples && question.examples.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {question.examples.map((example, index) => (
                <div key={index} className="space-y-2">
                  <p>
                    <strong>Input:</strong> {example.input}
                  </p>
                  <p>
                    <strong>Output:</strong> {example.output}
                  </p>
                  {example.explanation && (
                    <p>
                      <strong>Explanation:</strong> {example.explanation}
                    </p>
                  )}
                  {index < question.examples.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Display Constraints */}
        {question.constraints && question.constraints.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Constraints</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-4 space-y-1">
                {question.constraints.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Display Points and Category */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Category:</strong> {question.category}</p>
            <p><strong>Points:</strong> {question.points}</p>
            <p><strong>Test ID:</strong> {question.testId}</p>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
