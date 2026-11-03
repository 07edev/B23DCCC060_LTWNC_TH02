import type { Exercise, ExerciseCategory } from '../types'

const categories: ExerciseCategory[] = [
  'Ngực',
  'Chân',
  'Tay',
  'Lưng',
  'Vai',
]

const exerciseNames = [
  'Đẩy tạ đơn',
  'Kéo tạ đơn',
  'Gập tạ đơn',
  'Nâng tạ đơn',
  'Ép tạ đơn',
  'Xoay tạ đơn',
  'Bật tạ đơn',
  'Giữ tạ đơn',
  'Đẩy dây kháng lực',
]

const trainers = ['Minh Khang', 'Phương Anh', 'Đức Anh', 'Mai Hương', 'Gia Bảo', 'Khánh Linh']

export const exercises: Exercise[] = Array.from({ length: 10_000 }, (_, index) => {
  const name = exerciseNames[index % exerciseNames.length]
  const category = categories[index % categories.length]

  return {
    id: String(index + 1),
    name: `${name} ${index + 1}`,
    category,
    trainer: trainers[index % trainers.length],
    muscle: category,
    duration: 30 + ((index * 7) % 91),
    description: `Bài tập ${category.toLowerCase()} cùng huấn luyện viên ${trainers[index % trainers.length]}.`,
  }
})
