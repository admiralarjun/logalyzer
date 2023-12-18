import axios from 'axios'
import { API_SERVER } from 'src/config/constant';

export async function viewLogLineById(id) {
  try {
    const response = await axios.get(`${API_SERVER}view_log_line_by_id/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null; 
  }
}

export async function getLogLinesByDevice(deviceId) {
  const response = await axios.get(`${API_SERVER}get_log_lines_by_device/${deviceId}`);
  return response.data;
}

export async function getLogLinesByUnit(unitId) {
  const response = await axios.get(`${API_SERVER}get_log_lines_by_unit/${unitId}`);
  return response.data;
}

export async function updateLogLine(id, data) {
  const response = await axios.put(`${API_SERVER}update_log_line/${id}/`, data);
  return response.data;
}

export async function deleteLogLine(id) {
  const response = await axios.delete(`${API_SERVER}delete_log_line/${id}`);
  return response.data;
}