"use server";

export async function handleGenerateImageServer(prompt: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/generate-image`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  const data = await response.json();

  if (!response.ok || !data.base64) {
    throw new Error(data?.error || response.statusText);
  }

  return data;
}
