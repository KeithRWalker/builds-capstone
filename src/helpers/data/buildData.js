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
          builds.push(buildData[build]);
        });
      }
      resolve(builds);
    })
    .catch(err => reject(err, 'error in "getBuilds/buildData.js"'));
});

export default { getBuilds };
