import ThemedCard from "@/presentation/shared/ThemedCard";
import ThemedSwitch from "@/presentation/shared/ThemedSwitch";
import ThemedView from "@/presentation/shared/ThemedView";
import { useState } from "react";
import { View, Text, Switch } from "react-native";

const Switches = () => {
  const [state, setState] = useState({
    isActive: true,
    isHunbry: false,
    isHappy: true,
  });

  return (
    <ThemedView margin className="mt-2">
      <ThemedCard>
        {/* <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={state.isActive ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(value) => setState({ ...state, isActive: value })}
          value={state.isActive}
        /> */}

        <ThemedSwitch
          text="Activo"
          onValueChange={(value) => setState({ ...state, isActive: value })}
          className="mb-4"
          value={state.isActive}
        />

        <ThemedSwitch
          text="Hambriento"
          onValueChange={(value) => setState({ ...state, isHunbry: value })}
          className="mb-4"
          value={state.isHunbry}
        />

        <ThemedSwitch
          text="Contento"
          onValueChange={(value) => setState({ ...state, isHappy: value })}
          className="mb-4"
          value={state.isHappy}
        />
      </ThemedCard>
    </ThemedView>
  );
};
export default Switches;
