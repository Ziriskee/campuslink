"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { FaTrashAlt } from "react-icons/fa";
import { useSession } from "next-auth/react";
import Link from "next/link";

// 1. Define a strict structure for your Feed Items
interface FeedItem {
  docId: string;
  title?: string;
  cat?: string;
  timestamp?: string;
  author?: string;
  img?: string;
  newsUpdate?: string;
  userId?: string;
  desc?: string; // in case you fall back to formik desc
}

export default function FeedClient({ userId }: { userId: string | undefined }) {
  // 2. Type your state array as FeedItem[] instead of never[]
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // Fetch items from Firestore on component mount
  useEffect(() => {
    const fetchFeed = async () => {
      // 3. Type your temporary collection array as FeedItem[]
      const initialItems: FeedItem[] = [];
      try {
        const querySnapshot = await getDocs(collection(db, "news"));

        querySnapshot.forEach((docSnapshot) => {
          const data = docSnapshot.data();

          const singlePost: FeedItem = {
            docId: docSnapshot.id,
            title: data.title || "Untitled Post",
            cat: data.cat || "General",
            timestamp: data.timestamp || "Just now",
            author: data.author || "Anonymous",
            img:
              data.img ||
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
            newsUpdate: data.newsUpdate || data.desc || "",
            userId: data.userId || "",
          };

          initialItems.push(singlePost);
        });

        // 4. Update state ONCE outside the loop instead of inside the forEach
        setFeedItems(initialItems);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  // Handle data deletion from Firebase and local state UI
  const handleDelete = async (id: string): Promise<void> => {
    try {
      await deleteDoc(doc(db, "news", id));
      // 5. Filter matching your docId key
      setFeedItems((prevItems) =>
        prevItems.filter((item) => item.docId !== id),
      );
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-5 font-sans">
      <div className="max-w-175 mx-auto">
        {/* Dynamic Section Header */}
        <h1 className="text-3xl font-extrabold text-[#121358] mb-8 pb-3 border-b-2 border-[#36ADA3]">
          Feed Route
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <p className="text-lg font-semibold text-[#121358] animate-pulse">
              Loading feed updates...
            </p>
          </div>
        ) : feedItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-slate-500">No updates available right now.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {feedItems.map((item) => (
              <Link
                href={"/feed/" + item.docId}
                key={item.docId}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {/* Meta Information Row */}
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-[#36ADA3]/10 text-[#36ADA3] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                    {item.cat}
                  </span>
                  <span className="text-slate-500 text-sm">
                    {item.timestamp}
                  </span>
                </div>

                {/* Content Title */}
                <h2 className="text-2xl font-bold text-[#121358] mb-3 leading-snug">
                  {item.title}
                </h2>

                {/* Main Body Text */}
                <p className="text-slate-700 text-[15px] leading-relaxed mb-5">
                  {item.newsUpdate}
                </p>

                <div className="h-px bg-slate-100 mb-4" />

                {/* Card Footer: Profile + Delete Action */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.img}
                      alt={item.author}
                      className="w-10 h-10 rounded-full object-cover bg-slate-100"
                    />
                    <div>
                      <div className="text-[#121358] font-semibold text-sm">
                        {item.author}
                      </div>
                      <div className="text-slate-500 text-xs">Contributor</div>
                    </div>
                  </div>

                  {userId == item.userId && (
                    <button
                      onClick={(e) => {
                        e.preventDefault(); // 👈 STOPS THE LINK NAVIGATION
                        e.stopPropagation(); // 👈 STOPS BUBBLING TO THE PARENT CARD
                        handleDelete(item.docId);
                      }}
                      className="z-10 inline-flex items-center gap-2 text-red-500 bg-white hover:bg-red-50 border border-red-100 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 cursor-pointer relative"
                      title="Delete Post"
                    >
                      <FaTrashAlt className="text-xs" />
                      <span>Delete</span>
                    </button>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
