import { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Dirección del servidor backend

function App() {
  const [diceRoll, setDiceRoll] = useState(null);

  // Escuchar cuando el servidor emita un resultado
  useEffect(() => {
    socket.on('diceRolled', (roll) => {
      setDiceRoll(roll);
    });

    // Limpiar el socket al desmontar
    return () => {
      socket.off('diceRolled');
    };
  }, []);

  // Emitir el evento cuando un jugador haga clic en el botón
  const handleRollDice = () => {
    socket.emit('rollDice');
  };

  return (
    <div className="App">
      <h1>Juego de Tirar Dados</h1>
      <button onClick={handleRollDice}>Tirar Dados</button>
      {diceRoll !== null && (
        <div>
          <h2>Resultado de la tirada: {diceRoll}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
