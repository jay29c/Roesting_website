import { useState } from "react";

// Dummy data for coffee products
const coffeeProducts = [
  { id: 1, name: "Espresso Blend", description: "A bold and rich coffee with deep chocolate notes, perfect for an invigorating start.", price: 12.99, image: "https://placehold.co/300x200/964B00/FFFFFF?text=Espresso" },
  { id: 2, name: "Morning Roast", description: "A smooth, medium-bodied coffee with hints of caramel, ideal for a gentle awakening.", price: 10.99, image: "https://placehold.co/300x200/A0522D/FFFFFF?text=Morning+Roast" },
  { id: 3, name: "Decaf Delight", description: "Full flavor without the caffeine, offering a comforting and satisfying evening experience.", price: 11.99, image: "https://placehold.co/300x200/B87333/FFFFFF?text=Decaf" },
  { id: 4, name: "Cold Brew Reserve", description: "A refreshing, velvety smooth coffee, meticulously brewed cold for peak flavor.", price: 14.99, image: "https://placehold.co/300x200/CD853F/FFFFFF?text=Cold+Brew" },
  { id: 5, name: "Ethiopian Yirgacheffe", description: "Bright and floral with citrus notes, a light roast that dances on the palate.", price: 16.50, image: "https://placehold.co/300x200/D2B48C/FFFFFF?text=Yirgacheffe" },
  { id: 6, name: "Sumatra Mandheling", description: "Earthy and full-bodied with low acidity, a complex and rich dark roast.", price: 15.75, image: "https://placehold.co/300x200/8B4513/FFFFFF?text=Sumatra" },
];

function EnhancedCoffeeWebsite() {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-amber-50 text-stone-900 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-800 to-amber-900 text-white py-8 px-6 shadow-2xl rounded-b-3xl">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">Artisan Roasts</h1>
            <p className="text-amber-200 mt-2 text-lg italic">Crafted with Passion, Brewed to Perfection</p>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#" className="text-amber-100 hover:text-white transition-colors duration-300 text-lg font-medium">Home</a></li>
              <li><a href="#" className="text-amber-100 hover:text-white transition-colors duration-300 text-lg font-medium">Shop</a></li>
              <li><a href="#" className="text-amber-100 hover:text-white transition-colors duration-300 text-lg font-medium">About</a></li>
              <li><a href="#" className="text-amber-100 hover:text-white transition-colors duration-300 text-lg font-medium">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-12 px-6">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {coffeeProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-white text-stone-800 rounded-2xl overflow-hidden shadow-xl transition-all duration-500 ease-in-out
                ${hoveredItem === product.id ? "transform -translate-y-4 scale-105 shadow-2xl ring-4 ring-amber-400/50" : "shadow-md hover:shadow-lg"}`}
              onMouseEnter={() => setHoveredItem(product.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Card Header */}
              <div className="p-0 relative">
                <div className="relative overflow-hidden h-52">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform group-hover:scale-110"
                    style={{
                      transform: hoveredItem === product.id ? "scale(1.1)" : "scale(1)",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </div>
              
              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-amber-900">{product.name}</h3>
                <p className="text-stone-600 mb-4 text-base leading-relaxed">{product.description}</p>
                <div className="text-2xl font-extrabold text-amber-700 flex items-center justify-between">
                  <span>${product.price.toFixed(2)}</span>
                  <span className="bg-amber-100 text-amber-800 text-sm px-3 py-1 rounded-full shadow-inner">Premium</span>
                </div>
              </div>
              
              {/* Card Footer */}
              <div className="p-6 pt-0">
                <button
                  className={`w-full py-3 rounded-full font-bold text-lg transition-all duration-300 ease-in-out transform
                    ${
                      hoveredItem === product.id
                        ? "bg-amber-600 text-white shadow-lg -translate-y-1 hover:bg-amber-700"
                        : "bg-amber-500 text-white hover:bg-amber-600 shadow-md"
                    }
                    focus:outline-none focus:ring-4 focus:ring-amber-300`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-amber-950 text-amber-200 py-8 px-6 shadow-inner mt-12">
        <div className="container mx-auto text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Artisan Roasts. All rights reserved. | Crafted with passion in the digital realm.</p>
        </div>
      </footer>
    </div>
  );
}

export default EnhancedCoffeeWebsite;