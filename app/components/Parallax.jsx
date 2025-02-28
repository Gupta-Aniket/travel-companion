import { StyleSheet, View, Image } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';



const HEADER_HEIGHT = 250;

export default function ParallaxScrollView({
  children,
  headerImage,
}) {
  const scrollRef = useAnimatedRef();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    < View style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: "#fff" },
            headerAnimatedStyle,
          ]}>
          {<Image source={require("../../assets/images/parallax_header_image.jpg")} style={{ width: 300, height: 200 }}/>}
        </Animated.View>
        < View style={styles.content}>{children}</ View>
      </Animated.ScrollView>
    </ View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 200,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 10,
    gap: 16,
    overflow: 'hidden',
  },
});