import { useState } from 'react';

// components
import Page from '../components/layout/Page';
import { GameListResults } from '../components/games/games-list-results';
import CreateGame from '../components/games/create-game-form';

const Games = () => {
  const [modalKey, setModalKey] = useState(false);

  return (
    <Page title="Games">
      {modalKey && <CreateGame setModalKey={setModalKey} />}
      {modalKey === false && <GameListResults setModalKey={setModalKey} />}
    </Page>
  );
};

export default Games;
