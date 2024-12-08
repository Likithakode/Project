// lib/data.ts

export interface Example {
    input: string;
    output: string;
    explanation: string;
  }
  
  export interface Question {
    id: string;
    testId: string;
    title: string;
    description: string;
    difficulty: "Easy" | "Medium" | "Hard";
    category: string; // Can be replaced with Topic ObjectId in production
    points: number;
    detailedDescription: string;
    examples: Example[];
    constraints: string[];
  }
  
  export const questionsData: { [key: string]: Question } = {
    "605c7fb727d7f1045c16e829": {
      id: "605c7fb727d7f1045c16e829",
      testId: "test1",
      title: "Two Sum Problem",
      description: "Find two numbers in an array that add up to a target.",
      difficulty: "Medium",
      category: "Array",
      points: 50,
      detailedDescription: "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
      examples: [
        {
          input: "[2, 7, 11, 15], target: 9",
          output: "[0, 1]",
          explanation: "The numbers at indices 0 and 1 (2 + 7) add up to the target 9."
        },
        {
          input: "[3, 2, 4], target: 6",
          output: "[1, 2]",
          explanation: "The numbers at indices 1 and 2 (2 + 4) add up to the target 6."
        }
      ],
      constraints: [
        "Assume that each input would have exactly one solution.",
        "You may not use the same element twice."
      ]
    },
    "605c7fb727d7f1045c16e82a": {
      id: "605c7fb727d7f1045c16e82a",
      testId: "test1",
      title: "Maximum Subarray",
      description: "Find the contiguous subarray with the largest sum.",
      difficulty: "Medium",
      category: "Array",
      points: 60,
      detailedDescription: "Find the contiguous subarray within an array (containing at least one number) which has the largest sum.",
      examples: [
        {
          input: "[-2,1,-3,4,-1,2,1,-5,4]",
          output: "6",
          explanation: "The subarray [4,-1,2,1] has the largest sum = 6."
        }
      ],
      constraints: [
        "The solution should have a time complexity of O(n)."
      ]
    },
    "605c7fb727d7f1045c16e82b": {
      id: "605c7fb727d7f1045c16e82b",
      testId: "test2",
      title: "Reverse Linked List",
      description: "Reverse a singly linked list.",
      difficulty: "Easy",
      category: "Linked List",
      points: 40,
      detailedDescription: "Reverse a singly linked list and return its head.",
      examples: [
        {
          input: "[1, 2, 3, 4, 5]",
          output: "[5, 4, 3, 2, 1]",
          explanation: "The list has been reversed."
        }
      ],
      constraints: [
        "You must solve it in O(n) time complexity."
      ]
    },
    "605c7fb727d7f1045c16e82c": {
      id: "605c7fb727d7f1045c16e82c",
      testId: "test3",
      title: "Valid Parentheses",
      description: "Check if parentheses are balanced.",
      difficulty: "Medium",
      category: "Stack",
      points: 50,
      detailedDescription: "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      examples: [
        {
          input: "'()'",
          output: "true",
          explanation: "The parentheses are balanced."
        },
        {
          input: "'(]'", 
          output: "false", 
          explanation: "The parentheses are not balanced because '(' is closed by ']' instead of ')'."
        }
      ],
      constraints: [
        "The solution should operate in O(n) time."
      ]
    }
  };
  
  
  // Mock data for tests (with predefined questionIds)
  export const tests = [
    {
      id: "test1",
      title: "Array Problems",
      description: "Test your knowledge on array problems.",
      status: "available",
      difficulty: "Medium",
      category: "605c7f9b27d7f1045c16e826",  // Arrays Topic ID
      questions: [
        "605c7fb727d7f1045c16e829",  // Two Sum Problem
        "605c7fb727d7f1045c16e82a",  // Maximum Subarray
      ],
    },
    {
      id: "test2",
      title: "Linked List Basics",
      description: "Test your knowledge on linked lists.",
      status: "available",
      difficulty: "Easy",
      category: "605c7f9b27d7f1045c16e827",  // Linked Lists Topic ID
      questions: [
        "605c7fb727d7f1045c16e82b",  // Reverse Linked List
      ],
    },
    {
      id: "test3",
      title: "Stack and Queue",
      description: "Test your knowledge on stacks and queues.",
      status: "available",
      difficulty: "Medium",
      category: "605c7f9b27d7f1045c16e828",  // Stacks and Queues Topic ID
      questions: [
        "605c7fb727d7f1045c16e82c",  // Valid Parentheses
      ],
    },
  ];
  