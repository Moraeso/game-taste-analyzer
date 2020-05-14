import React, {
  useEffect,
  useState,
} from 'react';
import { API_URL } from 'shared/API_INFO';
import APIS from 'shared/APIS';
import axios from 'axios';

const Main = () => {
  const [game, setGame] = useState(null);
  const getGames = async (id) => {
    const result = await axios({
      method: 'get',
      url: `${API_URL}${APIS.games}`,
      params: {
        id,
      },
    });
    return result;
  };

  useEffect(() => {
    getGames(115)
      .then((res) => {
        setGame(res.data);
        console.log(res.data);
      });
  }, []);
  return (
    <div>
      Game Information
      <br />
      {game ? (
        <div>
          <pre>{JSON.stringify(game, null, 2)}</pre>
        </div>
      ) : (
        <div>
          loading...
        </div>
      )}
    </div>
  );
};

export default Main;
