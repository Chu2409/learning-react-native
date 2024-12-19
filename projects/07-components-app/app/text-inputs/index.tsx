import ThemedCard from "@/presentation/shared/ThemedCard";
import ThemedTextInput from "@/presentation/shared/ThemedTextInput";
import ThemedView from "@/presentation/shared/ThemedView";
import ThemedText from "@/presentation/shared/ThemedText";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, TextInput } from "react-native";

const isIOS = Platform.OS === "ios";

const TextInputsScreen = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  return (
    <KeyboardAvoidingView behavior={isIOS ? 'height' : undefined}>
      <ScrollView>
        <ThemedView margin>
          <ThemedCard className="mb-5">
            <ThemedTextInput
              onChangeText={(text) =>
                setForm({
                  ...form,
                  name: text,
                })
              }
              autoCorrect={false}
              autoCapitalize="words"
              placeholder="Daniel"
            />

            <ThemedTextInput
              onChangeText={(text) =>
                setForm({
                  ...form,
                  email: text,
                })
              }
              autoCorrect={false}
              keyboardType="email-address"
              placeholder="daniel@gmail.com"
            />

            <ThemedTextInput
              onChangeText={(text) =>
                setForm({
                  ...form,
                  phone: text,
                })
              }
              autoCorrect={false}
              keyboardType="phone-pad"
              placeholder="Teléfono"
            />
          </ThemedCard>

          <ThemedCard className="my-2">
            <ThemedText>{JSON.stringify(form, null, 2)}</ThemedText>
          </ThemedCard>

          <ThemedCard className="my-2">
            <ThemedText>{JSON.stringify(form, null, 2)}</ThemedText>
          </ThemedCard>

          <ThemedCard className="my-2">
            <ThemedText>{JSON.stringify(form, null, 2)}</ThemedText>
          </ThemedCard>

          <ThemedCard className="my-2">
            <ThemedText>{JSON.stringify(form, null, 2)}</ThemedText>
          </ThemedCard>

          <ThemedCard className="my-2">
            <ThemedText>{JSON.stringify(form, null, 2)}</ThemedText>
          </ThemedCard>

          <ThemedCard className="my-2">
            <ThemedText>{JSON.stringify(form, null, 2)}</ThemedText>
          </ThemedCard>

          <ThemedCard className="my-2">
            <ThemedText>{JSON.stringify(form, null, 2)}</ThemedText>
          </ThemedCard>

          <ThemedCard className="my-2">
            <ThemedText>{JSON.stringify(form, null, 2)}</ThemedText>
          </ThemedCard>

          <ThemedCard style={{
            marginBottom: isIOS ? 1000 : 20
          }}>
            <ThemedTextInput
              onChangeText={(text) =>
                setForm({
                  ...form,
                  phone: text,
                })
              }
              autoCorrect={false}
              keyboardType="phone-pad"
              placeholder="Teléfono"
            />
          </ThemedCard>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default TextInputsScreen;
