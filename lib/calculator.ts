export const calculatorInsurance = (num: number) => {
  return num * 0.1;
};

export const calculatorVAT = (num: number) => {
  return num * 0.1;
};

export const calculatorRentalFee = (price: number, day: number) => {
  return (price + price * 0.1) * day;
};
