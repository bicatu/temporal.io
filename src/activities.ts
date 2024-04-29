import { randomInt, randomUUID } from "crypto";

export async function captureFunds(amount: number): Promise<string> {
  return Promise.resolve(randomUUID());
}

export async function getBalance(customerId: string): Promise<number> {
  return Promise.resolve(randomInt(1000));
}

export const depositCoins = async (customerId: string, amount: number): Promise<boolean> => {
  return Promise.resolve(true);
}