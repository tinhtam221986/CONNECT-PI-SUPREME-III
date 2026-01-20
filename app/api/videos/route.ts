import { NextResponse } from 'next/server';
// Thay đổi đường dẫn từ @/ sang đường dẫn tương đối để tránh lỗi Build
import { connectDB } from '../../../lib/mongodb';
import User from '../../../lib/models/User';

export async function GET() {
  try {
    await connectDB();
    // Lấy danh sách người dùng để kiểm tra mạch dữ liệu
    const users = await User.find({}).limit(10);
    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

