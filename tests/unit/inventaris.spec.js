import { describe, it, expect, vi, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useBarangStore } from "../../src/store/barang";
import axios from "axios";

// Mock axios
vi.mock("axios");

describe("Inventaris Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("fetchBarang updates barangList correctly", async () => {
    const mockData = [
      { id: 1, nama: "Laptop", jumlah: 10 },
      { id: 2, nama: "Printer", jumlah: 5 },
    ];

    axios.get.mockResolvedValue({ data: mockData });

    const store = useBarangStore();
    await store.fetchBarang();

    expect(store.barangList).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledTimes(1); // ✅ ganti ini
  });
});
