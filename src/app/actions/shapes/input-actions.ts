"use server";

interface ShapeInfo {
  type: string;
  text: string;
}

export async function handleInstructionServer(shapeInfo: ShapeInfo[]) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/generate-response`, {
    method: "POST",
    body: JSON.stringify(shapeInfo),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await res.json();
  return response;
}
