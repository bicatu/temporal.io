import { proxyActivities } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';
import { calculateBonus } from './bonus';

export type AddFundRequest = {
  customerId: string;
  amount: number;
};

export type AddFundResponse = {
  transactionId: string;
  coins: number;
  balance: number;
};

const { captureFunds } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

const { getBalance } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

const { depositCoins } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

/** A workflow that simply calls an activity */
export const addFunds = async (addFundsRequest: AddFundRequest): Promise<AddFundResponse> => {
  const transactionId = await captureFunds(addFundsRequest.amount);
  const balance = await getBalance(addFundsRequest.customerId);
  const bonus = calculateBonus(balance);
  const newCoins = addFundsRequest.amount + bonus;

  await depositCoins(addFundsRequest.customerId, newCoins);
  
  return { transactionId, coins: newCoins, balance };
}
