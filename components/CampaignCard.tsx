import React from 'react';
import Link from 'next/link';

export type Campaign = {
    id: string;
    title: string;
    description: string;
    target: string;
    raised: string;
    progress: number;
    tags: string[];
    imageUrl: string;
    author: string;
};

interface CampaignCardProps {
    campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
    return (
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden hover:border-primary transition-colors duration-300 flex flex-col h-full">
            <div className="h-40 bg-gray-800 relative">
                <img
                    src={campaign.imageUrl}
                    alt={campaign.title}
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                />
                <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs font-mono text-primary border border-primary/30">
                    {campaign.tags[0]}
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <div className="mb-auto">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{campaign.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{campaign.description}</p>
                </div>

                <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1 font-mono">
                        <span>Progress</span>
                        <span>{campaign.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2 mb-4 overflow-hidden">
                        <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${campaign.progress}%` }}
                        ></div>
                    </div>

                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-xs text-gray-500">Raised / Target</p>
                            <p className="text-white font-mono text-sm">
                                <span className="text-primary">{campaign.raised}</span> / {campaign.target}
                            </p>
                        </div>
                        <Link
                            href={`/campaigns/${campaign.id}`}
                            className="px-4 py-2 bg-white text-black text-sm font-bold rounded hover:bg-gray-200 transition-colors"
                        >
                            Support
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
