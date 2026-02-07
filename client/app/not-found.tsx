import Link from "next/link";
import "./[locale]/globals.css";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-amber-50 via-white to-yellow-50 px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="relative inline-block mb-6">
            <h1 className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-linear-to-r from-amber-700 to-yellow-600 leading-none">
              404
            </h1>
            <div className="absolute inset-0 blur-3xl bg-linear-to-r from-amber-400 to-yellow-400 opacity-20 -z-10"></div>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved to a new location.
          </p>
        </div>

        <div className="flex justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-linear-to-r from-amber-700 to-yellow-600 text-white rounded-lg font-semibold hover:from-amber-800 hover:to-yellow-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
