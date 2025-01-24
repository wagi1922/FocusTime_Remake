import API_URL from "@/config/config";
import TugasCard from './CardTugas';
import MateriCard from './CardMateri';
import SiswaNama from './Siswakelas';
import Header from '@/components/ui/Header';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';

const DetailKelasScreen = ({ route }) => {
    const navigation = useNavigation();
    const { title = 'Kelas', subtitle = '', totalSiswa = 0 } = route.params || {};
    const [activeTab, setActiveTab] = useState('Tugas');
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timer, setTimer] = useState(null);

    const kembali = useCallback(() => {
        navigation.navigate('IsiKelas');
    }, [navigation]);


    const deleteMateri = async () => {
        try {
          const token = await AsyncStorage.getItem("token");
          const classId = await AsyncStorage.getItem("classId");
          if (!token) throw new Error("Token tidak ditemukan. Silakan login kembali.");
          if (!classId) throw new Error("ID item tidak ditemukan.");
    
          const response = await fetch(`${API_URL}/api/classes/${classId}/leave`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
          });
    
          if (response.ok) {
            const result = await response.json();
            Alert.alert("Sukses", result.message || "Berhasil Keluar");
            navigation.navigate('IsiKelas');
          } else {
            const errorResult = await response.json();
            Alert.alert("Error", errorResult.message || "Gagal Keluar");
          }
        } catch (error) {
          console.error("Error saat Kelaur:", error);
          Alert.alert("Error", error.message || "Terjadi kesalahan saat keluar kelas");
        }
      };

    const onDeletePress = () => {
        Alert.alert(
            "Konfirmasi Hapus",
            "Apakah kamu yakin akan menghapus?",
            [
                {
                    text: "Batal",
                    style: "cancel",
                },
                {
                    text: "Ya",
                    onPress: (deleteMateri),
                },
            ]
        );
    };



    const renderContent = () => {
        switch (activeTab) {
            case 'Tugas':
                return <TugasCard />;
            case 'Materi':
                return <MateriCard elapsedTime={elapsedTime} />;
            case 'Siswa':
                return <SiswaNama title={title} subtitle={subtitle} totalSiswa={totalSiswa} />;
            default:
                return null;
        }
    };

    useEffect(() => {
        if (activeTab === 'Materi') {
            const interval = setInterval(() => {
                setElapsedTime((prevTime) => prevTime + 1);
            }, 1000);
            setTimer(interval);

            return () => clearInterval(interval);
        } else if (timer) {
            clearInterval(timer);
            setTimer(null);
        }
    }, [activeTab, timer]);

    const formatTime = (time) => {
        const days = Math.floor(time / (60 * 60 * 24));
        const hours = Math.floor((time % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((time % (60 * 60)) / 60);
        const seconds = time % 60;
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <View style={styles.container}>
            <Header />
            <TouchableOpacity style={styles.backbuttonLayout} onPress={kembali}>
                <Image
                    style={styles.backbuttonStyle}
                    source={require('../../assets/images/back.png')}
                />
                <Text style={styles.backbuttonText}>Kelas</Text>
            </TouchableOpacity>
            <View style={styles.detailContainer}>
                <View style={styles.cardContainer}>
                    <Image
                        style={styles.icon}
                        source={require('../../assets/images/matematika.png')}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.subtitle}>{subtitle}</Text>
                        <Text style={styles.totalSiswa}>
                            Total Siswa: <Text style={styles.dynamicText}>{totalSiswa}</Text>
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.iconButton} onPress={onDeletePress}>
                    <Entypo name="reply" size={24} color="#FF5F5F" />
                    </TouchableOpacity>
                </View>

                <View style={styles.tabContainer}>
                    {['Tugas', 'Materi', 'Siswa'].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[
                                styles.tab,
                                activeTab === tab && styles.activeTab,
                            ]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    activeTab === tab && styles.activeTabText,
                                ]}
                            >
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.contentContainer}>{renderContent()}</View>
            </View>

            {activeTab === 'Materi' && (
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Total Waktu Belajar: {formatTime(elapsedTime)}</Text>
                </View>
            )}
        </View>
    );
};

export default DetailKelasScreen;

// (Styles tetap sama dengan kode sebelumnya)


const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: '#98DED9',
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        margin: 1,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 6,
    },
    icon: {
        marginRight: 15,
        borderRadius: 25,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        color: '#555',
        marginVertical: 5,
    },
    totalSiswa: {
        fontSize: 16,
        color: '#333',
        marginBottom: 15,
    },
    dynamicText: {
        fontWeight: 'bold',
        color: '#000',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    detailContainer: {
      flex: 1,
      paddingHorizontal:20,
      paddingTop:20
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        backgroundColor: '#151C68',
        borderRadius: 10,
        padding: 10,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        marginHorizontal: 5,
    },
    activeTab: {
        backgroundColor: '#C7FFD8',
        borderRadius: 5,
    },
    tabText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#F6F6F6',
    },
    activeTabText: {
        color: '#000000',
    },
    contentContainer: {
        flex: 1,
        marginTop: 20,
    },
    footer: {
        backgroundColor: '#151C68',
        padding: 15,
        alignItems: 'center',
        paddingBottom: 80,
    },
    footerText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    backbuttonLayout: {
        flexDirection: 'row',
        marginTop: 10,
        top: 10,
        marginLeft: 20,
    },
    backbuttonStyle: {
        width: 17,
        height: 17,
        marginTop: 2,
    },
    backbuttonText: {
        fontSize: 18,
        marginLeft: 10,
        fontWeight: '700',
    },

    iconButton: {
      marginBottom: 75,
    },
});