const fs = require("fs");

const eventsFile = "./data/events.json";

// Load events from file
const loadEvents = () => {
  if (!fs.existsSync(eventsFile)) return [];
  const data = fs.readFileSync(eventsFile);
  return JSON.parse(data);
};

// Save events to file
const saveEvents = (events) => {
  fs.writeFileSync(eventsFile, JSON.stringify(events, null, 2));
};

// Add an event
const addEvent = (name, description, date, category) => {
  if (!name || !date || !category) return "Required fields missing";

  const validCategories = ["Meeting", "Birthday", "Appointment"];
  if (!validCategories.includes(category)) return "Invalid category";

  const events = loadEvents();
  const event = { id: events.length + 1, name, description, date, category };
  events.push(event);
  saveEvents(events);
  return "Event added successfully";
};

// Get all events
const getEvents = () => loadEvents();

// Delete an event
const deleteEvent = (id) => {
  let events = loadEvents();
  const index = events.findIndex((event) => event.id === id);
  if (index === -1) return "Event not found";

  events.splice(index, 1);
  saveEvents(events);
  return "Event deleted successfully";
};

module.exports = { addEvent, getEvents, deleteEvent };
