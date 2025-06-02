import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements'
// import  GeminiApiService  from '../src/services/geminiApiService';
import * as FileSystem from 'expo-file-system';
import { useRouter } from 'expo-router';
// import  ImageSelector  from '../utils/imagePicker';
// import UnsplashAPIController from '../controllers/unsplashAPIContoller';

const Test = () => {

  const router = useRouter();
  return (
    <View>
      <Text>Test</Text>
      <Button title="Test" 
        onPress={
          router.push("../../components/modal")
        }

      />
    </View>
  )
}

export default Test

const styles = StyleSheet.create({})

// ! for fetching the ticket detials from image
// onPress={
//   async ()=>{
//     const imagePath = await ImageSelector.pickFromGallery();
//     console.log("Image selected:", imagePath);
//     if(imagePath){
//       const result = await GeminiApiService.getTicketDetailsFromImage(imagePath);
//       console.log("Result:", result);
//     }
//   }
// }

// ! for cities image
// async () => {
  //   // !get the cities list from gemini api || database
  //   const cities = ["Darjeeling"];
  //   const cityImage = await UnsplashAPIController.getCityImage(cities);