import React, { useState } from 'react';

// Konstanta
const TOTAL_PLAYERS = 8;
const PLAYER_NAME = 'Anda';

// Buat nama-nama lawan
const allPlayers: string[] = Array.from({ length: TOTAL_PLAYERS }, (_, i) => (i === TOTAL_PLAYERS - 1 ? PLAYER_NAME : `Lawan ${i + 1}`));
// Index Anda adalah pemain ke-8 (index 7)
const myIndex = TOTAL_PLAYERS - 1;

const MagicChessPredictor: React.FC = () => {
  // State untuk melacak siapa saja yang sudah dilawan
  const [foughtPlayers, setFoughtPlayers] = useState<number[]>([]);
  // State untuk babak
  const [currentRound, setCurrentRound] = useState<number>(1);
  // State untuk history pairing
  const [history, setHistory] = useState<{round: number, opponent: number | null}[]>([]);

  // Fungsi pairing Swiss sederhana: pilih lawan yang belum pernah dihadapi, urut dari index terkecil
  const getNextOpponent = (): number | null => {
    const belumDilawan = allPlayers
      .map((_, idx) => idx)
      .filter(idx => idx !== myIndex && !foughtPlayers.includes(idx));
    if (belumDilawan.length === 0) return null;
    // Bisa random di antara belum dilawan, tapi kita ambil yang index terkecil
    return belumDilawan[0];
  };

  // Fungsi untuk maju babak
  const nextRound = () => {
    if (currentRound > TOTAL_PLAYERS - 1) return; // maksimal lawan adalah 7
    const nextOpponent = getNextOpponent();
    if (nextOpponent !== null) {
      setFoughtPlayers(prev => [...prev, nextOpponent]);
      setHistory(prev => [...prev, {round: currentRound, opponent: nextOpponent}]);
    } else {
      setHistory(prev => [...prev, {round: currentRound, opponent: null}]);
    }
    setCurrentRound(prev => prev + 1);
  };

  // Reset
  const resetGame = () => {
    setFoughtPlayers([]);
    setCurrentRound(1);
    setHistory([]);
  };

  // Style sederhana
  const styles: { [key: string]: React.CSSProperties } = {
    container: { padding: '20px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', maxWidth: '800px', margin: '0 auto' },
    resetButton: { padding: '10px 15px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px' },
    nextButton: { marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
    predictionBox: { border: '2px solid #007bff', padding: '15px', borderRadius: '8px', backgroundColor: '#e6f0ff', marginBottom: '20px' }
  };

  // Lawan berikutnya
  const nextOpponent = getNextOpponent();

  return (
    <div style={styles.container}>
      <h1>🔮 Magic Chess Prediksi Lawan Berikutnya (Swiss System)</h1>
      <p>Anda adalah <b>Pemain ke-8</b> dari {TOTAL_PLAYERS} pemain.</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <p>
          <b>Babak Saat Ini:</b> <span style={{ color: '#007bff', fontWeight: 'bold' }}>{currentRound}</span> | 
          <b> Lawan Sudah Dihadapi:</b> <span style={{ color: '#f44336', fontWeight: 'bold' }}>{foughtPlayers.length}</span>
        </p>
        <button onClick={resetGame} style={styles.resetButton}>
          Reset Permainan
        </button>
      </div>

      <div style={styles.predictionBox}>
        <h3>Lawan Berikutnya (Prediksi Otomatis):</h3>
        {currentRound > TOTAL_PLAYERS - 1 || nextOpponent === null ? (
          <p style={{ color: '#f44336', fontWeight: 'bold' }}>Semua lawan sudah dihadapi atau babak sudah habis!</p>
        ) : (
          <p>
            Di <b>Babak {currentRound}</b>, lawan berikutnya kemungkinan besar adalah: <br />
            <span style={{ fontWeight: 'bold', color: '#007bff', fontSize: '1.25em' }}>{allPlayers[nextOpponent]}</span>
          </p>
        )}
      </div>

      <button onClick={nextRound} style={styles.nextButton} disabled={currentRound > TOTAL_PLAYERS - 1 || nextOpponent === null}>
        Babak Berikutnya
      </button>

      <div style={{ marginTop: '25px' }}>
        <h3>History Pertandingan Anda:</h3>
        <ul>
          {history.map((item, idx) => (
            <li key={idx}>
              Babak {item.round}: {item.opponent !== null ? allPlayers[item.opponent] : <span style={{ color: '#f44336' }}>Tidak ada lawan</span>}
            </li>
          ))}
        </ul>
      </div>

      {currentRound > TOTAL_PLAYERS - 1 && (
        <div style={{ marginTop: '15px', color: '#f44336', fontWeight: 'bold' }}>
          Babak sudah lebih dari {TOTAL_PLAYERS - 1}, prediksi lawan tidak lagi efektif!
        </div>
      )}
    </div>
  );npm install --save-dev @types/react @types/node
};

export default MagicChessPredictor;
