import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import authService from "../services/authService";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import globalStyles from "../constants/globalstyles";
import { Divider } from "react-native-elements";
import { useEffect } from "react";
import { useDataItem } from "../contexts/userDataContext";
const Otp = ({ route, navigation }) => {

  const params = useLocalSearchParams(); // Get email passed from login/signup
  const email = params.email;
  console.log(email);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);
  const router = useRouter();
  const { setLoggedInUser, loggedInUser } = useDataItem();
  const handleChange = (text, index) => {
    if (text.length > 1) return; // Only allow 1 digit
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) inputs.current[index + 1].focus();
  };

  const handleVerify = async () => {

    const enteredOtp = otp.join("");
    // alert(email);
    // TODO : CHANGE 7->6
    // todo : uncomment verify otp to maintain flow
    if (enteredOtp.length == 6) {
      // const userId = await authService.verifyOtp(email, enteredOtp);
      const userId = "31357eb0-11ec-490d-9aa7-5637073cd60d"; // Simulated user ID
      if (userId) {
        console.log("🔍 User ID:", userId);
        console.log("entered otp:", enteredOtp);

        setLoggedInUser(userId);

        router.replace('(tabs)/tickets');
        console.log("🔍 User logged in");
        // Redirect after successful login
      } else {
        alert("Invalid OTP, please try again.");
      }
    } else {
      alert("Enter a valid 6-digit OTP");
    }

    // TODO : REMOVE THIS ALERT (AFTER TESTING)
    // alert(enteredOtp);
  };

  const [disabled, setDisabled] = useState(false);
  const [timer, setTimer] = useState(120); // 120 seconds countdown

  useEffect(() => {
    let interval;
    if (disabled) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setDisabled(false);
            return 120;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [disabled]);

  const handlePress = () => {
    // handleResendOtp();
    console.log("change it to call the function here")
    setDisabled(true);
    setTimer(120);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Enter OTP sent to <Divider />{email}</Text>
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
          width: "75%",
          marginBottom: 10,
        }]}

        onPress={handleVerify}>
        <Text style={globalStyles.buttonText}>Verify</Text>
      </TouchableOpacity>


      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled}
        style={{
          marginTop: 10,
          opacity: disabled ? 0.5 : 1, // Reduce opacity when disabled
        }}
      >
        <Text style={{ color: "#007BFF" }}>
          {disabled ? `Resend OTP in ${timer}s` : "Resend OTP"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Otp;
