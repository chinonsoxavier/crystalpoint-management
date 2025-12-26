export function formatCurrency(
  amount: number,
  locale: string = "en-US",
  currency?: string
) {
  return new Intl.NumberFormat(locale, {
    style: currency ? "currency" : "decimal",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}
