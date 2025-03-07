import { Dimensions, Image, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function CustomCarousel() {
  const data = [
    "https://picsum.photos/200/300?random=1",
    "https://picsum.photos/200/300?random=2",
    "https://picsum.photos/200/300?random=3",
    "https://picsum.photos/200/300?random=4",
    "https://picsum.photos/200/300?random=5",
    "https://picsum.photos/200/300?random=6",
  ];
  return (
    <Carousel
      data={data}
      renderItem={({ item }) => (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Image
            source={{ uri: item }}
            style={{
              zIndex: 1,
              borderRadius: 5,
              width: windowWidth * 0.8,
              height: windowHeight * 0.3,
              marginBottom: 5,
            }}
          />
        </View>
      )}
      width={windowWidth}
      height={windowHeight * 0.3}
      autoPlay={true}
      autoPlayInterval={5000}
      loop={true} // Ensures infinite scrolling
    />
  );
};
