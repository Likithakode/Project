import { Brain, Code, Trophy, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

const features = [
  {
    title: "Practice Challenges",
    description: "Access thousands of coding challenges across multiple domains",
    icon: Code,
  },
  {
    title: "Skill Assessment",
    description: "Test your knowledge with our adaptive assessment system",
    icon: Brain,
  },
  {
    title: "Global Community",
    description: "Connect with developers from around the world",
    icon: Users,
  },
  {
    title: "Competitions",
    description: "Participate in coding contests and win exciting prizes",
    icon: Trophy,
  },
];

export function Features() {
  return (
    <div className="p-10">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Card key={index} className="border-2">
            <CardHeader>
              <feature.icon className="h-12 w-12 text-primary" />
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}