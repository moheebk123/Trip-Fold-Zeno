import { Link } from "react-router-dom";
import { FolderX } from "lucide-react";

function TripNotFound() {
  return (
    <section className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-5">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-24 h-24 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <FolderX size={42} className="text-red-400" />
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-bold">Trip Not Found</h1>

          <p className="text-slate-400 leading-7">
            The trip you are trying to access does not exist or may have been
            deleted from your saved trips.
          </p>
        </div>

        <Link
          to="/trips"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl font-medium"
        >
          View All Trips
        </Link>
      </div>
    </section>
  );
}

export default TripNotFound;
