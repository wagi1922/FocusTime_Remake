// src/components/CardTugasGuru/data.js
export const initialClassesData = [
  {
    id: '1',
    title: 'TUGAS 1',
    subtitle: 'EKSPONEN',
    link: 'https://drive.google.com/file/d/1A2B3C4D/view', // Tambahkan link
    status: {
      collected: 20,
      graded: 5,
      assigned: 5,
    },
    students: [
      { name: 'Haikal Rahman', score: '100/100', profileImage: 'https://i.pravatar.cc/50?img=1', status: 'graded' },
      { name: 'Maulana Riski', score: 'Nilai', profileImage: 'https://i.pravatar.cc/50?img=2', status: 'pending' },
    ],
  },
  {
    id: '2',
    title: 'TUGAS 2',
    subtitle: 'LOGARITMA',
    link: 'https://drive.google.com/file/d/5E6F7G8H/view', // Tambahkan link
    status: {
      collected: 15,
      graded: 7,
      assigned: 3,
    },
    students: [
      { name: 'Rafi Hidayat', score: '90/100', profileImage: 'https://i.pravatar.cc/50?img=3', status: 'graded' },
      { name: 'Andi Maulana', score: 'Nilai', profileImage: 'https://i.pravatar.cc/50?img=4', status: 'pending' },
    ],
  },
];
