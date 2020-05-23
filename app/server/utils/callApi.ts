import axios from 'axios';
import apiAccess from 'server/CORE/api-config';

const callApi = async (endpoint: string, queryString: string) => {
  const result = await axios({
    method: 'post',
    url: `https://api-v3.igdb.com${endpoint}`,
    headers: {
      'user-key': apiAccess.key,
    },
    data: queryString,
  });
  return result.data[0];
};

export default callApi;
