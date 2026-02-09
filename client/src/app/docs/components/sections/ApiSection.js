
import Card from "@/components/ui/Card";
import { Code } from "lucide-react";
import { projectURLs } from "../../utils/constants";

export default function ApiSection() {
  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Code className="w-6 h-6 text-primary-600" />
          <h2 className="text-2xl font-bold text-gray-900">API Reference</h2>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Base URL
            </h3>
            <code className="block text-lg bg-gray-800 text-gray-100 p-4 rounded">
              {projectURLs.backend}/api
            </code>
            <p className="text-gray-600 mt-2">
              All API endpoints are prefixed with{" "}
              <code className="bg-gray-100 px-1 rounded">/api</code>
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Public Endpoints (No Authentication Required)
            </h3>

            <div className="space-y-4">
              {/* Health Check */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-green-50 px-4 py-3 border-b">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-semibold text-gray-900">
                      GET /health
                    </span>
                    <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">
                      PUBLIC
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-3">
                    System health check endpoint
                  </p>
                  <code className="block text-sm bg-gray-800 text-gray-100 p-3 rounded mb-2">
                    {projectURLs.healthCheck}
                  </code>
                  <a
                    href={projectURLs.healthCheck}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline text-sm"
                  >
                    Try it now →
                  </a>
                </div>
              </div>

              {/* API Docs */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-green-50 px-4 py-3 border-b">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-semibold text-gray-900">
                      GET /api-docs
                    </span>
                    <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">
                      PUBLIC
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-3">
                    Interactive API documentation
                  </p>
                  <code className="block text-sm bg-gray-800 text-gray-100 p-3 rounded mb-2">
                    {projectURLs.apiDocs}
                  </code>
                  <a
                    href={projectURLs.apiDocs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline text-sm"
                  >
                    View documentation →
                  </a>
                </div>
              </div>

              {/* Public Brain Query */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-green-50 px-4 py-3 border-b">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-semibold text-gray-900">
                      GET /api/public/brain/query
                    </span>
                    <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">
                      PUBLIC
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-3">
                    Query the knowledge base and get AI-powered answers with
                    sources
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
                          <th className="text-left py-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 font-mono">q</td>
                          <td className="py-2">string</td>
                          <td className="py-2">Yes</td>
                          <td className="py-2">The question to ask the AI</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      Example Request
                    </h4>
                    <code className="block text-sm bg-gray-800 text-gray-100 p-3 rounded mb-3">
                      curl -X GET "{projectURLs.publicAPI}
                      ?q=What+is+machine+learning?"
                    </code>

                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      Live Example
                    </h4>
                    <div className="flex gap-2">
                      <a
                        href={
                          projectURLs.publicAPI +
                          "?q=What+is+knowledge+management"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline text-sm"
                      >
                        What is knowledge management? →
                      </a>
                      <span className="text-gray-400">|</span>
                      <a
                        href={
                          projectURLs.publicAPI +
                          "?q=How+to+organize+information"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline text-sm"
                      >
                        How to organize information? →
                      </a>
                    </div>
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
                            "summary": "Basic concepts of machine learning...",
                            "relevance": 0.95
                            }
                        ],
                        "timestamp": "2024-01-01T00:00:00.000Z",
                        "processingTime": "1.2s"
                        }`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Protected Endpoints (Require Authentication)
            </h3>
            <p className="text-gray-600 mb-4">
              These endpoints require JWT token in Authorization header:{" "}
              <code className="bg-gray-100 px-1 rounded">
                Bearer {"<token>"}
              </code>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  method: "GET",
                  path: "/knowledge",
                  desc: "Get all knowledge items with pagination",
                },
                {
                  method: "POST",
                  path: "/knowledge",
                  desc: "Create new knowledge item",
                },
                {
                  method: "GET",
                  path: "/knowledge/:id",
                  desc: "Get specific knowledge item",
                },
                {
                  method: "PUT",
                  path: "/knowledge/:id",
                  desc: "Update knowledge item",
                },
                {
                  method: "DELETE",
                  path: "/knowledge/:id",
                  desc: "Delete knowledge item",
                },
                {
                  method: "GET",
                  path: "/knowledge/search",
                  desc: "Search knowledge items",
                },
                {
                  method: "POST",
                  path: "/ai/query",
                  desc: "Query AI with knowledge context",
                },
                {
                  method: "POST",
                  path: "/ai/process/:id",
                  desc: "Process knowledge item with AI",
                },
              ].map((endpoint, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div className="bg-blue-50 px-4 py-3 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded ${
                            endpoint.method === "GET"
                              ? "bg-blue-100 text-blue-800"
                              : endpoint.method === "POST"
                                ? "bg-green-100 text-green-800"
                                : endpoint.method === "PUT"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                          }`}
                        >
                          {endpoint.method}
                        </span>
                        <span className="font-mono text-sm font-semibold text-gray-900">
                          {endpoint.path}
                        </span>
                      </div>
                      <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">
                        PROTECTED
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-gray-600 text-sm">{endpoint.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Response Format
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Success Response
                </h4>
                <pre className="text-sm bg-gray-800 text-gray-100 p-3 rounded overflow-x-auto">
                  {`{
                    "success": true,
                    "data": { ... },
                    "message": "Operation completed successfully",
                    "timestamp": "2024-01-01T00:00:00.000Z"
                    }`}
                </pre>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Error Response
                </h4>
                <pre className="text-sm bg-gray-800 text-gray-100 p-3 rounded overflow-x-auto">
                  {`{
                    "success": false,
                    "error": "Error message here",
                    "code": "ERROR_CODE",
                    "timestamp": "2024-01-01T00:00:00.000Z"
                    }`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
