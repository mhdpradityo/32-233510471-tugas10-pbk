import { defineStore } from 'pinia'
import axios from 'axios'

export const useBarangStore = defineStore('barang', {
  state: () => ({
    barangList: []
  }),
  actions: {
    async fetchBarang() {
      const res = await axios.get('http://localhost:3000/barang')
      this.barangList = res.data
    },
    async addBarang(barang) {
      if (barang.stok < 0) {
        alert("Stok tidak boleh negatif!")
        return
      }
      await axios.post('http://localhost:3000/barang', barang)
      this.fetchBarang()
    },
    async updateBarang(id, data) {
      if (data.stok < 0) {
        alert("Stok tidak boleh negatif!")
        return
      }
      await axios.put(`http://localhost:3000/barang/${id}`, data)
      this.fetchBarang()
    },
    async deleteBarang(id) {
      await axios.delete(`http://localhost:3000/barang/${id}`)
      this.fetchBarang()
    },
    async adjustStok(id, jumlah) {
      const barang = this.barangList.find(b => b.id === id)
      if (!barang) return

      const stokBaru = barang.stok + jumlah
      if (stokBaru < 0) {
        alert("Stok tidak boleh kurang dari 0!")
        return
      }

      const updated = { ...barang, stok: stokBaru }
      await axios.put(`http://localhost:3000/barang/${id}`, updated)
      this.fetchBarang()
    }
  }
})
