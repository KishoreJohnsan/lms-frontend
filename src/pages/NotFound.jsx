import { Link} from "react-router-dom"

const NotFound = () => {
  return (
    <div className="relative max-w-screen-2xl px-4 py-16 place-content-center">
      <div className="text-center">
        <h1 className="font-black text-gray-400 text-9xl">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500">We can`t find that page.</p>

        <Link
          to="/"
          className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-[#1e3a8a] hover:bg-[#2563eb] rounded focus:outline-none focus:ring"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
