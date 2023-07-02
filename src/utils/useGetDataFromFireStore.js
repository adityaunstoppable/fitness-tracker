import { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { firebaseConfig } from '../firebaseConfig';

const firebaseCon = firebaseConfig
firebase.initializeApp(firebaseCon);

const firestore = firebase.firestore();

const useGetDataFromFireStore = (collectionName) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = firestore.collection(collectionName);
        const snapshot = await collectionRef.get();

        const fetchedData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching Firestore data:', error);
      }
    };

    fetchData();
  }, [collectionName]);

  return data;
};


export default useGetDataFromFireStore