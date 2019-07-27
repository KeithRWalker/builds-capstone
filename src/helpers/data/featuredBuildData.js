import axios from 'axios';
import fbConfig from '../apiKeys.json';

const baseUrl = fbConfig.firebaseKeys.databaseURL;

const getFeaturedBuilds = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/featuredBuilds.json`)
    .then((resp) => {
      const featuredBuildData = resp.data;
      const featuredBuilds = [];
      if (featuredBuildData !== null) {
        Object.keys(featuredBuildData).forEach((featuredBuild) => {
          featuredBuildData[featuredBuild].id = featuredBuild;
          featuredBuilds.push(featuredBuildData[featuredBuild]);
        });
      }
      resolve(featuredBuilds);
    })
    .catch(err => reject(err));
});

export default { getFeaturedBuilds };
