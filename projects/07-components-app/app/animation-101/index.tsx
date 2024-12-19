import { useAnimation } from "@/hooks/useAnimation";
import ThemedButton from "@/presentation/shared/ThemedButton";
import ThemedView from "@/presentation/shared/ThemedView";
import { useRef } from "react";
import { Animated, Easing, View } from "react-native";

const Animation101Screen = () => {

  const {animatedOpacity, animatedTop, fadeIn, fadeOut, startMovingTop} = useAnimation()

  return (
    <ThemedView margin className="justify-center items-center flex-1">
      <Animated.View className="bg-light-secondary dark:bg-dark-secondary rounded-xl" style={{
        width: 200,
        height: 200,
        opacity: animatedOpacity,
        transform: [{ translateY: animatedTop }],
      }}/>

      <ThemedButton className="my-5"  onPress={() => {
        fadeIn({});
        startMovingTop({
          easing: Easing.bounce,
          duration: 700,
        });
      }}>
        Fade In
      </ThemedButton>
      <ThemedButton  className="my-5" onPress={() => fadeOut({})}>Fade Out</ThemedButton>
    </ThemedView>
  );
};
export default Animation101Screen;
