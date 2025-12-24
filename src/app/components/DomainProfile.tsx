import { ArrowLeft, Share2, Trophy, Medal, Star } from 'lucide-react';
import { DomainData } from './DomainCard';

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
          <p className="text-white/80">{domain.platform}</p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="px-6 -mt-24">
        <div className="bg-white rounded-3xl shadow-xl p-6">
          {/* Username */}
          <div className="text-center mb-6">
            <p className="text-gray-600 text-sm mb-1">Platform Username</p>
            <p className="text-xl">@{domain.username}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-purple-50 rounded-2xl p-4 text-center">
              <div className="flex justify-center mb-2">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl mb-1">{domain.currentRating || '—'}</p>
              <p className="text-sm text-gray-600">Current Rating</p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-4 text-center">
              <div className="flex justify-center mb-2">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl mb-1">{domain.peakRating || '—'}</p>
              <p className="text-sm text-gray-600">Peak Rating</p>
            </div>

            <div className="bg-green-50 rounded-2xl p-4 text-center">
              <div className="flex justify-center mb-2">
                <Medal className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl mb-1">{domain.gamesPlayed}</p>
              <p className="text-sm text-gray-600">Games Played</p>
            </div>

            <div className="bg-orange-50 rounded-2xl p-4 text-center">
              <div className="flex justify-center mb-2">
                <Trophy className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-2xl mb-1">{domain.rankTier || 'N/A'}</p>
              <p className="text-sm text-gray-600">Rank Tier</p>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-2xl font-semibold hover:opacity-90 transition-opacity">
            View Full Statistics
          </button>
        </div>

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
