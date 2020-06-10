import React from 'react';
import GameInformation from 'web/components/GameInformation';

const MainContainer = ({ match, history }: { match: any; history: any }) => (
  <>
    <GameInformation gameId={match.params.gameId} history={history} />
  </>
);

export default MainContainer;
