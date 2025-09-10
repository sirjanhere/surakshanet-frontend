import React from 'react';
import { Shield, Activity, Clock } from 'lucide-react';
import CCTVFeed from './components/CCTVFeed';
import NotificationBar from './components/NotificationBar';
import CrowdDensityBar from './components/CrowdDensityBar';
import ControlPanel from './components/ControlPanel';
import ContactDirectory from './components/ContactDirectory';

function App() {
  const cameraFeeds = [
    { id: '1', name: 'Gate 1 - Main Entrance', location: 'Ground Floor', status: 'online' as const },
    { id: '2', name: 'Lobby Area', location: 'Ground Floor', status: 'online' as const },
    { id: '3', name: 'Parking Zone A', location: 'Basement', status: 'maintenance' as const },
    { id: '4', name: 'Emergency Exit', location: '1st Floor', status: 'online' as const },
    { id: '5', name: 'Server Room', location: '2nd Floor', status: 'offline' as const },
    { id: '6', name: 'Perimeter North', location: 'Exterior', status: 'online' as const }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">SurakshaNet</h1>
              <p className="text-sm text-gray-400">Security Monitoring Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-green-400">
              <Activity size={16} />
              <span className="text-sm font-medium">System Online</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock size={16} />
              <span className="text-sm">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <div className="p-6 space-y-6">
        {/* Top Row - CCTV Feeds */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
            Live CCTV Surveillance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cameraFeeds.map((feed) => (
              <CCTVFeed key={feed.id} {...feed} />
            ))}
          </div>
        </section>

        {/* Middle Row - Monitoring Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notifications */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-red-600 rounded-full"></div>
              Real-time Alerts
            </h2>
            <NotificationBar />
          </div>

          {/* Crowd Density */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-yellow-600 rounded-full"></div>
              Crowd Monitoring
            </h2>
            <CrowdDensityBar />
          </div>

          {/* Control Panel */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-green-600 rounded-full"></div>
              System Controls
            </h2>
            <ControlPanel />
          </div>
        </div>

        {/* Bottom Row - Contact Directory */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-purple-600 rounded-full"></div>
            Emergency Response Team
          </h2>
          <ContactDirectory />
        </section>
      </div>
    </div>
  );
}

export default App;