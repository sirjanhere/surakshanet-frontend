import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, MapPin } from 'lucide-react';

interface CrowdData {
  area: string;
  current: number;
  capacity: number;
  trend: 'up' | 'down' | 'stable';
  status: 'safe' | 'moderate' | 'high' | 'critical';
}

const CrowdDensityBar: React.FC = () => {
  const [crowdData, setCrowdData] = useState<CrowdData[]>([
    { area: 'Main Entrance', current: 45, capacity: 100, trend: 'stable', status: 'safe' },
    { area: 'Food Court', current: 78, capacity: 120, trend: 'up', status: 'moderate' },
    { area: 'Exhibition Hall A', current: 156, capacity: 200, trend: 'up', status: 'high' },
    { area: 'Parking Area', current: 89, capacity: 150, trend: 'down', status: 'moderate' },
    { area: 'Emergency Exit', current: 12, capacity: 50, trend: 'stable', status: 'safe' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCrowdData(prev => prev.map(area => ({
        ...area,
        current: Math.max(0, Math.min(area.capacity, 
          area.current + Math.floor(Math.random() * 10 - 5)
        ))
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-green-500';
      case 'moderate': return 'text-yellow-500';
      case 'high': return 'text-orange-500';
      case 'critical': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'safe': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatus = (current: number, capacity: number): CrowdData['status'] => {
    const percentage = (current / capacity) * 100;
    if (percentage < 50) return 'safe';
    if (percentage < 70) return 'moderate';
    if (percentage < 90) return 'high';
    return 'critical';
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="flex items-center gap-2 p-4 border-b border-gray-700">
        <Users className="text-blue-400" size={20} />
        <h3 className="text-white font-semibold">Crowd Density Monitor</h3>
      </div>
      <div className="p-4 space-y-4">
        {crowdData.map((area, index) => {
          const percentage = (area.current / area.capacity) * 100;
          const status = getStatus(area.current, area.capacity);
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-gray-400" />
                  <span className="text-white font-medium">{area.area}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp 
                    size={14} 
                    className={`${
                      area.trend === 'up' ? 'text-red-500 rotate-0' : 
                      area.trend === 'down' ? 'text-green-500 rotate-180' : 
                      'text-gray-400'
                    }`} 
                  />
                  <span className={`text-sm font-medium ${getStatusColor(status)}`}>
                    {area.current}/{area.capacity}
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(status)}`}
                  style={{ width: `${Math.min(100, percentage)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Occupancy: {percentage.toFixed(1)}%</span>
                <span className={`capitalize ${getStatusColor(status)}`}>
                  {status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CrowdDensityBar;