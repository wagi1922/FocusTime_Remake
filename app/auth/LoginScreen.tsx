import axios from "axios";
import {useRouter} from "expo-router";
import React, { useState } from 'react';
import API_URL from "../../config/config";
import {ThemedView} from "@/components/ThemedView";
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TextInput, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';

const LoginScreen = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
            const { token } = response.data.data;
            await AsyncStorage.setItem("token", token);
            Alert.alert("Login successful!")
            router.replace("/(tabs)/MuridScreen")
        } catch (error) {
            const errorMessage = (error as any).response?.data?.message || "An error occurred";
            Alert.alert(errorMessage)
            
        }
    };


    const signUp = () => {
        router.replace('/auth/SignUpScreen1');
    };

    return (
        <ThemedView style={styles.container}>
            <LinearGradient
                colors={['#C7FFD8', 'transparent']}
                style={styles.background}
            />
            <View style={styles.content}>
                <Image
                    style={styles.gambar}
                    source={require("../../assets/images/fokustime.png")}
                />
                <Text style={styles.title1}>Belajar dengan fokus dan juga seru!</Text>
                <View style={styles.isi}>
                    <View style={styles.inputlayout}>
                    <Text style={styles.title}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Text style={styles.title}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2} onPress={signUp}>
                        <Text style={styles.buttonText1}>Belum Punya Akun? Daftar sekarang</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ThemedView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff'
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 412,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title1: {
        fontSize: 17,
        fontWeight: '700',
        textAlign: 'center',
        marginVertical: 20,
        top: 20
    },
    title: {
        fontSize: 15,
        fontWeight: '400',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 15,
        backgroundColor: '#fff',
        height : 50
    },
    gambar: {
        width: 413,
        height: 103,
        resizeMode: 'contain',
        marginBottom: 20,
        bottom: 40,
        gap: 0,

    },
    button: {
        backgroundColor: '#161D6F',
        padding: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        height :50
    },
    button2: {
        backgroundColor: '#98DED9',
        padding: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height :50
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '400',
    },
    buttonText1: {
        color: '#000000',
        fontSize: 15,
        fontWeight: '400',
    },
    isi: {
        width: 300,
        top: 50
    },
    inputlayout:{
        marginBottom: 15
    }

});
