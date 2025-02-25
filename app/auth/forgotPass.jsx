import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { Icon } from 'react-native-elements'

const ForgotPassword = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text>
          <Icon name="arrow-back" size={30} color="#4391DA" />
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'Center',
    justifyContent: 'Center',
    paddingTop: 30,
    padding: 10,
  },
})