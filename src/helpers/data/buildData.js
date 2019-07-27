import axios from 'axios';
import fbConfig from '../apiKeys.json';

const baseUrl = fbConfig.firebaseKeys.databaseURL;

const getBuilds = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/builds.json`)
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
    .catch(err => reject(err));
});

const addBuild = userBuild => axios.post(`${baseUrl}/builds.json`, userBuild);

const deleteBuild = buildId => axios.delete(`${baseUrl}/builds/${buildId}.json`);

const getSingleBuild = buildId => axios.get(`${baseUrl}/builds/${buildId}.json`);

const updateBuild = (newBuildData, buildId) => axios.put(`${baseUrl}/builds/${buildId}.json`, newBuildData);

export default {
  getBuilds,
  addBuild,
  deleteBuild,
  getSingleBuild,
  updateBuild,
};
