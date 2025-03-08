import { StyleSheet, Text, Image, View, FlatList, Dimensions } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';
const screenWidth = Dimensions.get("window").width;
const columnWidth = screenWidth / 2 - 10; // Adjust for spacing

const CustomMasionaryList = ({ images }) => {

  const leftColumn = images.filter((_, index) => index % 2 === 0);
  const rightColumn = images.filter((_, index) => index % 2 !== 0);

  return (
    <ScrollView style={{flex : 1}}>
      <View style={{
        flexDirection: "row", justifyContent: "space-between", padding: 5
      }}>

        {/* Left Column */}
        <FlatList
          scrollEnabled={false}
          data={leftColumn}
          keyExtractor={(item) => item.imgUrl}
          renderItem={({ item, index }) => (
            <CustomImage
              image={item}
              index={index}
              rowIndex={0} />
          )}
        />
        <View style={{padding: 5}}>

        </View>
        {/* Right Column */}
        <FlatList
          scrollEnabled={false}
          data={rightColumn}
          keyExtractor={(item) => item.imgUrl}
          renderItem={({ item, index }) => (
            <CustomImage
              image={item}
              index={index}
              rowIndex={1} />
          )}
        />
      </View>
      <View style={{ paddingTop: 10, paddingBottom: 20 }}>
        
      </View>
    </ScrollView>
  )
}


const CustomImage = ({ image, index, rowIndex }) => {
  return (
    <>
      <View
        style={{
          marginBottom: 5,
          height: (rowIndex + index) % 2 === 0 ? 300 : 150,
        }}
      >
        <Image
          source={{ uri: image.imgUrl }}
          style={{
            zIndex: 1,
            borderRadius: 5,
            width: "100%",
            height: (rowIndex + index) % 2 === 0 ? 300 : 150,
            marginBottom: 5,
          }}
        />
        {
          image.imgDescription &&
          <View
          style={{
            zIndex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "white",
            width: columnWidth,
            height: 30,
            marginBottom: 1,
            padding: 5,
            borderRadius: 5,
            position: "absolute",
            bottom: 0,
            left: 0,
          }}
        >
          <Text style={{
            zIndex: 2,
            color: "white",
            maxWidth: columnWidth * 0.95,
            marginLeft: 4,
          }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {image.imgDescription}
          </Text>
        </View>}


      </View>

    </>
  )
}
export default CustomMasionaryList

const styles = StyleSheet.create({})