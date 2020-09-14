import AWS from 'aws-sdk';
import createError from 'http-errors';
import commonMiddleware from '../libs/commonMiddleware';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function placeBid(event, context) {
  //get id from path parameters
  const { id } = event.pathParameters;
  const { amount } = event.body;

  //dynamodb update the auction on the table with the id get from path parameters
  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: { id },
    //update highest bid in dynamodb set in column amount
    UpdateExpression: 'set highestBid.amount = :amount',
    ExpressionAttributeValues: {
      ':amount': amount,
    },
    ReturnValues: 'ALL_NEW',
  };

  let updatedAuction;

  try {
    const result = await dynamodb.update(params).promise();
    updatedAuction = result.Attributes;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(updatedAuction),
  };
}
//handler here is the .handler in handler definition in serverless.yml
export const handler = commonMiddleware(placeBid);