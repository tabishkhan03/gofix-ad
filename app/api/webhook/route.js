import { NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import Message from '../../models/Message';
import Referral from '../../models/Referral';
import { getInstagramUsername } from '../../lib/instagram';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  console.log('Webhook GET request:', { mode, token, challenge });

  if (mode === 'subscribe' && token === process.env.INSTAGRAM_VERIFY_TOKEN) {
    return new Response(challenge, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }

  return NextResponse.json('Forbidden', { status: 403 });
}


export async function POST(request) {
  try {
    const headers = {};
    request.headers.forEach((value, key) => {
      headers[key] = value;
    });
    console.log('Webhook POST request headers:', headers);

    const rawBody = await request.text();
    console.log('Raw request body:', rawBody);

    let body;
    try {
      body = JSON.parse(rawBody);
    } catch (error) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    if (body.object === 'instagram' && Array.isArray(body.entry)) {
      await connectDB();

      for (const entry of body.entry) {
        // 💬 Handle messaging events
        if (entry.messaging && Array.isArray(entry.messaging)) {
          for (const messageEvent of entry.messaging) {
            const senderId = messageEvent.sender?.id;
            const recipientId = messageEvent.recipient?.id;
            const timestamp = messageEvent.timestamp;
            const text = messageEvent.message?.text;
            const isEcho = messageEvent.message?.is_echo;
            const referral = messageEvent.referral;

            if (!text || isEcho) {
              console.log('🔁 Ignoring echo or empty message');
              continue;
            }

            // 🔍 Fetch usernames
            const [sender, recipient] = await Promise.all([
              getInstagramUsername(senderId),
              getInstagramUsername(recipientId),
            ]);

            // Check if this is a referral message
            if (referral && referral.source === 'ADS') {
              const newReferral = new Referral({
                senderId,
                senderUsername: sender.username,
                recipientId,
                recipientUsername: recipient.username,
                timestamp: new Date(timestamp),
                content: text,
                adData: {
                  source: referral.source,
                  type: referral.type,
                  adId: referral.ad_id,
                  adTitle: referral.ads_context_data.ad_title,
                  photoUrl: referral.ads_context_data.photo_url
                }
              });

              await newReferral.save();
              console.log('✅ New referral saved with ad data');
            } else {
              const newMessage = new Message({
                senderId,
                senderUsername: sender.username,
                recipientId,
                recipientUsername: recipient.username,
                timestamp: new Date(timestamp),
                content: text,
                adData: null,
              });

              await newMessage.save();
              console.log('✅ New message saved with usernames');
            }
          }
        }

        // 🔄 Handle "changes" (fallback)
        if (entry.changes && Array.isArray(entry.changes)) {
          for (const change of entry.changes) {
            if (change.field === 'messages') {
              const message = change.value;

              const [sender, recipient] = await Promise.all([
                getInstagramUsername(message.from?.id),
                getInstagramUsername(message.to?.id),
              ]);

              const newMessage = new Message({
                senderId: message.from?.id,
                senderUsername: sender.username,
                recipientId: message.to?.id,
                recipientUsername: recipient.username,
                timestamp: new Date(message.timestamp),
                content: message.message?.text,
                adData: message.referral ? {
                  title: message.referral.ad_title,
                  imageUrl: message.referral.ad_image_url,
                  adId: message.referral.ad_id,
                } : null,
              });

              await newMessage.save();
              console.log('✅ New message saved (from "changes") with usernames');
            }
          }
        }
      }

      return NextResponse.json({ status: 'ok' });
    }

    return NextResponse.json({ status: 'ignored', receivedBody: body });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
