import { API_SERVER } from "src/config/constant";
import axios  from "axios";
export async function fetchPlaybooks() {
  try {
    const response = await axios.get(API_SERVER + 'view_all_playbooks');
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error fetching playbooks: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
