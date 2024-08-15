// app/page.js
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-100">
      <header className="w-full bg-gray-200 py-6 shadow-md">
        <div className="container mx-auto px-6">
          <div className="flex justify-end">
            <div className="text-right flex gap-6">
              <Link href="/assignment_one">
                <h1 className="text-3xl font-bold text-blue-600 hover:text-blue-800 transition duration-300">Assignment 1</h1>
              </Link>
              <Link href="/assignment_two">
                <h1 className="text-3xl font-bold text-blue-600 hover:text-blue-800 transition duration-300">Assignment 2</h1>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Welcome to My Next.js App</h1>
        <p className="text-lg text-gray-700 mb-6">I have completed both assignments which you can access via the links above.</p>

        <div
          className="relative w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-lg"
          style={{ backgroundImage: 'url("https://media.giphy.com/media/3o6Zt7jL2qA9T7jWf6/giphy.gif")', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <img 
            src="/photo.png" 
            alt="Description of the photo"
            className="w-full h-auto rounded-lg shadow-md" 
          />
        </div>
      </main>

      <footer className="w-full bg-gray-200 py-4 mt-8">
        <div className="container mx-auto text-center text-gray-600">
          <p className="text-sm">&copy; {new Date().getFullYear()} My Next.js App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
