import { NextResponse } from 'next/server';
// Sử dụng đường dẫn tương đối để Vercel tìm thấy file 100%
import { connectDB } from '../../../lib/mongodb';
import User from '../../../lib/models/User';

export async function GET() {
  try {
    await connectDB();
    // Thử lấy danh sách User để kiểm tra kết nối DB
    const users = await User.find({}).limit(10);
    return NextResponse.json(users);
  } catch (error: any) {
    // Trả về lỗi cụ thể để chúng ta dễ debug
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
