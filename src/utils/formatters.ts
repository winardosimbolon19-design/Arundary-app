export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace(/\s+/g, ''); // "Rp28.000" as requested in user prompt
}

export function getStockStatus(item: { stock: number; isAvailable: boolean }): 'AVAILABLE' | 'LOW STOCK' | 'OUT OF STOCK' {
  if (!item.isAvailable || item.stock <= 0) {
    return 'OUT OF STOCK';
  }
  if (item.stock <= 5) {
    return 'LOW STOCK';
  }
  return 'AVAILABLE';
}
