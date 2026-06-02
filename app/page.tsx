"use client"

import { useState } from "react"
import Image from "next/image"
import { 
  ShoppingCart, 
  Package, 
  Truck, 
  FileText, 
  Menu,
  X,
  Coffee,
  CreditCard,
  Banknote,
  Smartphone,
  Building2,
  Plus,
  Minus,
  Trash2,
  Receipt,
  CheckCircle2,
  Clock,
  User
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Types
interface Product {
  id: string
  name: string
  nameAmharic?: string
  price: number
  category: string
}

interface CartItem extends Product {
  quantity: number
}

interface PaymentMethod {
  id: string
  name: string
  icon: React.ReactNode
  color: string
}

// Product Data
const products: Product[] = [
  // Signature Luwak
  { id: "sl1", name: "Classic Luwak Brew", nameAmharic: "ክላሲክ ሉዋክ", price: 180, category: "Signature Luwak" },
  { id: "sl2", name: "Luwak Espresso Single", nameAmharic: "ሉዋክ ኤስፕሬሶ", price: 150, category: "Signature Luwak" },
  { id: "sl3", name: "Luwak Pour Over", nameAmharic: "ሉዋክ ፖር ኦቨር", price: 200, category: "Signature Luwak" },
  { id: "sl4", name: "Iced Luwak Coffee", nameAmharic: "በረዶ ሉዋክ", price: 170, category: "Signature Luwak" },
  { id: "sl5", name: "Luwak Mocha Special", nameAmharic: "ሉዋክ ሞካ", price: 190, category: "Signature Luwak" },
  { id: "sl6", name: "Luwak Cold Brew", nameAmharic: "ሉዋክ ቆልድ ብሩ", price: 185, category: "Signature Luwak" },
  
  // Espresso Bar
  { id: "eb1", name: "Espresso Shot", nameAmharic: "ኤስፕሬሶ", price: 60, category: "Espresso Bar" },
  { id: "eb2", name: "Double Espresso", nameAmharic: "ዳብል ኤስፕሬሶ", price: 90, category: "Espresso Bar" },
  { id: "eb3", name: "Americano", nameAmharic: "አሜሪካኖ", price: 80, category: "Espresso Bar" },
  { id: "eb4", name: "Cappuccino", nameAmharic: "ካፑቺኖ", price: 100, category: "Espresso Bar" },
  { id: "eb5", name: "Latte", nameAmharic: "ላቴ", price: 110, category: "Espresso Bar" },
  { id: "eb6", name: "Macchiato", nameAmharic: "ማኪያቶ", price: 85, category: "Espresso Bar" },
  { id: "eb7", name: "Flat White", nameAmharic: "ፍላት ዋይት", price: 105, category: "Espresso Bar" },
  { id: "eb8", name: "Mocha", nameAmharic: "ሞካ", price: 120, category: "Espresso Bar" },
  
  // Pastries
  { id: "pa1", name: "Croissant", nameAmharic: "ክሮሳን", price: 75, category: "Pastries" },
  { id: "pa2", name: "Chocolate Muffin", nameAmharic: "ቸኮሌት ማፊን", price: 65, category: "Pastries" },
  { id: "pa3", name: "Cinnamon Roll", nameAmharic: "ሲናሞን ሮል", price: 80, category: "Pastries" },
  { id: "pa4", name: "Banana Bread", nameAmharic: "የሙዝ ዳቦ", price: 70, category: "Pastries" },
  { id: "pa5", name: "Danish Pastry", nameAmharic: "ዳኒሽ", price: 85, category: "Pastries" },
  { id: "pa6", name: "Cheesecake Slice", nameAmharic: "ቺዝኬክ", price: 120, category: "Pastries" },
  
  // Breakfast
  { id: "br1", name: "Full Ethiopian Breakfast", nameAmharic: "ሙሉ ቁርስ", price: 250, category: "Breakfast" },
  { id: "br2", name: "Eggs Benedict", nameAmharic: "እንቁላል ቤኔዲክት", price: 200, category: "Breakfast" },
  { id: "br3", name: "Avocado Toast", nameAmharic: "አቮካዶ ቶስት", price: 150, category: "Breakfast" },
  { id: "br4", name: "Pancakes Stack", nameAmharic: "ፓንኬክ", price: 140, category: "Breakfast" },
  { id: "br5", name: "Scrambled Eggs", nameAmharic: "እንቁላል ፍርፍር", price: 120, category: "Breakfast" },
  { id: "br6", name: "French Toast", nameAmharic: "ፍሬንች ቶስት", price: 130, category: "Breakfast" },
]

const categories = ["Signature Luwak", "Espresso Bar", "Pastries", "Breakfast"]

const paymentMethods: PaymentMethod[] = [
  { id: "telebirr", name: "Telebirr", icon: <Smartphone className="w-8 h-8" />, color: "bg-[#00A9E0] hover:bg-[#0095C8]" },
  { id: "cbe", name: "CBE Birr", icon: <Building2 className="w-8 h-8" />, color: "bg-[#1E3A8A] hover:bg-[#1E3070]" },
  { id: "cash", name: "Cash", icon: <Banknote className="w-8 h-8" />, color: "bg-[#16A34A] hover:bg-[#15803D]" },
  { id: "card", name: "Card", icon: <CreditCard className="w-8 h-8" />, color: "bg-[#7C3AED] hover:bg-[#6D28D9]" },
]

const navItems = [
  { id: "pos", name: "POS", icon: <ShoppingCart className="w-5 h-5" /> },
  { id: "inventory", name: "Inventory Level Tracker", icon: <Package className="w-5 h-5" /> },
  { id: "suppliers", name: "Addis Supplier Logs", icon: <Truck className="w-5 h-5" /> },
  { id: "reports", name: "ERCA VAT Financial Reports", icon: <FileText className="w-5 h-5" /> },
]

export default function POSSystem() {
  const [activeNav, setActiveNav] = useState("pos")
  const [activeCategory, setActiveCategory] = useState("Signature Luwak")
  const [cart, setCart] = useState<CartItem[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showCheckout, setShowCheckout] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [orderComplete, setOrderComplete] = useState(false)

  const filteredProducts = products.filter(p => p.category === activeCategory)

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const vatRate = 0.15
  const vat = subtotal * vatRate
  const total = subtotal + vat

  const clearCart = () => {
    setCart([])
    setShowCheckout(false)
    setSelectedPayment(null)
    setOrderComplete(false)
  }

  const handlePayment = () => {
    if (selectedPayment) {
      setOrderComplete(true)
      setTimeout(() => {
        clearCart()
      }, 3000)
    }
  }

  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  })

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <div className="h-screen flex overflow-hidden bg-[#FAFAF8]">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-[#3E2723] text-white flex flex-col transition-all duration-300 ease-in-out z-50",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        {/* Logo Section */}
        <div className="p-4 border-b border-[#5D4037] flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <Image 
              src="/logo.svg" 
              alt="Luwak Coffee Logo" 
              width={40} 
              height={40}
              className="object-contain"
            />
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <h1 className="font-bold text-lg text-[#D4AF37] leading-tight">Luwak Coffee</h1>
              <p className="text-xs text-white/70">Addis Ababa</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 text-left",
                activeNav === item.id
                  ? "bg-[#D4AF37] text-[#3E2723] font-semibold"
                  : "text-white/80 hover:bg-[#5D4037] hover:text-white"
              )}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {sidebarOpen && (
                <span className="text-sm truncate">{item.name}</span>
              )}
            </button>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-3 border-t border-[#5D4037]">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-[#3E2723]" />
            </div>
            {sidebarOpen && (
              <div>
                <p className="font-medium text-sm">Cashier 01</p>
                <p className="text-xs text-white/60">Shift: Morning</p>
              </div>
            )}
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-4 border-t border-[#5D4037] hover:bg-[#5D4037] transition-colors"
        >
          {sidebarOpen ? <X className="w-5 h-5 mx-auto" /> : <Menu className="w-5 h-5 mx-auto" />}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-[#E5E5E5] px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[#3E2723]">
              <Coffee className="w-6 h-6 text-[#D4AF37]" />
              <span className="font-bold text-xl">Beyond Solution RMS</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[#5D4037]">
              <Clock className="w-4 h-4" />
              <span className="font-medium">{currentTime}</span>
            </div>
            <span className="text-sm text-[#5D4037]">{currentDate}</span>
          </div>
        </header>

        {/* POS Content */}
        {activeNav === "pos" && (
          <div className="flex-1 flex overflow-hidden">
            {/* Product Grid - 60% */}
            <div className="w-[60%] flex flex-col bg-[#FAFAF8] overflow-hidden">
              {/* Category Tabs */}
              <div className="bg-white border-b border-[#E5E5E5] px-4 py-2">
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={cn(
                        "px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-all duration-200",
                        activeCategory === category
                          ? "bg-[#3E2723] text-white shadow-md"
                          : "bg-[#F5F5DC] text-[#3E2723] hover:bg-[#E5E5CC]"
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Products Grid */}
              <div className="flex-1 overflow-y-auto pos-scrollbar p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => addToCart(product)}
                      className="bg-white rounded-xl p-4 shadow-sm border border-[#E5E5E5] hover:shadow-lg hover:border-[#D4AF37] transition-all duration-200 text-left group active:scale-95"
                    >
                      <div className="w-full h-16 bg-gradient-to-br from-[#5D4037] to-[#3E2723] rounded-lg mb-3 flex items-center justify-center">
                        <Coffee className="w-8 h-8 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                      </div>
                      <h3 className="font-semibold text-[#3E2723] text-sm leading-tight mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      {product.nameAmharic && (
                        <p className="text-xs text-[#5D4037] mb-2">{product.nameAmharic}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#D4AF37] text-lg">
                          {product.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-[#5D4037]">ETB</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Receipt Area - 40% */}
            <div className="w-[40%] bg-white border-l border-[#E5E5E5] flex flex-col overflow-hidden">
              {/* Receipt Header */}
              <div className="bg-[#3E2723] text-white px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-[#D4AF37]" />
                    <span className="font-semibold">Current Order</span>
                  </div>
                  <span className="text-sm text-white/70">
                    {cart.length} item{cart.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto pos-scrollbar p-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-[#5D4037]/60">
                    <ShoppingCart className="w-16 h-16 mb-4" />
                    <p className="font-medium">No items in order</p>
                    <p className="text-sm">Tap products to add</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#FAFAF8] rounded-lg p-3 border border-[#E5E5E5]"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-[#3E2723] text-sm truncate">
                              {item.name}
                            </h4>
                            <p className="text-xs text-[#5D4037]">
                              {item.price.toFixed(2)} ETB each
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 rounded-lg bg-white border border-[#E5E5E5] flex items-center justify-center hover:bg-[#F5F5DC] active:scale-95"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-bold text-[#3E2723]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 rounded-lg bg-white border border-[#E5E5E5] flex items-center justify-center hover:bg-[#F5F5DC] active:scale-95"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="font-bold text-[#3E2723]">
                            {(item.price * item.quantity).toFixed(2)} ETB
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Receipt Footer */}
              <div className="border-t border-[#E5E5E5] p-4 bg-[#FAFAF8]">
                {/* Totals */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5D4037]">Subtotal</span>
                    <span className="font-medium text-[#3E2723]">{subtotal.toFixed(2)} ETB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5D4037]">VAT (15%)</span>
                    <span className="font-medium text-[#3E2723]">{vat.toFixed(2)} ETB</span>
                  </div>
                  <div className="border-t border-[#E5E5E5] pt-2 flex justify-between">
                    <span className="font-bold text-lg text-[#3E2723]">Total</span>
                    <span className="font-bold text-xl text-[#D4AF37]">{total.toFixed(2)} ETB</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    disabled={cart.length === 0}
                    className="border-[#E5E5E5] text-[#3E2723] hover:bg-[#F5F5DC]"
                  >
                    Clear
                  </Button>
                  <Button
                    onClick={() => setShowCheckout(true)}
                    disabled={cart.length === 0}
                    className="bg-[#D4AF37] hover:bg-[#C9A432] text-[#3E2723] font-bold"
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Inventory Page */}
        {activeNav === "inventory" && (
          <div className="flex-1 p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold text-[#3E2723] mb-6">Inventory Level Tracker</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Luwak Coffee Beans", stock: 85, unit: "kg", status: "good" },
                { name: "Arabica Blend", stock: 45, unit: "kg", status: "good" },
                { name: "Fresh Milk", stock: 20, unit: "L", status: "warning" },
                { name: "Sugar", stock: 30, unit: "kg", status: "good" },
                { name: "Croissants", stock: 8, unit: "pcs", status: "low" },
                { name: "Chocolate Syrup", stock: 5, unit: "bottles", status: "warning" },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-[#E5E5E5]">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-[#3E2723]">{item.name}</h3>
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      item.status === "good" && "bg-green-100 text-green-700",
                      item.status === "warning" && "bg-yellow-100 text-yellow-700",
                      item.status === "low" && "bg-red-100 text-red-700"
                    )}>
                      {item.status === "good" ? "In Stock" : item.status === "warning" ? "Low Stock" : "Critical"}
                    </span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-[#3E2723]">{item.stock}</span>
                    <span className="text-[#5D4037] mb-1">{item.unit}</span>
                  </div>
                  <div className="mt-3 h-2 bg-[#F5F5DC] rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all",
                        item.status === "good" && "bg-green-500",
                        item.status === "warning" && "bg-yellow-500",
                        item.status === "low" && "bg-red-500"
                      )}
                      style={{ width: `${Math.min(item.stock, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suppliers Page */}
        {activeNav === "suppliers" && (
          <div className="flex-1 p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold text-[#3E2723] mb-6">Addis Supplier Logs</h2>
            <div className="bg-white rounded-xl shadow-sm border border-[#E5E5E5] overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#F5F5DC]">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#3E2723]">Supplier</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#3E2723]">Product</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#3E2723]">Last Order</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#3E2723]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5]">
                  {[
                    { supplier: "Kaldi's Farm Supply", product: "Luwak Beans", date: "Dec 15, 2024", status: "Delivered" },
                    { supplier: "Addis Dairy Co.", product: "Fresh Milk", date: "Dec 18, 2024", status: "In Transit" },
                    { supplier: "Merkato Bakery Dist.", product: "Pastries", date: "Dec 19, 2024", status: "Pending" },
                    { supplier: "Ethiopian Sugar Corp", product: "Sugar", date: "Dec 10, 2024", status: "Delivered" },
                  ].map((log, i) => (
                    <tr key={i} className="hover:bg-[#FAFAF8]">
                      <td className="px-4 py-3 text-sm text-[#3E2723] font-medium">{log.supplier}</td>
                      <td className="px-4 py-3 text-sm text-[#5D4037]">{log.product}</td>
                      <td className="px-4 py-3 text-sm text-[#5D4037]">{log.date}</td>
                      <td className="px-4 py-3">
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          log.status === "Delivered" && "bg-green-100 text-green-700",
                          log.status === "In Transit" && "bg-blue-100 text-blue-700",
                          log.status === "Pending" && "bg-yellow-100 text-yellow-700"
                        )}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reports Page */}
        {activeNav === "reports" && (
          <div className="flex-1 p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold text-[#3E2723] mb-6">ERCA VAT Financial Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E5E5]">
                <h3 className="font-semibold text-[#3E2723] mb-4">Monthly VAT Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-[#E5E5E5]">
                    <span className="text-[#5D4037]">Gross Sales</span>
                    <span className="font-bold text-[#3E2723]">485,230.00 ETB</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#E5E5E5]">
                    <span className="text-[#5D4037]">VAT Collected (15%)</span>
                    <span className="font-bold text-[#D4AF37]">72,784.50 ETB</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#E5E5E5]">
                    <span className="text-[#5D4037]">Input VAT (Purchases)</span>
                    <span className="font-bold text-[#3E2723]">28,450.00 ETB</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-semibold text-[#3E2723]">Net VAT Payable</span>
                    <span className="font-bold text-xl text-[#D4AF37]">44,334.50 ETB</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E5E5]">
                <h3 className="font-semibold text-[#3E2723] mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full py-3 px-4 rounded-lg bg-[#F5F5DC] text-[#3E2723] font-medium text-left hover:bg-[#E5E5CC] transition-colors flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#D4AF37]" />
                    Generate ERCA Report
                  </button>
                  <button className="w-full py-3 px-4 rounded-lg bg-[#F5F5DC] text-[#3E2723] font-medium text-left hover:bg-[#E5E5CC] transition-colors flex items-center gap-3">
                    <Receipt className="w-5 h-5 text-[#D4AF37]" />
                    Export Daily Sales
                  </button>
                  <button className="w-full py-3 px-4 rounded-lg bg-[#F5F5DC] text-[#3E2723] font-medium text-left hover:bg-[#E5E5CC] transition-colors flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#D4AF37]" />
                    View Tax Calendar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            {!orderComplete ? (
              <>
                {/* Modal Header */}
                <div className="bg-[#3E2723] text-white px-6 py-4 flex items-center justify-between">
                  <h2 className="font-bold text-xl">Select Payment Method</h2>
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="hover:bg-white/10 p-2 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Order Summary */}
                <div className="px-6 py-4 bg-[#FAFAF8] border-b border-[#E5E5E5]">
                  <div className="flex justify-between items-center">
                    <span className="text-[#5D4037]">Order Total</span>
                    <span className="text-2xl font-bold text-[#D4AF37]">{total.toFixed(2)} ETB</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={cn(
                          "p-6 rounded-xl flex flex-col items-center justify-center gap-3 transition-all duration-200 border-3",
                          selectedPayment === method.id
                            ? `${method.color} text-white border-[#D4AF37] shadow-lg scale-105`
                            : "bg-[#F5F5DC] text-[#3E2723] border-transparent hover:border-[#D4AF37] hover:shadow-md"
                        )}
                      >
                        {method.icon}
                        <span className="font-bold text-lg">{method.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Confirm Button */}
                <div className="px-6 pb-6">
                  <Button
                    onClick={handlePayment}
                    disabled={!selectedPayment}
                    className="w-full py-6 text-lg font-bold bg-[#D4AF37] hover:bg-[#C9A432] text-[#3E2723] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm Payment
                  </Button>
                </div>
              </>
            ) : (
              /* Success State */
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-[#3E2723] mb-2">Payment Successful!</h2>
                <p className="text-[#5D4037] mb-4">Thank you for your order</p>
                <p className="text-3xl font-bold text-[#D4AF37]">{total.toFixed(2)} ETB</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
