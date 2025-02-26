import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import Onboarding from "react-native-onboarding-swiper";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

const pages = [
  {
    animation: require("../assets/animations/train.json"),
    title: "All Your Travel Tickets in One Place",
    subtitle: "Booked a train ticket? Just upload it here, and we'll sort it out for you. No more lost PDF's or scattered emails.",
  },
  {
    animation: require("../assets/animations/flight.json"),
    title: "Flights, Sorted Effortlessly",
    subtitle: "Wheather it's a businness trip or a vacation, we've got you covered. Upload your flight tickets and we'll sort it out for you.",
  },
  {
    animation: require("../assets/animations/spaceShip.json"),
    title: "From Train to Spacecraft, \nWe've Got You Covered",
    subtitle: "No matter how you travel - train, flight, or spacecraft - just upload the tickets and we'll handle the rest",
  },
];

const WelcomeScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const deviceHeight = Dimensions.get("window").height;
  return (
    <Onboarding
      pages={pages.map((page, index) => ({
        backgroundColor: "#fff",
        image: (
          <LottieView
            source={page.animation}
            speed={0.8}
            autoPlay
            style={{ width: width * 0.8, height: height * 0.5 }}
          />
        ),
        title: page.title,
        titleStyles: { fontSize: deviceHeight > 700 ? 36 : 24, color: "#000", fontWeight: "bold" },
        subtitle: page.subtitle,
        subtitleStyles: { fontSize: deviceHeight > 700 ? 20 : 16, color: "#000" },
      }))

    }
      onSkip={() => router.replace("/auth/login")}
      onDone={() => router.replace("/auth/login")}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
