import React, { useState } from 'react';
import { Shield, Lock, Unlock, Power, Settings, AlertTriangle, Zap } from 'lucide-react';

const ControlPanel: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState({
    mainPower: true,
    emergencyLights: false,
    lockdown: false,
    alarmSystem: true,
    ventilation: true,
    backup: false
  });

  const toggleSystem = (system: keyof typeof systemStatus) => {
    setSystemStatus(prev => ({
      ...prev,
      [system]: !prev[system]
    }));
  };

  const initiateEmergency = () => {
    setSystemStatus(prev => ({
      ...prev,
      lockdown: true,
      emergencyLights: true,
      alarmSystem: true,
      backup: true
    }));
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="flex items-center gap-2 p-4 border-b border-gray-700">
        <Shield className="text-blue-400" size={20} />
        <h3 className="text-white font-semibold">Security Control Panel</h3>
      </div>
      <div className="p-4 space-y-4">
        {/* Main Controls */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => toggleSystem('mainPower')}
            className={`p-3 rounded-lg border transition-all ${
              systemStatus.mainPower 
                ? 'bg-green-900 border-green-600 text-green-300' 
                : 'bg-red-900 border-red-600 text-red-300'
            }`}
          >
            <Power className="mx-auto mb-2" size={20} />
            <div className="text-sm font-medium">Main Power</div>
            <div className="text-xs">{systemStatus.mainPower ? 'Online' : 'Offline'}</div>
          </button>

          <button
            onClick={() => toggleSystem('lockdown')}
            className={`p-3 rounded-lg border transition-all ${
              systemStatus.lockdown 
                ? 'bg-red-900 border-red-600 text-red-300' 
                : 'bg-gray-700 border-gray-600 text-gray-300'
            }`}
          >
            {systemStatus.lockdown ? <Lock className="mx-auto mb-2" size={20} /> : <Unlock className="mx-auto mb-2" size={20} />}
            <div className="text-sm font-medium">Lockdown</div>
            <div className="text-xs">{systemStatus.lockdown ? 'Active' : 'Inactive'}</div>
          </button>

          <button
            onClick={() => toggleSystem('alarmSystem')}
            className={`p-3 rounded-lg border transition-all ${
              systemStatus.alarmSystem 
                ? 'bg-green-900 border-green-600 text-green-300' 
                : 'bg-gray-700 border-gray-600 text-gray-300'
            }`}
          >
            <AlertTriangle className="mx-auto mb-2" size={20} />
            <div className="text-sm font-medium">Alarm System</div>
            <div className="text-xs">{systemStatus.alarmSystem ? 'Armed' : 'Disarmed'}</div>
          </button>

          <button
            onClick={() => toggleSystem('emergencyLights')}
            className={`p-3 rounded-lg border transition-all ${
              systemStatus.emergencyLights 
                ? 'bg-yellow-900 border-yellow-600 text-yellow-300' 
                : 'bg-gray-700 border-gray-600 text-gray-300'
            }`}
          >
            <Zap className="mx-auto mb-2" size={20} />
            <div className="text-sm font-medium">Emergency Lights</div>
            <div className="text-xs">{systemStatus.emergencyLights ? 'On' : 'Off'}</div>
          </button>
        </div>

        {/* Emergency Button */}
        <button
          onClick={initiateEmergency}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors border-2 border-red-500"
        >
          <AlertTriangle className="inline mr-2" size={20} />
          EMERGENCY PROTOCOL
        </button>

        {/* System Settings */}
        <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
          <Settings size={16} />
          Advanced Settings
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;