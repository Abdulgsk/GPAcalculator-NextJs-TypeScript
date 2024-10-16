// pages/404.js
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-graycustom to-black text-white">
      <div className="text-center">
        <h1 className="text-9xl font-bold">404</h1>
        <p className="text-2xl mt-4 mb-8">Oops! The page you're looking for doesn't exist.</p>
        <Link href="/" legacyBehavior>
          <span className="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer">
            Back to Home
          </span>
        </Link>
      </div>
    </div>
  );
}
