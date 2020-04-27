import React from 'react';
import ServerCheckComponent from 'web/components/ServerCheckComponent';


const App = ({ name }: {
  name: string;
}) => (
  <div>
    {name}
    Hello!!
    <ServerCheckComponent />
  </div>
);
export default App;
