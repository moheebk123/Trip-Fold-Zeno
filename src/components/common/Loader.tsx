import loaderImg from "/favicon.svg";

function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
      {/* Loader Image */}
      <img
        src={loaderImg}
        alt="Loading"
        className="w-20 h-20 sm:w-24 sm:h-24 animate-bounce"
      />

      {/* Loading Text */}
      <h2 className="mt-4 text-lg sm:text-xl font-semibold text-gray-700">
        Loading...
      </h2>

      <p className="mt-2 text-sm sm:text-base text-gray-500 px-4 text-center">
        Please wait while we prepare everything for you
      </p>
    </div>
  );
}

export default Loader;