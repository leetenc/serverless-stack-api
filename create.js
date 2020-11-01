import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

//functions to return current date time of the caller in YYYY-MM-DD HH24:MI:SS format
function getDateStr() {
    const curdate = new Date();
    return curdate.getFullYear() + "-" +
        ("00" + (curdate.getMonth() + 1)).slice(-2) + "-" +
        ("00" + curdate.getDate()).slice(-2) + " " +
        ("00" + curdate.getHours()).slice(-2) + ":" +
        ("00" + curdate.getMinutes()).slice(-2) + ":" +
        ("00" + curdate.getSeconds()).slice(-2);
}

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        // 'Item' contains the attributes of the item to be created
        // - 'userId': user identities are federated through the
        //             Cognito Identity Pool, we will use the identity id
        //             as the user id of the authenticated user
        // - 'noteId': a unique uuid
        // - 'content': parsed from request body
        // - 'attachment': parsed from request body
        // - 'createdAt': current timestamp
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: getDateStr()
        }
    };

    await dynamoDb.put(params);

    return params.Item;
});
