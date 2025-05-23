import ThemedButton from '@/presentation/theme/components/ThemedButton'
import ThemedLink from '@/presentation/theme/components/ThemedLink'
import { ThemedText } from '@/presentation/theme/components/ThemedText'
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput'
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor'
import {
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native'

const RegisterScreen = () => {
  const { height } = useWindowDimensions()
  const backgroundColor = useThemeColor({}, 'background')

  return (
    <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 24, backgroundColor }}>
        <View style={{ paddingTop: height * 0.3 }}>
          <ThemedText type='title'>Crear cuenta</ThemedText>
          <ThemedText style={{ color: 'grey' }}>
            Por favor crea una cuenta para continuar
          </ThemedText>
        </View>

        <View style={{ marginTop: 20 }}>
          <ThemedTextInput
            placeholder='Nombre Completo'
            keyboardType='default'
            icon='person-outline'
          />

          <ThemedTextInput
            placeholder='Correo Electrónico'
            keyboardType='email-address'
            autoCapitalize='none'
            icon='mail-outline'
          />

          <ThemedTextInput
            placeholder='Contraseña'
            secureTextEntry
            icon='lock-closed-outline'
          />
        </View>

        <View style={{ marginTop: 10 }}></View>

        <ThemedButton icon='arrow-forward-outline'>Crear cuenta</ThemedButton>

        <View style={{ marginTop: 50 }}></View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ThemedText>¿Ya tienes cuenta? </ThemedText>

          <ThemedLink href='/auth/login' style={{ marginHorizontal: 5 }}>
            Ingresar
          </ThemedLink>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen
