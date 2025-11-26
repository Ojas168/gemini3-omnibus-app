import React, { useState, useEffect, useRef } from 'react';
import { REGIONS } from './constants';
import { Bus, Route, Region } from './types';
import { getPointOnPath, calculateDistance } from './utils/geo';
import BusMap from './components/BusMap';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';

const App: React.FC = () => {
  const [currentRegion, setCurrentRegion] = useState<Region>(REGIONS[0]);
  const [buses, setBuses] = useState<Bus[]>(REGIONS[0].buses);
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);

  // Handle Region Switching
  const handleRegionChange = (regionId: string) => {
      const newRegion = REGIONS.find(r => r.id === regionId);
      if (newRegion) {
          setCurrentRegion(newRegion);
          setBuses(newRegion.buses); // Reset buses to the new region's initial state
          setSelectedRouteId(null);
          setSelectedBus(null);
      }
  };

  // Simulation Loop
  const requestRef = useRef<number | undefined>(undefined);
  const previousTimeRef = useRef<number | undefined>(undefined);

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      setBuses(prevBuses => {
        return prevBuses.map(bus => {
          // If Stopped, don't move
          if (bus.status === 'Stopped') return bus;

          const route = currentRegion.routes.find(r => r.id === bus.routeId);
          if (!route) return bus;

          // 1. Move the bus
          // Adjust speed based on status
          const currentSpeed = bus.status === 'Delayed' ? bus.speed * 0.5 : bus.speed;
          
          let newProgress = bus.progress + currentSpeed;
          if (newProgress >= 1) {
            newProgress = 0;
          }

          // 2. Update Location
          const newLocation = getPointOnPath(route.path, newProgress);

          // 3. Calculate Next Stop & ETA
          const stopCount = route.stops.length;
          const segmentSize = 1 / Math.max(1, stopCount - 1); // avoids division by zero
          const currentLegIndex = Math.floor(newProgress / segmentSize);
          
          const nextStopIndex = (currentLegIndex + 1) % stopCount;
          const nextStop = route.stops[nextStopIndex];

          // Calculate Distance to next stop (km)
          const distToStop = calculateDistance(newLocation, nextStop.location);
          
          const simulatedSpeedKmPerMin = 0.5; // Arbitrary constant for demo physics
          const etaMinutes = (distToStop / simulatedSpeedKmPerMin);

          return {
            ...bus,
            progress: newProgress,
            currentLocation: newLocation,
            nextStopId: nextStop.id,
            etaNextStop: etaMinutes
          };
        });
      });
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [currentRegion]); // Re-run effect dependencies when region changes

  // Handler when a bus is clicked on the map
  const handleBusClick = (bus: Bus) => {
    setSelectedBus(bus);
    setSelectedRouteId(bus.routeId);
  };

  // Find the live version of selected bus for the sidebar
  const liveSelectedBus = selectedBus ? buses.find(b => b.id === selectedBus.id) || null : null;

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col md:flex-row">
      {/* Sidebar Overlay */}
      <Sidebar 
        regions={REGIONS}
        currentRegion={currentRegion}
        onSelectRegion={handleRegionChange}
        routes={currentRegion.routes} 
        buses={buses}
        selectedRouteId={selectedRouteId}
        onSelectRoute={setSelectedRouteId}
        selectedBus={liveSelectedBus}
        onCloseBusDetail={() => setSelectedBus(null)}
      />

      {/* Main Map Area */}
      <main className="flex-1 relative z-0">
        <BusMap 
          center={currentRegion.center}
          routes={currentRegion.routes}
          buses={buses}
          selectedRouteId={selectedRouteId}
          onBusClick={handleBusClick}
        />
      </main>

      {/* AI Chat Bot */}
      <ChatInterface buses={buses} routes={currentRegion.routes} />
    </div>
  );
};

export default App;