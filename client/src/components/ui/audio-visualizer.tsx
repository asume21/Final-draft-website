import { cn } from "@/lib/utils";

interface AudioVisualizerProps {
  className?: string;
  isPlaying?: boolean;
  data?: number[];
}

export function AudioVisualizer({ 
  className, 
  isPlaying = false, 
  data = [] 
}: AudioVisualizerProps) {
  // Simplified stable version - no canvas manipulation that causes crashes
  return (
    <div className={cn("flex items-center justify-center bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4", className)}>
      <div className="flex space-x-1 items-end">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`w-1 bg-gradient-to-t from-purple-400 to-pink-400 rounded-full transition-all duration-300 ${
              isPlaying ? 'animate-pulse' : ''
            }`}
            style={{ 
              height: isPlaying ? `${20 + Math.sin(Date.now() * 0.005 + i) * 15}px` : '8px' 
            }}
          />
        ))}
      </div>
      <div className="ml-4 text-purple-400 text-sm">
        {isPlaying ? '🎵 Playing' : '⏸ Paused'}
      </div>
    </div>
  );
}