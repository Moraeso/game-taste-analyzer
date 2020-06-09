import React from 'react';
import GameInformation from 'web/components/GameInformation';

const MainContainer = ({ match }) => (
  <>
    <GameInformation gameId={match.params.gameId} />
  </>
);

export default MainContainer;
