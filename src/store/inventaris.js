import { defineStore } from 'pinia'
import axios from 'axios'

const API = 'http://localhost:3000/barang'

export const useInventarisStore = defineStore('inventaris', {
  state: () => ({
    barang: []
  }),

  actions: {
    async fetchBarang() {
      try {
        const res = await axios.get(API)
        this.barang = res.data
      } catch (err) {
        console.error("Gagal mengambil data:", err)
      }
    },

    async tambahBarang(dataBaru) {
      if (dataBaru.stok < 0) {
        alert("Stok tidak boleh negatif!")
        return
      }
      try {
        const res = await axios.post(API, dataBaru)
        this.barang.push(res.data)
      } catch (err) {
        console.error("Gagal menambah barang:", err)
      }
    },

    async updateBarang(id, dataUpdate) {
      if (dataUpdate.stok < 0) {
        alert("Stok tidak boleh negatif!")
        return
      }
      try {
        await axios.put(`${API}/${id}`, dataUpdate)
        const index = this.barang.findIndex(b => b.id === id)
        if (index !== -1) this.barang[index] = dataUpdate
      } catch (err) {
        console.error("Gagal mengupdate barang:", err)
      }
    },

    async hapusBarang(id) {
      try {
        await axios.delete(`${API}/${id}`)
        this.barang = this.barang.filter(b => b.id !== id)
      } catch (err) {
        console.error("Gagal menghapus barang:", err)
      }
    },

    async tambahStok(id) {
      const item = this.barang.find(b => b.id === id)
      if (!item) return

      const updated = { ...item, stok: item.stok + 1 }

      try {
        await axios.put(`${API}/${id}`, updated)
        const index = this.barang.findIndex(b => b.id === id)
        if (index !== -1) this.barang[index] = updated
      } catch (err) {
        console.error("Gagal menambah stok:", err)
      }
    },

    async kurangiStok(id) {
      const item = this.barang.find(b => b.id === id)
      if (!item) return

      if (item.stok <= 0) {
        alert('Stok tidak boleh kurang dari 0!')
        return
      }

      const updated = { ...item, stok: item.stok - 1 }

      try {
        await axios.put(`${API}/${id}`, updated)
        const index = this.barang.findIndex(b => b.id === id)
        if (index !== -1) this.barang[index] = updated
      } catch (err) {
        console.error("Gagal mengurangi stok:", err)
      }
    }
  }
})
