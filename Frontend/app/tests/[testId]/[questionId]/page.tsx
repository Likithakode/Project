'use client'
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { QuestionPageClient } from "@/components/questions/question-page-client";

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

interface Test {
  id: string;
  title: string;
  description: string;
  status: "submitted" | "available"; // Test status
  difficulty: "Easy" | "Medium" | "Hard";
  category: string; // Topic ID
  questions: string[]; // List of question IDs
}

interface Props {
  params: {
    testId: string;
    questionId: string;
  };
}

export default function QuestionPage({ params }: Props) {
  const [test, setTest] = useState<Test | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        // Fetch the test data
        const testResponse = await fetch(`/api/tests/${params.testId}`);
        if (!testResponse.ok) throw new Error("Test not found");
        const testData = await testResponse.json();
        setTest(testData);

        // Fetch the question data
        const questionResponse = await fetch(`/api/questions/${params.questionId}`);
        if (!questionResponse.ok) throw new Error("Question not found");
        const questionData = await questionResponse.json();
        setQuestion(questionData);

        // Check if the question is part of the test
        if (!testData.questions.includes(params.questionId)) {
          throw new Error("Question is not part of this test");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        notFound(); // Trigger 404 if error occurs
      } finally {
        setLoading(false);
      }
    };

    fetchTestData();
  }, [params.testId, params.questionId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // If either the test or question does not exist, return 404
  if (!test || !question) {
    return notFound();
  }

  return <QuestionPageClient question={question} />;
}

// Static generation for test and question params
export async function generateStaticParams() {
  const response = await fetch("/api/tests"); // Fetch all tests
  const tests = await response.json();

  return tests.flatMap((test: Test) =>
    test.questions.map((questionId: string) => ({
      testId: test.id,
      questionId: questionId,
    }))
  );
}
