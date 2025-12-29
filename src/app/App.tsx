import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { DomainsDashboard } from './components/DomainsDashboard';
import { DomainProfile } from './components/DomainProfile';
import { QRShareScreen } from './components/QRShareScreen';
import { EventsMap } from './components/EventsMap';
import { AddDomainScreen } from './components/AddDomainScreen';
import type { GameEvent } from './components/EventsMap';
import type { DomainData } from './types/domain';
import { GET_USER_DOMAINS, GET_USER_PLATFORMS } from '../graphql/queries';
import { transformUserDataToDomainDataArray } from '../graphql/transformers';

type Screen =
  | 'welcome'
  | 'onboarding'
  | 'dashboard'
  | 'domainProfile'
  | 'qrShare'
  | 'events'
  | 'addDomain';

// Hardcoded user ID from seed data (for now, just one user)
const TEST_USER_ID = 'cltest001user0000000000000';

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
  const [domains, setDomains] = useState<DomainData[]>([]);

  // Fetch user domains from backend
  const { data: domainsData, loading: domainsLoading } = useQuery(GET_USER_DOMAINS, {
    variables: { userId: TEST_USER_ID },
    skip: currentScreen === 'welcome' || currentScreen === 'onboarding',
  });

  // Fetch user platforms from backend
  const { data: platformsData, loading: platformsLoading } = useQuery(GET_USER_PLATFORMS, {
    variables: { userId: TEST_USER_ID },
    skip: currentScreen === 'welcome' || currentScreen === 'onboarding',
  });

  // Transform and update domains when data is loaded
  useEffect(() => {
    if (domainsData?.userDomains && platformsData?.userPlatforms) {
      const transformedDomains = transformUserDataToDomainDataArray(
        domainsData.userDomains,
        platformsData.userPlatforms
      );
      setDomains(transformedDomains);
    }
  }, [domainsData, platformsData]);

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

  const handleAddDomainClick = () => {
    setCurrentScreen('addDomain');
  };

  const handleAddDomain = (domain: DomainData) => {
    setDomains([...domains, domain]);
    setCurrentScreen('dashboard');
  };

  const handleUntrackDomain = (domainId: string) => {
    setDomains(domains.filter((d) => d.id !== domainId));
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
        <>
          {(domainsLoading || platformsLoading) ? (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading your domains...</p>
              </div>
            </div>
          ) : (
            <DomainsDashboard
              displayName={displayName}
              domains={domains}
              onDomainClick={handleDomainClick}
              onProfileClick={() => {}}
              onMapClick={() => setCurrentScreen('events')}
              onAddDomainClick={handleAddDomainClick}
            />
          )}
        </>
      )}

      {currentScreen === 'domainProfile' && selectedDomain && (
        <DomainProfile
          domain={selectedDomain}
          onBack={handleBackToDashboard}
          onShare={handleShareClick}
          onUntrack={() => handleUntrackDomain(selectedDomain.id)}
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

      {currentScreen === 'addDomain' && (
        <AddDomainScreen
          onComplete={handleAddDomain}
          onBack={handleBackToDashboard}
        />
      )}
    </div>
  );
}