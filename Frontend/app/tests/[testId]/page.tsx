"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation"; // Import notFound to handle 404s
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Question {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  points: number;
  detailedDescription: string;
  examples: string[];
  constraints: string[];
}

interface Test {
  id: string;
  title: string;
  description: string;
  status: "submitted" | "available"; // Test status
  difficulty: "Easy" | "Medium" | "Hard";
  category: string; // Topic ID
  questions: string[]; // List of question IDs
}

export default function TestQuestionsPage({ params }: { params: { testId: string } }) {
  const [currentTest, setCurrentTest] = useState<Test | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        // Fetch the test data by testId
        const testResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tests/${params.testId}`);
        if (!testResponse.ok) throw new Error("Test not found");
        const testData = await testResponse.json();
        setCurrentTest(testData);

        // Fetch the questions related to the test
        const questionResponses = await Promise.all(
          testData.questions.map((questionId: string) =>
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/questions/${questionId}`).then((res) => res.json())
          )
        );
        setCurrentQuestions(questionResponses);
      } catch (error) {
        console.error("Error fetching test or questions:", error);
        notFound(); // Trigger 404 if test is not found or error occurs
      } finally {
        setLoading(false);
      }
    };

    fetchTestData();
  }, [params.testId]);

  // If loading, show loading spinner
  if (loading) {
    return <div>Loading...</div>;
  }

  // If the test is not found, display a 404 page
  if (!currentTest) {
    return notFound();
  }

  return (
    <div className="p-8">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">{currentTest.title}</h1>
          <p className="text-muted-foreground mt-2">{currentTest.description}</p>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {currentQuestions.map((question) => (
          <Link key={question.id} href={`/tests/${params.testId}/${question.id}`}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
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
                  <Badge variant="outline">{question.points} Points</Badge>
                </div>
                <CardTitle>{question.title}</CardTitle>
                <CardDescription>{question.description}</CardDescription>
              </CardHeader>

              {/* Displaying detailed description, examples, and constraints */}
              <div className="p-4 mt-4 bg-muted rounded-lg">
                <h2 className="text-xl font-semibold">Detailed Description</h2>
                <p>{question.detailedDescription}</p>
              </div>
              {question.examples.length > 0 && (
                <div className="p-4 mt-4 bg-muted rounded-lg">
                  <h2 className="text-xl font-semibold">Examples</h2>
                  <ul>
                    {question.examples.map((example, idx) => (
                      <li key={idx}>{example}</li>
                    ))}
                  </ul>
                </div>
              )}
              {question.constraints.length > 0 && (
                <div className="p-4 mt-4 bg-muted rounded-lg">
                  <h2 className="text-xl font-semibold">Constraints</h2>
                  <ul>
                    {question.constraints.map((constraint, idx) => (
                      <li key={idx}>{constraint}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
