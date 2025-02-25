import { StyleSheet, 
          Text, 
          View, 
          SafeAreaView, 
          Button, 
          TextInput, 
          TouchableOpacity,
          KeyboardAvoidingView,
          Platform} from 'react-native'
import React, { useState } from 'react'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'
import { Formik } from 'formik';
import { useRouter } from 'expo-router';
import * as Yup from 'yup';
import  globalStyles  from '../constants/globalstyles.jsx';
import InputField from '../components/InputField.jsx';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  
  const handleLogin = (values) => {
    console.log("Submitted", values);
  };

  return (
    <GestureHandlerRootView>
      <KeyboardAwareScrollView 
        style={{flex: 1}}
        contentContainerStyle={styles.container}
        
        enableOnAndroid = {true}
        extraScrollHeight={20}
        automaticallyAdjustContentInsets={true}
      >
        <View style = {styles.container}>
          <View style = {styles.headerContainer}>
            <Text style = {[styles.heading, {color: '#4391DA'}]}>Log</Text>
            <Text style = {styles.heading}> in</Text>
          </View>
          {/* <View style = {{height: 40}}></View> */}
          <View>
            <Icon 
              size={100}
              style={{paddingBottom: 20, paddingTop: 50}}
              name="person-outline"
              type="ionicon" 
              color="#4391DA" />
          </View>


          <Formik
            initialValues={{ phone: "+91", password: "" }}
            validationSchema={Yup.object({
              phone: Yup.string()
                .matches(/^\+91\d{10}$/, "Enter a valid Indian phone number (+91XXXXXXXXXX)")
                .required("Phone number is required"),
              password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
            })}
            // TODO: HANDLE SUBMIT 
            onSubmit={(values) => {
              handleLogin(values);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue}) => (
              <View>
                {/* Phone Number Input */}
                
                <InputField 
                        label="Phone Number"
                        iconName="phone" 
                        placeholder="+91XXXXXXXXXX" 
                        keyboardType="numeric"
                        formikProps={{ handleChange, handleBlur, handleSubmit ,values, errors, touched, setFieldValue}} fieldName="phone" />

                {/* Password Input */}
                
                <InputField 
                        label="Password"
                        iconName="lock" 
                        placeholder="Password" 
                        secureTextEntry={true} 
                        formikProps={{ handleChange, handleBlur, handleSubmit, values, errors, touched }} fieldName="password" 
                        trailingIconName={"eye"} 
                        />

                {/* Show/Hide Password Toggle */}
                {/* <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Text style={globalStyles.textButton}>{showPassword ? "Hide" : "Show"} Password</Text>
                </TouchableOpacity> */}

                {/* Forgot Password */}
                <TouchableOpacity onPress={() => router.push("auth/forgotPass")}>
                  <Text style={[globalStyles.textButton, globalStyles.textRight]}>Forgot Password?</Text>
                </TouchableOpacity>
                <View style={{height: 20}}></View>
                {/* Login Button */}
                <TouchableOpacity style={globalStyles.button} onPress={handleSubmit}>
                  <Text style={globalStyles.buttonText}>Login</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>

          

        </View>
        

       
      </KeyboardAwareScrollView>

    </GestureHandlerRootView>
   
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
  headerContainer:{
    flexDirection: 'row',
    width : "100%",
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