export function BlogPost() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>Blog Title</h1>
      <div className="flex items-center gap-4 my-4">
        <div className="flex items-center gap-2">
          <img src="/placeholder-avatar.jpg" alt="Author" className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-semibold">Author Name</p>
            <p className="text-sm text-gray-500">Posted on January 1, 2024</p>
          </div>
        </div>
      </div>
      <div className="prose-lg">
        <p>Blog content will go here...</p>
      </div>
    </article>
  );
}
