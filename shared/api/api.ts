import { API_URL, STRAPI_API_TOKEN } from "@/shared/utils/urls";

export const fetchDataFromApi = async (endpoint: string) => {
  const options = { 
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + STRAPI_API_TOKEN,
    }
  };

  const res = await fetch(`${API_URL}${endpoint}`, options);
  const data = await res.json();

  return data;
}