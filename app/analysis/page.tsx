"use client";

import Link from 'next/link';

export default function AnalysisPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-12 text-primary tracking-tight">
          Choose Your Path <span className="text-white">🚀</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* AI Assistant Card */}
          <Link href="/assistant" className="group relative block h-64">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(0,220,130,0.3)]"></div>
            <div className="relative h-full flex flex-col items-center justify-center p-6 text-center z-10">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-black transition-colors">
                <span className="text-3xl">🤖</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">AI Assistant</h2>
              <p className="text-gray-400 text-sm">Chat with your intelligent business advisor for growth strategies and content creation.</p>
            </div>
          </Link>

          {/* Community Card */}
          <Link href="/campaigns" className="group relative block h-64">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(0,220,130,0.3)]"></div>
            <div className="relative h-full flex flex-col items-center justify-center p-6 text-center z-10">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-black transition-colors">
                <span className="text-3xl">🌍</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">Community Hub</h2>
              <p className="text-gray-400 text-sm">Explore fundraising campaigns, find partners, and connect with other businesses.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
