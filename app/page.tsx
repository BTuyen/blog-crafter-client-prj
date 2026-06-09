import BlogList from "@/app/blogs/components/BlogList";
import LeftSideBar from "@/components/layout/LeftSideBar";
import SideBar from "@/components/layout/SideBar";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <LeftSideBar />
      <main className="flex-1 min-w-0 p-4">
        <BlogList />
      </main>
      <SideBar />
    </div>
  );
}
