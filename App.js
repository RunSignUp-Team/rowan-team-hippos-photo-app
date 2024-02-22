import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import Header from './components/Header';
import Test from './components/Test';

export default function App() {
  const [activePage, setActivePage] = useState('home');

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onPageChange={handlePageChange} />
      <SafeAreaView style={styles.paddingPage}>
      {activePage === 'home' ? <Error onPageChange={handlePageChange} /> : 
      activePage === 'test' ? <Test onPageChange={handlePageChange} /> :
      activePage === 'login' ? <Login onPageChange={handlePageChange} /> :
      activePage === 'racePage' ? <RacePage onPageChange={handlePageChange} /> :
      activePage === 'photoAlbumPage' ? <PhotoAlbumPage onPageChange={handlePageChange} /> :
      activePage === 'photoCapturePage' ? <PhotoCapturePage onPageChange={handlePageChange} /> :
      activePage === 'liveStreamPage' ? <LiveStreamPage onPageChange={handlePageChange} /> :
      <Error />
      }
      </SafeAreaView>
    </SafeAreaView>
  );
}

const Error = () => {
  return (
    <SafeAreaView style={styles.content}>
      <Text> You shouldn't be seeing this page </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffa',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paddingPage: {
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
});