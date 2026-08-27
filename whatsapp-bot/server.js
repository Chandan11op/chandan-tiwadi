const express = require('express');
const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Verify Meta Webhook Signature
function verifySignature(req, res, buf) {
  const signature = req.headers['x-hub-signature-256'];
  const appSecret = process.env.META_APP_SECRET;

  if (signature && appSecret) {
    const expectedSignature = 'sha256=' + crypto.createHmac('sha256', appSecret).update(buf).digest('hex');
    if (signature !== expectedSignature) {
      console.warn('Invalid signature received');
      throw new Error('Invalid signature');
    }
  }
}

// Middleware to parse JSON and verify signature
app.use(express.json({ verify: verifySignature }));

// Error handling middleware for signature failure
app.use((err, req, res, next) => {
  if (err.message === 'Invalid signature') {
    return res.status(403).send('Invalid signature');
  }
  next(err);
});

// Health endpoints
app.get('/', (req, res) => {
  res.send('WhatsApp bot backend is running.');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Webhook Verification (GET)
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
    console.log('Webhook verified');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Webhook Reception (POST)
app.post('/webhook', async (req, res) => {
  const body = req.body;

  if (body && body.object === 'whatsapp_business_account') {
    try {
      if (
        body.entry &&
        body.entry[0].changes &&
        body.entry[0].changes[0].value.messages &&
        body.entry[0].changes[0].value.messages[0]
      ) {
        const message = body.entry[0].changes[0].value.messages[0];
        const senderId = message.from;
        
        if (message.type === 'text') {
          const messageText = message.text.body;

          // Exact string match as requested
          if (messageText === "Hey Chandan Tiwadi") {
            const replyText = "Hey, Thanks for Connecting to me right now I am a bit Busy I'll Contact You Later sorry.";
            await sendWhatsAppMessage(senderId, replyText);
          }
        }
      }
      // Always send 200 OK so Meta doesn't retry
      res.sendStatus(200);
    } catch (error) {
      console.error('Error processing webhook event:', error.message);
      res.sendStatus(200);
    }
  } else {
    // If not a whatsapp event
    res.sendStatus(404);
  }
});

async function sendWhatsAppMessage(to, text) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.PHONE_NUMBER_ID;
  const apiVersion = process.env.META_GRAPH_API_VERSION;

  if (!token || !phoneNumberId || !apiVersion) {
    console.error('Missing required environment variables for sending WhatsApp message.');
    return;
  }

  const url = `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: to,
        type: 'text',
        text: { body: text },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to send WhatsApp message. Status:', response.status);
      console.error('Error details:', JSON.stringify(errorData)); // Safe to log error response structure, but token is not logged
    } else {
      console.log('Message sent successfully to', to);
    }
  } catch (error) {
    console.error('Error in sendWhatsAppMessage:', error.message);
  }
}

app.listen(port, '0.0.0.0', () => {
  console.log(`WhatsApp bot backend is listening on port ${port}`);
});
