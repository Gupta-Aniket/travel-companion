import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import authService from '../../src/services/authService'
import { useRouter } from 'expo-router';
const Profile = () => {
  const router = useRouter();
  return (
    <View>
      <Text>Profile</Text>
      <TouchableOpacity
        onPress={() => {
          authService.logoutUser(router);
        }}
      >
        <Text>Log0ut</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})