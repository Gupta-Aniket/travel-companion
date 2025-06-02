import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TextInput,
  TouchableOpacity,
  Linking,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import React, { useState } from 'react'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'
import { Formik } from 'formik';
import { useRouter } from 'expo-router';
import * as Yup from 'yup';
import globalStyles from '../../src/constants/globalstyles.jsx';
import InputField from '../../src/components/InputField.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import geminiController from '../../src/controllers/geminiController.js';
import UIConstants from '../../src/constants/ui.js';


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const linkToGeminiAPI = () => {
    Linking.openURL("https://aistudio.google.com/apikey");
  }
  const handleCreateAccount = (values) => {
    console.log("Submitted", values);
    // TODO: Handle Signup API Call Here
    geminiController.validateApiKey(values.apiKey).then((isValid) => {
      if (isValid) {
        router.push("app/(tabs)/dashboard");
        console.log("Successfully validated API key:", values.apiKey);
        // TODO: Handle Successful Signup
      } else {
        // TODO: Handle Invalid API Key
        throw new Error("Invalid API Key");
      }
    });
  };


  return (

    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      extraScrollHeight={20}
      automaticallyAdjustContentInsets={true}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={[styles.heading, { color: UIConstants.colors.primaryBlue }]}>Create</Text>
          <Text style={styles.heading}> New Account</Text>
        </View>
        <View>
          <Icon
            size={80}
            style={{ paddingBottom: 20, paddingTop: 20 }}
            name="person-add-outline"
            type="ionicon"
            color={UIConstants.colors.primaryBlue} />
        </View>


        <Formik
          initialValues={{
            fullName: "",
            email: "",
            apiKey: "",
          }}
          validationSchema={Yup.object({
            fullName: Yup.string().min(3, "Full Name must be at least 3 characters").required("Full Name is required"),
            email: Yup.string()
              .email("Enter a valid email address")
              .required("Email is required"),
            apiKey: Yup.string()
              .required("Gemini API Key is required")
              .test("is-valid", "Invalid API Key", async (value) => await geminiController.validateApiKey(value)),

          })}
          onSubmit={(values) => {
            handleCreateAccount(values);
            // TODO: Handle Signup API Call Here
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
            <View>
              {/* Full Name */}
              <InputField
                label="Full Name"
                iconName="person"
                placeholder="Enter your full name"
                formikProps={{ handleChange, handleBlur, values, errors, touched }}
                fieldName="fullName"
              />
              {/* Email Input */}
              <InputField
                label="Email Address"
                iconName="mail"
                placeholder="Enter your email"
                keyboardType="email-address"
                formikProps={{ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }}
                fieldName="email"
              />

              {/* Gemini API Key */}

              <InputField
                label="Your Gemini API Key"
                iconName="key"
                placeholder="Enter API Key"
                formikProps={{ handleChange, handleBlur, values, errors, touched }}
                trailingIconName={"information-circle-outline"}
                fieldName="apiKey"
                onTrailingIconPress={linkToGeminiAPI}
              />


              <View style={{ height: 30 }}></View>

              {/* Submit Button */}
              <TouchableOpacity style={globalStyles.button} onPress={handleSubmit}>
                <Text style={globalStyles.buttonText}>Signup</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={() =>
            router.push("/auth/login")
          }>
          <Text style={globalStyles.textButton}>Already have an account? Login Here</Text>
        </TouchableOpacity>

      </View>


    </KeyboardAwareScrollView>



  )
}


export default Signup

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'Center',
    alignItems: 'Center',
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
    fontWeight: 500,
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