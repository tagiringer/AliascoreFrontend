import { Plus, User, MapPin } from 'lucide-react';
import { DomainCard } from './DomainCard';
import type { DomainData } from '../types/domain';

interface DomainsDashboardProps {
  displayName: string;
  domains: DomainData[];
  onDomainClick: (domain: DomainData) => void;
  onProfileClick: () => void;
  onMapClick: () => void;
}

export function DomainsDashboard({
  displayName,
  domains,
  onDomainClick,
  onProfileClick,
  onMapClick,
}: DomainsDashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-8 max-w-md mx-auto">
      {/* Header */}
      <div className="bg-white px-6 py-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl">Hey, {displayName} 👋</h1>
            <p className="text-gray-600 text-sm mt-1">Your Gaming Identity</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onMapClick}
              className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <MapPin className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={onProfileClick}
              className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <User className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Domains */}
      <div className="px-6 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg">My Domains</h2>
          <button className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors">
            <Plus className="w-5 h-5" />
            <span className="text-sm">Add Domain</span>
          </button>
        </div>

        <div className="space-y-4">
          {domains.map((domain) => (
            <DomainCard
              key={domain.id}
              domain={domain}
              onClick={() => onDomainClick(domain)}
            />
          ))}

          {domains.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600">No domains yet</p>
              <p className="text-sm text-gray-500 mt-1">Add your first gaming profile</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
