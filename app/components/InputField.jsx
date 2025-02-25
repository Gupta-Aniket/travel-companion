import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const InputField = ({
  label, 
  iconName, 
  placeholder,
  keyboardType, 
  secureTextEntry = false, 
  formikProps, 
  fieldName,
  trailingIconName, // Optional trailing icon
  onTrailingIconPress // Optional trailing icon action
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {/* Left-side icon */}
        <Icon style={styles.icon} name={iconName} size={20} color="#000" />
        
        {/* TextInput */}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={isSecure}
          
          keyboardType={keyboardType}
          onChangeText={
            label === "Phone Number" ?
            (text) => {
              if (!text.startsWith("+91")) {
                formikProps.setFieldValue("phone", "+91 ");
              } else {
                formikProps.setFieldValue("phone", text);
              }
            } :
            
            formikProps.handleChange(fieldName)
          }
          onBlur={formikProps.handleBlur(fieldName)}
          value={formikProps.values[fieldName]}
        />

        {/* Right-side icon (Only visible if `trailingIconName` is provided) */}
        {trailingIconName && (
          <TouchableOpacity onPress={onTrailingIconPress || (() => setIsSecure(!isSecure))}>
            <Icon 
              style={styles.trailingIcon} 
              name={isSecure ? "eye-slash" : "eye"} 
              size={20} 
              color="#666" 
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Error message */}
      {formikProps.touched[fieldName] && formikProps.errors[fieldName] && (
        <Text style={styles.errorText}>{formikProps.errors[fieldName]}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  trailingIcon: {
    marginLeft: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default InputField;
