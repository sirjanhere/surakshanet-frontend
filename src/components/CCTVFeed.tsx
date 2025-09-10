import { useState, useEffect } from 'react';
import { Camera, Play, Square, Maximize2, Settings, Wifi, WifiOff, AlertTriangle } from 'lucide-react';

interface CCTVFeedProps {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'maintenance';
}

const CCTVFeed: React.FC<CCTVFeedProps> = ({ id, name, location, status }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [motionDetected, setMotionDetected] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (status === 'online') {
      const motionInterval = setInterval(() => {
        setMotionDetected(Math.random() > 0.7);
      }, 3000);

      return () => clearInterval(motionInterval);
    }
  }, [status]);

  const getStatusColor = () => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'maintenance': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'online': return <Wifi size={16} className="text-green-400" />;
      case 'offline': return <WifiOff size={16} className="text-red-400" />;
      case 'maintenance': return <AlertTriangle size={16} className="text-yellow-400" />;
      default: return <WifiOff size={16} className="text-gray-400" />;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Camera className="text-blue-400" size={16} />
          <div>
            <h4 className="text-white font-medium text-sm">{name}</h4>
            <p className="text-gray-400 text-xs">{location}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
        </div>
      </div>

      {/* Video Feed Area */}
      <div className="relative aspect-video bg-gray-900">
        {status === 'online' ? (
          <>
            {/* Simulated Video Feed */}
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-center">
                <Camera className="text-gray-600 mx-auto mb-2" size={32} />
                <p className="text-gray-500 text-sm">Live Feed - Camera {id}</p>
              </div>
            </div>

            {/* Motion Detection Overlay */}
            {motionDetected && (
              <div className="absolute inset-0 border-2 border-red-500 animate-pulse">
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  MOTION DETECTED
                </div>
              </div>
            )}

            {/* Recording Indicator */}
            {isRecording && (
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-red-600 text-white text-xs px-2 py-1 rounded">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                REC
              </div>
            )}

            {/* Timestamp */}
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
              {currentTime.toLocaleTimeString()}
            </div>

            {/* Frame Rate */}
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
              30 FPS
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              {status === 'offline' ? (
                <>
                  <WifiOff className="text-red-400 mx-auto mb-2" size={32} />
                  <p className="text-red-400 text-sm">Camera Offline</p>
                </>
              ) : (
                <>
                  <AlertTriangle className="text-yellow-400 mx-auto mb-2" size={32} />
                  <p className="text-yellow-400 text-sm">Under Maintenance</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-3 flex items-center justify-between bg-gray-750">
        <div className="flex items-center gap-2">
          {status === 'online' && (
            <>
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`p-1.5 rounded transition-colors ${
                  isRecording 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                }`}
              >
                {isRecording ? <Square size={14} /> : <Play size={14} />}
              </button>
              <button className="p-1.5 bg-gray-600 text-gray-300 hover:bg-gray-500 rounded transition-colors">
                <Maximize2 size={14} />
              </button>
            </>
          )}
        </div>
        <button className="p-1.5 bg-gray-600 text-gray-300 hover:bg-gray-500 rounded transition-colors">
          <Settings size={14} />
        </button>
      </div>
    </div>
  );
};

export default CCTVFeed;