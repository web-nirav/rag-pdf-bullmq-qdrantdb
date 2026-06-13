// src/lib/search.ts
/**
 * Search for similar documents using Drizzle ORM with cosineDistance
 */
export async function searchDocuments(
  query: string,
  limit: number = 5,
  threshold: number = 0.5,
) {
  const res = await fetch(`http://localhost:8000/chat2?message=${query}`);
  const data = await res.json();

  // console.log("DOCS::::", data?.docs);
  return data?.docs;
}
