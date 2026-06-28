const Card = ({ image, name, price, rating }) => {
  return (
    <div className="w-72 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Product Image */}
      <div className="h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-2">
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-sm ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
            >
              ★
            </span>
          ))}
          <span className="text-xs text-gray-500 ml-1">({rating}/5)</span>
        </div>

        {/* Price */}
        <p className="text-xl font-bold text-gray-900">₹{price}</p>

        {/* Add to Cart Button */}
        <button className="w-full mt-2 bg-black text-white py-2 rounded-xl font-medium hover:bg-gray-800 active:scale-95 transition-all duration-200">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
