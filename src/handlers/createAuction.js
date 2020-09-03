async function createAuction(event, context) {
  const { title } = JSON.parse(event.body);
  const now = new Date();

  const auction = {
    title,
    status: 'OPEN',
    createdAt: now.toISOString(),
  }

  return {
    //resource created
    statusCode: 201,
    body: JSON.stringify(auction),
  };
}
//handler here is the .handler in handler definition in serverless.yml
export const handler = createAuction;