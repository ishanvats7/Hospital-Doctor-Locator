function to24Hour(timeStr) {
  let [time, modifier] = timeStr.match(/(\d+)(AM|PM)/i).slice(1);
  time = parseInt(time);

  if (modifier.toUpperCase() === "PM" && time !== 12) time += 12;
  if (modifier.toUpperCase() === "AM" && time === 12) time = 0;

  return time;
}

function generateSlots(range) {
  const [startStr, endStr] = range.split(" - ");

  const startHour = to24Hour(startStr);
  const endHour = to24Hour(endStr);

  const slots = [];
  for (let h = startHour; h < endHour; h++) {
    slots.push(`${h}:00`, `${h}:30`);
  }
  return slots;
}

function getDoctorSlots(timings) {
  let allSlots = [];

  if (timings?.morning) {
    allSlots = [...allSlots, ...generateSlots(timings.morning)];
  }
  if (timings?.evening) {
    allSlots = [...allSlots, ...generateSlots(timings.evening)];
  }

  return allSlots; // e.g. ["10:00","10:30",...]
}

module.exports = { getDoctorSlots };