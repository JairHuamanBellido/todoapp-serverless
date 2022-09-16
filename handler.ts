import { APIGatewayAuthorizerEvent } from "aws-lambda";
module.exports.hello = async (event: APIGatewayAuthorizerEvent) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless v3.0! Your function executed successfully!",
      input: event,
    }),
  };
};
