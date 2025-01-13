import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import Header from '@/components/ui/Header';
import TugasCard from './CardTugas';
import MateriCard from './CardMateri';
import SiswaNama from './Siswakelas';
import { useNavigation } from '@react-navigation/native';

const DetailKelasScreen = ({ route }) => {
    const navigation = useNavigation();
  const { title, subtitle, totalSiswa } = route.params;
  const [activeTab, setActiveTab] = useState('Tugas');


  const kembali = () => {
    navigation.navigate('IsiKelas');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Tugas':
        return <TugasCard/>;
      case 'Materi':
        return <MateriCard/>;
      case 'Siswa':
        return <SiswaNama title={title} subtitle={subtitle} totalSiswa={totalSiswa} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <TouchableOpacity style={styles.backbuttonLayout} onPress={kembali}>
        <Image style={styles.backbuttonStyle}
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
    </View>
  );
};

export default DetailKelasScreen;

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
  },
  subtitle: {
    fontSize: 12,
    color: '#555',
  },
  totalSiswa: {
    fontSize: 17,
    color: '#333',
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
    padding: 20,
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
  contentText: {
    fontSize: 16,
    color: '#333',
    // textAlign: 'center',
  },
  backbuttonLayout:{
    flexDirection: 'row',
    marginTop: 10,
    top: 10,
    marginLeft: 20
  },
  backbuttonStyle:{
    width: 17,
    height: 17,
    marginTop: 2
  },
  backbuttonText: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '700'
  }
});
