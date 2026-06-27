import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Hero Section */}
      <section className="bg-[#121358] text-white py-20 px-5 text-center relative overflow-hidden">
        {/* Subtle background color visual design accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#36ADA3] opacity-10 rounded-full blur-2xl transform translate-x-20 -translate-y-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#36ADA3] opacity-5 rounded-full blur-3xl transform -translate-x-20 translate-y-20"></div>

        <div className="max-w-3xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            About <span className="text-[#36ADA3]">CampusLink</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Bridging the gap between students, educators, and resources to build
            a smarter, unified university community.
          </p>
        </div>
      </section>

      {/* Our Mission & Core Vision Section */}
      <section className="max-w-5xl mx-auto py-16 px-5 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="w-12 h-1 mb-4 bg-[#36ADA3] rounded-full" />
          <h2 className="text-3xl font-bold text-[#121358] mb-4">
            Our Mission
          </h2>
          <p className="text-slate-600 text-base leading-relaxed mb-4">
            CampusLink was born out of a simple realization: university
            information is often scattered across too many disconnected
            platforms. Important notices get lost in massive email chains,
            valuable study materials sit isolated in private chats, and
            real-time updates are missed.
          </p>
          <p className="text-slate-600 text-base leading-relaxed">
            We built a unified hub where campus news travels quickly, resources
            are shared fluidly among peers, and students remain securely locked
            into their community.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative">
          <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#36ADA3]/20 rounded-lg -z-10"></div>
          <h3 className="text-xl font-bold text-[#121358] mb-6">
            What Drives Us
          </h3>

          <ul className="space-y-4">
            <li className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#36ADA3]/10 text-[#36ADA3] flex items-center justify-center font-bold text-sm">
                ✓
              </span>
              <div>
                <strong className="text-slate-700 block font-semibold">
                  Accessibility
                </strong>
                <p className="text-sm text-slate-500">
                  Every study guide, announcement, or notice is structured and
                  discoverable effortlessly.
                </p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#36ADA3]/10 text-[#36ADA3] flex items-center justify-center font-bold text-sm">
                ✓
              </span>
              <div>
                <strong className="text-slate-700 block font-semibold">
                  Security & Ownership
                </strong>
                <p className="text-sm text-slate-500">
                  Users retain strict profile privacy and total administrative
                  deletion rights over their unique posts.
                </p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#36ADA3]/10 text-[#36ADA3] flex items-center justify-center font-bold text-sm">
                ✓
              </span>
              <div>
                <strong className="text-slate-700 block font-semibold">
                  Collaboration
                </strong>
                <p className="text-sm text-slate-500">
                  Empowering student contributors and teaching staff to guide
                  others symmetrically.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Interactive Core Platform Features Layout */}
      <section className="bg-white border-t border-b border-slate-200 py-16 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#121358]">
              Features Tailored For You
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              Everything you need to navigate your everyday student itinerary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-[#36ADA3]/30 transition-all">
              <div className="text-2xl text-[#36ADA3] mb-3 font-semibold">
                01
              </div>
              <h3 className="text-lg font-bold text-[#121358] mb-2">
                Real-Time News Feed
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Stay up to speed with active student announcements and
                classifications ranging from social gatherings to standard
                operations.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-[#36ADA3]/30 transition-all">
              <div className="text-2xl text-[#36ADA3] mb-3 font-semibold">
                02
              </div>
              <h3 className="text-lg font-bold text-[#121358] mb-2">
                Resource Exchange
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Upload or find course materials, study methods, guidelines, and
                lecture slides prepared directly by your classmates.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-[#36ADA3]/30 transition-all">
              <div className="text-2xl text-[#36ADA3] mb-3 font-semibold">
                03
              </div>
              <h3 className="text-lg font-bold text-[#121358] mb-2">
                Complete Post Autonomy
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Maintain accurate records. Modify your basic profile identity,
                submit your write-ups, or remove obsolete files cleanly at any
                time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Block */}
      <section className="max-w-4xl mx-auto text-center py-20 px-5">
        <h2 className="text-3xl font-bold text-[#121358] mb-4">
          Ready to Connect With Your Campus?
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto mb-8 text-base">
          Join your peers today, look through recent announcements, or share
          your very first educational resource post with the entire student
          system.
        </p>
        <div className="flex justify-center items-center gap-4 flex-wrap">
          <Link
            href="/feed"
            className="bg-[#121358] text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 active:scale-[0.98] transition-all shadow-sm shadow-[#121358]/10"
          >
            Explore Feed
          </Link>
          <Link
            href="/post"
            className="bg-white text-[#121358] border border-slate-300 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 active:scale-[0.98] transition-all"
          >
            Create a Post
          </Link>
        </div>
      </section>
    </main>
  );
}
