import axios from 'axios';
import { API_URL, STRAPI_API_TOKEN } from '@/shared/utils/urls';

const fetcher = async (url: string) => {
  try {
    const response = await axios.get(`${API_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default fetcher;