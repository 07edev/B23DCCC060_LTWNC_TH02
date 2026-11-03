import type { Routine } from '../types'

export const routines: Routine[] = [
  {
    id: 'morning-energy',
    name: 'Năng lượng buổi sáng',
    description: 'Giáo án cân bằng giúp đánh thức cơ thể và bắt đầu ngày mới.',
    exerciseIds: ['1', '2', '3', '4'],
  },
  {
    id: 'strength-foundation',
    name: 'Nền tảng sức mạnh',
    description: 'Buổi tập trọng lượng cơ thể giúp tăng sức mạnh toàn thân.',
    exerciseIds: ['2', '6', '7', '4'],
  },
  {
    id: 'mobility-reset',
    name: 'Phục hồi linh hoạt',
    description: 'Chuỗi bài tập nhẹ nhàng cho sự dẻo dai, cân bằng và phục hồi.',
    exerciseIds: ['8', '4', '16', '24'],
  },
]
