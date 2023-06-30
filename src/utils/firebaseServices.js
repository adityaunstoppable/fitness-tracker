import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { firebaseConfig } from '../firebaseConfig';

const firebaseCon = firebaseConfig
firebase.initializeApp(firebaseCon);

const firestore = firebase.firestore();

export const saveDataByDate = async (dateKey, data) => {
    try {
      const collectionRef = firestore.collection('dateContent');
      const dateDocRef = collectionRef.doc(dateKey);
      await dateDocRef.set(data);
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };