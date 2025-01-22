import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import API_URL from "../../config/config";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUpScreenGuru: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Variabel untuk konfirmasi password
  const [show, setShow] = useState<boolean>(false);
  const [birthDate, setbirthDate] = useState<Date>(new Date());
  const [role, setRole] = useState('');

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || birthDate;
    setShow(false);
    setbirthDate(currentDate);
  };

  useEffect(() => {
    const fetchRole = async () => {
      const storedRole = await AsyncStorage.getItem('role');
      const storedUsrname = await AsyncStorage.getItem('username');
      setRole(storedRole || ' ');
      setUsername(storedUsrname || ' ');
    };
    fetchRole();
  }, []);

  const handleRegister = async () => {
    if (!email || !password || !birthDate) {
      Alert.alert("Semua kolom wajib diisi!");
      return;
    }

    if (password !== confirmPassword) { // Validasi baru
      Alert.alert("Password dan Konfirmasi Password tidak sesuai!");
      return;
    }

    const formattedDate = birthDate.toISOString().split("T")[0];
    console.log("Data yang akan dikirim:", {
      username,
      email,
      password,
      birthDate: formattedDate,
      role
    });
    try {
      await axios.post(`${API_URL}/api/auth/register`, {
        username,
        email,
        password,
        birthDate: formattedDate,
        role
      });
      router.replace("/auth/LoginScreen");
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = (error as any).response?.data?.message || "An error occurred";
      Alert.alert(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textLayout}>
        <Text style={{ fontWeight: "bold", fontSize: 32 }}>Isi data diri</Text>
        <Text style={{ textAlign: "center" }}>
          Lanjut ke pendaftaran{"\n"}agar kamu terdata
        </Text>
      </View>

      <View style={styles.isi}>

        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukan email anda"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukan password anda"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.text}>Konfirmasi Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Konfirmasi password"
          value={confirmPassword}
          onChangeText={setConfirmPassword} // Mengambil input konfirmasi password
          secureTextEntry
        />

        <Text style={styles.text}>Tanggal Lahir</Text>
        <TouchableOpacity style={styles.dateInput} onPress={() => setShow(true)}>
          <Text style={styles.dateText}>{birthDate.toISOString().split("T")[0]}</Text>
        </TouchableOpacity>

        {show && (
          <DateTimePicker value={birthDate} mode="date" display="default" onChange={onChange} />
        )}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Daftar</Text>
        </TouchableOpacity>

        <Text style={styles.link} onPress={() => router.push("/auth/LoginScreen")}>
          kembali
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
  },
  isi: {
    width: 300,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: "#fff",
    height: 50,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#fff",
    height: 50,
    justifyContent: "center",
    marginBottom: 30,
  },
  dateText: {
    fontSize: 16,
    color: "#000",
  },
  button: {
    width: "auto",
    height: 50,
    top: 0,
    margin: 0,
    backgroundColor: "#161D6F",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
    textAlign: "center",
    top: 10,
  },
  textLayout: {
    bottom: 30,
  },
  text: {
    fontSize: 15,
    fontWeight: "400",
    height: 18,
    marginBottom: 5,
  },
});

export default SignUpScreenGuru;
