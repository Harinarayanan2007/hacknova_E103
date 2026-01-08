export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
            <div className="relative flex items-center justify-center">
                {/* Pulsing Green Glow */}
                <div className="absolute w-32 h-32 bg-primary/20 rounded-full animate-ping" />
                <div className="relative">
                    <svg
                        className="w-16 h-16 text-primary animate-pulse"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                    </svg>
                </div>
            </div>
            <p className="mt-8 text-lg font-medium text-primary animate-pulse">
                Initializing Growally...
            </p>
        </div>
    );
}
