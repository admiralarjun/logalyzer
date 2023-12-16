import { API_SERVER } from "src/config/constant";
import axios  from "axios";
export async function fetchAlerts() {
  try {
    const response = await axios.get(API_SERVER + 'view_all_alerts');
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error fetching alerts: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
