import { useState } from "react";
import { ShoppingCart, Plus, Minus, X, MapPin, Mail, Phone, User } from "lucide-react";

// Coffee products with inventory tracking
const coffeeProducts = [
  { 
    id: 1, 
    name: "Espresso Blend", 
    description: "A bold and rich coffee with deep chocolate notes, perfect for an invigorating start.", 
    price: 12.99, 
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop&crop=center",
    inventory: 25,
    roastLevel: "Dark",
    origin: "Brazil & Colombia"
  },
  { 
    id: 2, 
    name: "Morning Roast", 
    description: "A smooth, medium-bodied coffee with hints of caramel, ideal for a gentle awakening.", 
    price: 10.99, 
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop&crop=center",
    inventory: 18,
    roastLevel: "Medium",
    origin: "Guatemala"
  },
  { 
    id: 3, 
    name: "Decaf Delight", 
    description: "Full flavor without the caffeine, offering a comforting and satisfying evening experience.", 
    price: 11.99, 
    image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e76?w=400&h=300&fit=crop&crop=center",
    inventory: 12,
    roastLevel: "Medium",
    origin: "Swiss Water Process"
  },
  { 
    id: 4, 
    name: "Cold Brew Reserve", 
    description: "A refreshing, velvety smooth coffee, meticulously brewed cold for peak flavor.", 
    price: 14.99, 
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&crop=center",
    inventory: 8,
    roastLevel: "Light",
    origin: "Kenya"
  },
  { 
    id: 5, 
    name: "Ethiopian Yirgacheffe", 
    description: "Bright and floral with citrus notes, a light roast that dances on the palate.", 
    price: 16.50, 
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=300&fit=crop&crop=center",
    inventory: 15,
    roastLevel: "Light",
    origin: "Ethiopia"
  },
  { 
    id: 6, 
    name: "Sumatra Mandheling", 
    description: "Earthy and full-bodied with low acidity, a complex and rich dark roast.", 
    price: 15.75, 
    image: "https://images.unsplash.com/photo-1545665225-b23b99e4d45e?w=400&h=300&fit=crop&crop=center",
    inventory: 22,
    roastLevel: "Dark",
    origin: "Sumatra"
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

  const getRoastColor = (level) => {
    switch(level) {
      case 'Light': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Dark': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-gray-900 text-white sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Artisan Roasts</h1>
                <p className="text-gray-300 text-sm">Premium Coffee Roastery</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex space-x-8">
                <button className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Home</button>
                <button className="text-gray-300 hover:text-white transition-colors text-sm font-medium">About</button>
                <button className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Contact</button>
              </nav>
              
              <button
                onClick={() => setShowCart(!showCart)}
                className="relative bg-white text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-full transition-all duration-200 flex items-center space-x-2 shadow-lg"
              >
                <ShoppingCart size={18} />
                <span className="font-medium text-sm">Cart</span>
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
                    {getCartItemCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Exceptional Coffee,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Roasted Fresh</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Each 125g bag is carefully roasted to perfection, delivering complex flavors and aromas that elevate your daily ritual.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Small Batch Roasting</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Direct Trade Beans</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Local Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                          <p className="text-gray-600 text-sm">${item.price.toFixed(2)} each</p>
                          <div className="flex items-center space-x-3 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="font-medium min-w-[20px] text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto text-red-500 hover:text-red-700 transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-gray-900 rounded-xl text-white">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-2xl font-bold">${getCartTotal().toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => {
                        setShowCart(false);
                        setShowCheckout(true);
                      }}
                      className="w-full bg-white text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Checkout
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
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Complete Your Order</h2>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmitOrder} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.city}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Any special requests or delivery instructions..."
                  />
                </div>
              </div>
              
              <div className="mt-6 p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-2">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name} × {item.quantity}</span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Payment & Delivery:</strong> We'll contact you within 24 hours with shipping costs and payment options (bank transfer or cash on delivery).
                </p>
              </div>
              
              <button
                type="submit"
                className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-lg font-semibold transition-colors text-lg"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Products Section */}
      <main className="container mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coffeeProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group
                ${hoveredItem === product.id ? "transform -translate-y-2 shadow-2xl" : ""}`}
              onMouseEnter={() => setHoveredItem(product.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoastColor(product.roastLevel)}`}>
                    {product.roastLevel} Roast
                  </span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                    {product.origin}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{product.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500">per 125g</span>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      product.inventory > 10 ? 'text-green-600' : 
                      product.inventory > 5 ? 'text-yellow-600' : 
                      product.inventory > 0 ? 'text-red-600' : 'text-gray-400'
                    }`}>
                      {product.inventory > 0 ? `${product.inventory} available` : 'Out of stock'}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => addToCart(product)}
                  disabled={product.inventory === 0}
                  className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                    product.inventory === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-900 hover:bg-gray-800 text-white transform hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                >
                  {product.inventory === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <div>
              <h3 className="text-xl font-bold">Artisan Roasts</h3>
              <p className="text-gray-400 text-sm">Premium Coffee Roastery</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Artisan Roasts. Crafted with passion.</p>
        </div>
      </footer>
    </div>
  );
}

export default CoffeeRoasterApp;