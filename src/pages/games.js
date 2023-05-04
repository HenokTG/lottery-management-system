import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// components
import Page from '../components/Page';
import { GameListResults } from '../components/games/games-list-results';
import { CreateGame } from '../components/games/create-game-form';
// context and modules
import { useGlobalContext } from '../context';

const Games = () => {
  const { loggedIn } = useGlobalContext();
  const [modalKey, setModalKey] = useState(false);

  const navigate = useNavigate();
  const prevLocation = useLocation();

  useEffect(
    () => {
      if (loggedIn === false) {
        navigate(`/login?redirectTo=${prevLocation.pathname}`);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Page title="Games">
      {modalKey && <CreateGame setModalKey={setModalKey} />}
      {modalKey === false && <GameListResults setModalKey={setModalKey} />}
    </Page>
  );
};

export default Games;
