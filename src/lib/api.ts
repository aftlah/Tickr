const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8080/api";

export async function getCryptoPrices(limit: number = 0) {
  try {
    const res = await fetch(`${API_URL}/crypto?limit=${limit}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch crypto prices");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getUSStocks(limit: number = 0) {
  try {
    const res = await fetch(`${API_URL}/stocks/us?limit=${limit}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch US stocks");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getIndoStocks(limit: number = 0) {
  try {
    const res = await fetch(`${API_URL}/stocks/indo?limit=${limit}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch Indo stocks");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getAssetDetail(symbol: string) {
  try {
    const res = await fetch(`${API_URL}/asset/${symbol}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch asset detail");
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAssetHistory(symbol: string, period: string) {
  try {
    const res = await fetch(`${API_URL}/asset/${symbol}/history?period=${period}`, {
      cache: 'no-store' // Fetch fresh data for interaction
    });
    if (!res.ok) throw new Error("Failed to fetch asset history");
    return res.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error; // Re-throw to handle in UI
  }
}
