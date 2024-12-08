"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "../../hooks/use-toast";

const questionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  detailedDescription: z.string().min(1, "Detailed description is required"),
  examples: z.array(z.object({
    input: z.string(),
    output: z.string(),
    explanation: z.string().optional(),
  })),
  constraints: z.array(z.string()),
  testCases: z.array(z.object({
    input: z.string(),
    expectedOutput: z.string(),
  })),
});

type QuestionFormData = z.infer<typeof questionSchema>;

interface QuestionFormProps {
  initialData?: QuestionFormData;
  questionId?: string;
}

export function QuestionForm({ initialData, questionId }: QuestionFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues: initialData || {
      title: "",
      difficulty: "Easy",
      category: "",
      description: "",
      detailedDescription: "",
      examples: [{ input: "", output: "", explanation: "" }],
      constraints: [""],
      testCases: [{ input: "", expectedOutput: "" }],
    },
  });

  const onSubmit = async (data: QuestionFormData) => {
    try {
      setIsLoading(true);
      const url = questionId 
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/add`
        : "/api/admin/questions";
      
      const response = await fetch(url, {
        method: questionId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error();

      toast({
        title: "Success",
        description: `Question ${questionId ? "updated" : "created"} successfully`,
      });
      router.push("/admin/questions");
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${questionId ? "update" : "create"} question`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Difficulty</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="detailedDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detailed Description</FormLabel>
              <FormControl>
                <Textarea {...field} className="min-h-[200px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : questionId ? "Update Question" : "Create Question"}
          </Button>
        </div>
      </form>
    </Form>
  );
}