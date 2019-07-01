import React from 'react';
import MinesweeperGame from './containers/MinesweeperGame';
import './App.scss';

const App: React.FC = () => {

  return (
      <div className="container-fluid text-center">
        <MinesweeperGame />
      </div>
  );
};

export default App;
