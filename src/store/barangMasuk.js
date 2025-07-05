import { defineStore } from 'pinia'
import axios from 'axios'
import { useBarangStore } from './barang'

export const useBarangMasukStore = defineStore('barangMasuk', {
  state: () => ({
    barangMasukList: []
  }),
  actions: {
    async fetchBarangMasuk() {
      const res = await axios.get('http://localhost:3000/barangMasuk')
      this.barangMasukList = res.data
    },

    async addBarangMasuk(transaksi) {
      const barangStore = useBarangStore()

      if (transaksi.jumlah <= 0) {
        alert("Jumlah masuk harus lebih dari 0!")
        return
      }

      const barang = barangStore.barangList.find(b => b.id === transaksi.barangId)
      if (!barang) {
        alert("Barang tidak ditemukan!")
        return
      }

      // Tambahkan tanggal jika belum ada
      transaksi.tanggal = transaksi.tanggal || new Date().toISOString().split('T')[0]

      // Simpan transaksi masuk
      await axios.post('http://localhost:3000/barangMasuk', transaksi)

      // Update stok barang
      await barangStore.adjustStok(transaksi.barangId, transaksi.jumlah)

      // Refresh
      this.fetchBarangMasuk()
    }
  }
})
