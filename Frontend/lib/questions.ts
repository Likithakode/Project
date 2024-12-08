export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface Question {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  category: string;
  detailedDescription?: string;
  examples?: Example[];
  constraints?: string[];
}

export const questions: Question[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description: "Find two numbers in an array that add up to a target sum",
    category: "Arrays",
    detailedDescription: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      }
    ],
    constraints: [
      "2 <= nums.length <= 104",
      "-109 <= nums[i] <= 109",
      "-109 <= target <= 109"
    ]
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Medium",
    description: "Determine if a string of parentheses is valid",
    category: "Stacks",
    detailedDescription: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    examples: [
      {
        input: "s = \"()\"",
        output: "true"
      }
    ],
    constraints: [
      "1 <= s.length <= 104",
      "s consists of parentheses only '()[]{}'"
    ]
  },
  {
    id: 3,
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    description: "Merge k sorted linked lists into one sorted list",
    category: "Linked Lists",
    detailedDescription: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.",
    examples: [
      {
        input: "lists = [[1,4,5],[1,3,4],[2,6]]",
        output: "[1,1,2,3,4,4,5,6]"
      }
    ],
    constraints: [
      "k == lists.length",
      "0 <= k <= 104",
      "0 <= lists[i].length <= 500"
    ]
  }
];