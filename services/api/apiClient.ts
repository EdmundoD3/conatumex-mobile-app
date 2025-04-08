import { NetworkError } from "@helpers/errors/typeErrors";
import { fetchWithTimeout } from "@helpers/network/fetchWithTimeOut";

const apiClient = async (url: string, options: RequestInit) => {
  const response = await fetchWithTimeout(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  if (!response.ok) {
    const err = await response.json()
    throw new NetworkError(`Error en la solicitud: ${err.message}, status ${response.status}`);
  }
  
  const data = await response.json();
  return data;
};

export default apiClient;