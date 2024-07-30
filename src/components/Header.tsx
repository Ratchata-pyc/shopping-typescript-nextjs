import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">My Shopee Clone</Link>
        </div>
        <div>
          <Link href="/register" className="ml-4">
            Register
          </Link>
          <Link href="/login" className="ml-4">
            Login
          </Link>
          <Link href="/cart" className="ml-4">
            Cart
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
