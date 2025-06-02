import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import { getRandomLocation } from "../controllers/locationBasedImageController";

const funnyMessages = [
  "Loading the globe...",
  "Firing up the motor...",
  "Spinning up the Earth...",
  "Checking GPS satellites...",
  "Polishing continents...",
  "Calculating flat-earth resistance...",
  "Convincing gravity to cooperate...",
  "Clearing clouds...",
];

const CustomGlobe = () => {
  const webViewRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState(funnyMessages[0]);
  const [globeLoaded, setGlobeLoaded] = useState(false);

  // Cycle loading messages
  useEffect(() => {
    if (!globeLoaded) {
      let index = 0;
      const interval = setInterval(() => {
        index = (index + 1) % funnyMessages.length;
        setLoadingMessage(funnyMessages[index]);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [globeLoaded]);

  async function addLocation() {
    const res = await getRandomLocation();
    const newLocation = {
      latitude: res[0].latitude,
      longitude: res[0].longitude,
      locationName: res[0].locationName,
      color: "red",
    };

    setCurrentLocation(newLocation);
    console.log(newLocation);

    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        window.updateMarker(${JSON.stringify(newLocation)});
      `);
    }
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <style>
          body { margin: 0; overflow: hidden; background-color: #000; }
          #globe { width: 100vw; height: 100vh; }
        </style>
        <script src="https://unpkg.com/globe.gl"></script>
      </head>
      <body>
        <div id="globe"></div>
        <script>
          const globe = Globe()
            .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-day.jpg')
            .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
            .backgroundImageUrl('https://unpkg.com/three-globe/example/img/night-sky.png')
            .width(window.innerWidth)
            .height(window.innerHeight)
            (document.getElementById('globe'));

          // Auto-rotate initially
          globe.controls().autoRotate = true;
          globe.controls().autoRotateSpeed = 0.5;

          let marker = null;

          // Function to update marker and rotate camera smoothly
          window.updateMarker = function(newLocation) {
            if (marker) {
              globe.pointsData([]);
            }

            marker = [{
              lat: newLocation.latitude,
              lng: newLocation.longitude,
              name: newLocation.locationName,
              color: newLocation.color || 'red',
            }];

            globe
              .pointsData(marker)
              .pointLat(d => d.lat)
              .pointLng(d => d.lng)
              .pointColor(d => d.color)
              .pointAltitude(0.05)
              .pointRadius(1)
              .pointLabel(d => '<b>' + d.name + '</b>');

            // Use built-in pointOfView for smooth camera transition
            globe.controls().autoRotate = false;
            globe.pointOfView({
              lat: newLocation.latitude,
              lng: newLocation.longitude,
              altitude: 2.5
            }, 2000);
          };

          // Notify React Native when globe is ready
          setTimeout(() => {
            window.ReactNativeWebView.postMessage("globe-ready");
          }, 2000); // Simulate a small loading delay

          // Handle resize
          window.addEventListener('resize', () => {
            globe.width(window.innerWidth).height(window.innerHeight);
          });
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        style={styles.webview}
        originWhitelist={["*"]}
        source={{ html: htmlContent }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onMessage={(event) => {
          if (event.nativeEvent.data === "globe-ready") {
            setGlobeLoaded(true);
          }
        }}
      />

      {!globeLoaded && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="white" />
          <Text style={styles.loadingText}>{loadingMessage}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={addLocation}>
        <Text style={styles.buttonText}>Add Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  webview: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  loadingText: {
    marginTop: 15,
    color: "white",
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  button: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -50 }],
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 10,
    zIndex: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default CustomGlobe;
