import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import React, { useState } from 'react'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'
import { Formik } from 'formik';
import { useRouter } from 'expo-router';
import * as Yup from 'yup';
import globalStyles from '../constants/globalstyles.jsx';
import InputField from '../components/InputField.jsx';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import   UIConstants  from '../constants/ui.jsx';
import authService from '../services/authService.jsx';

const Login = () => {
  const router = useRouter();
  const handleLogin = (values) => {
    if(authService.checkUserExists(values.email)){
      console.log(values);
      // Send OTP
      try{
        authService.sendOtp(values.email);
      }catch(error){
        console.error("Error sending OTP:", error.message);
        alert("Error sending OTP");
      }
      // Navigate to OTP screen
      router.push({
        pathname : "/auth/otp",
        params : {
          email : values.email
        }}
      );
    }
  };


  return (

    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      justifyContent="center"
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      extraScrollHeight={20}
      automaticallyAdjustContentInsets={true}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={[styles.heading, { color: UIConstants.colors.primaryBlue }]}>Log</Text>
          <Text style={styles.heading}> in</Text>
        </View>
        {/* <View style = {{height: 40}}></View> */}
        <View>
          <Icon
            size={100}
            style={{ paddingBottom: 20, paddingTop: 50 }}
            name="person-outline"
            type="ionicon"
            color={UIConstants.colors.primaryBlue} />
        </View>


        <Formik
        //TODO : CHANGE EMAIL TO "" AFTER TESTING
          initialValues={{ email: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Enter a valid email address")
              .required("Email is required"),
          })}
          onSubmit={(values) => {
            handleLogin(values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, onfocus }) => (
            <View>
              {/* Email Input */}
              <InputField
                label="Email Address"
                iconName="mail"
                placeholder="Enter your email"
                keyboardType="email-address"
                formikProps={{ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }}
                fieldName="email"
              />

              {/* Spacer */}
              <View style={{ height: 28 }}></View>

              {/* Login Button */}
              <TouchableOpacity style={globalStyles.button} onPress={handleSubmit}>
                <Text style={globalStyles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>


        {/* Spacer */}
        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() =>
            router.push("/auth/signup")
          }>
          <Text style={globalStyles.textButton}>New to Travel Companion? Sign Up Here</Text>
        </TouchableOpacity>

      </View>



    </KeyboardAwareScrollView>



  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    alignItems: 'Center',
    justifyContent: 'Center',
    paddingTop: 40,
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: "center",
    alignItems: 'Center',
  },
  heading: {
    fontFamily: 'Poppins-Bold',
    fontSize: 36,
    fontWeight: 400,
    color: '#',
  },
  passwordSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  lockIcon: {
    marginRight: 10,
  },
})