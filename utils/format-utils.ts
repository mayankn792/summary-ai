export function formatFileNameAsTitle(fileName: string): string {
  //remove file extension and replace special characters with space
  const formattedName = fileName
    .replace(/\.[^/.]+$/, "") // Remove file extension
    .replace(/[^a-zA-Z0-9 ]/g, " ") // Replace special characters with space
    .trim(); // Trim leading and trailing spaces

  // Capitalize the first letter of each word
  return formattedName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
