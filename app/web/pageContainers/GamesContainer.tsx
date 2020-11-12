import React from 'react';
import WrapperWithSidebar from 'web/components/WrapperWithSidebar';
import AllGames from 'web/components/Games/Discover/AllGames';
import ClassicGames from 'web/components/Games/Discover/ClassicGames';
import MetacriticGames from 'web/components/Games/Discover/Metacritic';
import ThisYearGames from 'web/components/Games/Discover/ThisYearGames/indes';
import Last30Games from 'web/components/Games/Discover/Last30';

const getComponent = (discover) => {
  let comp;
  switch (discover) {
    case 'all':
      comp = <AllGames name={discover} />;
      break;
    case 'metacritic':
      comp = <MetacriticGames name={discover} />;
      break;
    case 'classic':
      comp = <ClassicGames name={discover} />;
      break;
    case 'thisyear':
      comp = <ThisYearGames name={discover} />;
      break;
    case 'last30':
      comp = <Last30Games name={discover} />;
      break;
    default:
      comp = null;
  }
  return comp;
};

const GamesContainer = ({ match }: { match: any }) => {
  const { discover } = match.params;
  const component = getComponent(discover);
  return (
    <WrapperWithSidebar>
      {component}
    </WrapperWithSidebar>
  );
};

export default GamesContainer;
