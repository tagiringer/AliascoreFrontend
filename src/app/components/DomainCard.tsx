import { ChevronRight } from 'lucide-react';

export interface DomainData {
  id: string;
  name: string;
  icon: string;
  platform: string;
  username: string;
  peakRating?: number;
  currentRating?: number;
  gamesPlayed: number;
  rankTier?: string;
  bgGradient: string;
  externalLink?: string;
}

interface DomainCardProps {
  domain: DomainData;
  onClick: () => void;
}

export function DomainCard({ domain, onClick }: DomainCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-6 rounded-2xl text-white text-left relative overflow-hidden group hover:scale-[1.02] transition-transform ${domain.bgGradient}`}
    >
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{domain.icon}</div>
            <div>
              <h3 className="font-semibold">{domain.name}</h3>
              <p className="text-sm text-white/80">{domain.platform}</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">
              {domain.currentRating || '—'}
            </span>
            {domain.rankTier && (
              <span className="text-sm bg-white/20 px-2 py-0.5 rounded-full">
                {domain.rankTier}
              </span>
            )}
          </div>
          <div className="flex gap-4 text-sm text-white/80">
            <span>@{domain.username}</span>
            <span>•</span>
            <span>{domain.gamesPlayed} games</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}
