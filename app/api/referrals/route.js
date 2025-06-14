import { NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import Referral from '../../models/Referral';

export async function GET() {
  try {
    await connectDB();
    const referrals = await Referral.find()
      .sort({ timestamp: -1 })
      .limit(50);
    
    return NextResponse.json(referrals);
  } catch (error) {
    console.error('Error fetching referrals:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}