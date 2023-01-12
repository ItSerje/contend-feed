import { StyleSheet, FlatList, ViewToken } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
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

  const [viewableItems, setViewableItems] = useState<ViewToken[]>([]);

  const onViewableItemsChanged = useCallback(
    (info: { changed: ViewToken[]; viewableItems: ViewToken[] }): void => {
      console.log('onViewableItemsChanged handler within FlatList Parent');
      setViewableItems((_) => info.viewableItems);
    },
    []
  );

  console.log('FlatList Parent, i.e. Home');

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />

      {posts.length > 0 && (
        <FlatList
          data={posts}
          renderItem={({ item }) => {
            return (
              <Post
                post={item}
                // isViewable={changedItems
                //   .map((changedItem) => changedItem.key)
                //   .includes(item.id)}
                isViewable={viewableItems
                  .map((viewableItem) => viewableItem.item.id)
                  .includes(item.id)}
              />
            );
          }}
          keyExtractor={(item) => item.id}
          viewabilityConfig={{
            viewAreaCoveragePercentThreshold: 75,
            // itemVisiblePercentThreshold: 75,
            // minimumViewTime: 300,
          }}
          onViewableItemsChanged={onViewableItemsChanged}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
        />
      )}
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
