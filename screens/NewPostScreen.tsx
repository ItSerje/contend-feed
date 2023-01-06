import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddNewPost from '../components/newPost/addNewPost/AddNewPost';

const NewPostScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }}>
      <AddNewPost />
    </SafeAreaView>
  );
};

export default NewPostScreen;
