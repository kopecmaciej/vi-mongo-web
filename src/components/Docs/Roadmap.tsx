import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, Circle } from "lucide-react";

const features = [
  { name: "Multiple tabs in main view", completed: false, priority: "high" },
  { name: "Managing Indexes", completed: false, priority: "high" },
  { name: "Exporting/Importing Documents", completed: false, priority: "medium" },
  { name: "AI query assistant", completed: false, priority: "medium" },
  { name: "Aggregation Pipeline", completed: false, priority: "low" },
  { name: "Hash passwords in connection view", completed: true, priority: "high" },
  { name: "Multiple styles", completed: true, priority: "medium" },
  { name: "Move autocomplete keys to json file, so that it can be easily modified", completed: true, priority: "low" },
  { name: "Improve Content by adding other possibilities of viewing", completed: true, priority: "medium" },
  { name: "Help page", completed: true, priority: "medium" },
  { name: "Query History", completed: true, priority: "high" },
];

const Roadmap: React.FC = () => {
  return (
    <ScrollArea className="h-[calc(100vh-100px)] pr-4">
      <div className="space-y-4">
        <div className="relative border-l border-gray-200 dark:border-gray-700 ml-6">
          {features.map((feature, index) => (
            <div key={index} className="mb-4 ml-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-white dark:bg-gray-900 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900">
                {feature.completed ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-500" />
                )}
              </span>
              <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                {feature.name}
                {feature.completed && (
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3">
                    Completed
                  </span>
                )}
                {!feature.completed && (
                  <span className={`text-sm font-medium mr-2 px-2.5 py-0.5 rounded ml-3 ${
                    feature.priority === "high" 
                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      : feature.priority === "medium"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  }`}>
                    {feature.priority.charAt(0).toUpperCase() + feature.priority.slice(1)} Priority
                  </span>
                )}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

export default Roadmap;
