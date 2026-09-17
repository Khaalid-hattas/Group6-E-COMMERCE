const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000").replace(/\/$/, "");

const request = async (resource) => {
  const response = await fetch(`${API_BASE_URL}/api/${resource}`);

  if (!response.ok) {
    throw new Error(`Failed to load ${resource}: ${response.status}`);
  }

  return response.json();
};

export const getArtwork = () => request("artwork");
export const getHandcraft = () => request("handcraft");
export const getHandmade = () => request("handmade");
export const getCreators = () => request("creators");
