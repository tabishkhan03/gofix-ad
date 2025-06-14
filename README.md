# Instagram Message Viewer

A full-stack application to view and manage Instagram messages with ad referrals, built with Next.js 14, Tailwind CSS, and MongoDB.

## Features

- Instagram webhook integration for real-time message updates
- Beautiful, responsive UI with Tailwind CSS
- Auto-refreshing message feed
- Direct links to Instagram chat and Facebook Ad Library
- MongoDB integration for message storage

## Prerequisites

- Node.js 18+ installed
- MongoDB database (local or Atlas)
- Instagram Business Account with API access
- ngrok or similar tool for local development

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd instagram-message-viewer
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```
MONGODB_URI=your-mongodb-connection-string
INSTAGRAM_VERIFY_TOKEN=your-verify-token
```

4. Start the development server:
```bash
npm run dev
```

5. For local development, use ngrok to create a public URL:
```bash
ngrok http 3000
```

6. Configure your Instagram webhook:
   - Go to your Instagram Business Account settings
   - Set up a webhook with the ngrok URL + `/api/webhook`
   - Use the same verify token as in your `.env.local` file

## Deployment

The application can be easily deployed to Vercel:

1. Push your code to a Git repository
2. Import the project in Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

## API Endpoints

- `GET /api/webhook` - Webhook verification endpoint
- `POST /api/webhook` - Webhook for receiving Instagram messages
- `GET /api/messages` - Fetch all messages from the database

## Frontend Routes

- `/messages` - View all Instagram messages with ad referrals

## License

MIT 