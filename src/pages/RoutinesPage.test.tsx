import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, beforeEach, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { RoutinesPage } from './RoutinesPage'
import { RoutineProvider } from '../contexts/RoutineContext'

describe('RoutinesPage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shows validation when creating a routine without a name', () => {
    render(
      <MemoryRouter>
        <RoutineProvider>
          <RoutinesPage />
        </RoutineProvider>
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Tạo giáo án' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Vui lòng nhập tên giáo án.')
  })

  it('creates a routine and shows its duration metadata', () => {
    render(
      <MemoryRouter>
        <RoutineProvider>
          <RoutinesPage />
        </RoutineProvider>
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByRole('textbox', { name: 'Tên giáo án mới' }), {
      target: { value: 'Giáo án kiểm tra' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Tạo giáo án' }))

    expect(screen.getByRole('heading', { name: 'Giáo án kiểm tra' })).toBeInTheDocument()
    expect(screen.getByText('0 bài tập · Tổng 0:00')).toBeInTheDocument()
  })

  it('renames and deletes a routine', () => {
    vi.spyOn(window, 'prompt').mockReturnValue('Tên mới')
    render(
      <MemoryRouter>
        <RoutineProvider>
          <RoutinesPage />
        </RoutineProvider>
      </MemoryRouter>,
    )

    fireEvent.click(screen.getAllByRole('button', { name: 'Đổi tên' })[0])
    expect(screen.getByRole('heading', { name: 'Tên mới' })).toBeInTheDocument()
    fireEvent.click(screen.getAllByRole('button', { name: 'Xóa' })[0])
    expect(screen.queryByRole('heading', { name: 'Tên mới' })).not.toBeInTheDocument()
    vi.restoreAllMocks()
  })
})
