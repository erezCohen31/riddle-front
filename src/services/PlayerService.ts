const API_URL = "https://riddle-game-api.onrender.com/api/players";

async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  if (response.status === 204) {
    return null;
  }
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export async function createOrFindPlayer(name: string, password: string) {
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    throw new Error("Player name is required");
  }
  if (
    !password ||
    typeof password !== "string" ||
    password.trim().length === 0
  ) {
    throw new Error("Player password is required");
  }

  const url = `${API_URL}/signuporlogin`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name.trim(), password: password.trim() }),
  });

  return handleResponse(response);
}

export async function updateTime(id: number, time: number, token: string) {
  if (!id || !time || isNaN(time)) {
    throw new Error("Valid player ID and time are required");
  }

  const response = await fetch(`${API_URL}/${id}/time`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ time: Number(time) }),
  });

  return await handleResponse(response);
}

export async function getLeaderboard(limit: number, token: string) {
  if (isNaN(limit) || limit <= 0) {
    limit = 10;
  }

  const response = await fetch(`${API_URL}/leaderboard/${limit}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await handleResponse(response);
}
