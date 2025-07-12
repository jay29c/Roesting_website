import { useState } from "react";
import { ShoppingCart, Plus, Minus, X, MapPin, Mail, Phone, User } from "lucide-react";

// Coffee products with inventory tracking
const coffeeProducts = [
  { 
    id: 1, 
    name: "Espresso Blend", 
    description: "A bold and rich coffee with deep chocolate notes, perfect for an invigorating start.", 
    price: 12.99, 
    image: "https://placehold.co/300x200/964B00/FFFFFF?text=Espresso",
    inventory: 25,
    roastLevel: "Dark"
  },
  { 
    id: 2, 
    name: "Morning Roast", 
    description: "A smooth, medium-bodied coffee with hints of caramel, ideal for a gentle awakening.", 
    price: 10.99, 
    image: "https://placehold.co/300x200/A0522D/FFFFFF?text=Morning+Roast",
    inventory: 18,
    roastLevel: "Medium"
  },
  { 
    id: 3, 
    name: "Decaf Delight", 
    description: "Full flavor without the caffeine, offering a comforting and satisfying evening experience.", 
    price: 11.99, 
    image: "https://placehold.co/300x200/B87333/FFFFFF?text=Decaf",
    inventory: 12,
    roastLevel: "Medium"
  },
  { 
    id: 4, 
    name: "Cold Brew Reserve", 
    description: "A refreshing, velvety smooth coffee, meticulously brewed cold for peak flavor.", 
    price: 14.99, 
    image: "https://placehold.co/300x200/CD853F/FFFFFF?text=Cold+Brew",
    inventory: 8,
    roastLevel: "Light"
  },
  { 
    id: 5, 
    name: "Ethiopian Yirgacheffe", 
    description: "Bright and floral with citrus notes, a light roast that dances on the palate.", 
    price: 16.50, 
    image: "https://placehold.co/300x200/D2B48C/FFFFFF?text=Yirgacheffe",
    inventory: 15,
    roastLevel: "Light"
  },
  { 
    id: 6, 
    name: "Sumatra Mandheling", 
    description: "Earthy and full-bodied with low acidity, a complex and rich dark roast.", 
    price: 15.75, 
    image: "https://placehold.co/300x200/8B4513/FFFFFF?text=Sumatra",
    inventory: 22,
    roastLevel: "Dark"
  },
];

function CoffeeRoasterApp() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  });

  // Cart functions
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.inventory) }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.id !== id));
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    // For now, just show an alert - we'll connect to backend later
    const orderData = {
      customer: customerInfo,
      items: cart,
      total: getCartTotal(),
      orderDate: new Date().toISOString(),
      status: 'pending'
    };
    
    console.log('Order submitted:', orderData);
    alert('Order submitted successfully! We\'ll contact you soon with shipping details.');
    
    // Reset form
    setCart([]);
    setCustomerInfo({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      notes: ''
    });
    setShowCheckout(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-amber-50 text-stone-900 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-800 to-amber-900 text-white py-8 px-6 shadow-2xl rounded-b-3xl">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">Artisan Roasts</h1>
            <p className="text-amber-200 mt-2 text-lg italic">Crafted with Passion, Brewed to Perfection</p>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                <li><button className="text-amber-100 hover:text-white transition-colors duration-300 text-lg font-medium">Home</button></li>
                <li><button className="text-amber-100 hover:text-white transition-colors duration-300 text-lg font-medium">About</button></li>
                <li><button className="text-amber-100 hover:text-white transition-colors duration-300 text-lg font-medium">Contact</button></li>
              </ul>
            </nav>
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative bg-amber-700 hover:bg-amber-600 px-4 py-2 rounded-full transition-colors duration-300 flex items-center gap-2"
            >
              <ShoppingCart size={20} />
              <span className="font-medium">Cart</span>
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-amber-900">Your Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4 py-4 border-b">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-amber-900">{item.name}</h3>
                        <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="bg-gray-200 hover:bg-gray-300 rounded-full p-1"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="bg-gray-200 hover:bg-gray-300 rounded-full p-1"
                          >
                            <Plus size={16} />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-bold">Total: ${getCartTotal().toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => {
                        setShowCart(false);
                        setShowCheckout(true);
                      }}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition-colors duration-300"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-amber-900">Order Details</h2>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmitOrder} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User size={16} className="inline mr-1" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail size={16} className="inline mr-1" />
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone size={16} className="inline mr-1" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin size={16} className="inline mr-1" />
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.city}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.postalCode}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, postalCode: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Notes (Optional)
                  </label>
                  <textarea
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Any special requests or delivery instructions..."
                  />
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                <h3 className="font-semibold text-amber-900 mb-2">Order Summary</h3>
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm py-1">
                    <span>{item.name} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total: ${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Payment & Delivery:</strong> We'll contact you within 24 hours with shipping costs and payment instructions (bank transfer or cash on delivery).
                </p>
              </div>
              
              <button
                type="submit"
                className="w-full mt-6 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Submit Order
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto py-12 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Our Fresh Roasted Coffee</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Each bag contains 125g of freshly roasted coffee beans, carefully selected and roasted to perfection. All prices include roasting and packaging.</p>
        </div>
        
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {coffeeProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-white text-stone-800 rounded-2xl overflow-hidden shadow-xl transition-all duration-500 ease-in-out
                ${hoveredItem === product.id ? "transform -translate-y-4 scale-105 shadow-2xl ring-4 ring-amber-400/50" : "shadow-md hover:shadow-lg"}`}
              onMouseEnter={() => setHoveredItem(product.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="p-0 relative">
                <div className="relative overflow-hidden h-52">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
                    style={{
                      transform: hoveredItem === product.id ? "scale(1.1)" : "scale(1)",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-sm font-medium text-amber-800">{product.roastLevel}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-amber-900">{product.name}</h3>
                <p className="text-stone-600 mb-4 text-base leading-relaxed">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-extrabold text-amber-700">${product.price.toFixed(2)}</span>
                  <span className="text-sm text-gray-500">125g bags</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-sm font-medium ${product.inventory > 10 ? 'text-green-600' : product.inventory > 5 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {product.inventory > 0 ? `${product.inventory} bags available` : 'Out of stock'}
                  </span>
                </div>
              </div>
              
              <div className="p-6 pt-0">
                <button
                  onClick={() => addToCart(product)}
                  disabled={product.inventory === 0}
                  className={`w-full py-3 rounded-full font-bold text-lg transition-all duration-300 ease-in-out transform
                    ${product.inventory === 0 
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : hoveredItem === product.id
                        ? "bg-amber-600 text-white shadow-lg -translate-y-1 hover:bg-amber-700"
                        : "bg-amber-500 text-white hover:bg-amber-600 shadow-md"
                    }
                    focus:outline-none focus:ring-4 focus:ring-amber-300`}
                >
                  {product.inventory === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-amber-950 text-amber-200 py-8 px-6 shadow-inner mt-12">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Artisan Roasts. All rights reserved.</p>
          <p className="text-xs mt-2 text-amber-300">Freshly roasted coffee delivered to your door</p>
        </div>
      </footer>
    </div>
  );
}

export default CoffeeRoasterApp;