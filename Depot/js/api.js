const BASE_URL = "https://foundyellowdog22.conveyor.cloud/api/";

// API endpoints
const ENDPOINTS = {
  LOGIN: "auth/login",
  REGISTER: "auth/register",
  SOUNDCLOUD: "soundcloud/vietnamese-songs",
};

// API configuration
const API_CONFIG = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    'Authorization': 'Bearer ' + localStorage.getItem("token"),
  },
  timeout: 10000,
};

// Base CRUD operations
class BaseAPI {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  // Create
  async create(data) {
    try {
      const response = await fetch(`${BASE_URL}${this.endpoint}`, {
        method: "POST",
        ...API_CONFIG,
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error("Create error:", error);
      throw error;
    }
  }

  // Read
  async getAll() {
    try {
      const response = await fetch(`${BASE_URL}${this.endpoint}`, {
        method: "GET",
        ...API_CONFIG,
      });
      return await response.json();
    } catch (error) {
      console.error("Get all error:", error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const response = await fetch(`${BASE_URL}${this.endpoint}/${id}`, {
        method: "GET",
        ...API_CONFIG,
      });
      return await response.json();
    } catch (error) {
      console.error("Get by ID error:", error);
      throw error;
    }
  }

  // Update
  async update(id, data) {
    try {
      const response = await fetch(`${BASE_URL}${this.endpoint}/${id}`, {
        method: "PUT",
        ...API_CONFIG,
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error("Update error:", error);
      throw error;
    }
  }

  // Delete
  async delete(id) {
    try {
      const response = await fetch(`${BASE_URL}${this.endpoint}/${id}`, {
        method: "DELETE",
        ...API_CONFIG,
      });
      return await response.json();
    } catch (error) {
      console.error("Delete error:", error);
      throw error;
    }
  }
}

// Create specific API instances
const LoginAPI = new BaseAPI(ENDPOINTS.LOGIN);
const RegisterAPI = new BaseAPI(ENDPOINTS.REGISTER);
const SoundCloud = new BaseAPI(ENDPOINTS.SOUNDCLOUD);

// Export everything
export { LoginAPI, RegisterAPI, SoundCloud };
