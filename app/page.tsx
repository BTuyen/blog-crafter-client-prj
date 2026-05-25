import BlogList from "@/app/blogs/index/page";
import LeftSideBar from "@/components/layout/LeftSideBar";
import SideBar from "@/components/layout/SideBar";

export default function Home() {
  return (
    <div className="flex h-screen">
      <LeftSideBar />
      <main className="flex-1 p-4">
        <BlogList />
      </main>
      <SideBar />
    </div>
  );
}
