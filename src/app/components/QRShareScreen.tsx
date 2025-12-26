import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import type { DomainData } from '../types/domain';

interface QRShareScreenProps {
  domain: DomainData;
  displayName: string;
  onBack: () => void;
}

export function QRShareScreen({ domain, displayName, onBack }: QRShareScreenProps) {
  const shareUrl = `https://aliascore.app/share/${displayName.toLowerCase()}/${domain.id}`;

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto">
      <div className="p-6">
        <button
          onClick={onBack}
          className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      <div className="px-6 flex flex-col items-center">
        <div className="mb-8 text-center">
          <h1 className="text-2xl mb-2">Share Your Profile</h1>
          <p className="text-gray-600">
            Scan to view {displayName}'s {domain.name} profile
          </p>
        </div>

        {/* QR Code Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm">
          <div className={`${domain.bgGradient} rounded-2xl p-6 mb-6`}>
            <div className="flex items-center gap-3 text-white mb-4">
              <div className="text-3xl">{domain.icon}</div>
              <div>
                <p className="font-semibold">{domain.name}</p>
                <p className="text-sm text-white/80">{domain.profiles.length} platform{domain.profiles.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl flex items-center justify-center">
              <QRCodeSVG
                value={shareUrl}
                size={200}
                level="H"
              />
            </div>
          </div>

          <div className="text-center mb-4">
            <p className="text-sm text-gray-600">Profile Link</p>
            <p className="text-xs text-gray-400 mt-1 break-all">{shareUrl}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 w-full max-w-sm space-y-3">
          <button className="w-full bg-purple-600 text-white py-4 rounded-2xl font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
            <Share2 className="w-5 h-5" />
            Share Link
          </button>
          <button className="w-full bg-white text-gray-700 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
            <Download className="w-5 h-5" />
            Download QR Code
          </button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-2xl w-full max-w-sm">
          <p className="text-xs text-blue-800 text-center">
            <strong>NFC Sharing</strong> is coming soon! Tap to share your profile instantly.
          </p>
        </div>
      </div>
    </div>
  );
}