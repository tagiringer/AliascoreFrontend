import { ArrowLeft, Share2, Trophy } from 'lucide-react';
import type { DomainData } from '../types/domain';
import { ProfileStatsCard } from './ProfileStatsCard';

interface DomainProfileProps {
  domain: DomainData;
  onBack: () => void;
  onShare: () => void;
}

export function DomainProfile({ domain, onBack, onShare }: DomainProfileProps) {
  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto">
      {/* Header */}
      <div className={`${domain.bgGradient} text-white px-6 pt-6 pb-32`}>
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onShare}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center">
          <div className="text-6xl mb-4">{domain.icon}</div>
          <h1 className="text-2xl mb-1">{domain.name}</h1>
          <p className="text-white/80">{domain.profiles.length} platform{domain.profiles.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Platform Cards */}
      <div className="px-6 -mt-24 space-y-4">
        {domain.profiles.map((profile) => (
          <ProfileStatsCard
            key={profile.id}
            platformName={profile.platformName}
            username={profile.username}
            currentRating={profile.currentRating}
            peakRating={profile.peakRating}
            gamesPlayed={profile.gamesPlayed}
            rankTier={profile.rankTier}
            platformDetailLink={profile.externalLink}
          />
        ))}

        {/* Recent Achievements */}
        <div className="mt-6 bg-white rounded-3xl shadow-sm p-6">
          <h3 className="font-semibold mb-4">Recent Achievements</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Rating Milestone</p>
                <p className="text-xs text-gray-500">Reached 2000 rating</p>
              </div>
              <span className="text-xs text-gray-400">2d ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
