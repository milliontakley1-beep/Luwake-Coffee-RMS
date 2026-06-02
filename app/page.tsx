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
  User,
  Users,
  Settings,
  ChevronDown,
  Edit3,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  BarChart3,
  UtensilsCrossed,
  Shield,
  LogOut,
  Search,
  Save,
  PlusCircle
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
  isActive: boolean
  totalOrders: number
  lastWeekOrders: number
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

interface Employee {
  id: string
  name: string
  role: "admin" | "cashier" | "waiter" | "inventory"
  email: string
  phone: string
  status: "active" | "inactive"
  shift: "morning" | "afternoon" | "evening"
}

interface InventoryItem {
  id: string
  name: string
  stock: number
  unit: string
  minStock: number
  maxStock: number
  costPerUnit: number
  supplier: string
}

type UserRole = "admin" | "cashier" | "waiter" | "inventory"

// Initial Data
const initialProducts: Product[] = [
  // Signature Luwak
  { id: "sl1", name: "Classic Luwak Brew", nameAmharic: "ክላሲክ ሉዋክ", price: 180, category: "Signature Luwak", isActive: true, totalOrders: 450, lastWeekOrders: 62 },
  { id: "sl2", name: "Luwak Espresso Single", nameAmharic: "ሉዋክ ኤስፕሬሶ", price: 150, category: "Signature Luwak", isActive: true, totalOrders: 380, lastWeekOrders: 45 },
  { id: "sl3", name: "Luwak Pour Over", nameAmharic: "ሉዋክ ፖር ኦቨር", price: 200, category: "Signature Luwak", isActive: true, totalOrders: 120, lastWeekOrders: 8 },
  { id: "sl4", name: "Iced Luwak Coffee", nameAmharic: "በረዶ ሉዋክ", price: 170, category: "Signature Luwak", isActive: true, totalOrders: 290, lastWeekOrders: 38 },
  { id: "sl5", name: "Luwak Mocha Special", nameAmharic: "ሉዋክ ሞካ", price: 190, category: "Signature Luwak", isActive: true, totalOrders: 85, lastWeekOrders: 5 },
  { id: "sl6", name: "Luwak Cold Brew", nameAmharic: "ሉዋክ ቆልድ ብሩ", price: 185, category: "Signature Luwak", isActive: false, totalOrders: 42, lastWeekOrders: 0 },
  
  // Espresso Bar
  { id: "eb1", name: "Espresso Shot", nameAmharic: "ኤስፕሬሶ", price: 60, category: "Espresso Bar", isActive: true, totalOrders: 820, lastWeekOrders: 95 },
  { id: "eb2", name: "Double Espresso", nameAmharic: "ዳብል ኤስፕሬሶ", price: 90, category: "Espresso Bar", isActive: true, totalOrders: 560, lastWeekOrders: 72 },
  { id: "eb3", name: "Americano", nameAmharic: "አሜሪካኖ", price: 80, category: "Espresso Bar", isActive: true, totalOrders: 720, lastWeekOrders: 88 },
  { id: "eb4", name: "Cappuccino", nameAmharic: "ካፑቺኖ", price: 100, category: "Espresso Bar", isActive: true, totalOrders: 650, lastWeekOrders: 78 },
  { id: "eb5", name: "Latte", nameAmharic: "ላቴ", price: 110, category: "Espresso Bar", isActive: true, totalOrders: 580, lastWeekOrders: 65 },
  { id: "eb6", name: "Macchiato", nameAmharic: "ማኪያቶ", price: 85, category: "Espresso Bar", isActive: true, totalOrders: 210, lastWeekOrders: 18 },
  { id: "eb7", name: "Flat White", nameAmharic: "ፍላት ዋይት", price: 105, category: "Espresso Bar", isActive: true, totalOrders: 95, lastWeekOrders: 6 },
  { id: "eb8", name: "Mocha", nameAmharic: "ሞካ", price: 120, category: "Espresso Bar", isActive: true, totalOrders: 320, lastWeekOrders: 35 },
  
  // Pastries
  { id: "pa1", name: "Croissant", nameAmharic: "ክሮሳን", price: 75, category: "Pastries", isActive: true, totalOrders: 480, lastWeekOrders: 52 },
  { id: "pa2", name: "Chocolate Muffin", nameAmharic: "ቸኮሌት ማፊን", price: 65, category: "Pastries", isActive: true, totalOrders: 390, lastWeekOrders: 45 },
  { id: "pa3", name: "Cinnamon Roll", nameAmharic: "ሲናሞን ሮል", price: 80, category: "Pastries", isActive: true, totalOrders: 85, lastWeekOrders: 4 },
  { id: "pa4", name: "Banana Bread", nameAmharic: "የሙዝ ዳቦ", price: 70, category: "Pastries", isActive: true, totalOrders: 150, lastWeekOrders: 12 },
  { id: "pa5", name: "Danish Pastry", nameAmharic: "ዳኒሽ", price: 85, category: "Pastries", isActive: false, totalOrders: 35, lastWeekOrders: 0 },
  { id: "pa6", name: "Cheesecake Slice", nameAmharic: "ቺዝኬክ", price: 120, category: "Pastries", isActive: true, totalOrders: 220, lastWeekOrders: 28 },
  
  // Breakfast
  { id: "br1", name: "Full Ethiopian Breakfast", nameAmharic: "ሙሉ ቁርስ", price: 250, category: "Breakfast", isActive: true, totalOrders: 180, lastWeekOrders: 22 },
  { id: "br2", name: "Eggs Benedict", nameAmharic: "እንቁላል ቤኔዲክት", price: 200, category: "Breakfast", isActive: true, totalOrders: 95, lastWeekOrders: 8 },
  { id: "br3", name: "Avocado Toast", nameAmharic: "አቮካዶ ቶስት", price: 150, category: "Breakfast", isActive: true, totalOrders: 310, lastWeekOrders: 38 },
  { id: "br4", name: "Pancakes Stack", nameAmharic: "ፓንኬክ", price: 140, category: "Breakfast", isActive: true, totalOrders: 260, lastWeekOrders: 32 },
  { id: "br5", name: "Scrambled Eggs", nameAmharic: "እንቁላል ፍርፍር", price: 120, category: "Breakfast", isActive: true, totalOrders: 420, lastWeekOrders: 55 },
  { id: "br6", name: "French Toast", nameAmharic: "ፍሬንች ቶስት", price: 130, category: "Breakfast", isActive: true, totalOrders: 75, lastWeekOrders: 3 },
]

const initialEmployees: Employee[] = [
  { id: "e1", name: "Abebe Kebede", role: "admin", email: "abebe@luwak.et", phone: "+251911234567", status: "active", shift: "morning" },
  { id: "e2", name: "Sara Tesfaye", role: "cashier", email: "sara@luwak.et", phone: "+251912345678", status: "active", shift: "morning" },
  { id: "e3", name: "Dawit Haile", role: "cashier", email: "dawit@luwak.et", phone: "+251913456789", status: "active", shift: "afternoon" },
  { id: "e4", name: "Meron Tadesse", role: "waiter", email: "meron@luwak.et", phone: "+251914567890", status: "active", shift: "morning" },
  { id: "e5", name: "Yonas Bekele", role: "waiter", email: "yonas@luwak.et", phone: "+251915678901", status: "inactive", shift: "evening" },
  { id: "e6", name: "Hana Girma", role: "inventory", email: "hana@luwak.et", phone: "+251916789012", status: "active", shift: "morning" },
]

const initialInventory: InventoryItem[] = [
  { id: "inv1", name: "Luwak Coffee Beans", stock: 85, unit: "kg", minStock: 20, maxStock: 150, costPerUnit: 450, supplier: "Kaldi's Farm Supply" },
  { id: "inv2", name: "Arabica Blend", stock: 45, unit: "kg", minStock: 15, maxStock: 100, costPerUnit: 280, supplier: "Kaldi's Farm Supply" },
  { id: "inv3", name: "Fresh Milk", stock: 20, unit: "L", minStock: 25, maxStock: 80, costPerUnit: 45, supplier: "Addis Dairy Co." },
  { id: "inv4", name: "Sugar", stock: 30, unit: "kg", minStock: 10, maxStock: 50, costPerUnit: 35, supplier: "Ethiopian Sugar Corp" },
  { id: "inv5", name: "Croissants", stock: 8, unit: "pcs", minStock: 20, maxStock: 60, costPerUnit: 25, supplier: "Merkato Bakery Dist." },
  { id: "inv6", name: "Chocolate Syrup", stock: 5, unit: "bottles", minStock: 8, maxStock: 25, costPerUnit: 120, supplier: "Import House Addis" },
  { id: "inv7", name: "Vanilla Extract", stock: 12, unit: "bottles", minStock: 5, maxStock: 20, costPerUnit: 180, supplier: "Import House Addis" },
  { id: "inv8", name: "Whipped Cream", stock: 15, unit: "cans", minStock: 10, maxStock: 40, costPerUnit: 85, supplier: "Addis Dairy Co." },
  { id: "inv9", name: "Paper Cups (M)", stock: 350, unit: "pcs", minStock: 200, maxStock: 1000, costPerUnit: 2.5, supplier: "Merkato Supplies" },
  { id: "inv10", name: "Paper Cups (L)", stock: 180, unit: "pcs", minStock: 150, maxStock: 800, costPerUnit: 3.5, supplier: "Merkato Supplies" },
]

const categories = ["Signature Luwak", "Espresso Bar", "Pastries", "Breakfast"]

const paymentMethods: PaymentMethod[] = [
  { id: "telebirr", name: "Telebirr", icon: <Smartphone className="w-8 h-8" />, color: "bg-[#00A9E0] hover:bg-[#0095C8]" },
  { id: "cbe", name: "CBE Birr", icon: <Building2 className="w-8 h-8" />, color: "bg-[#1E3A8A] hover:bg-[#1E3070]" },
  { id: "cash", name: "Cash", icon: <Banknote className="w-8 h-8" />, color: "bg-[#16A34A] hover:bg-[#15803D]" },
  { id: "card", name: "Card", icon: <CreditCard className="w-8 h-8" />, color: "bg-[#7C3AED] hover:bg-[#6D28D9]" },
]

const roleLabels: Record<UserRole, string> = {
  admin: "Admin / Owner",
  cashier: "Cashier",
  waiter: "Waiter",
  inventory: "Inventory Manager"
}

const roleIcons: Record<UserRole, React.ReactNode> = {
  admin: <Shield className="w-4 h-4" />,
  cashier: <Receipt className="w-4 h-4" />,
  waiter: <UtensilsCrossed className="w-4 h-4" />,
  inventory: <Package className="w-4 h-4" />
}

export default function POSSystem() {
  // Current User State
  const [currentRole, setCurrentRole] = useState<UserRole>("admin")
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false)
  
  // Navigation State
  const [activeNav, setActiveNav] = useState("pos")
  const [activeCategory, setActiveCategory] = useState("Signature Luwak")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  
  // POS State
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCheckout, setShowCheckout] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [orderComplete, setOrderComplete] = useState(false)
  
  // Data State
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory)
  
  // Modal States
  const [showEmployeeModal, setShowEmployeeModal] = useState(false)
  const [showInventoryModal, setShowInventoryModal] = useState(false)
  const [showMenuModal, setShowMenuModal] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [editingInventoryItem, setEditingInventoryItem] = useState<InventoryItem | null>(null)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  
  // Form States
  const [employeeForm, setEmployeeForm] = useState({
    name: "", role: "cashier" as UserRole, email: "", phone: "", status: "active" as "active" | "inactive", shift: "morning" as "morning" | "afternoon" | "evening"
  })
  const [inventoryForm, setInventoryForm] = useState({
    name: "", stock: 0, unit: "", minStock: 0, maxStock: 0, costPerUnit: 0, supplier: ""
  })
  const [productForm, setProductForm] = useState({
    name: "", nameAmharic: "", price: 0, category: "Signature Luwak", isActive: true
  })
  
  // Search States
  const [employeeSearch, setEmployeeSearch] = useState("")
  const [inventorySearch, setInventorySearch] = useState("")

  // Navigation items based on role
  const getNavItems = () => {
    const allItems = [
      { id: "pos", name: "POS", icon: <ShoppingCart className="w-5 h-5" />, roles: ["admin", "cashier", "waiter"] },
      { id: "inventory", name: "Inventory Tracker", icon: <Package className="w-5 h-5" />, roles: ["admin", "inventory"] },
      { id: "suppliers", name: "Addis Supplier Logs", icon: <Truck className="w-5 h-5" />, roles: ["admin", "inventory"] },
      { id: "reports", name: "ERCA VAT Reports", icon: <FileText className="w-5 h-5" />, roles: ["admin"] },
      { id: "analytics", name: "Product Analytics", icon: <BarChart3 className="w-5 h-5" />, roles: ["admin"] },
      { id: "employees", name: "Employee Management", icon: <Users className="w-5 h-5" />, roles: ["admin"] },
      { id: "menu", name: "Menu Management", icon: <UtensilsCrossed className="w-5 h-5" />, roles: ["admin"] },
    ]
    return allItems.filter(item => item.roles.includes(currentRole))
  }

  const navItems = getNavItems()

  const filteredProducts = products.filter(p => p.category === activeCategory && (currentRole === "admin" || p.isActive))
  const activeProducts = products.filter(p => p.isActive)

  // Cart Functions
  const addToCart = (product: Product) => {
    if (!product.isActive && currentRole !== "admin") return
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

  // Employee Functions
  const openAddEmployee = () => {
    setEditingEmployee(null)
    setEmployeeForm({ name: "", role: "cashier", email: "", phone: "", status: "active", shift: "morning" })
    setShowEmployeeModal(true)
  }

  const openEditEmployee = (emp: Employee) => {
    setEditingEmployee(emp)
    setEmployeeForm({ name: emp.name, role: emp.role, email: emp.email, phone: emp.phone, status: emp.status, shift: emp.shift })
    setShowEmployeeModal(true)
  }

  const saveEmployee = () => {
    if (editingEmployee) {
      setEmployees(prev => prev.map(e => e.id === editingEmployee.id ? { ...e, ...employeeForm } : e))
    } else {
      const newEmp: Employee = { id: `e${Date.now()}`, ...employeeForm }
      setEmployees(prev => [...prev, newEmp])
    }
    setShowEmployeeModal(false)
  }

  const deleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(e => e.id !== id))
  }

  // Inventory Functions
  const openAddInventory = () => {
    setEditingInventoryItem(null)
    setInventoryForm({ name: "", stock: 0, unit: "", minStock: 0, maxStock: 0, costPerUnit: 0, supplier: "" })
    setShowInventoryModal(true)
  }

  const openEditInventory = (item: InventoryItem) => {
    setEditingInventoryItem(item)
    setInventoryForm({ name: item.name, stock: item.stock, unit: item.unit, minStock: item.minStock, maxStock: item.maxStock, costPerUnit: item.costPerUnit, supplier: item.supplier })
    setShowInventoryModal(true)
  }

  const saveInventory = () => {
    if (editingInventoryItem) {
      setInventory(prev => prev.map(i => i.id === editingInventoryItem.id ? { ...i, ...inventoryForm } : i))
    } else {
      const newItem: InventoryItem = { id: `inv${Date.now()}`, ...inventoryForm }
      setInventory(prev => [...prev, newItem])
    }
    setShowInventoryModal(false)
  }

  const deleteInventoryItem = (id: string) => {
    setInventory(prev => prev.filter(i => i.id !== id))
  }

  // Menu/Product Functions
  const openAddProduct = () => {
    setEditingProduct(null)
    setProductForm({ name: "", nameAmharic: "", price: 0, category: "Signature Luwak", isActive: true })
    setShowMenuModal(true)
  }

  const openEditProduct = (prod: Product) => {
    setEditingProduct(prod)
    setProductForm({ name: prod.name, nameAmharic: prod.nameAmharic || "", price: prod.price, category: prod.category, isActive: prod.isActive })
    setShowMenuModal(true)
  }

  const saveProduct = () => {
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...productForm } : p))
    } else {
      const newProd: Product = { id: `p${Date.now()}`, ...productForm, totalOrders: 0, lastWeekOrders: 0 }
      setProducts(prev => [...prev, newProd])
    }
    setShowMenuModal(false)
  }

  const toggleProductActive = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p))
  }

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  // Analytics Helpers
  const getLowPerformingProducts = () => {
    return products.filter(p => p.isActive && p.lastWeekOrders < 10).sort((a, b) => a.lastWeekOrders - b.lastWeekOrders)
  }

  const getTopPerformingProducts = () => {
    return [...products].filter(p => p.isActive).sort((a, b) => b.lastWeekOrders - a.lastWeekOrders).slice(0, 5)
  }

  const getLowStockItems = () => {
    return inventory.filter(i => i.stock <= i.minStock)
  }

  const getInventoryStatus = (item: InventoryItem) => {
    const percentage = (item.stock / item.maxStock) * 100
    if (item.stock <= item.minStock) return "critical"
    if (percentage <= 30) return "warning"
    return "good"
  }

  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })

  const filteredEmployees = employees.filter(e => 
    e.name.toLowerCase().includes(employeeSearch.toLowerCase()) ||
    e.email.toLowerCase().includes(employeeSearch.toLowerCase())
  )

  const filteredInventory = inventory.filter(i =>
    i.name.toLowerCase().includes(inventorySearch.toLowerCase())
  )

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
            <Image src="/logo.svg" alt="Luwak Coffee Logo" width={40} height={40} className="object-contain" />
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <h1 className="font-bold text-lg text-[#D4AF37] leading-tight">Luwak Coffee</h1>
              <p className="text-xs text-white/70">Addis Ababa</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
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
              {sidebarOpen && <span className="text-sm truncate">{item.name}</span>}
            </button>
          ))}
        </nav>

        {/* User Section with Role Switcher */}
        <div className="p-3 border-t border-[#5D4037]">
          <div className="relative">
            <button
              onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#5D4037] transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center flex-shrink-0">
                {roleIcons[currentRole]}
              </div>
              {sidebarOpen && (
                <>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-sm">{roleLabels[currentRole]}</p>
                    <p className="text-xs text-white/60">Shift: Morning</p>
                  </div>
                  <ChevronDown className={cn("w-4 h-4 transition-transform", showRoleSwitcher && "rotate-180")} />
                </>
              )}
            </button>

            {/* Role Dropdown */}
            {showRoleSwitcher && sidebarOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#5D4037] rounded-lg shadow-xl overflow-hidden">
                <div className="p-2 text-xs text-white/60 border-b border-[#3E2723]">Switch Role</div>
                {(["admin", "cashier", "waiter", "inventory"] as UserRole[]).map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setCurrentRole(role)
                      setShowRoleSwitcher(false)
                      setActiveNav("pos")
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-[#3E2723] transition-colors",
                      currentRole === role && "bg-[#3E2723]"
                    )}
                  >
                    {roleIcons[role]}
                    <span className="text-sm">{roleLabels[role]}</span>
                    {currentRole === role && <CheckCircle2 className="w-4 h-4 ml-auto text-[#D4AF37]" />}
                  </button>
                ))}
                <div className="border-t border-[#3E2723]">
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-red-400 hover:bg-[#3E2723] transition-colors">
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Log Out</span>
                  </button>
                </div>
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
            {currentRole === "admin" && getLowStockItems().length > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>{getLowStockItems().length} items low stock</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F5F5DC] rounded-full">
              {roleIcons[currentRole]}
              <span className="text-sm font-medium text-[#3E2723]">{roleLabels[currentRole]}</span>
            </div>
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
              <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => addToCart(product)}
                      disabled={!product.isActive && currentRole !== "admin"}
                      className={cn(
                        "bg-white rounded-xl p-4 shadow-sm border border-[#E5E5E5] hover:shadow-lg hover:border-[#D4AF37] transition-all duration-200 text-left group active:scale-95",
                        !product.isActive && "opacity-50"
                      )}
                    >
                      <div className="w-full h-16 bg-gradient-to-br from-[#5D4037] to-[#3E2723] rounded-lg mb-3 flex items-center justify-center relative">
                        <Coffee className="w-8 h-8 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                        {!product.isActive && (
                          <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs font-medium">Inactive</span>
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold text-[#3E2723] text-sm leading-tight mb-1 line-clamp-2">{product.name}</h3>
                      {product.nameAmharic && <p className="text-xs text-[#5D4037] mb-2">{product.nameAmharic}</p>}
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#D4AF37] text-lg">{product.price.toFixed(2)}</span>
                        <span className="text-xs text-[#5D4037]">ETB</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Receipt Area - 40% */}
            <div className="w-[40%] bg-white border-l border-[#E5E5E5] flex flex-col overflow-hidden">
              <div className="bg-[#3E2723] text-white px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-[#D4AF37]" />
                    <span className="font-semibold">Current Order</span>
                  </div>
                  <span className="text-sm text-white/70">{cart.length} item{cart.length !== 1 ? "s" : ""}</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-[#5D4037]/60">
                    <ShoppingCart className="w-16 h-16 mb-4" />
                    <p className="font-medium">No items in order</p>
                    <p className="text-sm">Tap products to add</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.id} className="bg-[#FAFAF8] rounded-lg p-3 border border-[#E5E5E5]">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-[#3E2723] text-sm truncate">{item.name}</h4>
                            <p className="text-xs text-[#5D4037]">{item.price.toFixed(2)} ETB each</p>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 p-1">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 rounded-lg bg-white border border-[#E5E5E5] flex items-center justify-center hover:bg-[#F5F5DC] active:scale-95">
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-bold text-[#3E2723]">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 rounded-lg bg-white border border-[#E5E5E5] flex items-center justify-center hover:bg-[#F5F5DC] active:scale-95">
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="font-bold text-[#3E2723]">{(item.price * item.quantity).toFixed(2)} ETB</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-[#E5E5E5] p-4 bg-[#FAFAF8]">
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
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={clearCart} disabled={cart.length === 0} className="border-[#E5E5E5] text-[#3E2723] hover:bg-[#F5F5DC]">Clear</Button>
                  <Button onClick={() => setShowCheckout(true)} disabled={cart.length === 0} className="bg-[#D4AF37] hover:bg-[#C9A432] text-[#3E2723] font-bold">Checkout</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Inventory Page */}
        {activeNav === "inventory" && (
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#3E2723]">Inventory Level Tracker</h2>
              {currentRole === "admin" && (
                <Button onClick={openAddInventory} className="bg-[#D4AF37] hover:bg-[#C9A432] text-[#3E2723]">
                  <PlusCircle className="w-4 h-4 mr-2" /> Add Item
                </Button>
              )}
            </div>

            {/* Search */}
            <div className="mb-4 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5D4037]" />
              <input
                type="text"
                placeholder="Search inventory..."
                value={inventorySearch}
                onChange={(e) => setInventorySearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E5E5E5] bg-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Low Stock Alert */}
            {getLowStockItems().length > 0 && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold text-red-800">Low Stock Alert</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {getLowStockItems().map(item => (
                    <span key={item.id} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                      {item.name}: {item.stock} {item.unit}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredInventory.map((item) => {
                const status = getInventoryStatus(item)
                return (
                  <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-[#E5E5E5]">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-[#3E2723]">{item.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          status === "good" && "bg-green-100 text-green-700",
                          status === "warning" && "bg-yellow-100 text-yellow-700",
                          status === "critical" && "bg-red-100 text-red-700"
                        )}>
                          {status === "good" ? "In Stock" : status === "warning" ? "Low Stock" : "Critical"}
                        </span>
                        {currentRole === "admin" && (
                          <button onClick={() => openEditInventory(item)} className="p-1 hover:bg-[#F5F5DC] rounded">
                            <Edit3 className="w-4 h-4 text-[#5D4037]" />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="flex items-end gap-2 mb-1">
                      <span className="text-3xl font-bold text-[#3E2723]">{item.stock}</span>
                      <span className="text-[#5D4037] mb-1">{item.unit}</span>
                    </div>
                    <p className="text-xs text-[#5D4037] mb-3">Min: {item.minStock} | Max: {item.maxStock}</p>
                    <div className="h-2 bg-[#F5F5DC] rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          status === "good" && "bg-green-500",
                          status === "warning" && "bg-yellow-500",
                          status === "critical" && "bg-red-500"
                        )}
                        style={{ width: `${Math.min((item.stock / item.maxStock) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#5D4037] mt-2">Supplier: {item.supplier}</p>
                  </div>
                )
              })}
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
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#3E2723]">Quantity</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#3E2723]">Last Order</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#3E2723]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5]">
                  {[
                    { supplier: "Kaldi's Farm Supply", product: "Luwak Beans", qty: "50 kg", date: "Dec 15, 2024", status: "Delivered" },
                    { supplier: "Addis Dairy Co.", product: "Fresh Milk", qty: "40 L", date: "Dec 18, 2024", status: "In Transit" },
                    { supplier: "Merkato Bakery Dist.", product: "Croissants", qty: "100 pcs", date: "Dec 19, 2024", status: "Pending" },
                    { supplier: "Ethiopian Sugar Corp", product: "Sugar", qty: "25 kg", date: "Dec 10, 2024", status: "Delivered" },
                    { supplier: "Import House Addis", product: "Chocolate Syrup", qty: "12 bottles", date: "Dec 20, 2024", status: "Processing" },
                  ].map((log, i) => (
                    <tr key={i} className="hover:bg-[#FAFAF8]">
                      <td className="px-4 py-3 text-sm text-[#3E2723] font-medium">{log.supplier}</td>
                      <td className="px-4 py-3 text-sm text-[#5D4037]">{log.product}</td>
                      <td className="px-4 py-3 text-sm text-[#5D4037]">{log.qty}</td>
                      <td className="px-4 py-3 text-sm text-[#5D4037]">{log.date}</td>
                      <td className="px-4 py-3">
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          log.status === "Delivered" && "bg-green-100 text-green-700",
                          log.status === "In Transit" && "bg-blue-100 text-blue-700",
                          log.status === "Pending" && "bg-yellow-100 text-yellow-700",
                          log.status === "Processing" && "bg-purple-100 text-purple-700"
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
                <h3 className="font-semibold text-[#3E2723] mb-4">Monthly VAT Summary - December 2024</h3>
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

        {/* Product Analytics Page */}
        {activeNav === "analytics" && (
          <div className="flex-1 p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold text-[#3E2723] mb-6">Product Analytics - Waste & Performance Tracking</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Low Performing Products - Waste Risk */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E5E5]">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingDown className="w-5 h-5 text-red-500" />
                  <h3 className="font-semibold text-[#3E2723]">Low Performing (Waste Risk)</h3>
                </div>
                <p className="text-sm text-[#5D4037] mb-4">Products with less than 10 orders this week. Consider reducing inventory or promoting.</p>
                <div className="space-y-3">
                  {getLowPerformingProducts().map(product => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                      <div>
                        <p className="font-medium text-[#3E2723]">{product.name}</p>
                        <p className="text-xs text-[#5D4037]">{product.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-red-600">{product.lastWeekOrders} orders</p>
                        <p className="text-xs text-[#5D4037]">this week</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Performing Products */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E5E5]">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <h3 className="font-semibold text-[#3E2723]">Top Performing</h3>
                </div>
                <p className="text-sm text-[#5D4037] mb-4">Best sellers this week. Ensure adequate inventory.</p>
                <div className="space-y-3">
                  {getTopPerformingProducts().map((product, idx) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">
                          {idx + 1}
                        </span>
                        <div>
                          <p className="font-medium text-[#3E2723]">{product.name}</p>
                          <p className="text-xs text-[#5D4037]">{product.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">{product.lastWeekOrders} orders</p>
                        <p className="text-xs text-[#5D4037]">this week</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E5E5]">
              <h3 className="font-semibold text-[#3E2723] mb-4">Recommendations to Reduce Waste</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-[#FEF3CD] rounded-lg border border-[#FFE69C]">
                  <AlertTriangle className="w-6 h-6 text-[#997404] mb-2" />
                  <h4 className="font-medium text-[#3E2723] mb-1">Consider Discontinuing</h4>
                  <p className="text-sm text-[#5D4037]">Luwak Cold Brew and Danish Pastry have 0 orders. Consider removing from menu.</p>
                </div>
                <div className="p-4 bg-[#D1E7DD] rounded-lg border border-[#A3CFBB]">
                  <TrendingUp className="w-6 h-6 text-[#0A3622] mb-2" />
                  <h4 className="font-medium text-[#3E2723] mb-1">Stock Up</h4>
                  <p className="text-sm text-[#5D4037]">Espresso Shot and Americano are trending. Ensure sufficient coffee beans.</p>
                </div>
                <div className="p-4 bg-[#CFE2FF] rounded-lg border border-[#9EC5FE]">
                  <BarChart3 className="w-6 h-6 text-[#084298] mb-2" />
                  <h4 className="font-medium text-[#3E2723] mb-1">Promote</h4>
                  <p className="text-sm text-[#5D4037]">Run promotions on Cinnamon Roll and French Toast to boost sales.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Employee Management Page */}
        {activeNav === "employees" && (
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#3E2723]">Employee Management</h2>
              <Button onClick={openAddEmployee} className="bg-[#D4AF37] hover:bg-[#C9A432] text-[#3E2723]">
                <PlusCircle className="w-4 h-4 mr-2" /> Add Employee
              </Button>
            </div>

            {/* Search */}
            <div className="mb-4 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5D4037]" />
              <input
                type="text"
                placeholder="Search employees..."
                value={employeeSearch}
                onChange={(e) => setEmployeeSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E5E5E5] bg-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Employee Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {(["admin", "cashier", "waiter", "inventory"] as UserRole[]).map(role => (
                <div key={role} className="bg-white rounded-xl p-4 shadow-sm border border-[#E5E5E5]">
                  <div className="flex items-center gap-2 mb-2">
                    {roleIcons[role]}
                    <span className="text-sm text-[#5D4037]">{roleLabels[role]}s</span>
                  </div>
                  <p className="text-2xl font-bold text-[#3E2723]">
                    {employees.filter(e => e.role === role && e.status === "active").length}
                  </p>
                </div>
              ))}
            </div>

            {/* Employee Table */}
            <div className="bg-white rounded-xl shadow-sm border border-[#E5E5E5] overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#F5F5DC]">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#3E2723]">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#3E2723]">Role</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#3E2723]">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#3E2723]">Phone</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#3E2723]">Shift</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#3E2723]">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#3E2723]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5]">
                  {filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-[#FAFAF8]">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#3E2723] font-bold text-sm">
                            {emp.name.charAt(0)}
                          </div>
                          <span className="font-medium text-[#3E2723]">{emp.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          emp.role === "admin" && "bg-purple-100 text-purple-700",
                          emp.role === "cashier" && "bg-blue-100 text-blue-700",
                          emp.role === "waiter" && "bg-green-100 text-green-700",
                          emp.role === "inventory" && "bg-orange-100 text-orange-700"
                        )}>
                          {roleLabels[emp.role]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-[#5D4037]">{emp.email}</td>
                      <td className="px-4 py-3 text-sm text-[#5D4037]">{emp.phone}</td>
                      <td className="px-4 py-3 text-sm text-[#5D4037] capitalize">{emp.shift}</td>
                      <td className="px-4 py-3">
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          emp.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        )}>
                          {emp.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => openEditEmployee(emp)} className="p-1.5 hover:bg-[#F5F5DC] rounded">
                            <Edit3 className="w-4 h-4 text-[#5D4037]" />
                          </button>
                          <button onClick={() => deleteEmployee(emp.id)} className="p-1.5 hover:bg-red-50 rounded">
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Menu Management Page */}
        {activeNav === "menu" && (
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#3E2723]">Menu Management</h2>
              <Button onClick={openAddProduct} className="bg-[#D4AF37] hover:bg-[#C9A432] text-[#3E2723]">
                <PlusCircle className="w-4 h-4 mr-2" /> Add Menu Item
              </Button>
            </div>

            {/* Category Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {categories.map(cat => (
                <div key={cat} className="bg-white rounded-xl p-4 shadow-sm border border-[#E5E5E5]">
                  <p className="text-sm text-[#5D4037] mb-1">{cat}</p>
                  <p className="text-2xl font-bold text-[#3E2723]">{products.filter(p => p.category === cat).length}</p>
                  <p className="text-xs text-green-600">{products.filter(p => p.category === cat && p.isActive).length} active</p>
                </div>
              ))}
            </div>

            {/* Menu Items by Category */}
            {categories.map(category => (
              <div key={category} className="mb-6">
                <h3 className="font-semibold text-[#3E2723] mb-3">{category}</h3>
                <div className="bg-white rounded-xl shadow-sm border border-[#E5E5E5] overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-[#F5F5DC]">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-[#3E2723]">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-[#3E2723]">Amharic</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-[#3E2723]">Price (ETB)</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-[#3E2723]">Total Orders</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-[#3E2723]">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-[#3E2723]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E5E5]">
                      {products.filter(p => p.category === category).map((prod) => (
                        <tr key={prod.id} className={cn("hover:bg-[#FAFAF8]", !prod.isActive && "opacity-60")}>
                          <td className="px-4 py-3 font-medium text-[#3E2723]">{prod.name}</td>
                          <td className="px-4 py-3 text-sm text-[#5D4037]">{prod.nameAmharic || "-"}</td>
                          <td className="px-4 py-3 text-sm font-bold text-[#D4AF37]">{prod.price.toFixed(2)}</td>
                          <td className="px-4 py-3 text-sm text-[#5D4037]">{prod.totalOrders}</td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => toggleProductActive(prod.id)}
                              className={cn(
                                "relative w-12 h-6 rounded-full transition-colors",
                                prod.isActive ? "bg-green-500" : "bg-gray-300"
                              )}
                            >
                              <div className={cn(
                                "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform",
                                prod.isActive ? "left-7" : "left-1"
                              )} />
                            </button>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button onClick={() => openEditProduct(prod)} className="p-1.5 hover:bg-[#F5F5DC] rounded">
                                <Edit3 className="w-4 h-4 text-[#5D4037]" />
                              </button>
                              <button onClick={() => deleteProduct(prod.id)} className="p-1.5 hover:bg-red-50 rounded">
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            {!orderComplete ? (
              <>
                <div className="bg-[#3E2723] text-white px-6 py-4 flex items-center justify-between">
                  <h2 className="font-bold text-xl">Select Payment Method</h2>
                  <button onClick={() => setShowCheckout(false)} className="hover:bg-white/10 p-2 rounded-lg transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="px-6 py-4 bg-[#FAFAF8] border-b border-[#E5E5E5]">
                  <div className="flex justify-between items-center">
                    <span className="text-[#5D4037]">Order Total</span>
                    <span className="text-2xl font-bold text-[#D4AF37]">{total.toFixed(2)} ETB</span>
                  </div>
                </div>
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

      {/* Employee Modal */}
      {showEmployeeModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="bg-[#3E2723] text-white px-6 py-4 flex items-center justify-between">
              <h2 className="font-bold text-xl">{editingEmployee ? "Edit Employee" : "Add New Employee"}</h2>
              <button onClick={() => setShowEmployeeModal(false)} className="hover:bg-white/10 p-2 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#3E2723] mb-1">Full Name</label>
                <input
                  type="text"
                  value={employeeForm.name}
                  onChange={(e) => setEmployeeForm({ ...employeeForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] focus:outline-none focus:border-[#D4AF37]"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3E2723] mb-1">Role</label>
                <select
                  value={employeeForm.role}
                  onChange={(e) => setEmployeeForm({ ...employeeForm, role: e.target.value as UserRole })}
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="cashier">Cashier</option>
                  <option value="waiter">Waiter</option>
                  <option value="inventory">Inventory Manager</option>
                  <option value="admin">Admin / Owner</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3E2723] mb-1">Email</label>
                <input
                  type="email"
                  value={employeeForm.email}
                  onChange={(e) => setEmployeeForm({ ...employeeForm, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] focus:outline-none focus:border-[#D4AF37]"
                  placeholder="email@luwak.et"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3E2723] mb-1">Phone</label>
                <input
                  type="text"
                  value={employeeForm.phone}
                  onChange={(e) => setEmployeeForm({ ...employeeForm, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] focus:outline-none focus:border-[#D4AF37]"
                  placeholder="+251911234567"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#3E2723] mb-1">Shift</label>
                  <select
                    value={employeeForm.shift}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, shift: e.target.value as "morning" | "afternoon" | "evening" })}
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3E2723] mb-1">Status</label>
                  <select
                    value={employeeForm.status}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, status: e.target.value as "active" | "inactive" })}
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 pb-6">
              <Button onClick={saveEmployee} className="w-full py-3 bg-[#D4AF37] hover:bg-[#C9A432] text-[#3E2723] font-bold">
                <Save className="w-4 h-4 mr-2" /> {editingEmployee ? "Update Employee" : "Add Employee"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Modal */}
      {showInventoryModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="bg-[#3E2723] text-white px-6 py-4 flex items-center justify-between">
              <h2 className="font-bold text-xl">{editingInventoryItem ? "Edit Inventory Item" : "Add Inventory Item"}</h2>
              <button onClick={() => setShowInventoryModal(false)} className="hover:bg-white/10 p-2 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#3E2723] mb-1">Item Name</label>
                <input
                  type="text"
                  value={inventoryForm.name}
                  onChange={(e) => setInventoryForm({ ...inventoryForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] focus:outline-none focus:border-[#D4AF37]"
                  placeholder="Enter item name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#3E2723] mb-1">Current Stock</label>
                  <input
                    type="number"
                    value={inventoryForm.stock}
                    onChange={(e) => setInventoryForm({ ...inventoryForm, stock: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3E2723] mb-1">Unit</label>
                  <input
                    type="text"
                    value={inventoryForm.unit}
                    onChange={(e) => setInventoryForm({ ...inventoryForm, unit: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] focus:outline-none focus:border-[#D4AF37]"
                    placeholder="kg, L, pcs"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#3E2723] mb-1">Min Stock Level</label>
                  <input
                    type="number"
                    value={inventoryForm.minStock}
                    onChange={(e) => setInventoryForm({ ...inventoryForm, minStock: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3E2723] mb-1">Max Stock Level</label>
                  <input
                    type="number"
                    value={inventoryForm.maxStock}
                    onChange={(e) => setInventoryForm({ ...inventoryForm, maxStock: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3E2723] mb-1">Cost Per Unit (ETB)</label>
                <input
                  type="number"
                  value={inventoryForm.costPerUnit}
                  onChange={(e) => setInventoryForm({ ...inventoryForm, costPerUnit: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3E2723] mb-1">Supplier</label>
                <input
                  type="text"
                  value={inventoryForm.supplier}
                  onChange={(e) => setInventoryForm({ ...inventoryForm, supplier: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] focus:outline-none focus:border-[#D4AF37]"
                  placeholder="Supplier name"
                />
              </div>
            </div>
            <div className="px-6 pb-6">
              <Button onClick={saveInventory} className="w-full py-3 bg-[#D4AF37] hover:bg-[#C9A432] text-[#3E2723] font-bold">
                <Save className="w-4 h-4 mr-2" /> {editingInventoryItem ? "Update Item" : "Add Item"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Menu/Product Modal */}
      {showMenuModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="bg-[#3E2723] text-white px-6 py-4 flex items-center justify-between">
              <h2 className="font-bold text-xl">{editingProduct ? "Edit Menu Item" : "Add Menu Item"}</h2>
              <button onClick={() => setShowMenuModal(false)} className="hover:bg-white/10 p-2 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#3E2723] mb-1">Name (English)</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] focus:outline-none focus:border-[#D4AF37]"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3E2723] mb-1">Name (Amharic)</label>
                <input
                  type="text"
                  value={productForm.nameAmharic}
                  onChange={(e) => setProductForm({ ...productForm, nameAmharic: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] focus:outline-none focus:border-[#D4AF37]"
                  placeholder="የምርት ስም"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#3E2723] mb-1">Price (ETB)</label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3E2723] mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E5E5] focus:outline-none focus:border-[#D4AF37]"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium text-[#3E2723]">Active on Menu</span>
                <button
                  onClick={() => setProductForm({ ...productForm, isActive: !productForm.isActive })}
                  className={cn(
                    "relative w-12 h-6 rounded-full transition-colors",
                    productForm.isActive ? "bg-green-500" : "bg-gray-300"
                  )}
                >
                  <div className={cn(
                    "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform",
                    productForm.isActive ? "left-7" : "left-1"
                  )} />
                </button>
              </div>
            </div>
            <div className="px-6 pb-6">
              <Button onClick={saveProduct} className="w-full py-3 bg-[#D4AF37] hover:bg-[#C9A432] text-[#3E2723] font-bold">
                <Save className="w-4 h-4 mr-2" /> {editingProduct ? "Update Item" : "Add Item"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
