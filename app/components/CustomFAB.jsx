
/* eslint-disable react-native/no-inline-styles */
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Icon } from 'react-native-elements';
import  ImageSelector  from '../utils/imagePicker';
import { router, link } from 'expo-router';

import { useDataItem } from '../contexts/userDataContext';



const CustomFAB = () => {
  const { data } = useDataItem();
  const width = useSharedValue(60);
  const height = useSharedValue(60);
  const borderRadius = useSharedValue(50);
  const isOpen = useSharedValue(false);
  const progress = useDerivedValue(() =>
    isOpen.value ? withTiming(1) : withTiming(0),
  );
  const handleOpen = () => {
    if (!isOpen.value) {
      width.value = withSpring(200);
      height.value = withSpring(250);
      borderRadius.value = withSpring(10);
      isOpen.value = true;
    }
  };

  const handleClose = () => {
    if (isOpen.value) {
      width.value = withTiming(60);
      height.value = withTiming(60);
      borderRadius.value = withTiming(50);
      isOpen.value = false;
    }
  };

  const plusIcon = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${progress.value * 45}deg` }],
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: height.value,
      borderRadius: borderRadius.value,
    };
  });

  return (
    <View >
      <Animated.View style={[styles.container, animatedStyle]}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            handleOpen();
            handleClose();
          }}>
          <Animated.View style={[styles.iconContainer, plusIcon]}>
            <Icon name="add" size={30} color="white" />
          </Animated.View>
        </TouchableOpacity>

        {/* first button 
        TODO : ADD IF DATA IS PASSED, THEN OPEN TICKET DETAILS FORM ADD ABILITY TO GO BACK
        TODO : IF IT IS PASSED FROM THE TICKETS SCREEN, ALLOW USERS TO EDIT THE TICKET OUT
        */}
        <TouchableOpacity
          onPress={() => {
            try {
              const jsonData = JSON.stringify({ hello: 'hi' });
              console.log("Data being sent:", jsonData);
              router.push({
                pathname: "/intermeidate/TicketDetailsForm",
              });
            } catch (error) {
              console.error("Error stringifying data:", error);
            }
          }}
        >
          <View style={styles.contentContainer}>
            <View style={styles.iconContainer}>
              <Icon
                name="clipboard-outline"
                type="ionicon"
                color="white"
                size={30} />
            </View>
            <Text style={styles.text}>Add Manually</Text>
          </View>
        </TouchableOpacity>

        {/* second button */}
        <TouchableOpacity

          onPress={ async ()=>{
             {
               const imagePath = await ImageSelector.pickFromGallery();
               console.log("Image selected:", imagePath);
              // ! change this below to use image path
              // if (!imagePath) {
              //   const result = await GeminiApiService.getTicketDetailsFromImage(imagePath);
              //   console.log("Result:", result);
              // }
            }
            
          }}
        >
          <View style={styles.contentContainer}>
            <View style={styles.iconContainer}>
              <Icon
                name="document-outline"
                type="ionicon"
                color="white"
                size={30} />
            </View>
            <Text style={styles.text}>Upload Image</Text>
          </View>
        </TouchableOpacity>

        {/* third button */}
        <TouchableOpacity 
        onPress={ async ()=>{
          {
            const imagePath = await ImageSelector.pickFromCamera();
            console.log("Image selected:", imagePath);
           // ! change this below to use image path
           // if (!imagePath) {
           //   const result = await GeminiApiService.getTicketDetailsFromImage(imagePath);
           //   console.log("Result:", result);
           // }
         }
         
       }}
        >
          <View style={styles.contentContainer}>
            <View style={styles.iconContainer}>
              <Icon
                name="camera-outline"
                type="ionicon"
                color="white"
                size={30} />
            </View>
            <Text style={styles.text}>Click Image</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View >
  );
};



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0F56B3',
    position: 'absolute',
    bottom: 30,
    right: 30,
    overflow: 'hidden',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 26,
    height: 26,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});

export default CustomFAB;