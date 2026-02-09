/** @format */

"use client";

import { useState } from "react";
import {
  Code,
  Layers,
  Cpu,
  Zap,
  GitBranch,
  Shield,
  Globe,
  Terminal,
  Database,
  Server,
} from "lucide-react";
import Card from "@/components/ui/Card";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("architecture");

  const sections = [
    { id: "architecture", label: "Architecture", icon: Layers },
    { id: "api", label: "API Reference", icon: Code },
    { id: "ai", label: "AI Integration", icon: Cpu },
    { id: "deployment", label: "Deployment", icon: Server },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Documentation
          </h1>
          <p className="text-gray-600">
            Technical documentation for the Second Brain application
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <nav className="space-y-1 p-4">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeSection === section.id
                          ? "bg-primary-100 text-primary-600"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {section.label}
                    </button>
                  );
                })}
              </nav>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeSection === "architecture" && (
              <div className="space-y-8">
                <Card>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <Layers className="w-6 h-6 text-primary-600" />
                      <h2 className="text-2xl font-bold text-gray-900">
                        System Architecture
                      </h2>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Portable Architecture
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Our application follows a modular, portable
                          architecture with clear separation of concerns:
                        </p>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start">
                            <GitBranch className="w-5 h-5 text-primary-500 mr-2 mt-0.5" />
                            <span>
                              <strong>Frontend Layer:</strong> Next.js with
                              React components - easily swappable with any React
                              framework
                            </span>
                          </li>
                          <li className="flex items-start">
                            <Database className="w-5 h-5 text-primary-500 mr-2 mt-0.5" />
                            <span>
                              <strong>Data Layer:</strong> MongoDB with Mongoose
                              - can be replaced with PostgreSQL, MySQL, or any
                              other database
                            </span>
                          </li>
                          <li className="flex items-start">
                            <Cpu className="w-5 h-5 text-primary-500 mr-2 mt-0.5" />
                            <span>
                              <strong>AI Layer:</strong> Google Gemini API -
                              interchangeable with OpenAI, Claude, or any other
                              LLM provider
                            </span>
                          </li>
                          <li className="flex items-start">
                            <Shield className="w-5 h-5 text-primary-500 mr-2 mt-0.5" />
                            <span>
                              <strong>Service Layer:</strong> Independent
                              services that can be scaled and deployed
                              separately
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Principles-Based UX
                        </h3>
                        <p className="text-gray-600 mb-4">
                          We follow these core UX principles throughout the
                          application:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold text-blue-800 mb-2">
                              1. Progressive Disclosure
                            </h4>
                            <p className="text-blue-700 text-sm">
                              Show only what's necessary, reveal more on demand
                            </p>
                          </div>
                          <div className="p-4 bg-green-50 rounded-lg">
                            <h4 className="font-semibold text-green-800 mb-2">
                              2. Immediate Feedback
                            </h4>
                            <p className="text-green-700 text-sm">
                              All actions provide instant visual feedback
                            </p>
                          </div>
                          <div className="p-4 bg-purple-50 rounded-lg">
                            <h4 className="font-semibold text-purple-800 mb-2">
                              3. Consistency
                            </h4>
                            <p className="text-purple-700 text-sm">
                              Uniform design patterns across the application
                            </p>
                          </div>
                          <div className="p-4 bg-yellow-50 rounded-lg">
                            <h4 className="font-semibold text-yellow-800 mb-2">
                              4. Accessibility First
                            </h4>
                            <p className="text-yellow-700 text-sm">
                              Semantic HTML, ARIA labels, keyboard navigation
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Agent Thinking
                        </h3>
                        <p className="text-gray-600 mb-4">
                          The system implements autonomous AI agents that
                          maintain and improve knowledge quality:
                        </p>
                        <ul className="space-y-3 text-gray-600">
                          <li className="flex items-start">
                            <Zap className="w-5 h-5 text-primary-500 mr-2 mt-0.5" />
                            <div>
                              <strong>Automatic Processing:</strong> New
                              knowledge items are automatically summarized and
                              tagged
                            </div>
                          </li>
                          <li className="flex items-start">
                            <Zap className="w-5 h-5 text-primary-500 mr-2 mt-0.5" />
                            <div>
                              <strong>Continuous Learning:</strong> AI learns
                              from user interactions and feedback
                            </div>
                          </li>
                          <li className="flex items-start">
                            <Zap className="w-5 h-5 text-primary-500 mr-2 mt-0.5" />
                            <div>
                              <strong>Proactive Suggestions:</strong> Suggests
                              connections and insights between knowledge items
                            </div>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Infrastructure Mindset
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Built with infrastructure thinking - exposing
                          functionality as reusable services:
                        </p>
                        <div className="space-y-4">
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Globe className="w-5 h-5 text-primary-600" />
                              <h4 className="font-semibold text-gray-900">
                                Public API
                              </h4>
                            </div>
                            <code className="block text-sm bg-gray-800 text-gray-100 p-3 rounded mb-2">
                              GET /api/public/brain/query?q=your+question
                            </code>
                            <p className="text-sm text-gray-600">
                              Public endpoint that returns AI-powered answers
                              with sources
                            </p>
                          </div>

                          <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Terminal className="w-5 h-5 text-primary-600" />
                              <h4 className="font-semibold text-gray-900">
                                Embeddable Widget
                              </h4>
                            </div>
                            <code className="block text-sm bg-gray-800 text-gray-100 p-3 rounded mb-2">
                              {
                                '<iframe src="https://your-app.com/embed" width="800" height="600"></iframe>'
                              }
                            </code>
                            <p className="text-sm text-gray-600">
                              Full-featured search widget that can be embedded
                              anywhere
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeSection === "api" && (
              <Card>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Code className="w-6 h-6 text-primary-600" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      API Reference
                    </h2>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Base URL
                      </h3>
                      <code className="block text-lg bg-gray-800 text-gray-100 p-4 rounded">
                        https://your-app.com/api
                      </code>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Public Endpoints
                      </h3>

                      <div className="space-y-4">
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          <div className="bg-gray-50 px-4 py-3 border-b">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-sm font-semibold text-gray-900">
                                GET /public/brain/query
                              </span>
                              <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">
                                PUBLIC
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="text-gray-600 mb-3">
                              Query the knowledge base and get AI-powered
                              answers
                            </p>

                            <div className="mb-4">
                              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                Parameters
                              </h4>
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="border-b">
                                    <th className="text-left py-2">Name</th>
                                    <th className="text-left py-2">Type</th>
                                    <th className="text-left py-2">Required</th>
                                    <th className="text-left py-2">
                                      Description
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="border-b">
                                    <td className="py-2">q</td>
                                    <td className="py-2">string</td>
                                    <td className="py-2">Yes</td>
                                    <td className="py-2">
                                      The question to ask
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>

                            <div>
                              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                Example Request
                              </h4>
                              <code className="block text-sm bg-gray-800 text-gray-100 p-3 rounded">
                                curl -X GET
                                "https://your-app.com/api/public/brain/query?q=What+is+machine+learning?"
                              </code>
                            </div>

                            <div className="mt-4">
                              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                Example Response
                              </h4>
                              <pre className="text-sm bg-gray-800 text-gray-100 p-3 rounded overflow-x-auto">
                                {`{
                                    "success": true,
                                    "query": "What is machine learning?",
                                    "answer": "Machine learning is a subset of artificial intelligence...",
                                    "sources": [
                                      {
                                        "title": "Introduction to ML",
                                        "type": "note",
                                        "summary": "Basic concepts of machine learning..."
                                      }
                                    ],
                                    "timestamp": "2024-01-01T00:00:00.000Z"
                                  }`}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Protected Endpoints
                      </h3>
                      <p className="text-gray-600 mb-4">
                        These endpoints require authentication (JWT token in
                        Authorization header)
                      </p>

                      <div className="space-y-4">
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          <div className="bg-gray-50 px-4 py-3 border-b">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-sm font-semibold text-gray-900">
                                GET /knowledge
                              </span>
                              <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">
                                PROTECTED
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="text-gray-600 mb-2">
                              Get all knowledge items with pagination
                            </p>
                          </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          <div className="bg-gray-50 px-4 py-3 border-b">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-sm font-semibold text-gray-900">
                                POST /knowledge
                              </span>
                              <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">
                                PROTECTED
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="text-gray-600 mb-2">
                              Create a new knowledge item
                            </p>
                          </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          <div className="bg-gray-50 px-4 py-3 border-b">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-sm font-semibold text-gray-900">
                                POST /ai/query
                              </span>
                              <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">
                                PROTECTED
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="text-gray-600 mb-2">
                              Query the AI with your knowledge base context
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
