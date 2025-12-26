import { ChevronRight } from 'lucide-react';
import type { DomainData } from '../types/domain';

interface DomainCardProps {
  domain: DomainData;
  onClick: () => void;
}

export function DomainCard({ domain, onClick }: DomainCardProps) {
  const totalGames = domain.profiles.reduce((sum, profile) => sum + profile.gamesPlayed, 0);
  const highestRating = domain.profiles.reduce((max, profile) => {
    const rating = profile.currentRating || profile.peakRating || 0;
    return rating > max ? rating : max;
  }, 0);

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
              <p className="text-sm text-white/80">{domain.profiles.length} platform{domain.profiles.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
        </div>

        {/* Platform Mini Cards */}
        <div className="space-y-2 mb-3">
          {domain.profiles.map((profile) => (
            <div key={profile.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium">{profile.platformName}</p>
                  <p className="text-xs text-white/70">@{profile.username}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{profile.currentRating || profile.peakRating || '—'}</p>
                  {profile.rankTier && (
                    <p className="text-xs text-white/70">{profile.rankTier}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregated Stats */}
        <div className="flex gap-4 text-sm text-white/80 pt-2 border-t border-white/20">
          <span>Total: {totalGames} games</span>
          {highestRating > 0 && (
            <>
              <span>•</span>
              <span>Peak: {highestRating}</span>
            </>
          )}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}
