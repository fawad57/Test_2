const fs = require("fs");

const eventsFile = "./data/events.json";
const usersFile = "./data/users.json";

// Load data from file
const loadData = (file) => {
  if (!fs.existsSync(file)) return [];
  const data = fs.readFileSync(file);
  return JSON.parse(data);
};

// Save data to file
const saveData = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

// Register a new user
const registerUser = (username, password) => {
  let users = loadData(usersFile);
  if (users.find((user) => user.username === username))
    return "User already exists";

  users.push({ username, password });
  saveData(usersFile, users);
  return "User registered successfully";
};

// Authenticate user
const authenticateUser = (username, password) => {
  let users = loadData(usersFile);
  return users.some(
    (user) => user.username === username && user.password === password
  );
};

// Add an event
const addEvent = (
  username,
  name,
  description,
  date,
  time,
  category,
  reminder
) => {
  if (!authenticateUser(username, password)) return "Invalid user";

  if (!name || !date || !time || !category) return "Required fields missing";

  const validCategories = ["Meeting", "Birthday", "Appointment"];
  if (!validCategories.includes(category)) return "Invalid category";

  const events = loadData(eventsFile);
  const event = {
    id: events.length + 1,
    username,
    name,
    description,
    date,
    time,
    category,
    reminder,
  };
  events.push(event);
  saveData(eventsFile, events);
  return "Event added successfully";
};

// Get all events (sorted by date, category, or reminder status)
const getEvents = (username, sortBy = "date") => {
  if (!authenticateUser(username, password)) return "Invalid user";

  let events = loadData(eventsFile).filter(
    (event) => event.username === username
  );

  if (sortBy === "date") {
    events.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sortBy === "category") {
    events.sort((a, b) => a.category.localeCompare(b.category));
  } else if (sortBy === "reminder") {
    events = events.filter((event) => event.reminder);
  }

  return events;
};

// Delete an event
const deleteEvent = (username, id) => {
  if (!authenticateUser(username, password)) return "Invalid user";

  let events = loadData(eventsFile);
  const index = events.findIndex(
    (event) => event.id === id && event.username === username
  );
  if (index === -1) return "Event not found";

  events.splice(index, 1);
  saveData(eventsFile, events);
  return "Event deleted successfully";
};

// Check for upcoming reminders
const checkReminders = () => {
  const events = loadData(eventsFile);
  const now = new Date();

  events.forEach((event) => {
    if (event.reminder) {
      const eventTime = new Date(`${event.date} ${event.time}`);
      if (eventTime > now && eventTime - now <= 3600000) {
        // 1-hour reminder
        console.log(`Reminder: ${event.name} is happening soon!`);
      }
    }
  });
};

// Run reminder check every minute
setInterval(checkReminders, 60000);

module.exports = { registerUser, addEvent, getEvents, deleteEvent };
