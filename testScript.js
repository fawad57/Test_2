const {
  getEvents,
  addEvent,
  getUpcomingEvents,
  authenticateUser,
  checkReminders,
} = require("./src/events");

// Log current events
console.log("Current Events:", getEvents());

// Add a new event
addEvent({
  name: "Doctor Appointment",
  description: "Annual health check-up",
  date: "2025-03-20",
  time: "02:00 PM",
  category: "Appointments",
  reminder: "2025-03-20T13:30:00Z",
});

// Log updated events
console.log("Updated Events:", getUpcomingEvents());

// Test filtering events by category
console.log(
  "Upcoming Events Filtered by Category:",
  getUpcomingEvents("category")
);

// Test filtering events by reminder
console.log(
  "Upcoming Events Filtered by Reminder:",
  getUpcomingEvents("reminder")
);

// Test authentication
console.log(
  "User authentication (valid user):",
  authenticateUser("admin", "5678")
); // true
console.log(
  "User authentication (invalid user):",
  authenticateUser("user", "wrongpass")
); // false

// Check reminders
checkReminders();
