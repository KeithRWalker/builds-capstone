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

const addBuild = userBuild => Axios.post(`${baseUrl}/builds.json`, userBuild);

const deleteBuild = buildId => Axios.delete(`${baseUrl}/builds/${buildId}.json`);

const getSingleBuild = buildId => Axios.get(`${baseUrl}/builds/${buildId}.json`);

const updateBuild = (newBuildData, buildId) => Axios.put(`${baseUrl}/builds/${buildId}.json`, newBuildData);

export default {
  getBuilds,
  addBuild,
  deleteBuild,
  getSingleBuild,
  updateBuild,
};
