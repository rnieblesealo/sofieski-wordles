export default function formatDate(input: string): string {
  const date = new Date(input)

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  })

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  })

  return `${formattedDate} at ${formattedTime}`
}
