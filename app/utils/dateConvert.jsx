export default function formatDate(dateString) {
  if(dateString === null) return  "N.A" ;
  const parts = dateString.split("/");
  if (parts.length !== 3) return "Invalid Date";

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // JavaScript months are 0-based
  const year = parseInt(parts[2], 10);

  const date = new Date(year, month, day); // Correct order
  const options = { year: "numeric", month: "short", day: "numeric" };

  return date.toLocaleDateString("en-GB", options);
}

// Example Usage
console.log(formatDate("10/2/2025")); // Output: "10 Feb 2025"
