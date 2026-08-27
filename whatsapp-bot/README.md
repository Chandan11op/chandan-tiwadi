# WhatsApp Bot

This is a standalone Node.js and Express backend that listens for incoming WhatsApp messages via the Meta Cloud API.

## What this bot does

When someone sends a WhatsApp text message containing exactly:
`Hey Chandan Tiwadi`

The bot replies exactly with:
`Hey, Thanks for Connecting to me right now I am a bit Busy I'll Contact You Later sorry.`

It ignores any other messages, images, variations in casing, or additional text.

## Installation

1. Make sure you have Node.js installed.
2. Clone or open this repository folder.
3. Install the dependencies by running:
   ```bash
   npm install
   ```

## Configuration

1. Copy the `.env.example` file and create a new file named `.env`.
   ```bash
   cp .env.example .env
   ```
2. Open the `.env` file and fill in your Meta developer credentials.

### Environment Variables

* `PORT`: The port the server will listen on (default is 3000).
* `VERIFY_TOKEN`: A custom string you create. You will provide this to Meta when configuring the webhook.
* `WHATSAPP_ACCESS_TOKEN`: Your Meta Graph API Access Token for sending messages.
* `PHONE_NUMBER_ID`: The unique ID of the phone number sending the messages (found in Meta App Dashboard).
* `META_GRAPH_API_VERSION`: The Graph API version, e.g., `v21.0`.
* `META_APP_SECRET`: The App Secret from your Meta App Dashboard, used to verify the incoming webhook signature.

## Running Locally

To start the server, run:
```bash
npm start
```
The server will bind to `0.0.0.0` and listen on port 3000 by default.

For development with auto-restart on file changes:
```bash
npm run dev
```

## Meta Webhook Verification

Meta will send a `GET` request to your `/webhook` endpoint with a challenge when you first configure your webhook URL in the Meta Dashboard. This backend automatically responds to the challenge if the `hub.verify_token` sent by Meta exactly matches the `VERIFY_TOKEN` you placed in your `.env` file.

The application also securely verifies the `X-Hub-Signature-256` header on incoming `POST` requests to ensure that the payloads actually originate from Meta. 

## Deploying to Render

This project is configured to run smoothly on Render.
1. Create a new Web Service on Render.
2. Point it to this repository or folder.
3. Use the build command: `npm install`
4. Use the start command: `npm start`
5. Ensure you configure the Environment Variables in the Render Dashboard (Do NOT upload your `.env` file).

Once deployed, your final Meta Callback URL will be:
`https://YOUR-RENDER-SERVICE.onrender.com/webhook`
