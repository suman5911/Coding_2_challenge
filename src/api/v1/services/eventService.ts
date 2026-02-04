export interface Event {
  id: number;
  name: string;
  date: string;
  capacity: number;
  registrationCount: number;
}

export interface EventPopularity {
  id: number;
  name: string;
  date: string;
  capacity: number;
  registrationCount: number;
  spotsRemaining: number;
  popularityScore: number;
  popularityTier: string;
}


const events: Event[] = [
  {
    id: 1,
    name: "Tech Conference 2025",
    date: "2025-03-15T09:00:00.000Z",
    capacity: 200,
    registrationCount: 185,
  },

  {
    id: 2,
    name: "Startup Pitch Night",
    date: "2025-02-20T18:00:00.000Z",
    capacity: 50,
    registrationCount: 12,
  },

  {
    id: 3,
    name: "Web Dev Workshop",
    date: "2025-02-10T10:00:00.000Z",
    capacity: 30,
    registrationCount: 30,
  },
];

const calculatePopularityTier = (score: number): string => {
  if (score >= 90) return "Hot";
  if (score >= 70) return "Popular";
  if (score >= 50) return "Moderate";
  if (score >= 25) return "Building";
  return "New";
};

export const getAllEvents = (): Event[] => {
  return [...events];
};

export const getEventById = (id: number): Event | undefined => {
  return events.find((event) => event.id === id);
};

export const getEventPopularity = (id: number): EventPopularity | undefined => {
  const event = events.find((e) => e.id === id);
  
  if (!event) {
    return undefined;
  }


  let popularityScore = 0;
  if (event.capacity > 0) {
    popularityScore = (event.registrationCount / event.capacity) * 100;
  }

  popularityScore = Math.round(popularityScore * 10) / 10;

  const spotsRemaining = event.capacity - event.registrationCount;
  const popularityTier = calculatePopularityTier(popularityScore);

  return {
    id: event.id,
    name: event.name,
    date: event.date,
    capacity: event.capacity,
    registrationCount: event.registrationCount,
    spotsRemaining,
    popularityScore,
    popularityTier,
  };
};

export const createEvent = (eventData: {
  name: string;
  date: string;
  capacity: number;
}): Event => {
  const newEvent: Event = {
    id: events.length > 0 ? Math.max(...events.map((e) => e.id)) + 1 : 1,
    name: eventData.name,
    date: eventData.date,
    capacity: eventData.capacity,
    registrationCount: 0,
  };


  events.push(newEvent);
  return newEvent;
};

export const updateEvent = (
  id: number,
  eventData: { name: string; date: string; capacity: number }
): Event | undefined => {
  const index = events.findIndex((event) => event.id === id);

  if (index === -1) {
    return undefined;
  }

  events[index] = {
    ...events[index],
    name: eventData.name,
    date: eventData.date,
    capacity: eventData.capacity,
  };

  return events[index];
};


export const deleteEvent = (id: number): boolean => {
  const index = events.findIndex((event) => event.id === id);

  if (index === -1) {
    return false;
  }

  events.splice(index, 1);
  return true;
};