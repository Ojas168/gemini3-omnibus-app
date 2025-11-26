export interface Coordinate {
  lat: number;
  lng: number;
}

export interface BusStop {
  id: string;
  name: string;
  location: Coordinate;
}

export interface Route {
  id: string;
  name: string;
  color: string;
  path: Coordinate[];
  stops: BusStop[];
}

export interface Bus {
  id: string;
  routeId: string;
  status: 'On Time' | 'Delayed' | 'Stopped';
  currentLocation: Coordinate;
  progress: number; // 0.0 to 1.0 representing distance along the path
  speed: number; // speed factor
  nextStopId?: string;
  etaNextStop?: number; // minutes
}

export interface Region {
  id: string;
  name: string;
  center: Coordinate;
  routes: Route[];
  buses: Bus[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: Date;
}