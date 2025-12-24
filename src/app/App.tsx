import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { DomainsDashboard } from './components/DomainsDashboard';
import { DomainProfile } from './components/DomainProfile';
import { QRShareScreen } from './components/QRShareScreen';
import { EventsMap } from './components/EventsMap';
import type { GameEvent } from './components/EventsMap';
import type { DomainData } from './components/DomainCard';

type Screen =
  | 'welcome'
  | 'onboarding'
  | 'dashboard'
  | 'domainProfile'
  | 'qrShare'
  | 'events';

// Mock data
const mockDomains: DomainData[] = [
  {
    id: '1',
    name: 'Chess.com',
    icon: '♟️',
    platform: 'Chess.com',
    username: 'tactical_genius',
    peakRating: 2156,
    currentRating: 2089,
    gamesPlayed: 1247,
    rankTier: 'Expert',
    bgGradient: 'bg-gradient-to-br from-amber-500 to-orange-600',
  },
  {
    id: '2',
    name: 'Valorant',
    icon: '🎯',
    platform: 'Riot Games',
    username: 'SpikeMaster',
    peakRating: 2834,
    currentRating: 2650,
    gamesPlayed: 892,
    rankTier: 'Immortal 2',
    bgGradient: 'bg-gradient-to-br from-red-500 to-pink-600',
  },
  {
    id: '3',
    name: 'Speedrun.com',
    icon: '⚡',
    platform: 'Speedrun.com',
    username: 'FastRunner99',
    peakRating: undefined,
    currentRating: undefined,
    gamesPlayed: 156,
    rankTier: '3rd Global',
    bgGradient: 'bg-gradient-to-br from-blue-500 to-cyan-600',
  },
];

const mockEvents: GameEvent[] = [
  {
    id: '1',
    name: 'Local Chess Tournament',
    domain: 'Chess',
    venue: 'Downtown Community Center',
    dateTime: '2025-12-28T14:00:00',
    attendees: 42,
    latitude: 37.7749,
    longitude: -122.4194,
  },
  {
    id: '2',
    name: 'Valorant LAN Party',
    domain: 'Valorant',
    venue: 'Esports Arena',
    dateTime: '2025-12-30T18:00:00',
    attendees: 128,
    latitude: 37.7849,
    longitude: -122.4094,
  },
  {
    id: '3',
    name: 'Speedrunning Meetup',
    domain: 'Speedrunning',
    venue: 'Game Cafe',
    dateTime: '2026-01-05T15:00:00',
    attendees: 23,
    latitude: 37.7649,
    longitude: -122.4294,
  },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [displayName, setDisplayName] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<DomainData | null>(null);

  const handleGetStarted = () => {
    setCurrentScreen('onboarding');
  };

  const handleOnboardingComplete = (name: string) => {
    setDisplayName(name);
    setCurrentScreen('dashboard');
  };

  const handleDomainClick = (domain: DomainData) => {
    setSelectedDomain(domain);
    setCurrentScreen('domainProfile');
  };

  const handleShareClick = () => {
    setCurrentScreen('qrShare');
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
    setSelectedDomain(null);
  };

  return (
    <div className="h-screen overflow-auto bg-white">
      {currentScreen === 'welcome' && (
        <WelcomeScreen onGetStarted={handleGetStarted} />
      )}

      {currentScreen === 'onboarding' && (
        <OnboardingScreen
          onComplete={handleOnboardingComplete}
          onBack={() => setCurrentScreen('welcome')}
        />
      )}

      {currentScreen === 'dashboard' && (
        <DomainsDashboard
          displayName={displayName}
          domains={mockDomains}
          onDomainClick={handleDomainClick}
          onProfileClick={() => {}}
          onMapClick={() => setCurrentScreen('events')}
        />
      )}

      {currentScreen === 'domainProfile' && selectedDomain && (
        <DomainProfile
          domain={selectedDomain}
          onBack={handleBackToDashboard}
          onShare={handleShareClick}
        />
      )}

      {currentScreen === 'qrShare' && selectedDomain && (
        <QRShareScreen
          domain={selectedDomain}
          displayName={displayName}
          onBack={() => setCurrentScreen('domainProfile')}
        />
      )}

      {currentScreen === 'events' && (
        <EventsMap
          events={mockEvents}
          onBack={handleBackToDashboard}
        />
      )}
    </div>
  );
}