
import Card from "@/components/ui/Card";
import { Cpu, Zap, GitBranch, Download, Layers, Lightbulb, ShieldCheck } from "lucide-react";

export default function AiSection() {
  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Cpu className="w-6 h-6 text-primary-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            AI Integration
          </h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Google Gemini AI Integration
            </h3>
            <p className="text-gray-600 mb-4">
              The system uses Google's Gemini AI for intelligent knowledge processing,
              summarization, and automated tagging. The AI layer is abstracted for easy
              replacement with other LLM providers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">AI Capabilities</h4>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-start">
                    <Zap className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                    <span>Automatic summarization of content</span>
                  </li>
                  <li className="flex items-start">
                    <Zap className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                    <span>Intelligent tagging and categorization</span>
                  </li>
                  <li className="flex items-start">
                    <Zap className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                    <span>Natural language query answering</span>
                  </li>
                  <li className="flex items-start">
                    <Zap className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                    <span>Content analysis and insights generation</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Portability Features</h4>
                <ul className="space-y-2 text-green-700">
                  <li className="flex items-start">
                    <GitBranch className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                    <span>Abstracted AI service layer</span>
                  </li>
                  <li className="flex items-start">
                    <GitBranch className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                    <span>Easy switch to OpenAI, Claude, or others</span>
                  </li>
                  <li className="flex items-start">
                    <GitBranch className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                    <span>Configurable AI parameters</span>
                  </li>
                  <li className="flex items-start">
                    <GitBranch className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                    <span>Rate limiting and error handling</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Agent-Based Architecture
            </h3>
            <p className="text-gray-600 mb-4">
              The system implements autonomous AI agents that continuously process and
              improve knowledge quality without manual intervention.
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "Capture Agent",
                  description: "Automatically processes new knowledge items, extracts key information and assigns initial tags",
                  icon: Download
                },
                {
                  title: "Organization Agent",
                  description: "Continuously reorganizes knowledge based on usage patterns and semantic relationships",
                  icon: Layers
                },
                {
                  title: "Insight Agent",
                  description: "Identifies patterns and connections between different knowledge items",
                  icon: Lightbulb
                },
                {
                  title: "Quality Agent",
                  description: "Monitors knowledge quality and suggests improvements or flag outdated information",
                  icon: ShieldCheck
                }
              ].map((agent, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <agent.icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">{agent.title}</h4>
                  </div>
                  <p className="text-gray-600 text-sm pl-11">{agent.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Real-Time AI Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Live Chat Interface</h4>
                <p className="text-gray-600 text-sm mb-3">
                  Interactive chat interface that provides AI-powered answers based on your knowledge base
                </p>
                <div className="text-xs text-gray-500">
                  <span className="font-medium">Location:</span> Dashboard → Right sidebar
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Auto-Processing</h4>
                <p className="text-gray-600 text-sm mb-3">
                  All new knowledge items are automatically processed by AI for summarization and tagging
                </p>
                <div className="text-xs text-gray-500">
                  <span className="font-medium">Trigger:</span> On every new knowledge creation
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              AI Configuration Options
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Parameter</th>
                    <th className="text-left py-2">Default Value</th>
                    <th className="text-left py-2">Description</th>
                    <th className="text-left py-2">Impact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-mono">temperature</td>
                    <td className="py-2">0.7</td>
                    <td className="py-2">Controls randomness of responses</td>
                    <td className="py-2">Higher = more creative, Lower = more focused</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-mono">maxTokens</td>
                    <td className="py-2">1000</td>
                    <td className="py-2">Maximum response length</td>
                    <td className="py-2">Affects response completeness</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-mono">topP</td>
                    <td className="py-2">0.9</td>
                    <td className="py-2">Nucleus sampling parameter</td>
                    <td className="py-2">Controls response diversity</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-mono">topK</td>
                    <td className="py-2">40</td>
                    <td className="py-2">Top-k sampling parameter</td>
                    <td className="py-2">Limits token selection pool</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}