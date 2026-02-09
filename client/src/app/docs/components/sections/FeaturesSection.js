
import Card from "@/components/ui/Card";
import { Zap, Brain, Cpu, Search, Shield, Globe, BarChart, Smartphone, Wifi } from "lucide-react";

export default function FeaturesSection() {
  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-6 h-6 text-primary-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            Features
          </h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Core Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  icon: Brain,
                  title: "Smart Knowledge Capture",
                  description: "Capture notes, links, and insights with AI-powered auto-tagging and categorization",
                  color: "primary"
                },
                {
                  icon: Cpu,
                  title: "AI-Powered Processing",
                  description: "Automatic summarization, intelligent categorization, and content analysis",
                  color: "secondary"
                },
                {
                  icon: Search,
                  title: "Advanced Search",
                  description: "Semantic search across all knowledge items with relevance scoring",
                  color: "blue"
                },
                {
                  icon: Shield,
                  title: "Secure Storage",
                  description: "End-to-end encryption and secure access controls for your knowledge",
                  color: "green"
                },
                {
                  icon: Globe,
                  title: "Public API Access",
                  description: "Access your knowledge from anywhere via REST API endpoints",
                  color: "purple"
                },
                {
                  icon: BarChart,
                  title: "Analytics Dashboard",
                  description: "Track knowledge growth, usage patterns, and insights generation",
                  color: "yellow"
                },
              ].map((feature, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-${feature.color}-100`}>
                      <feature.icon className={`w-5 h-5 text-${feature.color}-600`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Advanced Features
            </h3>
            <div className="space-y-4">
              {[
                {
                  title: "Multi-Format Support",
                  features: ["Text notes", "Web links", "PDF documents", "Images with OCR", "Code snippets"]
                },
                {
                  title: "Collaboration Tools",
                  features: ["Shared knowledge spaces", "Team annotations", "Comment threads", "Version history"]
                },
                {
                  title: "Integration Capabilities",
                  features: ["Browser extension", "Mobile app", "API webhooks", "Zapier integration", "Slack bot"]
                },
                {
                  title: "Automation Features",
                  features: ["Scheduled processing", "Auto-archiving", "Duplicate detection", "Content recommendations"]
                }
              ].map((category, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">{category.title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.features.map((feature, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-gray-700">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Mobile Experience
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Smartphone className="w-5 h-5 text-primary-600" />
                  <h4 className="font-semibold text-gray-900">Responsive Design</h4>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                    <span>Fully responsive dashboard</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                    <span>Touch-optimized interface</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                    <span>Offline capabilities</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                    <span>Mobile browser support</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Wifi className="w-5 h-5 text-primary-600" />
                  <h4 className="font-semibold text-gray-900">Cross-Platform Sync</h4>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                    <span>Real-time synchronization</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                    <span>Conflict resolution</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                    <span>Selective sync options</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                    <span>Bandwidth optimization</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Security Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Data Protection</h4>
                <ul className="space-y-1 text-blue-700 text-sm">
                  <li>• End-to-end encryption</li>
                  <li>• Secure data storage</li>
                  <li>• Regular backups</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Access Control</h4>
                <ul className="space-y-1 text-green-700 text-sm">
                  <li>• JWT authentication</li>
                  <li>• Role-based permissions</li>
                  <li>• Session management</li>
                </ul>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Network Security</h4>
                <ul className="space-y-1 text-purple-700 text-sm">
                  <li>• HTTPS enforcement</li>
                  <li>• CORS protection</li>
                  <li>• Rate limiting</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}