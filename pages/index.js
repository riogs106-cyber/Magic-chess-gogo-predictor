import Head from 'next/head';
import { useState, useMemo, useCallback } from 'react';
import styles from '../styles/Home.module.css'; 

// --- DATA AWAL 8 PEMAIN ---
const initialPlayers = [
  { id: 1, name: 'Anda (Player 1)' },
  { id: 2, name: 'Lawan 2' },
  { id: 3, name: 'Lawan 3' },
  { id: 4, name: 'Lawan 4' },
  { id: 5, name: 'Lawan 5' },
  { id: 6, name: 'Lawan 6' },
  { id: 7, name: 'Lawan 7' },
  { id: 8, name: 'Lawan 8' },
];

export default function MagicChessPredictor() {
  const [round, setRound] = useState(1);
  const [playerHistory, setPlayerHistory] = useState(
    initialPlayers.map((p) => ({ ...p, lastFoughtRound: -1, isEliminated: false }))
  );
  const [currentOpponent, setCurrentOpponent] = useState(''); // Untuk input lawan

  // --- LOGIKA PREDETOR INTELIJEN SEDERHANA ---
  // Algoritma: Prioritaskan pemain yang paling lama tidak dilawan (lastFoughtRound terkecil)
  const predictedOpponents = useMemo(() => {
    // 1. Filter pemain yang sudah tereliminasi dan bukan diri sendiri
    const activeOpponents = playerHistory.filter((p) => !p.isEliminated && p.id !== 1);

    // 2. Urutkan berdasarkan 'lastFoughtRound' (paling kecil = paling lama tidak dilawan)
    const sortedPlayers = activeOpponents.sort((a, b) => a.lastFoughtRound - b.lastFoughtRound);

    // 3. Ambil 3 teratas sebagai prediksi kuat
    return sortedPlayers.slice(0, 3);
  }, [playerHistory]);

  // --- HANDLER UNTUK MENCATAT LAWAN DAN PINDAH ROUND ---
  const handleNextRound = useCallback((e) => {
    e.preventDefault();
    if (!currentOpponent) {
      alert('Pilih lawan Anda di putaran ini!');
      return;
    }

    const opponentId = parseInt(currentOpponent);

    // Update histori: Set 'lastFoughtRound' pemain yang baru saja dilawan ke round saat ini
    setPlayerHistory((prevHistory) =>
      prevHistory.map((p) =>
        p.id === opponentId ? { ...p, lastFoughtRound: round } : p
      )
    );

    setCurrentOpponent(''); // Reset input
    setRound((prevRound) => prevRound + 1);
  }, [currentOpponent, round]);

  // --- HANDLER UNTUK ELIMINASI LAWAN ---
  const toggleElimination = useCallback((playerId) => {
    setPlayerHistory((prevHistory) =>
      prevHistory.map((p) =>
        p.id === playerId
          ? { ...p, isEliminated: !p.isEliminated, lastFoughtRound: p.isEliminated ? p.lastFoughtRound : round } 
          : p
      )
    );
  }, [round]);

  // --- HANDLER UNTUK RESET GAME ---
  const resetGame = useCallback(() => {
    if (window.confirm('Apakah Anda yakin ingin memulai game baru?')) {
      setRound(1);
      setPlayerHistory(
        initialPlayers.map((p) => ({ ...p, lastFoughtRound: -1, isEliminated: false }))
      );
      setCurrentOpponent('');
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>MCGG Next Opponent Predictor</title>
        <meta name="description" content="Prediksi Lawan Magic Chess: Go Go (MCGG) dengan Next.js dan Vercel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title} style={{ fontSize: '2.5rem' }}>
          Prediktor Lawan <br/> Magic Chess Gogo
        </h1>

        <button onClick={resetGame} className={styles.button}>
          Mulai Game Baru
        </button>

        <div className={styles.grid}>
          {/* BAGIAN KIRI: PREDISKI */}
          <div className={styles.card} style={{ flex: 1, minWidth: '300px' }}>
            <h2>🔥 ROUND {round} 🔥</h2>
            {round <= 3 ? (
              <p>Putaran awal (R-1 sampai R-3) biasanya acak. Gunakan fitur
