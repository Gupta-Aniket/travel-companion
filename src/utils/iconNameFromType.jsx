export default function iconNameFromType(type) {
  switch (type) {
    case "ferry":
      return "boat-outline";
    case "flight":
      return "airplane-outline";
    case "bus":
      return "bus-outline";
    case "train":
      return "train-outline";
    default:
      return "balloon-outline";
  }
}