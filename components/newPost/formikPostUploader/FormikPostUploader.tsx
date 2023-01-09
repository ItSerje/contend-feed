import { View, Text, Image, TextInput, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Divider } from 'react-native-elements';
import { firebaseAppAuth, firebaseDb } from '../../../firebase';
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';

const PLACEHOLDER_IMG =
  'https://icon-library.com/images/photo-placeholder-icon/photo-placeholder-icon-7.jpg';

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required('A URL is required'),
  caption: Yup.string().max(2200, 'Caption has reached the character limit.'),
});

const urlSchema = Yup.string().url();

//@ts-ignore
const FormikPostUploader = ({ navigation }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState<{
    username: string;
    profilePicture: string;
  } | null>(null);

  const getUsername = () => {
    const user = firebaseAppAuth.currentUser;
    const userData = query(
      collection(firebaseDb, 'users'),
      where('owner_uid', '==', user?.uid)
    );
    const unsubscribe = onSnapshot(userData, (snapshot) => {
      snapshot.docs.map((doc) =>
        setCurrentLoggedInUser({
          username: doc.data().username,
          profilePicture: doc.data().profile_picture,
        })
      );
    });
    return unsubscribe;
  };

  useEffect(() => {
    getUsername();
  }, []);

  const uploadPostToFirestore = async (imageUrl: string, caption: string) => {
    if (firebaseAppAuth.currentUser?.email && currentLoggedInUser) {
      try {
        const collectionRef = collection(
          firebaseDb,
          'users/' + firebaseAppAuth.currentUser.email + '/posts'
        );

        await addDoc(collectionRef, {
          imageUrl,
          username: currentLoggedInUser.username,
          profile_picture: currentLoggedInUser.profilePicture,
          owner_uid: firebaseAppAuth.currentUser.uid,
          caption,
          createdAt: serverTimestamp(),
          likes: 0,
          likes_by_users: [],
          comments: [],
        });
        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Formik
      initialValues={{ caption: '', imageUrl: '' }}
      onSubmit={(values) => {
        uploadPostToFirestore(values.imageUrl, values.caption);
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View
            style={{
              margin: 20,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
          >
            <Image
              source={{
                uri: urlSchema.isValidSync(thumbnailUrl)
                  ? thumbnailUrl
                  : PLACEHOLDER_IMG,
              }}
              style={{ width: 100, height: 100 }}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <TextInput
                style={{ color: 'white', fontSize: 20 }}
                placeholder='Write a caption...'
                placeholderTextColor='gray'
                multiline={true}
                onChangeText={handleChange('caption')}
                onBlur={handleBlur('caption')}
                value={values.caption}
              />
            </View>
          </View>
          <Divider width={0.2} orientation='vertical' />
          <TextInput
            onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
            style={{ color: 'white', fontSize: 18 }}
            placeholder='Enter Image Url'
            placeholderTextColor='gray'
            onChangeText={handleChange('imageUrl')}
            onBlur={handleBlur('imageUrl')}
            value={values.imageUrl}
          />
          {errors.imageUrl && (
            <Text style={{ fontSize: 10, color: 'red' }}>
              {errors.imageUrl}
            </Text>
          )}

          <Button
            onPress={() => handleSubmit()}
            title='Share'
            disabled={!isValid}
          />
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;
