import { Route, Bus, BusStop, Region } from './types';

// --- San Francisco Data ---
const SF_STOPS: BusStop[] = [
  { id: 'sf-stop-1', name: 'Ferry Building', location: { lat: 37.7955, lng: -122.3937 } },
  { id: 'sf-stop-2', name: 'Union Square', location: { lat: 37.7879, lng: -122.4075 } },
  { id: 'sf-stop-3', name: 'City Hall', location: { lat: 37.7793, lng: -122.4192 } },
  { id: 'sf-stop-4', name: 'Mission Dolores', location: { lat: 37.7651, lng: -122.4320 } },
  { id: 'sf-stop-5', name: 'Painted Ladies', location: { lat: 37.7763, lng: -122.4328 } },
  { id: 'sf-stop-6', name: 'Japantown', location: { lat: 37.7853, lng: -122.4294 } },
];

const SF_ROUTES: Route[] = [
  {
    id: 'sf-route-101',
    name: '101 - City Loop',
    color: '#3b82f6', // blue-500
    stops: [SF_STOPS[0], SF_STOPS[1], SF_STOPS[2], SF_STOPS[5], SF_STOPS[0]],
    path: [
      { lat: 37.7955, lng: -122.3937 }, // Ferry
      { lat: 37.7900, lng: -122.4000 },
      { lat: 37.7879, lng: -122.4075 }, // Union Square
      { lat: 37.7850, lng: -122.4120 },
      { lat: 37.7793, lng: -122.4192 }, // City Hall
      { lat: 37.7820, lng: -122.4250 },
      { lat: 37.7853, lng: -122.4294 }, // Japantown
      { lat: 37.7900, lng: -122.4150 },
      { lat: 37.7955, lng: -122.3937 }, // Back to Ferry
    ]
  },
  {
    id: 'sf-route-55',
    name: '55 - Mission Express',
    color: '#ef4444', // red-500
    stops: [SF_STOPS[2], SF_STOPS[3], SF_STOPS[4], SF_STOPS[2]],
    path: [
      { lat: 37.7793, lng: -122.4192 }, // City Hall
      { lat: 37.7700, lng: -122.4250 },
      { lat: 37.7651, lng: -122.4320 }, // Mission
      { lat: 37.7700, lng: -122.4350 },
      { lat: 37.7763, lng: -122.4328 }, // Painted Ladies
      { lat: 37.7780, lng: -122.4250 },
      { lat: 37.7793, lng: -122.4192 }, // Back to City Hall
    ]
  }
];

const SF_BUSES: Bus[] = [
  {
    id: 'sf-bus-101-A',
    routeId: 'sf-route-101',
    status: 'On Time',
    currentLocation: SF_ROUTES[0].path[0],
    progress: 0.1,
    speed: 0.0005,
  },
  {
    id: 'sf-bus-101-B',
    routeId: 'sf-route-101',
    status: 'Delayed',
    currentLocation: SF_ROUTES[0].path[3],
    progress: 0.6,
    speed: 0.0004,
  },
  {
    id: 'sf-bus-55-A',
    routeId: 'sf-route-55',
    status: 'On Time',
    currentLocation: SF_ROUTES[1].path[0],
    progress: 0.3,
    speed: 0.0006,
  }
];

// --- London Data ---
const LDN_STOPS: BusStop[] = [
    { id: 'ldn-stop-1', name: 'Big Ben', location: { lat: 51.5007, lng: -0.1246 } },
    { id: 'ldn-stop-2', name: 'Waterloo Station', location: { lat: 51.5032, lng: -0.1123 } },
    { id: 'ldn-stop-3', name: 'Tower Bridge', location: { lat: 51.5055, lng: -0.0754 } },
    { id: 'ldn-stop-4', name: 'St. Pauls Cathedral', location: { lat: 51.5138, lng: -0.0984 } },
    { id: 'ldn-stop-5', name: 'Covent Garden', location: { lat: 51.5117, lng: -0.1240 } },
    { id: 'ldn-stop-6', name: 'Buckingham Palace', location: { lat: 51.5014, lng: -0.1419 } },
];

const LDN_ROUTES: Route[] = [
    {
        id: 'ldn-route-15',
        name: '15 - Heritage Line',
        color: '#dc2626', // red-600
        stops: [LDN_STOPS[0], LDN_STOPS[2], LDN_STOPS[3], LDN_STOPS[0]],
        path: [
            { lat: 51.5007, lng: -0.1246 }, // Big Ben
            { lat: 51.5080, lng: -0.1000 },
            { lat: 51.5055, lng: -0.0754 }, // Tower Bridge
            { lat: 51.5100, lng: -0.0850 },
            { lat: 51.5138, lng: -0.0984 }, // St Pauls
            { lat: 51.5120, lng: -0.1100 },
            { lat: 51.5007, lng: -0.1246 }, // Return
        ]
    },
    {
        id: 'ldn-route-11',
        name: '11 - Royal Route',
        color: '#7c3aed', // violet-600
        stops: [LDN_STOPS[5], LDN_STOPS[0], LDN_STOPS[4], LDN_STOPS[5]],
        path: [
            { lat: 51.5014, lng: -0.1419 }, // Buckingham
            { lat: 51.5007, lng: -0.1246 }, // Big Ben
            { lat: 51.5080, lng: -0.1200 },
            { lat: 51.5117, lng: -0.1240 }, // Covent Garden
            { lat: 51.5100, lng: -0.1350 },
            { lat: 51.5014, lng: -0.1419 }, // Return
        ]
    }
];

const LDN_BUSES: Bus[] = [
    {
        id: 'ldn-bus-15-A',
        routeId: 'ldn-route-15',
        status: 'On Time',
        currentLocation: LDN_ROUTES[0].path[0],
        progress: 0.15,
        speed: 0.0004,
    },
    {
        id: 'ldn-bus-15-B',
        routeId: 'ldn-route-15',
        status: 'Delayed',
        currentLocation: LDN_ROUTES[0].path[4],
        progress: 0.7,
        speed: 0.0003,
    },
    {
        id: 'ldn-bus-11-A',
        routeId: 'ldn-route-11',
        status: 'On Time',
        currentLocation: LDN_ROUTES[1].path[1],
        progress: 0.4,
        speed: 0.0005,
    }
];

// --- Uttar Pradesh Data (Lucknow) ---
const UP_STOPS: BusStop[] = [
    { id: 'up-stop-1', name: 'Charbagh Station', location: { lat: 26.8318, lng: 80.9168 } }, // Lucknow Main Stn
    { id: 'up-stop-2', name: 'Hazratganj', location: { lat: 26.8467, lng: 80.9462 } },
    { id: 'up-stop-3', name: 'Bara Imambara', location: { lat: 26.8690, lng: 80.9140 } },
    { id: 'up-stop-4', name: 'Chowk Market', location: { lat: 26.8640, lng: 80.9050 } },
    { id: 'up-stop-5', name: 'Gomti Nagar', location: { lat: 26.8500, lng: 80.9990 } },
    { id: 'up-stop-6', name: 'Janeshwar Mishra Park', location: { lat: 26.8378, lng: 80.9850 } },
];

const UP_ROUTES: Route[] = [
    {
        id: 'up-route-1',
        name: 'LKO-1 Metro Link',
        color: '#eab308', // yellow-500
        stops: [UP_STOPS[0], UP_STOPS[1], UP_STOPS[4], UP_STOPS[5], UP_STOPS[0]],
        path: [
            { lat: 26.8318, lng: 80.9168 }, // Charbagh
            { lat: 26.8380, lng: 80.9300 },
            { lat: 26.8467, lng: 80.9462 }, // Hazratganj
            { lat: 26.8480, lng: 80.9700 },
            { lat: 26.8500, lng: 80.9990 }, // Gomti Nagar
            { lat: 26.8450, lng: 80.9950 },
            { lat: 26.8378, lng: 80.9850 }, // Janeshwar Park
            { lat: 26.8250, lng: 80.9500 },
            { lat: 26.8318, lng: 80.9168 }, // Return
        ]
    },
    {
        id: 'up-route-2',
        name: 'Heritage Special',
        color: '#ea580c', // orange-600
        stops: [UP_STOPS[0], UP_STOPS[2], UP_STOPS[3], UP_STOPS[0]],
        path: [
             { lat: 26.8318, lng: 80.9168 }, // Charbagh
             { lat: 26.8500, lng: 80.9200 },
             { lat: 26.8690, lng: 80.9140 }, // Imambara
             { lat: 26.8660, lng: 80.9080 },
             { lat: 26.8640, lng: 80.9050 }, // Chowk
             { lat: 26.8450, lng: 80.9100 },
             { lat: 26.8318, lng: 80.9168 }, // Return
        ]
    }
];

const UP_BUSES: Bus[] = [
    {
        id: 'up-bus-1-A',
        routeId: 'up-route-1',
        status: 'On Time',
        currentLocation: UP_ROUTES[0].path[0],
        progress: 0.1,
        speed: 0.0005,
    },
    {
        id: 'up-bus-1-B',
        routeId: 'up-route-1',
        status: 'Delayed',
        currentLocation: UP_ROUTES[0].path[4],
        progress: 0.6,
        speed: 0.0004,
    },
     {
        id: 'up-bus-2-A',
        routeId: 'up-route-2',
        status: 'On Time',
        currentLocation: UP_ROUTES[1].path[1],
        progress: 0.3,
        speed: 0.0006,
    }
];


export const REGIONS: Region[] = [
  {
    id: 'sf-usa',
    name: 'San Francisco, CA',
    center: { lat: 37.7749, lng: -122.4194 },
    routes: SF_ROUTES,
    buses: SF_BUSES
  },
  {
    id: 'ldn-uk',
    name: 'London, UK',
    center: { lat: 51.5074, lng: -0.1278 },
    routes: LDN_ROUTES,
    buses: LDN_BUSES
  },
  {
    id: 'up-ind',
    name: 'Uttar Pradesh, India',
    center: { lat: 26.8467, lng: 80.9462 },
    routes: UP_ROUTES,
    buses: UP_BUSES
  }
];
