import { useState } from 'react';
import { ArrowLeft, Share2, Trophy, MoreVertical, Trash2 } from 'lucide-react';
import type { DomainData } from '../types/domain';
import { ProfileStatsCard } from './ProfileStatsCard';

interface DomainProfileProps {
  domain: DomainData;
  onBack: () => void;
  onShare: () => void;
  onUntrack: () => void;
}

export function DomainProfile({ domain, onBack, onShare, onUntrack }: DomainProfileProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showUntrackModal, setShowUntrackModal] = useState(false);

  const handleUntrack = () => {
    setShowUntrackModal(false);
    onUntrack();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowUntrackModal(false);
    }
  };

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

          <div className="flex gap-2">
            {/* Three-dot menu */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              >
                <MoreVertical className="w-5 h-5" />
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-20">
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        setShowUntrackModal(true);
                      }}
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Untrack Domain
                    </button>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={onShare}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
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

      {/* Untrack Confirmation Modal */}
      {showUntrackModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6"
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              {/* Warning Icon */}
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>

              {/* Domain Info */}
              <div className="text-4xl mb-2">{domain.icon}</div>
              <h3 className="text-xl font-semibold mb-2">Untrack {domain.name}?</h3>

              {/* Warning Text */}
              <p className="text-gray-600 text-sm">
                This will remove {domain.name} from your profile. You'll need to add it again if you
                want to track it in the future.
              </p>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleUntrack}
                className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
              >
                Untrack Domain
              </button>
              <button
                onClick={() => setShowUntrackModal(false)}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
