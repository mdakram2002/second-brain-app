"use client";

import { useState } from "react";
import {
  Book,
  Link as LinkIcon,
  Lightbulb,
  MoreVertical,
  Star,
  Eye,
  Clock,
  Tag as TagIcon,
  ExternalLink,
  Copy,
  Trash2,
} from "lucide-react";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

// Function to limit text to a specific number of words
const limitWords = (text, maxWords = 15) => {
  if (!text) return "";
  const words = text.split(" ");
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
};

export default function KnowledgeCard({ item, listView = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(item.isFavorite || false);

  const getIcon = (type) => {
    switch (type) {
      case "note":
        return <Book className="w-4 h-4" />;
      case "link":
        return <LinkIcon className="w-4 h-4" />;
      case "insight":
        return <Lightbulb className="w-4 h-4" />;
      default:
        return <Book className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "note":
        return "bg-blue-100 text-blue-600";
      case "link":
        return "bg-green-100 text-green-600";
      case "insight":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const handleCopy = () => {
    if (item.type === "link") {
      navigator.clipboard.writeText(item.content);
      toast.success("Link copied to clipboard!");
    } else {
      navigator.clipboard.writeText(`${item.title}\n\n${item.content}`);
      toast.success("Content copied to clipboard!");
    }
    setIsMenuOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // For list view - limit content to 15 words
  const listViewContent = limitWords(item.content, 15);

  // For grid view - limit content to 15 words
  const gridViewContent = limitWords(item.content, 15);

  if (listView) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                {getIcon(item.type)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDate(item.createdAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {item.views} views
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-sm line-clamp-2 mb-3 min-h-[40px]">
              {listViewContent}
            </p>

            <div className="flex flex-wrap gap-2">
              {item.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                >
                  <TagIcon className="w-3 h-3" />
                  {tag}
                </span>
              ))}
              {item.tags.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{item.tags.length - 3} more
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-full ${isFavorite ? "text-yellow-500" : "text-gray-400 hover:text-yellow-500"}`}
            >
              <Star className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
            </button>

            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <button
                    onClick={handleCopy}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Copy className="w-4 h-4 mr-3" />
                    Copy {item.type === "link" ? "Link" : "Content"}
                  </button>
                  {item.type === "link" && (
                    <a
                      href={item.content}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <ExternalLink className="w-4 h-4 mr-3" />
                      Open Link
                    </a>
                  )}
                  <div className="border-t border-gray-200 my-1"></div>
                  <button
                    onClick={() => {
                      toast.error("Feature coming soon!");
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-3" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      {/* Card Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${getTypeColor(item.type)}`}>
            {getIcon(item.type)}
          </div>
          <div>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${getTypeColor(item.type)}`}
            >
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-2 rounded-full ${isFavorite ? "text-yellow-500 bg-yellow-50" : "text-gray-400 hover:text-yellow-500 hover:bg-yellow-50"}`}
          >
            <Star className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          </button>

          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <button
                  onClick={handleCopy}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Copy className="w-4 h-4 mr-3" />
                  Copy {item.type === "link" ? "Link" : "Content"}
                </button>
                {item.type === "link" && (
                  <a
                    href={item.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <ExternalLink className="w-4 h-4 mr-3" />
                    Open Link
                  </a>
                )}
                <div className="border-t border-gray-200 my-1"></div>
                <button
                  onClick={() => {
                    toast.error("Feature coming soon!");
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-3" />
                  Delete
                  </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <h3 className="font-bold text-gray-900 text-lg mb-3 line-clamp-2 min-h-[56px]">
        {item.title}
      </h3>

      <p className="text-gray-600 text-sm mb-4 flex-grow min-h-[72px]">
        {gridViewContent}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {item.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
          >
            <TagIcon className="w-3 h-3" />
            {tag}
          </span>
        ))}
        {item.tags.length > 3 && (
          <span className="text-xs text-gray-500 self-center">
            +{item.tags.length - 3} more
          </span>
        )}
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4 mt-auto">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDate(item.createdAt)}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {item.views} views
          </span>
        </div>

        <Button
          href={`/dashboard/knowledge/${item._id}`}
          variant="ghost"
          size="sm"
          className="text-primary-600 hover:text-primary-700"
        >
          View Details
        </Button>
      </div>
    </div>
  );
}