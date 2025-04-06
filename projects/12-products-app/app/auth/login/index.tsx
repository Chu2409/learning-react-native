import { useAuthStore } from '@/presentation/auth/store/useAuthStore'
import ThemedButton from '@/presentation/theme/components/ThemedButton'
import ThemedLink from '@/presentation/theme/components/ThemedLink'
import { ThemedText } from '@/presentation/theme/components/ThemedText'
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput'
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor'
import { router } from 'expo-router'
import { useState } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native'

const LoginScreen = () => {
  const { login } = useAuthStore()

  const { height } = useWindowDimensions()
  const backgroundColor = useThemeColor({}, 'background')

  const [isPosting, setIsPosting] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const onLogin = async () => {
    const { email, password } = form

    console.log({ email, password })

    if (email.length === 0 || password.length === 0) return

    setIsPosting(true)

    const wasSuccessfull = await login(email, password)

    setIsPosting(false)

    if (wasSuccessfull) {
      router.replace('/')
      return
    }

    Alert.alert('Error', 'Credenciales incorrectas')
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 24, backgroundColor }}>
        <View style={{ paddingTop: height * 0.3 }}>
          <ThemedText type='title'>Ingresar</ThemedText>
          <ThemedText style={{ color: 'grey' }}>
            Por favor ingrese para continuar
          </ThemedText>
        </View>

        <View style={{ marginTop: 20 }}>
          <ThemedTextInput
            placeholder='Correo Electrónico'
            keyboardType='email-address'
            autoCapitalize='none'
            icon='mail-outline'
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
          />

          <ThemedTextInput
            placeholder='Contraseña'
            secureTextEntry
            icon='lock-closed-outline'
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
          />
        </View>

        <View style={{ marginTop: 10 }}></View>

        <ThemedButton
          disabled={isPosting}
          onPress={onLogin}
          icon='arrow-forward-outline'
        >
          Ingresar
        </ThemedButton>

        <View style={{ marginTop: 50 }}></View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ThemedText>¿No tienes cuenta? </ThemedText>

          <ThemedLink href='/auth/register' style={{ marginHorizontal: 5 }}>
            Crear Cuenta
          </ThemedLink>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen
