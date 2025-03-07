import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { Button, View, Text } from "react-native";
import { useState } from "react";


// ! for the sake of keeping the code simple, I am using it here only
export default class ImageSelector {
  static async pickFromGallery() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      return result.assets[0].uri;
    }
    return null;
  };

  // 📂 Pick Image from Files
  static async pickFromFiles() {
    let result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });

    if (result.canceled) return;

    setImagePath(result.uri);
    console.log("Selected File:", result.uri);
  };

  static async pickFromCamera() {
    // let permissionGranted = await ImagePicker.getCameraPermissionsAsync(); 
    let result;
    let permission = await ImagePicker.
      requestCameraPermissionsAsync();
    if (permission.granted) {
      console.log("Permission granted");
      ImagePicker.launchCameraAsync({
        mediaTypes : "images",
        allowsEditing: true,
        quality: 0.7,
      }).then((res) => {
        console.log("Image picked:", res);
        result = res;
      });
    } else {
      permission = await ImagePicker.openSettings();
      alert(
        "Permission to access the camera was denied. Please enable it in the settings."
      );

    }
    if (!result.canceled) {
      return result.uri;
    }
    return null;
  };
}
