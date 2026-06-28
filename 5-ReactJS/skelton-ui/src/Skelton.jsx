const Skelton = () => {
  return (
    <div className="w-72 bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Image Placeholder */}
      <div className="h-56 bg-gray-200 animate-pulse" />

      {/* Card Body */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-5 bg-gray-200 rounded-md animate-pulse w-3/4" />

        {/* Rating */}
        <div className="h-4 bg-gray-200 rounded-md animate-pulse w-1/2" />

        {/* Price */}
        <div className="h-6 bg-gray-200 rounded-md animate-pulse w-1/3" />

        {/* Button */}
        <div className="h-10 bg-gray-200 rounded-xl animate-pulse w-full mt-2" />
      </div>
    </div>
  );
};

export default Skelton;
