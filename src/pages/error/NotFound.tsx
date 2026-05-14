import { Link } from "react-router-dom";
import { TriangleAlert, House } from "lucide-react";

function NotFound() {
  return (
    <section className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <TriangleAlert size={42} className="text-amber-400" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-7xl font-bold tracking-tight">404</h1>

          <h2 className="text-2xl md:text-3xl font-semibold">
            Page Not Found
          </h2>

          <p className="text-slate-400 max-w-md mx-auto">
            Looks like this page took an unexpected trip and never came back.
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        {/* Action */}
        <div className="flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl font-medium"
          >
            <House size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;