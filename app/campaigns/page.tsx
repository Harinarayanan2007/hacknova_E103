import React from 'react';
import Link from 'next/link';
import { CampaignCard, Campaign } from '@/components/CampaignCard';

// Mock Data
const CAMPAIGNS: Campaign[] = [
    {
        id: '1',
        title: "Eco-Friendly Packaging Expansion",
        description: "Help 'GreenLeaf Organics' switch to 100% biodegradable packaging for our farm-to-table delivery service.",
        target: "$5,000",
        raised: "$3,200",
        progress: 64,
        tags: ["Sustainability", "Agriculture"],
        imageUrl: "https://placehold.co/600x400/0b3d1d/00dc82/png?text=Eco+Agro",
        author: "Sarah Jenkins"
    },
    {
        id: '2',
        title: "Community Coding Bootcamp for Kids",
        description: "Funding needed to rent a local hall and buy 10 Raspberry Pis for our weekend coding workshops.",
        target: "$2,500",
        raised: "$850",
        progress: 34,
        tags: ["Education", "Tech"],
        imageUrl: "https://placehold.co/600x400/1a1a2e/40a2e3/png?text=Code+Kids",
        author: "TechStart NGO"
    },
    {
        id: '3',
        title: "Artisan Bakery Equipment Upgrade",
        description: "We need a new industrial mixer to keep up with demand for our famous sourdough bread.",
        target: "$8,000",
        raised: "$7,600",
        progress: 95,
        tags: ["Food & Bev", "Small Biz"],
        imageUrl: "https://placehold.co/600x400/3e2723/d7ccc8/png?text=Bakery",
        author: "The Crusty Loaf"
    },
    {
        id: '4',
        title: "Urban Garden Project",
        description: "Turning the empty lot on 5th Street into a community vegetable garden.",
        target: "$1,200",
        raised: "$300",
        progress: 25,
        tags: ["Community", "Green"],
        imageUrl: "https://placehold.co/600x400/2e7d32/a5d6a7/png?text=Urban+Garden",
        author: "City Green"
    }
];

export default function CampaignsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            {/* Header */}
            <header className="p-6 border-b border-gray-800 flex justify-between items-center bg-black/50 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_10px_#00dc82]"></div>
                    <Link href="/" className="text-xl font-bold tracking-tight">GROWALLY <span className="text-gray-600">/ CAMPAIGNS</span></Link>
                </div>
                <div className="flex gap-4">
                    <Link href="/assistant" className="text-sm text-gray-400 hover:text-primary transition-colors">Chat Agent</Link>
                    <Link href="/campaigns/create" className="text-sm bg-primary text-black px-4 py-2 rounded font-bold hover:bg-green-400 transition-colors">
                        + Start Campaign
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="py-16 px-6 text-center border-b border-gray-900 bg-gradient-to-b from-black to-[#0a0a0a]">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                    Fuel Your Growth.
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
                    Connect with investors, find partners, and rally your community to fund your next big step.
                </p>

                {/* Search Mock */}
                <div className="max-w-md mx-auto relative">
                    <input
                        type="text"
                        placeholder="Search campaigns..."
                        className="w-full bg-[#1a1a1a] border border-gray-800 rounded-full px-6 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                    />
                    <button className="absolute right-2 top-2 bg-gray-800 p-1.5 rounded-full text-gray-400 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>
            </section>

            {/* Campaign Grid */}
            <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">Trending Campaigns</h2>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 text-sm border border-primary text-primary rounded-full bg-primary/10">All</button>
                        <button className="px-3 py-1 text-sm border border-gray-700 text-gray-400 rounded-full hover:border-gray-500">Tech</button>
                        <button className="px-3 py-1 text-sm border border-gray-700 text-gray-400 rounded-full hover:border-gray-500">Local</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {CAMPAIGNS.map(campaign => (
                        <CampaignCard key={campaign.id} campaign={campaign} />
                    ))}
                </div>
            </main>
        </div>
    );
}
