import { API_SERVER } from "src/config/constant";
import axios  from "axios";
export async function fetchThreats() {
  try {
    const response = await axios.get(API_SERVER + 'view_all_threats');
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

export async function fetchThreatsById(id) {
  try {
    const response = await axios.get(`${API_SERVER}view_threat_by_id/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error fetching threats by ID: ${id}. Status == ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
