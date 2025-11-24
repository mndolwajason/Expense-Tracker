const express = require('express');
const { DynamoDBClient, PutItemCommand, QueryCommand } = require('@aws-sdk/client-dynamodb');

const app = express();
app.use(express.json());

const TABLE = process.env.TABLE_NAME || 'jm-fproj-expenses';
const REGION = process.env.AWS_REGION || 'us-east-1';
const ddb = new DynamoDBClient({ region: REGION });

// health check
app.get('/health', (_, res) => {
  res.json({ ok: true });
});

// write path
app.post('/expense', async (req, res) => {
  try {
    const user = req.body.user || 'demo';
    const amount = req.body.amount || 0;
    const category = req.body.category || 'misc';
    const ExpenseId = Date.now().toString();

    await ddb.send(new PutItemCommand({
      TableName: TABLE,
      Item: {
        UserId: { S: user.toString() },
        ExpenseId: { S: ExpenseId },
        Amount: { N: amount.toString() },
        Category: { S: category.toString() }
      }
    }));

    res.json({ ok: true, ExpenseId });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.toString() });
  }
});

// read path
app.get('/expense/:user', async (req, res) => {
  try {
    const user = req.params.user;

    const out = await ddb.send(new QueryCommand({
      TableName: TABLE,
      KeyConditionExpression: "UserId = :u",
      ExpressionAttributeValues: { ":u": { S: user } }
    }));

    res.json(out.Items || []);
  } catch (e) {
    res.status(500).json({ ok: false, error: e.toString() });
  }
});

app.listen(80, () => console.log('Expense API listening on port 80'));

