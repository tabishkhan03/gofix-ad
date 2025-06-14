import { NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import Message from '../../models/Message';

export async function GET() {
  try {
    await connectDB();
    const messages = await Message.find()
      .sort({ timestamp: -1 })
      .limit(50);
    
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 