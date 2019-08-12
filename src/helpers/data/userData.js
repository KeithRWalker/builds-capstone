import axios from 'axios';
import fbConfig from '../apiKeys.json';

const baseUrl = fbConfig.firebaseKeys.databaseURL;

const getUserInfo = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json`)
    .then((resp) => {
      const userData = resp.data;
      Object.keys(userData).forEach((user) => {
        if (userData[user].uid === uid) {
          resolve(userData[user]);
        }
      });
    }).catch(err => reject(err));
});

const checkIfNewUser = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json`)
    .then((resp) => {
      const userData = resp.data;
      let userCheck = 0;
      Object.keys(userData).forEach((user) => {
        if (userData[user].uid === uid) {
          userCheck += 1;
        }
      });
      if (userCheck === 1) {
        resolve(false);
      } else if (userCheck === 0) {
        resolve(true);
      }
    }).catch(err => reject(err));
});

const postNewUser = newUser => axios.post(`${baseUrl}/users.json`, newUser);

export default { postNewUser, checkIfNewUser, getUserInfo };
