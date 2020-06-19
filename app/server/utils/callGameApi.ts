import axios from 'axios';

const callGameApi = async (endpoint: string): Promise<any> => {
  const result = await axios({
    method: 'get',
    url: `https://api.rawg.io/api${endpoint}`,
  });
  return result.data;
};

export default callGameApi;
