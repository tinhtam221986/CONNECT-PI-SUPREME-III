import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI || '');

export async function GET() {
  try {
    await client.connect();
    const db = client.db('connect_pi_db');
    
    // Lấy danh sách video mới nhất từ MongoDB
    const videos = await db.collection('videos')
      .find({})
      .sort({ createdAt: -1 })
      .limit(30)
      .toArray();

    return NextResponse.json(videos);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}
