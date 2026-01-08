"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreateCampaignPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Mock submission for now
        setTimeout(() => {
            setLoading(false);
            router.push('/campaigns');
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-6">
            <div className="w-full max-w-2xl">
                <Link href="/campaigns" className="text-gray-500 hover:text-primary mb-6 inline-block">← Back to Campaigns</Link>

                <h1 className="text-3xl font-bold mb-2">Create a New Campaign</h1>
                <p className="text-gray-400 mb-8">Tell the community about your goals and what support you need.</p>

                <form onSubmit={handleSubmit} className="bg-[#1a1a1a] border border-gray-800 p-8 rounded-xl space-y-6">

                    <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Campaign Title</label>
                        <input type="text" required placeholder="e.g. New Equipment for Local Bakery" className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-primary focus:outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">The Story</label>
                        <textarea rows={5} required placeholder="Why are you raising funds? What is the impact?" className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-primary focus:outline-none" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-300 mb-2">Target Amount ($)</label>
                            <input type="number" required placeholder="5000" className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-primary focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-300 mb-2">Category</label>
                            <select className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-primary focus:outline-none">
                                <option>Small Business</option>
                                <option>Tech Startup</option>
                                <option>Community Project</option>
                                <option>Education</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-black font-bold py-4 rounded-md hover:bg-green-400 transition-colors mt-4"
                    >
                        {loading ? 'Publishing...' : 'Publish Campaign'}
                    </button>
                </form>
            </div>
        </div>
    );
}
