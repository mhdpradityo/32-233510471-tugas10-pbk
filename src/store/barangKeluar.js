import { defineStore } from 'pinia'
import axios from 'axios'
import { useBarangStore } from './barang'

export const useBarangKeluarStore = defineStore('barangKeluar', {
  state: () => ({
    barangKeluarList: []
  }),
  actions: {
    async fetchBarangKeluar() {
      const res = await axios.get('http://localhost:3000/barangKeluar')
      this.barangKeluarList = res.data
    },

    async addBarangKeluar(transaksi) {
      const barangStore = useBarangStore()
      const barang = barangStore.barangList.find(b => b.id === transaksi.barangId)

      if (!barang) {
        alert("Barang tidak ditemukan!")
        return
      }

      if (transaksi.jumlah > barang.stok) {
        alert("Jumlah melebihi stok yang tersedia!")
        return
      }

      // Tambahkan tanggal otomatis jika belum ada
      transaksi.tanggal = transaksi.tanggal || new Date().toISOString().split('T')[0]

      // Simpan transaksi keluar
      await axios.post('http://localhost:3000/barangKeluar', transaksi)

      // Kurangi stok
      await barangStore.adjustStok(transaksi.barangId, -transaksi.jumlah)

      // Refresh data
      this.fetchBarangKeluar()
    }
  }
})
