import { User, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface OnboardingScreenProps {
  onComplete: (displayName: string) => void;
  onBack: () => void;
}

export function OnboardingScreen({ onComplete, onBack }: OnboardingScreenProps) {
  const [displayName, setDisplayName] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleNameChange = (value: string) => {
    setDisplayName(value);
    setIsValid(value.length >= 3 && value.length <= 30);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 max-w-md mx-auto">
      <div className="p-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-8">
          <User className="w-12 h-12 text-white" />
        </div>

        <h2 className="text-2xl mb-2 text-gray-900">Choose Your Display Name</h2>
        <p className="text-gray-600 text-center mb-8">
          This is how other gamers will see you
        </p>

        <div className="w-full max-w-sm">
          <input
            type="text"
            value={displayName}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Display Name"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 outline-none"
            maxLength={30}
          />
          <p className="text-xs text-gray-500 mt-2">
            3-30 characters, alphanumeric + spaces
          </p>
        </div>
      </div>

      <div className="p-8">
        <button
          onClick={() => isValid && onComplete(displayName)}
          disabled={!isValid}
          className={`w-full py-4 rounded-2xl font-semibold transition-all ${
            isValid
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
