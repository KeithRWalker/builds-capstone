import firebase from 'firebase/app';
import 'firebase/auth';

const loginClickEvent = (e) => {
  e.preventDefault();
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

export default { loginClickEvent };
