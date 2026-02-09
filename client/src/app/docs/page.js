"use client";

import { useState } from "react";
import DocsHeader from "./components/DocsHeader";
import DocsSidebar from "./components/DocsSidebar";
import OverviewSection from "./components/sections/OverviewSection";
import ArchitectureSection from "./components/sections/ArchitectureSection";
import ApiSection from "./components/sections/ApiSection";
import AiSection from "./components/sections/AiSection";
import DeploymentSection from "./components/sections/DeploymentSection";
import FeaturesSection from "./components/sections/FeaturesSection";
import UsageSection from "./components/sections/UsageSection";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <DocsHeader />

        <div className="grid lg:grid-cols-4 gap-8">
          <DocsSidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />

          <div className="lg:col-span-3">
            {activeSection === "overview" && <OverviewSection />}
            {activeSection === "architecture" && <ArchitectureSection />}
            {activeSection === "api" && <ApiSection />}
            {activeSection === "ai" && <AiSection />}
            {activeSection === "deployment" && <DeploymentSection />}
            {activeSection === "features" && <FeaturesSection />}
            {activeSection === "usage" && <UsageSection />}
          </div>
        </div>
      </div>
    </div>
  );
}
