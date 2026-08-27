const API_URL = "https://lostandfound-pg2e.onrender.com/api";

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};

export const loginUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};
export const getAllItems = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.search) {
    params.append("search", filters.search);
  }

  if (filters.type) {
    params.append("type", filters.type);
  }

  if (filters.category) {
    params.append("category", filters.category);
  }

  if (filters.location) {
    params.append("location", filters.location);
  }

  const queryString = params.toString();

  const response = await fetch(
    `${API_URL}/items${queryString ? `?${queryString}` : ""}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch items");
  }

  return data;
};
export const getItemById = async (itemId) => {
  const response = await fetch(`${API_URL}/items/${itemId}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch item");
  }

  return data;
};
export const createClaim = async (itemId, message, token) => {
  const response = await fetch(`${API_URL}/claims/${itemId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      message
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to submit claim");
  }

  return data;
};
export const createItem = async (itemData, token) => {
  const response = await fetch(`${API_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(itemData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create item");
  }

  return data;
};
export const getMyClaims = async (token) => {
  const response = await fetch(`${API_URL}/claims/my-claims`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch claims");
  }

  return data;
};
export const getMyItemClaims = async (token) => {
  const response = await fetch(`${API_URL}/claims/my-items`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch item claims"
    );
  }

  return data;
};
export const updateClaimStatus = async (
  claimId,
  status,
  token
) => {
  const response = await fetch(
    `${API_URL}/claims/${claimId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        status
      })
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update claim"
    );
  }

  return data;
};