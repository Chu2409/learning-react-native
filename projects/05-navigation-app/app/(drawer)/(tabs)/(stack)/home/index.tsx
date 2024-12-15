import CustomButton from "@/components/shared/CustomButton";
import { DrawerActions } from "@react-navigation/native";
import { Link, router, useNavigation } from "expo-router";
import { View, Text, SafeAreaView } from "react-native";

const HomeScreen = () => {

  const navigation = useNavigation()

  const onToggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer())
  }

  return (
    <SafeAreaView>
      <View className="px-10 pt-4">
        
        <CustomButton className="mb-2" color="primary" onPress={() => router.push("/products")}>
          Productos
        </CustomButton>

        <CustomButton className="mb-2" color="secondary" onPress={() => router.push("/profile")}>
          Profile
        </CustomButton>

        <CustomButton className="mb-2" color="tertiary" onPress={() => router.push("/settings")}>
          Settings
        </CustomButton>

        <Link href="/products" asChild>
          <CustomButton  className="mb-10" variant="text-only">Productos</CustomButton>
        </Link>

        <CustomButton onPress={onToggleDrawer}>Abrir menu</CustomButton>

        {/* <Link className='mb-5' href="/products">Productos</Link>
      <Link className='mb-5' href="/profile">Profile</Link>
      <Link className='mb-5' href="/settings">Settings</Link> */}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
