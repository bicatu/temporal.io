export const calculateBonus = (balance: number): number => {
  if (balance > 1000) {
    return 100;
  } else if (balance > 500) {
    return 50;
  } else {
    return 0;
  }   
}