import { StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/home/header/Header';
import Stories from '../components/home/stories/Stories';
import Post from '../components/home/post/Post';
import BottomTabs, {
  bottomTabIcons,
} from '../components/home/bottomTabs/BottomTabs';
import {
  collectionGroup,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { firebaseDb } from '../firebase';
import { Post as TPost } from '../types/typePost';

//@ts-ignore
const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState<TPost[]>([]);

  useEffect(() => {
    const postsCollection = collectionGroup(firebaseDb, 'posts');
    const unsubscribe = onSnapshot(
      query(postsCollection, orderBy('createdAt', 'desc')),
      (snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({ ...(doc.data() as TPost), id: doc.id }))
        )
    );
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView style={{ marginBottom: 50 }}>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </ScrollView>
      <BottomTabs icons={bottomTabIcons} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
});

export default HomeScreen;
