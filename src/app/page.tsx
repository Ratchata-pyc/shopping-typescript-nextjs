import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Welcome to My Shopee Clone</h1>
      <div className="mt-4">
        <Link href="/register" className="text-blue-500">
          Register
        </Link>
        <Link href="/login" className="ml-4 text-blue-500">
          Login
        </Link>
        <Link href="/cart" className="ml-4 text-blue-500">
          Cart
        </Link>
      </div>
    </div>
  );
}
