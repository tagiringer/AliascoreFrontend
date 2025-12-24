import { ArrowLeft, MapPin, Calendar, Users } from 'lucide-react';

export interface GameEvent {
  id: string;
  name: string;
  domain: string;
  venue: string;
  dateTime: string;
  attendees: number;
  latitude: number;
  longitude: number;
}

interface EventsMapProps {
  events: GameEvent[];
  onBack: () => void;
}

export function EventsMap({ events, onBack }: EventsMapProps) {
  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto">
      {/* Header */}
      <div className="bg-white px-6 py-6 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div>
            <h1 className="text-2xl">Nearby Events</h1>
            <p className="text-sm text-gray-600">Local gaming tournaments & meetups</p>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="relative h-64 bg-gradient-to-br from-blue-100 to-purple-100 m-6 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-purple-600 mx-auto mb-2" />
            <p className="text-purple-900 font-medium">Interactive Map</p>
            <p className="text-sm text-purple-700">Showing {events.length} events nearby</p>
          </div>
        </div>
        {/* Event Pins */}
        {events.slice(0, 3).map((event, index) => (
          <div
            key={event.id}
            className="absolute w-8 h-8 bg-purple-600 rounded-full border-4 border-white shadow-lg"
            style={{
              left: `${30 + index * 20}%`,
              top: `${40 + index * 10}%`,
            }}
          />
        ))}
      </div>

      {/* Events List */}
      <div className="px-6">
        <h2 className="font-semibold mb-4">{events.length} Events Found</h2>
        <div className="space-y-3">
          {events.map((event) => (
            <button
              key={event.id}
              className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow text-left"
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1">{event.name}</h3>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(event.dateTime).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{event.venue}</p>
                  <span className="inline-block mt-2 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                    {event.domain}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
