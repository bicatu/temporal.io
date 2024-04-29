import { Connection, Client } from '@temporalio/client';
import { addFunds, AddFundRequest } from './workflows';
import { nanoid } from 'nanoid';

async function run() {
  const connection = await Connection.connect({ address: 'localhost:7233' });

  const client = new Client({
    connection,
  });

  const customerId = `customer-${nanoid()}`;
  const handle = await client.workflow.start(addFunds, {
    taskQueue: 'customer-orders',
    args: [{ customerId, amount: 100 }],
    workflowId: 'add-funds-to-waller-' + customerId,
  });
  console.log(`Started workflow ${handle.workflowId}`);

  console.log(await handle.result()); 
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
