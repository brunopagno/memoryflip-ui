import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/auth";

function Box({ header, body }) {
  return (
    <div className="flex-1 items-center text-center">
      <h3 className="font-semibold text-gray-900">{header}</h3>
      <p className="text-gray-600">{body}</p>
    </div>
  );
}

export function Home() {
  const auth = useAuth();
  if (auth.isLoggedIn()) {
    return <Navigate to="/me" />;
  }

  return (
    <>
      <div className="h-48 bg-indigo-100 p-4 text-center rounded-lg shadow-md">
        <h1 className="text-5xl font-bold">Memory Flip</h1>
        <p className="my-2 text-lg">A simple way of memorising new words.</p>
        <Link to="/register" className="btn btn-primary btn-lg">
          Register
        </Link>
      </div>
      <div className="flex mt-8">
        <Box body="Write your own cards." />
        <Box body="Learn new words." />
        <Box body="Practice your new words." />
      </div>
      <div className="border-2 border-indigo-200 rounded-lg text-lg my-12 py-6">
        <p className="text-center text-gray-600">And it's free to use.</p>
      </div>
      <div>
        <p>
          Made with <span className="text-indigo-500">❤</span> by{" "}
          <a className="link" target="_blank" href="https://brunopagno.github.io">Bruno Pagno</a>.
        </p>
      </div>
    </>
  );
}
