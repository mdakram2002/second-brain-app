"use client";

import { useState } from "react";
import {
  FileText,
  Link as LinkIcon,
  Lightbulb,
  Tag,
  Sparkles,
  Loader,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";

export default function KnowledgeForm({
  onSubmit,
  onCancel,
  isSubmitting,
  initialData,
}) {
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      content: "",
      type: "note",
      tags: [],
      sourceUrl: "",
      newTag: "",
    },
  );

  const knowledgeTypes = [
    { value: "note", label: "Note", icon: FileText, color: "blue" },
    { value: "link", label: "Link", icon: LinkIcon, color: "green" },
    { value: "insight", label: "Insight", icon: Lightbulb, color: "purple" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!formData.content.trim()) {
      toast.error("Content is required");
      return;
    }

    const submitData = {
      ...formData,
      tags: formData.tags,
    };

    await onSubmit(submitData);
  };

  const handleAddTag = () => {
    const tag = formData.newTag.trim().toLowerCase();
    if (tag && !formData.tags.includes(tag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag],
        newTag: "",
      });
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleAutoTag = async () => {
    if (!formData.content.trim()) {
      toast.error("Add content first to auto-tag");
      return;
    }

    try {
      const response = await fetch("/api/ai/tag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: formData.content }),
      });

      const data = await response.json();
      if (data.success) {
        const newTags = [...new Set([...formData.tags, ...data.tags])].slice(
          0,
          10,
        );
        setFormData({
          ...formData,
          tags: newTags,
        });
        toast.success("Auto-tagged successfully!");
      }
    } catch (error) {
      toast.error("Auto-tagging failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Knowledge Type *
        </label>
        <div className="grid grid-cols-3 gap-3">
          {knowledgeTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => setFormData({ ...formData, type: type.value })}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                formData.type === type.value
                  ? `border-${type.color}-500 bg-${type.color}-50`
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <type.icon
                className={`w-6 h-6 mb-2 ${
                  formData.type === type.value
                    ? `text-${type.color}-600`
                    : "text-gray-400"
                }`}
              />
              <div
                className={`font-medium ${
                  formData.type === type.value
                    ? `text-${type.color}-700`
                    : "text-gray-600"
                }`}
              >
                {type.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title *
        </label>
        <Input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter a descriptive title"
          disabled={isSubmitting}
        />
      </div>

      {/* Source URL for links */}
      {formData.type === "link" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Source URL
          </label>
          <Input
            type="url"
            value={formData.sourceUrl}
            onChange={(e) =>
              setFormData({ ...formData, sourceUrl: e.target.value })
            }
            placeholder="https://example.com"
            disabled={isSubmitting}
          />
        </div>
      )}

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content *
        </label>
        <textarea
          required
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          rows={8}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          placeholder="Write your thoughts or paste content..."
          disabled={isSubmitting}
        />
      </div>

      {/* Tags */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <button
            type="button"
            onClick={handleAutoTag}
            disabled={isSubmitting}
            className="flex items-center text-sm text-primary-600 hover:text-primary-700 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 mr-1" />
            Auto-tag with AI
          </button>
        </div>

        <div className="flex gap-2 mb-3">
          <Input
            type="text"
            value={formData.newTag}
            onChange={(e) =>
              setFormData({ ...formData, newTag: e.target.value })
            }
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), handleAddTag())
            }
            placeholder="Add a tag"
            disabled={isSubmitting}
          />
          <Button
            type="button"
            onClick={handleAddTag}
            variant="outline"
            disabled={isSubmitting}
          >
            Add
          </Button>
        </div>

        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  disabled={isSubmitting}
                  className="ml-2 hover:text-primary-900 disabled:opacity-50"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-4 pt-6 border-t">
        <Button
          type="button"
          onClick={onCancel}
          variant="outline"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
<Button
  type="submit"
  disabled={isSubmitting}
  className="bg-gray-900 text-white hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-medium transition-colors"
>
  {isSubmitting ? (
    <>
      <Loader className="w-4 h-4 mr-2 animate-spin" />
      Saving...
    </>
  ) : (
    "Save Knowledge"
  )}
</Button>
      </div>
    </form>
  );
}
