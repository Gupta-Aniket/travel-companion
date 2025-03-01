export default function formatTimeTravelled(timeTravelled) {
  const [hours, minutes] = timeTravelled.split(":").map(Number);
  return `${hours} hrs, ${minutes < 10 ? "0" + minutes : minutes} mins`;
}