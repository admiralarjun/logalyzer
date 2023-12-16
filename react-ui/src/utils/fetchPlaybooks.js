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
export async function fetchPlaybookById(id) {
  try {
    const response = await axios.get(`${API_SERVER}view_playbook_by_id/${id}`);
    if (response.status === 200) {
      console.log("PlaybookById:" + response.data)
      return response.data;
    } else {
      throw new Error(`Error fetching playbook with id ${id}: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}