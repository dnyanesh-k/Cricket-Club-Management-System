import axios from 'axios';

const config = {
    url: 'http://localhost:8080'
  }

// Function to register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${config.url}/users/signup`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error; // Re-throw the error for handling in the calling function
  }
};

export async function login(email, password) {
    // body parameters
    try {
      const body = {
        email,
        password,
      }
  
      const response = await axios.post(`${config.url}/users/login`, body)
      return response.data
    } catch (error) {
      console.log('Login failed:', error)
      throw error
    }
  }