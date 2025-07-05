import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useInventarisStore } from '../../src/store/inventaris'
import axios from 'axios'

// Mock axios
vi.mock('axios')

describe('Inventaris Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('fetchBarang updates barangList correctly', async () => {
    // Arrange: fake data
    const mockData = [
      { id: 1, nama: 'Laptop', jumlah: 10 },
      { id: 2, nama: 'Printer', jumlah: 5 }
    ]

    axios.get.mockResolvedValue({ data: mockData })

    const store = useInventarisStore()

    // Act: panggil action
    await store.fetchBarang()

    // Assert
    expect(store.barangList).toEqual(mockData)
    expect(axios.get).toHaveBeenCalledOnce()
  })
})
