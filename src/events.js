const fs = require("fs");
const path = require("path");

const eventsFile = path.join(__dirname, "../data/events.json");
let events = JSON.parse(fs.readFileSync(eventsFile, "utf-8"));

const getEvents = () => events;

const addEvent = (event) => {
  event.id = events.length + 1;
  events.push(event);
  fs.writeFileSync(eventsFile, JSON.stringify(events, null, 2));
};

const getUpcomingEvents = (filterBy = null) => {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  if (filterBy === "category") {
    return sortedEvents.reduce((acc, event) => {
      acc[event.category] = acc[event.category] || [];
      acc[event.category].push(event);
      return acc;
    }, {});
  }

  if (filterBy === "reminder") {
    return sortedEvents.filter(
      (event) => new Date(event.reminder) > new Date()
    );
  }

  return sortedEvents;
};

const checkReminders = () => {
  const now = new Date();
  events.forEach((event) => {
    if (new Date(event.reminder) <= now) {
      console.log(`🔔 Reminder: ${event.name} is happening soon!`);
    }
  });
};

const authenticateUser = (username, password) => {
  const users = { admin: "5678", user: "xyz123" };
  return users[username] === password;
};

module.exports = {
  getEvents,
  addEvent,
  getUpcomingEvents,
  authenticateUser,
  checkReminders,
};
