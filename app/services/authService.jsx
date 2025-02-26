import AsyncStorage from "@react-native-async-storage/async-storage";
import supabase from "../config/supabaseClient";

const authService = {
// * user already exists
  async checkUserExists(email) {
    const { data, error } = await supabase
        .from('users')
        .select('user_id')
        .eq('email', email)
        .single(); 
        // Ensures only one row is returned

    if (error) {
        console.error("Error checking user:", error.message);
        return false;
    }

    return data ? true : false;
  },

// * common use case
  async sendOtp(email) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email, 
      options: {

        shouldCreateUser: false,
      },
    });
    if (error || !data) {
      console.error("OTP Send Error:", error?.message || "Invalid Email");
      return null;
    }
    return data.otp;
  },

// * for signup
  async verifySignupOtp (email, otp, fullName, geminiApiKey) {
    // Verify OTP
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });
  
    if (error) {
      console.error("OTP verification failed:", error.message);
      return false;
    }
  
    // Check if user exists in `users` table
    const { data: existingUser, error: userCheckError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();
  
    if (existingUser) {
      console.log("User already exists. Logging in...");
      await AsyncStorage.setItem("user_id", existingUser.user_id);
      return true;
    }
  
    // Create new user if not exists
    const { user } = data;
    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert([
        {
          user_id: user.id, // Supabase Auth ID
          name: fullName,
          email: email,
          gemini_api_key: geminiApiKey,
          created_at: new Date(),
        },
      ]);
  
    if (insertError) {
      console.error("Error saving new user:", insertError.message);
      return false;
    }
  
    await AsyncStorage.setItem("user_id", user.id);
    return true;
  },
  
// * for loggin in
  async verifyLoginOtp(email, otp) {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email", // or "email"
    });

    if (error || !data) {
      console.error("OTP Verification Error:", error?.message || "Invalid OTP");
      return null;
    }

    const userId = data.user?.id;
    if (userId) {
      await AsyncStorage.setItem("userId", userId);
      return userId;
    }

    return null;
  },


  async getCurrentUserId() {
    return await AsyncStorage.getItem("userId");
  },

  async logoutUser() {
    await AsyncStorage.removeItem("userId");
    await supabase.auth.signOut();
  }
};

export default authService;
