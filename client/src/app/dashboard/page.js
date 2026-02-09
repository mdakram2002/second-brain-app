"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Brain,
  TrendingUp,
  Zap,
  ChevronDown,
  Grid,
  List,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import KnowledgeGrid from "@/components/knowledge/KnowledgeGrid";
import KnowledgeCard from "@/components/knowledge/KnowledgeCard";
import AIChat from "@/components/ai/AIChat";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import Loader from "@/components/common/Loader";
import toast from "react-hot-toast";
import { useKnowledgeStore } from "@/store/useKnowledgeStore";

export default function Dashboard() {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const { knowledgeItems, isLoading, fetchKnowledge, stats } =
    useKnowledgeStore();

  useEffect(() => {
    fetchKnowledge();
  }, []);

  const filteredItems = knowledgeItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesFilter = filterType === "all" || item.type === filterType;

    return matchesSearch && matchesFilter;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "title":
        return a.title.localeCompare(b.title);
      case "views":
        return b.views - a.views;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8">
          {/* Dashboard Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Knowledge Dashboard
                </h1>
                <p className="text-gray-600 mt-2">
                  Manage and explore your accumulated knowledge
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="hidden sm:flex">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Button href="/dashboard/knowledge/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Knowledge
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="bg-linear-to-br from-primary-50 to-primary-100 border-primary-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-primary-600">Total Items</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stats.total}
                    </p>
                  </div>
                  <Brain className="w-10 h-10 text-primary-500" />
                </div>
              </Card>

              <Card className="bg-linear-to-br from-blue-50 to-blue-100 border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600">Notes</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stats.notes}
                    </p>
                  </div>
                  <TrendingUp className="w-10 h-10 text-blue-500" />
                </div>
              </Card>

              <Card className="bg-linear-to-br from-green-50 to-green-100 border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600">Links</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stats.links}
                    </p>
                  </div>
                  <Zap className="w-10 h-10 text-green-500" />
                </div>
              </Card>

              <Card className="bg-linear-to-br from-purple-50 to-purple-100 border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600">Insights</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stats.insights}
                    </p>
                  </div>
                  <Brain className="w-10 h-10 text-purple-500" />
                </div>
              </Card>
            </div>

            {/* Search and Controls */}
            <Card className="mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Search knowledge by title, content, or tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                  >
                    <option value="all">All Types</option>
                    <option value="note">Notes</option>
                    <option value="link">Links</option>
                    <option value="insight">Insights</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="title">Title A-Z</option>
                    <option value="views">Most Viewed</option>
                  </select>

                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`px-3 py-2 ${viewMode === "grid" ? "bg-primary-100 text-primary-600" : "bg-white text-gray-600"}`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`px-3 py-2 ${viewMode === "list" ? "bg-primary-100 text-primary-600" : "bg-white text-gray-600"}`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-500">
                {filteredItems.length} items found
                {searchQuery && ` for "${searchQuery}"`}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Knowledge Section */}
            <div className="lg:col-span-2">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Loader key={i} />
                  ))}
                </div>
              ) : filteredItems.length === 0 ? (
                <Card className="text-center py-12">
                  <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No knowledge items found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {searchQuery
                      ? "Try a different search term"
                      : "Get started by adding your first knowledge item"}
                  </p>
                  <Button href="/dashboard/knowledge/new">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Knowledge
                  </Button>
                </Card>
              ) : viewMode === "grid" ? (
                <KnowledgeGrid items={sortedItems} />
              ) : (
                <div className="space-y-4">
                  {sortedItems.map((item, index) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <KnowledgeCard item={item} listView />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* AI Chat Sidebar */}
            <div className="lg:col-span-1">
              <AIChat />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
