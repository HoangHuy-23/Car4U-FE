export const enumFormat = (value: string) => {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

export const enumFormatWithSpace = (value: string) => {
  if (!value) return "";
  return value
    .split(/(?=[A-Z])/)
    .join(" ")
    .replace(/^\w/, (c) => c.toUpperCase());
}
export const enumFormatWithSpaceAndUnderscore = (value: string) => {
  if (!value) return "";
  return value
    .split(/(?=[A-Z])/)
    .join(" ")
    .replace(/_/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());
}

export const formatFuelTypeToVN = (value: string) => {
  if (!value) return "";
  switch (value) {
    case "GASOLINE":
      return "Xăng";
    case "DIESEL":
      return "Dầu";
    case "ELECTRIC":
      return "Điện";
    default:
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}

export const formatTransmissionTypeToVN = (value: string) => {
  if (!value) return "";
  switch (value) {
    case "MANUAL":
      return "Số sàn";
    case "AUTOMATIC":
      return "Số tự động";
    default:
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}