
import Card from "@/components/ui/Card";
import * as LucideIcons from "lucide-react";
import { sections } from "../utils/constants";

export default function DocsSidebar({ activeSection, setActiveSection }) {
  return (
    <div className="lg:col-span-1">
      <Card className="sticky top-6">
        <nav className="space-y-1 p-4">
          {sections.map((section) => {
            const Icon = LucideIcons[section.icon];
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
  );
}