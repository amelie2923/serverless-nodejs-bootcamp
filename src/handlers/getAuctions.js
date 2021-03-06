import AWS from 'aws-sdk';
import commonMiddleware from '../libs/commonMiddleware';
import createError from 'http-errors';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getAuctions(event, context) {
  let auctions;

  try {
    const result = await dynamodb.scan({
      TableName: process.env.AUCTIONS_TABLE_NAME
    }).promise();

    auctions = result.Items;

  } catch (error) {
    //debug only
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    //resource created
    statusCode: 200,
    body: JSON.stringify(auctions),
  };
}
//handler here is the .handler in handler definition in serverless.yml
export const handler = commonMiddleware(getAuctions);