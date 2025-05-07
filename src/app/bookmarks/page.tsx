import BookmarkGrid from "./bookmark-grid"

export default function Home() {
  return (
    <main className="min-h-screen dark:bg-gray-100">
      <div className="container mx-auto p-4 md:p-6 pt-8 md:pt-12">
        <h1 className="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-100">My Bookmarks</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">Save and organize your favorite articles</p>
        <BookmarkGrid />
      </div>
    </main>
  )
}
