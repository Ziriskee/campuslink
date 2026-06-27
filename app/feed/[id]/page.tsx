import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SinglePostPage({ params }: PageProps) {
  // Resolve params asynchronously according to Next.js best practices
  const { id } = await params;

  let postData = null;

  try {
    const docRef = doc(db, "news", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      postData = docSnap.data();
    }
  } catch (error) {
    console.error(
      "Error retrieving single dynamic post layout document:",
      error,
    );
  }

  // Fallback View if post document doesn't exist
  if (!postData) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6">
        <div className="text-center p-8 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-md">
          <h2 className="text-xl font-bold text-[#121358] mb-2">
            Post Not Found
          </h2>
          <p className="text-slate-500 mb-6">
            The update you are searching for might have been moved or deleted.
          </p>
          <Link
            href="/feed"
            className="bg-[#121358] text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all"
          >
            Return to Feed
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-5 font-sans">
      <div className="max-w-[700px] mx-auto">
        {/* Navigation Return Button */}
        <Link
          href="/feed"
          className="inline-flex items-center text-sm font-semibold text-[#36ADA3] hover:underline mb-6"
        >
          &larr; Back to Feed
        </Link>

        {/* Full Post View Article Card */}
        <article className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
          {/* Top Classification Meta Details */}
          <div className="flex justify-between items-center mb-6">
            <span className="bg-[#36ADA3]/10 text-[#36ADA3] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              {postData.cat || "General"}
            </span>
            <span className="text-slate-500 text-sm">
              {postData.timestamp || "Just now"}
            </span>
          </div>

          {/* Large Post Title */}
          <h1 className="text-3xl font-extrabold text-[#121358] mb-6 leading-tight">
            {postData.title}
          </h1>

          {/* Main Long Body Description Content */}
          <p className="text-slate-700 text-base leading-relaxed mb-8 whitespace-pre-wrap">
            {postData.newsUpdate || postData.desc}
          </p>

          <div className="h-px bg-slate-100 mb-6" />

          {/* Author Meta Bottom Badge */}
          <div className="flex items-center gap-3">
            <img
              src={
                postData.img ||
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
              }
              alt={postData.author || "User Profile Avatar"}
              className="w-12 h-12 rounded-full object-cover bg-slate-100"
            />
            <div>
              <div className="text-[#121358] font-bold text-base">
                {postData.author || "Anonymous"}
              </div>
              <div className="text-slate-500 text-xs">Campus Contributor</div>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
