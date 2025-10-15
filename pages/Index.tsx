import { supabase } from './supabase.js'

const playerInput = document.querySelector('input[placeholder="Yy"]');
const opponentInput = document.querySelector('input[placeholder="Nama lawan (opsional)"]');
const addBtn = document.querySelector('button:nth-of-type(1)');
const predictBtn = document.querySelector('button:nth-of-type(2)');
const resultDiv = document.querySelector('div:last-of-type');

// Tambah data ke database
addBtn.addEventListener('click', async () => {
  const player = playerInput.value.trim();
  const opponent = opponentInput.value.trim();

  if (!player || !opponent) {
    alert('Isi nama pemain dan lawan!');
    return;
  }

  const { error } = await supabase
    .from('matches')
    .insert([{ player, opponent }]);

  if (error) {
    alert('Gagal menyimpan data.');
    console.error(error);
  } else {
    alert('Data match tersimpan!');
    playerInput.value = '';
    opponentInput.value = '';
  }
});

// Prediksi lawan berikutnya (AI sederhana)
predictBtn.addEventListener('click', async () => {
  const { data, error } = await supabase
    .from('matches')
    .select('*');

  if (error || !data.length) {
    resultDiv.innerHTML = 'Belum ada data untuk diprediksi.';
    return;
  }

  // Hitung lawan yang paling sering muncul
  const counts = {};
  data.forEach(m => {
    counts[m.opponent] = (counts[m.opponent] || 0) + 1;
  });

  // Ambil lawan paling sering muncul (probabilitas tertinggi)
  const nextOpponent = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];

  resultDiv.innerHTML = `<b>Lawan berikutnya kemungkinan:</b> ${nextOpponent}`;
});
