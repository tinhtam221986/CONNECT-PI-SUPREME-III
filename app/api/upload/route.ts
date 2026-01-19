import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { MongoClient } from 'mongodb';

// 1. Kết nối kho lưu trữ Cloudflare R2 của Boss
const r2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT || '',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
});

const client = new MongoClient(process.env.MONGODB_URI || '');

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const caption = formData.get('caption') as string;

    if (!file) return NextResponse.json({ error: "Chưa chọn video" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `connect-pi-${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

    // A. Đẩy video thật lên Cloudflare R2
    await r2.send(new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    }));

    const videoUrl = `${process.env.R2_PUBLIC_URL}/${fileName}`;

    // B. Ghi danh thông tin vào MongoDB connect_pi_db
    await client.connect();
    const db = client.db('connect_pi_db');
    const result = await db.collection('videos').insertOne({
      title: caption,
      url: videoUrl,
      author: "@tinhtam221986",
      createdAt: new Date(),
      likes: 0,
      views: 0
    });

    return NextResponse.json({ success: true, url: videoUrl, id: result.insertedId });
  } catch (error: any) {
    console.error("Lỗi hệ thống:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}
