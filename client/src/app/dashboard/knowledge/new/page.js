"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import KnowledgeForm from "@/components/knowledge/KnowledgeForm";
import Card from "@/components/ui/Card";
import { ArrowLeft, Brain } from "lucide-react";
import toast from "react-hot-toast";

export default function NewKnowledgePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/knowledge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Knowledge created successfully!");

        // Trigger AI processing
        await fetch("/api/ai/process", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: data.data._id }),
        });

        router.push(`/dashboard/knowledge/${data.data._id}`);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error(error.message || "Failed to create knowledge");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Brain className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Create New Knowledge
            </h1>
            <p className="text-gray-600 mt-2">
              Capture your thoughts, insights, or links
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <Card>
        <KnowledgeForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onCancel={() => router.back()}
        />
      </Card>

      {/* Tips */}
      <Card className="mt-6">
        <div className="text-sm text-gray-600">
          <h4 className="font-semibold text-gray-900 mb-2">
            Tips for better knowledge capture:
          </h4>
          <ul className="space-y-1 list-disc pl-5">
            <li>Use descriptive titles that summarize the content</li>
            <li>Add relevant tags for easier organization and search</li>
            <li>Use the AI auto-tagging feature for suggestions</li>
            <li>Include source URLs for reference materials</li>
            <li>Add summaries for longer content</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
