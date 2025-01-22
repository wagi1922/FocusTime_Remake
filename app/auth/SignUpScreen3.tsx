import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  Dimensions, 
  SafeAreaView, 
  ScrollView,
  Alert
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get('window');

const avatarImages: any[] = [
  require('../../assets/images/avatar1.png'),
  require('../../assets/images/avatar2.png'),
  require('../../assets/images/avatar3.png'),
  require('../../assets/images/avatar4.png'),
  require('../../assets/images/avatar5.png'),
];

const SignUpScreen3: React.FC = () => {
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [username, setUsername] = useState("");
  const kembali = (): void => {
    router.replace('/auth/SignUpScreen2');
  };
  const next =  async () => {
      if (!username) {
        Alert.alert("Username Tidak boleh Kosong");
        return;
      }
    await AsyncStorage.setItem('username', username);
    router.replace('/auth/SelectRole');
  };

  const handleAvatarSelect = (index: number): void => {
    setSelectedAvatar(index);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.textLayout}>
          <Text style={styles.title}>Sebelum kita mulai...</Text>
          <Text style={styles.title1}>Kenalan dulu yuk!</Text>
          </View>
          <Image style={styles.gambar} source={require('../../assets/images/singup3.png')} />
          <View style={styles.textLayout1}>
          <Text style={styles.title2}>Siapa nama kamu?</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukan username anda"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          <Text style={styles.title3}>Pilih avatar yang kamu suka~</Text>
          </View>
          <View style={styles.avatarContainer}>
            {avatarImages.map((image, index) => (
              <TouchableOpacity key={index} onPress={() => handleAvatarSelect(index)}>
                <Image
                  source={image}
                  style={[
                    styles.avatar,
                    selectedAvatar === index && styles.selectedAvatar,
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.buttonLayout}>
          <TouchableOpacity style={styles.button} onPress={next}>
            <Text style={styles.buttonText}>Lanjut</Text>
          </TouchableOpacity>
          <Text style={styles.link} onPress={kembali}>
            kembali
          </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height * 0.05,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: width * 0.05,
  },
  title: {
    width: 184,
    height: 78,
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'left',
    marginBottom: height * 0.02,
  },
  title1: {
    fontSize: 16,
    fontWeight:'400',
    textAlign: 'center',
    marginBottom: height * 0.02,
  },
  title2: {
    fontSize: 16,
    marginBottom: height * 0.01,
  },
  title3: {
    fontSize: width * 0.045,
    marginBottom: height * 0.02,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#fff',
    width: 300,
    height: 50,
    marginBottom: 30,
  },
  avatarContainer: {
    flexDirection: 'row',
    gap: 15,
    flexWrap: 'wrap',
    marginBottom: height * 0.02,
  },
  avatar: {
    borderRadius: width * 0.1,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedAvatar: {
    borderColor: '#161D6F',
  },
  button: {
    width: 310,
    height: 50,
    backgroundColor: '#161D6F',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: width * 0.045,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontSize: width * 0.04,
  },
  gambar: {
    width: width * 0.6,
    height: height * 0.25,
    resizeMode: 'contain',
    marginBottom: height * 0.02,
  },
  textLayout:{
    alignItems: 'baseline',
    right: 55
  },
  textLayout1:{
    alignItems: 'baseline',
  },
  buttonLayout:{
    top: 30,
  }
});

export default SignUpScreen3;
