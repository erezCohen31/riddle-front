import type { Riddle } from "../interface/RiddleType.ts";
const API_URL = "https://riddle-game-api.onrender.com/api/riddles";

async function handleResponse<T>(response: Response): Promise<T | null> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      (error as any).message || `HTTP error! status: ${response.status}`
    );
  }

  if (response.status === 204) return null;

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export async function addRiddle(
  riddleData: Riddle,
  token: string
): Promise<Riddle | null> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(riddleData),
  });

  return await handleResponse<Riddle>(response);
}

export async function getAllRiddles(token: string): Promise<Riddle[] | null> {
  const response = await fetch(API_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleResponse(response);
}

export async function getNumOfRiddles(
  count: number,
  token: string
): Promise<Riddle[] | null> {
  const response = await fetch(`${API_URL}/count/${count}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleResponse(response);
}

export async function getRiddleById(
  id: number,
  token: string
): Promise<Riddle | null> {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleResponse(response);
}
