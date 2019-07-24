import Axios from 'axios';
import fbConfig from '../apiKeys.json';

const baseUrl = fbConfig.firebaseKeys.databaseURL;

const getBuilds = () => new Promise((resolve, reject) => {
  Axios.get(`${baseUrl}/builds.json`)
    .then((resp) => {
      const buildData = resp.data;
      const builds = [];
      if (buildData !== null) {
        Object.keys(buildData).forEach((build) => {
          buildData[build].id = build;
          if (buildData[build].isPublic === true) {
            builds.push(buildData[build]);
          }
        });
      }
      resolve(builds);
    })
    .catch(err => reject(err));
});

const getUserBuilds = uid => new Promise((resolve, reject) => {
  Axios.get(`${baseUrl}/builds.json`)
    .then((resp) => {
      const buildData = resp.data;
      const userBuilds = [];
      if (buildData !== null) {
        Object.keys(buildData).forEach((build) => {
          if (buildData[build].uid === uid) {
            buildData[build].id = `${build}_local`;
            userBuilds.push(buildData[build]);
          }
        });
      }
      resolve(userBuilds);
    })
    .catch(err => reject(err));
});

const addBuild = userBuild => Axios.post(`${baseUrl}/builds.json`, userBuild);

export default { getBuilds, addBuild, getUserBuilds };
