export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#1a002e] text-white p-8 overflow-y-auto">
      <h1 className="text-3xl font-black text-yellow-500 mb-6 uppercase">⚖️ Điều Khoản & Chính Sách</h1>
      <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
        <h2 className="text-xl font-bold text-white mt-8">Chính sách Miễn trừ trách nhiệm</h2>
        <p>Connect Pi sử dụng bảo chứng định danh từ Pi Network thông qua quy trình KYC...</p>
        <h2 className="text-xl font-bold text-white mt-8">Quyền quản trị</h2>
        <p>Ban Giám đốc có toàn quyền điều chỉnh logic để bảo vệ "Long mạch" dự án...</p>
      </div>
    </div>
  );
}
