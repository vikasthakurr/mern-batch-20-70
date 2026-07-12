import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Fresh Food, Delivered <span className="text-orange-500">Fast</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Order from the best cloud kitchens in your city. Fresh meals prepared
          by expert chefs, delivered to your doorstep.
        </p>
        <Link
          to="/kitchens"
          className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition"
        >
          Explore Kitchens
        </Link>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-4xl mb-3">🍽️</div>
            <h3 className="text-xl font-semibold mb-2">Wide Variety</h3>
            <p className="text-gray-500">
              Veg, Non-Veg, Vegan — choose from multiple cuisines
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-500">
              Get your food delivered in 30 minutes or less
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-4xl mb-3">💳</div>
            <h3 className="text-xl font-semibold mb-2">Easy Payments</h3>
            <p className="text-gray-500">
              Pay via UPI, Card, or Cash on Delivery
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
