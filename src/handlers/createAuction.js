import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createAuction(event, context) {
  const { title } = JSON.parse(event.body);
  const now = new Date();

  const auction = {
    id: uuid(),
    title,
    status: 'OPEN',
    createdAt: now.toISOString(),
  };

  await dynamodb.put({
    TableName: 'AuctionsTable',
    Item: auction,
  }).promise();

  return {
    //resource created
    statusCode: 201,
    body: JSON.stringify(auction),
  };
}
//handler here is the .handler in handler definition in serverless.yml
export const handler = createAuction;