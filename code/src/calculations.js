const vatMultiplier = percentage =>
  (percentage / 100) + 1

export const exVatToIncVat = (percentage, exVat) =>
  exVat * vatMultiplier(percentage)

export const incVatToExVat = (percentage, incVat) =>
  incVat / vatMultiplier(percentage)
