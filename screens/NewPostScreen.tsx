import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddNewPost from '../components/newPost/addNewPost/AddNewPost';

//@ts-ignore
const NewPostScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }}>
      <AddNewPost navigation={navigation} />
    </SafeAreaView>
  );
};

export default NewPostScreen;
