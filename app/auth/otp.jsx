import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import authService from "../services/authService";
import { useLocalSearchParams, useRouter } from "expo-router";
import globalStyles from "../constants/globalstyles";
import { Divider } from "react-native-elements";
const Otp = ({ route, navigation }) => {

  const params = useLocalSearchParams(); // Get email passed from login/signup
  const email = params.email;
  console.log(email);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (text.length > 1) return; // Only allow 1 digit
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) inputs.current[index + 1].focus();
  };

  const handleVerify = async () => {

    const enteredOtp = otp.join("");
    alert(email);
    // TODO : CHANGE 7->6
    if (enteredOtp.length === 7) {
      const userId = await authService.verifyOtp(email, enteredOtp);
      if (userId) {
        navigation.replace("Tickets"); // Redirect after successful login
      } else {
        alert("Invalid OTP, please try again.");
      }
    } else {
      alert("Enter a valid 6-digit OTP");
    }

    // TODO : REMOVE THIS ALERT (AFTER TESTING)
    alert(enteredOtp);
  };

  const handleResendOtp = async () => {
    await authService.sendOtp(email);
    alert("Resent OTP successfully");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Enter OTP sent to <Divider/>{email}</Text>
      <View style={{ flexDirection: "row", gap: 10 }}>
        {otp.map((_, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputs.current[index] = el)}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "#333",
              width: 40,
              height: 40,
              textAlign: "center",
              fontSize: 18,
            }}
            keyboardType="numeric"
            maxLength={1}
            value={otp[index]}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>
      
        <TouchableOpacity 
          style={[globalStyles.button, {
            marginTop: 20,
            width : "75%",
            marginBottom : 10,
          }]} 

          onPress={handleVerify}>
          <Text style={globalStyles.buttonText}>Verify</Text>
        </TouchableOpacity>
      
      
      <TouchableOpacity onPress={handleResendOtp} style={{ marginTop: 10 }}>
        <Text style={{ color: "#007BFF" }}>Resend OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Otp;
