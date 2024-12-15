import { Cast } from "@/infrastructure/interfaces/cast.interfacae";
import { View, Text, FlatList } from "react-native";
import { ActorCard } from "./ActorCard";

interface Props {
  actors: Cast[];
}

const MovieCast = ({ actors }: Props) => {
  return (
    <View className="mt-5 mb-20">
      <Text className="font-bold text-2xl px-5 mb-4">Actores</Text>

      <FlatList
        data={actors}
        keyExtractor={(item) => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <ActorCard actor={item} />
        )}
      />
    </View>
  );
};

export default MovieCast;
