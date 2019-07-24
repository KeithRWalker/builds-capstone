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
    .catch(err => reject(err, 'error in "getBuilds/buildData.js"'));
});

const addBuild = userBuild => Axios.post(`${baseUrl}/builds.json`, userBuild);

export default { getBuilds, addBuild };
