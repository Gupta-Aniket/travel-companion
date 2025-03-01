export default function formatTime(timeStr) {
  let [hours, minutes] = timeStr.split(":").map(Number);
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 0 or 12+ to 12-hour format
  return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
}