"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Brain,
  Sparkles,
  Search,
  Zap,
  Tag,
  Globe,
  ChevronRight,
  Shield,
  Cpu,
} from "lucide-react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Smart Capture",
      description:
        "Capture notes, links, and insights with intelligent auto-tagging",
      color: "primary",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI Processing",
      description: "Automatic summarization and intelligent categorization",
      color: "secondary",
    },
    {
      icon: <Tag className="w-6 h-6" />,
      title: "Organize",
      description: "Flexible tagging and metadata system",
      color: "primary",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Public API",
      description: "Access your knowledge from anywhere via API",
      color: "secondary",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure",
      description: "End-to-end encryption for your knowledge",
      color: "primary",
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Fast",
      description: "Lightning fast search and retrieval",
      color: "secondary",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-linear-to-br from-primary-50 via-white to-secondary-50"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-10 w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply blur-3xl opacity-20"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-300 rounded-full mix-blend-multiply blur-3xl opacity-20"
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <Brain className="w-8 h-8 text-primary-600" />
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-secondary-500" />
            </motion.div>
            <span className="text-2xl font-bold text-gradient">
              SecondBrain
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/docs"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Docs
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <span>Launch App</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center p-3 bg-gradient-primary rounded-2xl mb-8"
            >
              <Brain className="w-8 h-8 text-white" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Your <span className="text-gradient">Second Brain</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              An AI-powered knowledge management system that captures,
              organizes, and intelligently surfaces your accumulated knowledge.
              Think of it as infrastructure for thought.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <Link href="/dashboard">
                <button className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg">
                  Get Started Free
                </button>
              </Link>
              <Link href="/docs">
                <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg">
                  View Documentation
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Preview Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative mx-auto max-w-5xl"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-2 border border-gray-200">
              <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-xl h-64 md:h-96 flex items-center justify-center">
                <div className="text-center">
                  <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Interactive Dashboard Preview</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your knowledge efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 ${
                  feature.color === "primary"
                    ? "hover:border-primary-200"
                    : "hover:border-secondary-200"
                }`}
              >
                <div
                  className={`inline-flex p-3 rounded-xl mb-6 ${
                    feature.color === "primary"
                      ? "bg-primary-100 text-primary-600"
                      : "bg-secondary-100 text-secondary-600"
                  }`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-primary py-20">
          <div className="max-w-4xl mx-auto text-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Start Building Your Second Brain Today
              </h2>
              <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
                Join thousands of users who have transformed how they capture,
                organize, and retrieve knowledge.
              </p>
              <Link href="/dashboard">
                <button className="px-10 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg flex items-center justify-center mx-auto">
                  <Brain className="w-5 h-5 mr-2" />
                  Launch Dashboard
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <Brain className="w-6 h-6 text-primary-400" />
              <span className="text-lg font-semibold text-white">
                SecondBrain
              </span>
            </div>
            <div className="text-sm">
              <p>Built for the Altibbe/Hedamo Technical Assessment</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
