const { addEvent, getEvents, deleteEvent } = require("./src/events");

// Test adding Pakistani events
console.log(
  addEvent(
    "Pakistan Day",
    "Celebration of Pakistan Resolution",
    "2025-03-23",
    "Meeting"
  )
);
console.log(
  addEvent(
    "Independence Day",
    "14 August celebrations",
    "2025-08-14",
    "Birthday"
  )
);
console.log(
  addEvent(
    "Doctor Appointment",
    "Checkup at Aga Khan Hospital",
    "2025-04-10",
    "Appointment"
  )
);

// Test retrieving events
console.log("All Events:", getEvents());

// Test deleting an event
console.log(deleteEvent(1));
console.log("Remaining Events:", getEvents());
