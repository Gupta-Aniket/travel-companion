import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  form: {
    justifyContent: "center",
  },
  input: {
    borderWidth: 0,
    flex: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  textButton: {
    color: "blue",
    textAlign: "center",
    marginTop: 10,
  },
  textRight:{
    textAlign: "right",
  }
});

export default globalStyles; 
