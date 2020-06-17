import React from 'react';
import GameInformation from 'web/components/GameInformation';

const GameInfoContainer = ({ match, history }: { match: any; history: any }) => (
  <>
    <GameInformation gameId={match.params.gameId} history={history} />
  </>
);

export default GameInfoContainer;
