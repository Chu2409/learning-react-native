import MainSlideshow from "@/presentation/components/movies/MainSlideshow";
import MovieHorizontalList from "@/presentation/components/movies/MovieHorizontalList";
import { useMovies } from "@/presentation/hooks/useMovies";
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeScreen = () => {
  const safeArea = useSafeAreaInsets();
  const { nowPlayingQuery, popularQuery, topRated, upcoming } = useMovies();

  if (nowPlayingQuery.isLoading) {
    return (
      <View className="justify-center items-center flex-1">
        <ActivityIndicator color="purple" size={40} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View className="mt-2 pb-10" style={{ paddingTop: safeArea.top }}>
        <Text className="text-3xl font-bold px-4 mb-2">MoviesApp</Text>

        <MainSlideshow movies={nowPlayingQuery.data ?? []} />

        <MovieHorizontalList
          movies={popularQuery.data ?? []}
          title="Populares"
          className="mb-5"
        />

        <MovieHorizontalList
          movies={topRated.data?.pages.flat() ?? []}
          title="Mejor Calificadas"
          className="mb-5"
          loadNextPage={topRated.fetchNextPage}
        />

        <MovieHorizontalList
          movies={upcoming.data ?? []}
          title="Proximamente"
          className="mb-5"
        />

        <MovieHorizontalList
          movies={upcoming.data ?? []}
          title="Proximamente"
          className="mb-5"
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
