import React, { useState, useMemo } from 'react';

// Konstanta
const TOTAL_PLAYERS = 8;
// Daftar 7 lawan yang mungkin (kita anggap Anda adalah Pemain 8)
const allPlayers: string[] = Array.from({ length: TOTAL_PLAYERS - 1 }, (_, i) => `Lawan ${i + 1}`);

const MagicChessPredictor: React.FC = () => {
  // State untuk melacak siapa saja yang sudah dilawan
  const [foughtPlayers, setFoughtPlayers] = useState<string[]>([]);
  // State untuk melacak babak saat ini (opsional, untuk tampilan)
  const [currentRound, setCurrentRound] = useState<number>(1);

  // Fungsi untuk menambah/menghapus lawan yang sudah dihadapi
  const togglePlayer = (player: string) => {
    setFoughtPlayers(prev => 
      prev.includes(player)
        ? prev.filter((p) => p !== player) // Hapus jika sudah ada
        : [...prev, player] // Tambahkan jika belum ada
    );
  };

  // Memoized: Menghitung lawan yang tersisa
  const possibleNextOpponents = useMemo<string[]>(() => {
    return allPlayers.filter((player) => !foughtPlayers.includes(player));
  }, [foughtPlayers]);

  // Fungsi untuk mereset game
  const resetGame = () => {
    setFoughtPlayers([]);
    setCurrentRound(1);
  };

  // Fungsi untuk maju babak
  const nextRound = () => {
    // Hanya majukan babak jika belum mencapai batas 7 lawan
    if (currentRound < 7) {
      setCurrentRound((prev) => prev + 1);
    } else {
      // Jika sudah babak 7 ke atas, prediksi tidak lagi efektif
      setCurrentRound((prev) => prev + 1); 
    }
  };

  // Gaya sederhana (agar bisa langsung jalan tanpa styling terpisah)
  const styles: { [key: string]: React.CSSProperties } = {
    container: { padding: '20px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', maxWidth: '800px', margin: '0 auto' },
    buttonGroup: { display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' },
    buttonBase: { padding: '10px 15px', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.2s' },
    buttonActive: { backgroundColor: '#4CAF50', color: 'white', border: 'none' },
    buttonInactive: { backgroundColor: '#f0f0f0', color: 'black' },
    resetButton: { padding: '10px 15px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px' },
    nextButton: { marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
    predictionBox: { border: '2px solid #007bff', padding: '15px', borderRadius: '8px', backgroundColor: '#e6f0ff' }
  };

  return (
    <div style={styles.container}>
      <h1>🔮 Magic Chess Lawan Berikutnya</h1>
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

      <h2 style={{
      npm install --save-dev typescript @types/react @types/node
      
