import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { firebaseConfig } from '../firebaseConfig';


const firebaseCon = firebaseConfig
firebase.initializeApp(firebaseCon);

const firestore = firebase.firestore();

export const saveDataByDate = async (dateKey, data , openToastFn) => {
    try {
      const collectionRef = firestore.collection('dateContent');
      const dateDocRef = collectionRef.doc(dateKey);
      await dateDocRef.set(data);
      openToastFn(true , "Data Saved Successfully !" , "success")
    } catch (error) {
      openToastFn(true , "Something went wrong !" , "error")
    }
  };