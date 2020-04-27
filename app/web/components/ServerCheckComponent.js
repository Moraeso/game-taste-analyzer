import axios from 'axios';
import React, {
  useEffect,
  useState,
} from 'react';


const ServerCheckComponent = () => {
  const [value, setValue] = useState();

  useEffect(() => {
    axios.get('/api/hello-world').then(({ data }) => {
      setValue(data?.message);
    });
  }, []);
  return (
    <div>
      {value}
    </div>
  );
};
export default ServerCheckComponent;
