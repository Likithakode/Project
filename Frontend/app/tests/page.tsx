"use client";

import { useState, useEffect } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Define the test data type
interface Test {
  id: string;
  title: string;
  description: string;
  status: "submitted" | "available";
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  questions: number;
  completedQuestions?: number; // Optional property
}

export default function TestsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("available");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [tests, setTests] = useState<Test[]>([]);  // State to store fetched tests
  const [loading, setLoading] = useState(true);    // State to manage loading state

  // Fetch tests data from the backend
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch("/api/tests");
        const data = await response.json();
        setTests(data);  // Set the fetched tests
      } catch (error) {
        console.error("Error fetching tests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    router.push(process.env.NEXT_PUBLIC_LOGOUT_URL || "http://localhost:3000");
  };

  // Prepare categories list (unique topics from the fetched tests)
  const categories = [
    "All",
    ...Array.from(new Set(tests.map((test) => test.category))),
  ];

  // Filter tests based on selected tab and category
  const filteredTests = tests.filter(
    (test) =>
      test.status === activeTab &&
      (selectedCategory === "All" || test.category === selectedCategory)
  );

  return (
    <div className="p-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Coding Assessments</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </header>

      <div className="flex justify-between items-center mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-2/3">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="available">Available Tests</TabsTrigger>
            <TabsTrigger value="submitted">Submitted Tests</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="w-1/3 pl-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTests.map((test) => (
            <Link key={test.id} href={`/tests/${test.id}`}>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant={
                        test.difficulty === "Easy"
                          ? "default"
                          : test.difficulty === "Medium"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {test.difficulty}
                    </Badge>
                    <Badge variant="outline">{test.category}</Badge>
                  </div>
                  <CardTitle>{test.title}</CardTitle>
                  <CardDescription>{test.description}</CardDescription>
                  {test.status === "submitted" && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4 dark:bg-gray-700">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{
                          width: `${
                            ((test.completedQuestions || 0) / test.questions) * 100 || 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  )}
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
