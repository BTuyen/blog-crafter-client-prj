import { BookOpen, Users, Zap, Heart } from "lucide-react";

const features = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Chia sẻ kiến thức",
    description:
      "Nền tảng để lập trình viên viết, chia sẻ bài học và kinh nghiệm thực tế từ công việc hàng ngày.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Cộng đồng",
    description:
      "Kết nối với những người có cùng đam mê, theo dõi tác giả yêu thích và khám phá nội dung theo tag.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Đơn giản & nhanh",
    description:
      "Editor Markdown quen thuộc, đăng bài trong vài phút, không phức tạp.",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Miễn phí",
    description:
      "Toàn bộ tính năng đọc và viết bài đều miễn phí, không quảng cáo.",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Về Blog Crafter</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
          Blog Crafter là nơi lập trình viên viết về những gì họ học được —
          từ tips nhỏ đến deep dive kỹ thuật, từ kinh nghiệm cá nhân đến
          tutorial chi tiết.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
          >
            <div className="text-blue-500 mb-3">{f.icon}</div>
            <h3 className="font-semibold mb-1">{f.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {f.description}
            </p>
          </div>
        ))}
      </div>

      {/* Tech stack */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-10">
        <h2 className="text-xl font-semibold mb-4">Tech stack</h2>
        <div className="flex flex-wrap gap-2">
          {["Next.js 15", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"].map(
            (tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                {tech}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}
