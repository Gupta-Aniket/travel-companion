export const handleLogin = async (values) => {
  try {
    console.log("Logging in with:", values);
    // Your login logic here (e.g., API request)
  } catch (error) {
    console.error("Login error:", error);
  }
};

export default { handleLogin }; 
