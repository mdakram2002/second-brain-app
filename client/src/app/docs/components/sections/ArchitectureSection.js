import Card from "@/components/ui/Card";
import { Layers, Cloud, Monitor, Server, GitBranch, Database, Cpu, Shield, Globe, Terminal } from "lucide-react";
import { projectURLs } from "../../utils/constants";

export default function ArchitectureSection() {
  return (
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
                Current Deployment
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Cloud className="w-5 h-5 text-primary-600" />
                    <h4 className="font-semibold text-gray-900">Multi-Platform Deployment</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded border">
                      <div className="flex items-center gap-2 mb-2">
                        <Monitor className="w-4 h-4 text-blue-600" />
                        <h5 className="font-medium text-gray-900">Frontend (Vercel)</h5>
                      </div>
                      <p className="text-sm text-gray-600">Next.js 14 application with real-time dashboard</p>
                      <a href={projectURLs.frontend} className="text-sm text-primary-600 hover:underline mt-2 block">
                        {projectURLs.frontend}
                      </a>
                    </div>
                    <div className="p-4 bg-white rounded border">
                      <div className="flex items-center gap-2 mb-2">
                        <Server className="w-4 h-4 text-green-600" />
                        <h5 className="font-medium text-gray-900">Backend (Render)</h5>
                      </div>
                      <p className="text-sm text-gray-600">Node.js API with MongoDB & AI integration</p>
                      <a href={projectURLs.backend} className="text-sm text-primary-600 hover:underline mt-2 block">
                        {projectURLs.backend}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Portable Architecture Design
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: GitBranch,
                    title: "Frontend Layer",
                    description: "Modular React components, easily swappable with any React framework",
                    portable: "Can replace with Vue, Svelte, or any frontend framework"
                  },
                  {
                    icon: Database,
                    title: "Data Layer",
                    description: "MongoDB with Mongoose ODM, abstracted data models",
                    portable: "Swap with PostgreSQL, MySQL, Firebase, or any database"
                  },
                  {
                    icon: Cpu,
                    title: "AI Layer",
                    description: "Google Gemini API integration with abstracted AI service",
                    portable: "Replace with OpenAI, Anthropic Claude, or any LLM provider"
                  },
                  {
                    icon: Shield,
                    title: "Auth Layer",
                    description: "JWT-based authentication with role management",
                    portable: "Swap with OAuth, SSO, or any auth provider"
                  }
                ].map((layer, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary-100 rounded-lg">
                        <layer.icon className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{layer.title}</h4>
                        <p className="text-sm text-gray-600">{layer.description}</p>
                      </div>
                    </div>
                    <div className="pl-11">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">Portability:</span>
                        <span className="text-primary-600 font-medium">{layer.portable}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Infrastructure Services
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-5 h-5 text-primary-600" />
                    <h4 className="font-semibold text-gray-900">Public API Endpoint</h4>
                  </div>
                  <code className="block text-sm bg-gray-800 text-gray-100 p-3 rounded mb-2">
                    {projectURLs.publicAPI}?q=your+question
                  </code>
                  <p className="text-sm text-gray-600">
                    Publicly accessible AI-powered query endpoint that returns answers with sources
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal className="w-5 h-5 text-primary-600" />
                    <h4 className="font-semibold text-gray-900">Health Monitoring</h4>
                  </div>
                  <code className="block text-sm bg-gray-800 text-gray-100 p-3 rounded mb-2">
                    {projectURLs.healthCheck}
                  </code>
                  <p className="text-sm text-gray-600">
                    System health check endpoint showing API status, database connection, and uptime
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Architecture Principles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Separation of Concerns</h4>
                  <p className="text-blue-700 text-sm">
                    Clear separation between frontend, backend, AI, and data layers for easy maintenance and updates.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">API-First Design</h4>
                  <p className="text-green-700 text-sm">
                    All functionality exposed via REST API, enabling multiple clients and integrations.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Scalability</h4>
                  <p className="text-purple-700 text-sm">
                    Stateless services and connection pooling for horizontal scaling capability.
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Security by Design</h4>
                  <p className="text-yellow-700 text-sm">
                    Built-in security measures: CORS, rate limiting, input validation, and JWT authentication.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Data Flow Diagram
              </h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="p-3 bg-blue-100 rounded-lg inline-block mb-2">
                        <Monitor className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-sm font-medium text-gray-900">Frontend (Vercel)</p>
                      <p className="text-xs text-gray-500">User Interface</p>
                    </div>
                    <div className="text-gray-400">→</div>
                    <div className="text-center">
                      <div className="p-3 bg-green-100 rounded-lg inline-block mb-2">
                        <Server className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="text-sm font-medium text-gray-900">Backend API</p>
                      <p className="text-xs text-gray-500">Express.js Server</p>
                    </div>
                    <div className="text-gray-400">→</div>
                    <div className="text-center">
                      <div className="p-3 bg-purple-100 rounded-lg inline-block mb-2">
                        <Database className="w-6 h-6 text-purple-600" />
                      </div>
                      <p className="text-sm font-medium text-gray-900">Database</p>
                      <p className="text-xs text-gray-500">MongoDB Atlas</p>
                    </div>
                    <div className="text-gray-400">↔</div>
                    <div className="text-center">
                      <div className="p-3 bg-red-100 rounded-lg inline-block mb-2">
                        <Cpu className="w-6 h-6 text-red-600" />
                      </div>
                      <p className="text-sm font-medium text-gray-900">AI Service</p>
                      <p className="text-xs text-gray-500">Google Gemini</p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 text-center">
                    <p>HTTP/HTTPS requests flow from frontend to backend, which processes data with MongoDB and AI services</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Technology Stack
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Layer</th>
                      <th className="text-left py-2">Technology</th>
                      <th className="text-left py-2">Purpose</th>
                      <th className="text-left py-2">Alternatives</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 font-medium">Frontend</td>
                      <td className="py-3">Next.js 14, React, Tailwind CSS</td>
                      <td className="py-3">User interface with server-side rendering</td>
                      <td className="py-3">Vue.js, SvelteKit, Angular</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 font-medium">Backend</td>
                      <td className="py-3">Node.js, Express.js</td>
                      <td className="py-3">API server and business logic</td>
                      <td className="py-3">FastAPI (Python), Spring Boot (Java)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 font-medium">Database</td>
                      <td className="py-3">MongoDB, Mongoose ODM</td>
                      <td className="py-3">NoSQL data storage</td>
                      <td className="py-3">PostgreSQL, MySQL, Firebase</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 font-medium">AI</td>
                      <td className="py-3">Google Gemini API</td>
                      <td className="py-3">Natural language processing</td>
                      <td className="py-3">OpenAI GPT, Anthropic Claude</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 font-medium">Deployment</td>
                      <td className="py-3">Vercel, Render, MongoDB Atlas</td>
                      <td className="py-3">Cloud hosting and database</td>
                      <td className="py-3">AWS, Azure, GCP, Railway</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Performance Characteristics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Response Time</h4>
                  <p className="text-2xl font-bold text-primary-600 mb-1">&lt; 200ms</p>
                  <p className="text-sm text-gray-600">For static API endpoints</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">AI Processing</h4>
                  <p className="text-2xl font-bold text-primary-600 mb-1">1-3s</p>
                  <p className="text-sm text-gray-600">For AI-powered queries</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Concurrent Users</h4>
                  <p className="text-2xl font-bold text-primary-600 mb-1">100+</p>
                  <p className="text-sm text-gray-600">Simultaneous connections</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Key Design Decisions
              </h3>
              <div className="space-y-3">
                {[
                  {
                    decision: "Microservices Architecture",
                    reason: "Allows independent scaling of frontend, backend, and AI components",
                    impact: "Improved resilience and deployment flexibility"
                  },
                  {
                    decision: "Abstracted AI Layer",
                    reason: "Decouples AI provider from application logic",
                    impact: "Easy to switch between different AI providers"
                  },
                  {
                    decision: "JWT Authentication",
                    reason: "Stateless authentication suitable for REST APIs",
                    impact: "Scalable and works well with mobile/web clients"
                  },
                  {
                    decision: "MongoDB for Flexibility",
                    reason: "Schema-less design accommodates diverse knowledge types",
                    impact: "Easy to add new knowledge formats without migrations"
                  }
                ].map((item, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary-100 rounded-lg">
                        <span className="font-bold text-primary-600">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.decision}</h4>
                        <p className="text-gray-600 text-sm mb-1"><strong>Reason:</strong> {item.reason}</p>
                        <p className="text-gray-600 text-sm"><strong>Impact:</strong> {item.impact}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}