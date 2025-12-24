import { Gamepad } from 'lucide-react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  return (
    <div className="h-screen flex flex-col items-center justify-between p-8 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 text-white">
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-3xl flex items-center justify-center">
          <Gamepad className="w-12 h-12" />
        </div>
        <div className="text-center">
          <h1 className="text-4xl mb-3">AliasCore</h1>
          <p className="text-lg text-white/90 max-w-xs">
            Your Universal Gaming Identity
          </p>
        </div>
      </div>

      <div className="w-full max-w-sm space-y-4">
        <p className="text-center text-sm text-white/80 mb-6">
          Aggregate your achievements across Chess, Valorant, and more into one unified profile
        </p>
        
        <button
          onClick={onGetStarted}
          className="w-full bg-white text-purple-600 py-4 rounded-2xl font-semibold hover:bg-white/90 transition-colors"
        >
          Get Started with Google
        </button>
        
        <p className="text-xs text-center text-white/60">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
