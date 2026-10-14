"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { QRCodeSVG } from "qrcode.react"
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
  User,
  Users,
  ChevronDown,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  BarChart3,
  UtensilsCrossed,
  Shield,
  LogOut,
  Search,
  PlusCircle,
  WifiOff,
  RefreshCw,
  Loader2,
  QrCode,
  DollarSign,
  Calendar,
  Download,
  RotateCcw,
  Edit3,
  Phone,
  Mail,
  MapPin,
  Building,
  ChevronRight,
  Home
} from "lucide-react"
import { cn } from "@/lib/utils"

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
  salary: number
  bankAccount: string
  hireDate: string
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

interface Supplier {
  id: string
  name: string
  contact: string
  email: string
  phone: string
  address: string
  items: string
  lastOrder: string
  status: "Active" | "Inactive"
  totalOrders: number
  paymentTerms: string
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
  { id: "e1", name: "Abebe Kebede", role: "admin", email: "abebe@luwak.et", phone: "+251911234567", status: "active", shift: "morning", salary: 25000, bankAccount: "CBE-1000234567", hireDate: "2022-01-15" },
  { id: "e2", name: "Sara Tesfaye", role: "cashier", email: "sara@luwak.et", phone: "+251912345678", status: "active", shift: "morning", salary: 12000, bankAccount: "CBE-1000345678", hireDate: "2022-06-01" },
  { id: "e3", name: "Dawit Haile", role: "cashier", email: "dawit@luwak.et", phone: "+251913456789", status: "active", shift: "afternoon", salary: 12000, bankAccount: "BOA-2000456789", hireDate: "2023-02-15" },
  { id: "e4", name: "Meron Tadesse", role: "waiter", email: "meron@luwak.et", phone: "+251914567890", status: "active", shift: "morning", salary: 8000, bankAccount: "CBE-1000567890", hireDate: "2023-04-10" },
  { id: "e5", name: "Yonas Bekele", role: "waiter", email: "yonas@luwak.et", phone: "+251915678901", status: "inactive", shift: "evening", salary: 8000, bankAccount: "DBE-3000678901", hireDate: "2023-05-20" },
  { id: "e6", name: "Hana Girma", role: "inventory", email: "hana@luwak.et", phone: "+251916789012", status: "active", shift: "morning", salary: 15000, bankAccount: "CBE-1000789012", hireDate: "2022-09-01" },
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

const initialSuppliers: Supplier[] = [
  { id: "sup1", name: "Kaldi's Farm Supply", contact: "Alemayehu Tadesse", email: "sales@kaldisfarm.et", phone: "+251911001122", address: "Bole, Addis Ababa", items: "Coffee Beans", lastOrder: "Dec 18, 2024", status: "Active", totalOrders: 45000, paymentTerms: "Net 30" },
  { id: "sup2", name: "Addis Dairy Co.", contact: "Tigist Hailu", email: "orders@addisdairy.et", phone: "+251922112233", address: "Kirkos, Addis Ababa", items: "Milk, Cream", lastOrder: "Dec 20, 2024", status: "Active", totalOrders: 8500, paymentTerms: "Net 15" },
  { id: "sup3", name: "Merkato Bakery Dist.", contact: "Solomon Bekele", email: "info@merkatobakery.et", phone: "+251933223344", address: "Merkato, Addis Ababa", items: "Pastries", lastOrder: "Dec 21, 2024", status: "Active", totalOrders: 3200, paymentTerms: "COD" },
  { id: "sup4", name: "Import House Addis", contact: "Daniel Mekonnen", email: "contact@importhouse.et", phone: "+251944334455", address: "Sarbet, Addis Ababa", items: "Syrups, Extracts", lastOrder: "Dec 15, 2024", status: "Active", totalOrders: 12800, paymentTerms: "Net 45" },
  { id: "sup5", name: "Ethiopian Sugar Corp", contact: "Rahel Desta", email: "supply@ethsugar.et", phone: "+251955445566", address: "Wonji, Ethiopia", items: "Sugar", lastOrder: "Dec 19, 2024", status: "Active", totalOrders: 2100, paymentTerms: "Net 30" },
  { id: "sup6", name: "Merkato Supplies", contact: "Getachew Alemu", email: "orders@merkatosupplies.et", phone: "+251966556677", address: "Merkato, Addis Ababa", items: "Packaging, Cups", lastOrder: "Dec 17, 2024", status: "Inactive", totalOrders: 4500, paymentTerms: "Net 15" },
]

const categories = ["Signature Luwak", "Espresso Bar", "Pastries", "Breakfast"]

const paymentMethods: PaymentMethod[] = [
  { id: "telebirr", name: "Telebirr", icon: <Smartphone className="w-6 h-6 md:w-8 md:h-8" />, color: "bg-[#00A9E0] hover:bg-[#0095C8] active:bg-[#0085B8]" },
  { id: "cbe", name: "CBE Birr", icon: <Building2 className="w-6 h-6 md:w-8 md:h-8" />, color: "bg-[#1E3A8A] hover:bg-[#1E3070] active:bg-[#1E2860]" },
  { id: "cash", name: "Cash", icon: <Banknote className="w-6 h-6 md:w-8 md:h-8" />, color: "bg-[#16A34A] hover:bg-[#15803D] active:bg-[#14702D]" },
  { id: "card", name: "Card", icon: <CreditCard className="w-6 h-6 md:w-8 md:h-8" />, color: "bg-[#7C3AED] hover:bg-[#6D28D9] active:bg-[#5D18C9]" },
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

// Splash Screen Component - Faster Animation
function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 5 // Faster progress
      })
    }, 20) // Faster interval

    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 1000) // Faster fade

    const completeTimer = setTimeout(() => {
      onComplete()
    }, 1400) // Faster completion

    return () => {
      clearInterval(progressInterval)
      clearTimeout(fadeTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[100] bg-[#3E2723] flex flex-col items-center justify-center transition-opacity duration-400",
        fadeOut && "opacity-0"
      )}
    >
      <div className="relative mb-6 animate-[pulse_1s_ease-in-out_infinite]">
        <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
          <Image 
            src="/logo.svg" 
            alt="Luwak Coffee Logo" 
            width={70} 
            height={70} 
            className="object-contain animate-[fadeIn_0.3s_ease-out] md:w-[90px] md:h-[90px]"
            priority
          />
        </div>
        <div className="absolute inset-0 rounded-2xl bg-[#D4AF37]/20 blur-xl animate-pulse" />
      </div>

      <h1 className="text-xl md:text-2xl font-bold text-[#D4AF37] mb-1 animate-[fadeIn_0.3s_ease-out]">
        Luwak Coffee
      </h1>
      <p className="text-white/70 text-xs md:text-sm mb-6 animate-[fadeIn_0.3s_ease-out]">
        Addis Ababa
      </p>

      <div className="w-40 md:w-56 h-1 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#D4AF37] transition-all duration-75 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-white/50 text-xs mt-3">
        Beyond Solution RMS
      </p>
    </div>
  )
}

// Offline Screen Component
function OfflineScreen({ onRetry }: { onRetry: () => void }) {
  const [retrying, setRetrying] = useState(false)

  const handleRetry = () => {
    setRetrying(true)
    setTimeout(() => {
      setRetrying(false)
      onRetry()
    }, 1500)
  }

  return (
    <div className="fixed inset-0 z-[100] bg-[#3E2723] flex flex-col items-center justify-center p-6">
      <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
        <Image 
          src="/logo.svg" 
          alt="Luwak Coffee Logo" 
          width={70} 
          height={70} 
          className="object-contain opacity-50 md:w-[90px] md:h-[90px]"
          priority
        />
      </div>

      <div className="w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
        <WifiOff className="w-7 h-7 text-red-400" />
      </div>

      <h2 className="text-lg md:text-xl font-bold text-white mb-2 text-center">Poor Network</h2>
      <p className="text-white/60 text-sm text-center mb-6 max-w-xs">
        Unable to connect to the server. Please check your connection.
      </p>

      <button
        onClick={handleRetry}
        disabled={retrying}
        className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#3E2723] font-semibold rounded-lg hover:bg-[#C9A432] active:bg-[#B89428] transition-colors disabled:opacity-70"
      >
        {retrying ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <RefreshCw className="w-5 h-5" />
        )}
        {retrying ? "Connecting..." : "Try Again"}
      </button>

      <p className="absolute bottom-6 text-white/30 text-xs">
        Beyond Solution RMS
      </p>
    </div>
  )
}

// Loading Overlay Component
function LoadingOverlay({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-[90] bg-[#3E2723]/90 flex flex-col items-center justify-center backdrop-blur-sm">
      <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-4 animate-pulse">
        <Loader2 className="w-7 h-7 text-[#D4AF37] animate-spin" />
      </div>
      <p className="text-white/80 text-sm">{message}</p>
    </div>
  )
}

// QR Code Modal Component
function QRCodeModal({ onClose, menuUrl }: { onClose: () => void; menuUrl: string }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70] p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl w-full max-w-sm p-6 animate-[scaleIn_0.2s_ease-out]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#3E2723]">Menu QR Code</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center mb-4">
          <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
            <QRCodeSVG 
              value={menuUrl}
              size={180}
              level="H"
              includeMargin={false}
              bgColor="#FFFFFF"
              fgColor="#3E2723"
            />
          </div>
          <p className="text-sm text-gray-600 text-center">
            Scan to view our digital menu
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              const svg = document.querySelector('.qr-code-svg')
              if (svg) {
                const svgData = new XMLSerializer().serializeToString(svg)
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                const img = new window.Image()
                img.crossOrigin = "anonymous"
                img.onload = () => {
                  canvas.width = img.width
                  canvas.height = img.height
                  ctx?.drawImage(img, 0, 0)
                  const link = document.createElement('a')
                  link.download = 'luwak-coffee-menu-qr.png'
                  link.href = canvas.toDataURL()
                  link.click()
                }
                img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
              }
            }}
            className="flex-1 py-3 bg-[#3E2723] text-white rounded-lg font-semibold hover:bg-[#2E1713] active:bg-[#1E0703] transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 active:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// Reset Confirmation Modal
function ResetConfirmModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  const [confirmText, setConfirmText] = useState("")

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70] p-4" onClick={onCancel}>
      <div 
        className="bg-white rounded-2xl w-full max-w-md p-6 animate-[scaleIn_0.2s_ease-out]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#3E2723]">Reset All Data?</h3>
            <p className="text-sm text-gray-500">This action cannot be undone</p>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-red-800 mb-2">
            This will reset all data including:
          </p>
          <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
            <li>All employee records</li>
            <li>Inventory data</li>
            <li>Menu items and prices</li>
            <li>Supplier information</li>
          </ul>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type <span className="font-bold text-red-600">RESET</span> to confirm
          </label>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Type RESET here"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 active:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={confirmText !== "RESET"}
            className={cn(
              "flex-1 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2",
              confirmText === "RESET"
                ? "bg-red-600 text-white hover:bg-red-700 active:bg-red-800"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
          >
            <RotateCcw className="w-4 h-4" />
            Reset Data
          </button>
        </div>
      </div>
    </div>
  )
}

export default function POSSystem() {
  // App State
  const [showSplash, setShowSplash] = useState(true)
  const [isOffline, setIsOffline] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState("")
  
  // Current User State
  const [currentRole, setCurrentRole] = useState<UserRole>("admin")
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false)
  
  // Navigation State
  const [activeNav, setActiveNav] = useState("pos")
  const [activeCategory, setActiveCategory] = useState("Signature Luwak")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mobileCartOpen, setMobileCartOpen] = useState(false)
  
  // POS State
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCheckout, setShowCheckout] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [orderComplete, setOrderComplete] = useState(false)
  
  // Data State
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory)
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers)
  
  // Modal States
  const [showEmployeeModal, setShowEmployeeModal] = useState(false)
  const [showInventoryModal, setShowInventoryModal] = useState(false)
  const [showMenuModal, setShowMenuModal] = useState(false)
  const [showSupplierModal, setShowSupplierModal] = useState(false)
  const [showQRModal, setShowQRModal] = useState(false)
  const [showResetModal, setShowResetModal] = useState(false)
  const [showPayrollModal, setShowPayrollModal] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [editingInventoryItem, setEditingInventoryItem] = useState<InventoryItem | null>(null)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null)
  const [viewingPayroll, setViewingPayroll] = useState<Employee | null>(null)
  
  // Employee Tab State
  const [employeeTab, setEmployeeTab] = useState<"employees" | "payroll">("employees")
  
  // Form States
  const [employeeForm, setEmployeeForm] = useState({
    name: "", role: "cashier" as UserRole, email: "", phone: "", status: "active" as "active" | "inactive", shift: "morning" as "morning" | "afternoon" | "evening", salary: 0, bankAccount: "", hireDate: ""
  })
  const [inventoryForm, setInventoryForm] = useState({
    name: "", stock: 0, unit: "", minStock: 0, maxStock: 0, costPerUnit: 0, supplier: ""
  })
  const [productForm, setProductForm] = useState({
    name: "", nameAmharic: "", price: 0, category: "Signature Luwak", isActive: true
  })
  const [supplierForm, setSupplierForm] = useState({
    name: "", contact: "", email: "", phone: "", address: "", items: "", status: "Active" as "Active" | "Inactive", paymentTerms: ""
  })
  
  // Search States
  const [employeeSearch, setEmployeeSearch] = useState("")
  const [inventorySearch, setInventorySearch] = useState("")

  // Network Status Detection
  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    if (typeof window !== 'undefined' && !navigator.onLine) {
      setIsOffline(true)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true)
      } else {
        setSidebarOpen(false)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Navigation items based on role
  const getNavItems = useCallback(() => {
    const allItems = [
      { id: "pos", name: "POS", icon: <ShoppingCart className="w-5 h-5" />, roles: ["admin", "cashier", "waiter"] },
      { id: "inventory", name: "Inventory Tracker", icon: <Package className="w-5 h-5" />, roles: ["admin", "inventory"] },
      { id: "suppliers", name: "Addis Supplier Logs", icon: <Truck className="w-5 h-5" />, roles: ["admin", "inventory"] },
      { id: "reports", name: "ERCA VAT Reports", icon: <FileText className="w-5 h-5" />, roles: ["admin"] },
      { id: "analytics", name: "Product Analytics", icon: <BarChart3 className="w-5 h-5" />, roles: ["admin"] },
      { id: "employees", name: "Employees & Payroll", icon: <Users className="w-5 h-5" />, roles: ["admin"] },
      { id: "menu", name: "Menu Management", icon: <UtensilsCrossed className="w-5 h-5" />, roles: ["admin"] },
    ]
    return allItems.filter(item => item.roles.includes(currentRole))
  }, [currentRole])

  const navItems = getNavItems()

  const filteredProducts = products.filter(p => p.category === activeCategory && (currentRole === "admin" || p.isActive))

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
      setIsLoading(true)
      setLoadingMessage("Processing payment...")
      setTimeout(() => {
        setIsLoading(false)
        setOrderComplete(true)
        setTimeout(() => {
          clearCart()
          setMobileCartOpen(false)
        }, 2000)
      }, 1200)
    }
  }

  // Employee Functions
  const openAddEmployee = () => {
    setEditingEmployee(null)
    setEmployeeForm({ name: "", role: "cashier", email: "", phone: "", status: "active", shift: "morning", salary: 0, bankAccount: "", hireDate: new Date().toISOString().split('T')[0] })
    setShowEmployeeModal(true)
  }

  const openEditEmployee = (emp: Employee) => {
    setEditingEmployee(emp)
    setEmployeeForm({ name: emp.name, role: emp.role, email: emp.email, phone: emp.phone, status: emp.status, shift: emp.shift, salary: emp.salary, bankAccount: emp.bankAccount, hireDate: emp.hireDate })
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

  // Supplier Functions
  const openAddSupplier = () => {
    setEditingSupplier(null)
    setSupplierForm({ name: "", contact: "", email: "", phone: "", address: "", items: "", status: "Active", paymentTerms: "" })
    setShowSupplierModal(true)
  }

  const openEditSupplier = (sup: Supplier) => {
    setEditingSupplier(sup)
    setSupplierForm({ name: sup.name, contact: sup.contact, email: sup.email, phone: sup.phone, address: sup.address, items: sup.items, status: sup.status, paymentTerms: sup.paymentTerms })
    setShowSupplierModal(true)
  }

  const saveSupplier = () => {
    if (editingSupplier) {
      setSuppliers(prev => prev.map(s => s.id === editingSupplier.id ? { ...s, ...supplierForm, lastOrder: s.lastOrder, totalOrders: s.totalOrders } : s))
    } else {
      const newSup: Supplier = { id: `sup${Date.now()}`, ...supplierForm, lastOrder: "Not yet", totalOrders: 0 }
      setSuppliers(prev => [...prev, newSup])
    }
    setShowSupplierModal(false)
  }

  const deleteSupplier = (id: string) => {
    setSuppliers(prev => prev.filter(s => s.id !== id))
  }

  // Reset Data Function
  const handleResetData = () => {
    setIsLoading(true)
    setLoadingMessage("Resetting data...")
    setTimeout(() => {
      setProducts(initialProducts)
      setEmployees(initialEmployees)
      setInventory(initialInventory)
      setSuppliers(initialSuppliers)
      setCart([])
      setShowResetModal(false)
      setIsLoading(false)
    }, 1500)
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

  // Payroll calculations
  const calculateMonthlyPayroll = () => {
    return employees.filter(e => e.status === "active").reduce((sum, e) => sum + e.salary, 0)
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

  const handleRetry = () => {
    if (navigator.onLine) {
      setIsOffline(false)
    }
  }

  const menuUrl = typeof window !== 'undefined' ? `${window.location.origin}/menu` : 'https://luwak-coffee.et/menu'

  // Show splash screen
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />
  }

  // Show offline screen
  if (isOffline) {
    return <OfflineScreen onRetry={handleRetry} />
  }

  return (
    <div className="h-[100dvh] flex overflow-hidden bg-[#FAFAF8]">
      {/* Loading Overlay */}
      {isLoading && <LoadingOverlay message={loadingMessage} />}

      {/* QR Modal */}
      {showQRModal && <QRCodeModal onClose={() => setShowQRModal(false)} menuUrl={menuUrl} />}

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <ResetConfirmModal 
          onConfirm={handleResetData} 
          onCancel={() => setShowResetModal(false)} 
        />
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:relative bg-[#3E2723] text-white flex flex-col transition-all duration-300 ease-in-out z-50 h-full",
          sidebarOpen ? "w-64 translate-x-0" : "w-0 lg:w-20 -translate-x-full lg:translate-x-0"
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
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveNav(item.id)
                if (window.innerWidth < 1024) setSidebarOpen(false)
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 text-left min-h-[48px] active:scale-[0.98]",
                activeNav === item.id
                  ? "bg-[#D4AF37] text-[#3E2723] font-semibold"
                  : "text-white/80 hover:bg-[#5D4037] hover:text-white active:bg-[#4D3027]"
              )}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {sidebarOpen && <span className="text-sm truncate">{item.name}</span>}
            </button>
          ))}

          {/* Admin Quick Actions */}
          {currentRole === "admin" && sidebarOpen && (
            <div className="pt-4 mt-4 border-t border-[#5D4037]">
              <p className="px-3 mb-2 text-xs text-white/50 uppercase tracking-wider">Quick Actions</p>
              <button
                onClick={() => setShowQRModal(true)}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-white/80 hover:bg-[#5D4037] transition-colors min-h-[48px] active:scale-[0.98]"
              >
                <QrCode className="w-5 h-5" />
                <span className="text-sm">Menu QR Code</span>
              </button>
              <button
                onClick={() => setShowResetModal(true)}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors min-h-[48px] active:scale-[0.98]"
              >
                <RotateCcw className="w-5 h-5" />
                <span className="text-sm">Reset Data</span>
              </button>
            </div>
          )}
        </nav>

        {/* User Section with Role Switcher */}
        <div className="p-3 border-t border-[#5D4037]">
          <div className="relative">
            <button
              onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#5D4037] active:bg-[#4D3027] transition-colors min-h-[48px]"
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
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#5D4037] rounded-lg shadow-xl overflow-hidden animate-[slideUp_0.2s_ease-out]">
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
                      "w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-[#3E2723] active:bg-[#2E1713] transition-colors min-h-[48px]",
                      currentRole === role && "bg-[#3E2723]"
                    )}
                  >
                    {roleIcons[role]}
                    <span className="text-sm">{roleLabels[role]}</span>
                    {currentRole === role && <CheckCircle2 className="w-4 h-4 ml-auto text-[#D4AF37]" />}
                  </button>
                ))}
                <div className="border-t border-[#3E2723]">
                  <button className="w-full flex items-center gap-3 px-3 py-3 text-left text-red-400 hover:bg-[#3E2723] active:bg-[#2E1713] transition-colors min-h-[48px]">
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Toggle Button - Desktop Only */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hidden lg:block p-4 border-t border-[#5D4037] hover:bg-[#5D4037] active:bg-[#4D3027] transition-colors"
        >
          {sidebarOpen ? <X className="w-5 h-5 mx-auto" /> : <Menu className="w-5 h-5 mx-auto" />}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-3 md:px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6 text-[#3E2723]" />
            </button>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#3E2723]">
                {navItems.find(n => n.id === activeNav)?.name || "POS"}
              </h2>
              <p className="text-xs md:text-sm text-gray-500">{currentDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            {/* Low Stock Alert */}
            {getLowStockItems().length > 0 && currentRole !== "waiter" && currentRole !== "cashier" && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-xs text-red-700">{getLowStockItems().length} items low stock</span>
              </div>
            )}
            {/* Mobile QR Button for Admin */}
            {currentRole === "admin" && (
              <button 
                onClick={() => setShowQRModal(true)}
                className="md:hidden p-2 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors"
              >
                <QrCode className="w-5 h-5 text-[#3E2723]" />
              </button>
            )}
            <div className="text-right">
              <p className="text-base md:text-lg font-semibold text-[#3E2723]">{currentTime}</p>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex">
          {activeNav === "pos" && (
            <>
              {/* Products Section */}
              <div className={cn(
                "flex-1 flex flex-col overflow-hidden transition-all duration-300",
                mobileCartOpen ? "hidden md:flex" : "flex"
              )}>
                {/* Category Tabs */}
                <div className="bg-white border-b border-gray-200 px-3 md:px-6 py-3 flex gap-2 overflow-x-auto flex-shrink-0 scrollbar-hide">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        "px-3 md:px-4 py-2 rounded-lg font-medium text-xs md:text-sm whitespace-nowrap transition-all min-h-[40px] active:scale-95",
                        activeCategory === cat
                          ? "bg-[#3E2723] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Products Grid */}
                <div className="flex-1 overflow-y-auto p-3 md:p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                    {filteredProducts.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => addToCart(product)}
                        disabled={!product.isActive && currentRole !== "admin"}
                        className={cn(
                          "bg-white rounded-xl p-3 md:p-4 text-left transition-all duration-200 border-2 min-h-[100px] md:min-h-[120px] active:scale-[0.98]",
                          product.isActive 
                            ? "border-transparent hover:border-[#D4AF37] hover:shadow-lg active:border-[#C9A432]" 
                            : "border-gray-200 opacity-60",
                          cart.some(item => item.id === product.id) && "border-[#D4AF37] bg-[#D4AF37]/5"
                        )}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <Coffee className={cn(
                            "w-6 h-6 md:w-8 md:h-8",
                            product.isActive ? "text-[#3E2723]" : "text-gray-400"
                          )} />
                          {!product.isActive && (
                            <span className="text-[10px] md:text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded">
                              Inactive
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-[#3E2723] text-sm md:text-base mb-0.5 line-clamp-2">
                          {product.name}
                        </h3>
                        {product.nameAmharic && (
                          <p className="text-[10px] md:text-xs text-gray-500 mb-2">{product.nameAmharic}</p>
                        )}
                        <p className="text-base md:text-lg font-bold text-[#D4AF37]">
                          {product.price.toFixed(2)} ETB
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Cart Button */}
                {cart.length > 0 && (
                  <div className="md:hidden fixed bottom-4 left-4 right-4 z-30 safe-area-bottom">
                    <button
                      onClick={() => setMobileCartOpen(true)}
                      className="w-full bg-[#D4AF37] text-[#3E2723] py-4 rounded-xl font-semibold flex items-center justify-center gap-3 shadow-lg active:bg-[#C9A432] active:scale-[0.98] transition-all"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>View Cart ({cart.length})</span>
                      <span className="bg-[#3E2723] text-[#D4AF37] px-3 py-1 rounded-lg text-sm">
                        {total.toFixed(2)} ETB
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {/* Receipt/Cart Section */}
              <div className={cn(
                "bg-white border-l border-gray-200 flex flex-col overflow-hidden",
                mobileCartOpen 
                  ? "fixed inset-0 z-50 md:relative md:w-[40%] lg:w-[35%] animate-[slideUp_0.2s_ease-out]" 
                  : "hidden md:flex md:w-[40%] lg:w-[35%]"
              )}>
                {/* Cart Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <Receipt className="w-5 h-5 text-[#3E2723]" />
                    <h3 className="font-bold text-lg text-[#3E2723]">Current Order</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {cart.length > 0 && (
                      <button
                        onClick={clearCart}
                        className="p-2 hover:bg-red-50 active:bg-red-100 rounded-lg text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => setMobileCartOpen(false)}
                      className="md:hidden p-2 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                      <ShoppingCart className="w-16 h-16 mb-4 opacity-30" />
                      <p className="text-lg">No items yet</p>
                      <p className="text-sm">Tap products to add</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="bg-gray-50 rounded-lg p-3 flex items-center gap-3 animate-[fadeIn_0.2s_ease-out]"
                        >
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-[#3E2723] text-sm truncate">{item.name}</h4>
                            <p className="text-xs text-gray-500">{item.price.toFixed(2)} ETB each</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="font-semibold text-[#3E2723] w-16 text-right text-sm">
                            {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Cart Summary */}
                {cart.length > 0 && (
                  <div className="border-t border-gray-200 p-4 bg-gray-50 flex-shrink-0 safe-area-bottom">
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">{subtotal.toFixed(2)} ETB</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">VAT (15%)</span>
                        <span className="font-medium">{vat.toFixed(2)} ETB</span>
                      </div>
                      <div className="h-px bg-gray-200" />
                      <div className="flex justify-between">
                        <span className="font-bold text-lg text-[#3E2723]">Total</span>
                        <span className="font-bold text-lg text-[#D4AF37]">{total.toFixed(2)} ETB</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowCheckout(true)}
                      className="w-full bg-[#3E2723] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#2E1713] active:bg-[#1E0703] active:scale-[0.98] transition-all"
                    >
                      Checkout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Inventory Tracker */}
          {activeNav === "inventory" && (
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search inventory..."
                    value={inventorySearch}
                    onChange={(e) => setInventorySearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                  />
                </div>
                {currentRole === "admin" && (
                  <button
                    onClick={openAddInventory}
                    className="flex items-center gap-2 px-4 py-3 bg-[#3E2723] text-white rounded-lg hover:bg-[#2E1713] active:bg-[#1E0703] transition-colors whitespace-nowrap active:scale-[0.98]"
                  >
                    <PlusCircle className="w-5 h-5" />
                    <span className="hidden sm:inline">Add Item</span>
                  </button>
                )}
              </div>

              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredInventory.map((item) => {
                  const status = getInventoryStatus(item)
                  const percentage = Math.min((item.stock / item.maxStock) * 100, 100)
                  return (
                    <div
                      key={item.id}
                      className={cn(
                        "bg-white rounded-xl p-4 border-2 transition-all",
                        status === "critical" && "border-red-200 bg-red-50",
                        status === "warning" && "border-yellow-200 bg-yellow-50",
                        status === "good" && "border-gray-200"
                      )}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-[#3E2723]">{item.name}</h4>
                          <p className="text-sm text-gray-500">{item.supplier}</p>
                        </div>
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          status === "critical" && "bg-red-100 text-red-700",
                          status === "warning" && "bg-yellow-100 text-yellow-700",
                          status === "good" && "bg-green-100 text-green-700"
                        )}>
                          {status === "critical" ? "Critical" : status === "warning" ? "Low" : "In Stock"}
                        </span>
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Stock Level</span>
                          <span className="font-medium">{item.stock} / {item.maxStock} {item.unit}</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all",
                              status === "critical" && "bg-red-500",
                              status === "warning" && "bg-yellow-500",
                              status === "good" && "bg-green-500"
                            )}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Min: {item.minStock} {item.unit}</p>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Cost/Unit</span>
                        <span className="font-medium">{item.costPerUnit.toFixed(2)} ETB</span>
                      </div>

                      {currentRole === "admin" && (
                        <div className="flex gap-2 mt-4 pt-3 border-t border-gray-200">
                          <button
                            onClick={() => openEditInventory(item)}
                            className="flex-1 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteInventoryItem(item.id)}
                            className="px-4 py-2 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 active:bg-red-300 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Supplier Logs */}
          {activeNav === "suppliers" && (
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {currentRole === "admin" && (
                <div className="flex justify-end mb-4">
                  <button
                    onClick={openAddSupplier}
                    className="flex items-center gap-2 px-4 py-3 bg-[#3E2723] text-white rounded-lg hover:bg-[#2E1713] active:bg-[#1E0703] transition-colors active:scale-[0.98]"
                  >
                    <PlusCircle className="w-5 h-5" />
                    <span className="hidden sm:inline">Add Supplier</span>
                  </button>
                </div>
              )}

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {suppliers.map((sup) => (
                  <div key={sup.id} className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-[#3E2723]">{sup.name}</h4>
                        <p className="text-sm text-gray-500">{sup.items}</p>
                      </div>
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        sup.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                      )}>
                        {sup.status}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{sup.contact}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{sup.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Last: {sup.lastOrder}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                      <span className="font-semibold text-[#D4AF37]">{sup.totalOrders.toLocaleString()} ETB</span>
                      {currentRole === "admin" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditSupplier(sup)}
                            className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteSupplier(sup.id)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 active:bg-red-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Supplier</th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Contact</th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Items</th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Last Order</th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Total</th>
                        {currentRole === "admin" && (
                          <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Actions</th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {suppliers.map((sup) => (
                        <tr key={sup.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-medium text-[#3E2723]">{sup.name}</div>
                            <div className="text-xs text-gray-500">{sup.email}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <div>{sup.contact}</div>
                            <div className="text-xs text-gray-500">{sup.phone}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{sup.items}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{sup.lastOrder}</td>
                          <td className="px-6 py-4">
                            <span className={cn(
                              "px-2 py-1 rounded-full text-xs font-medium",
                              sup.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                            )}>
                              {sup.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-medium text-[#3E2723]">
                            {sup.totalOrders.toLocaleString()} ETB
                          </td>
                          {currentRole === "admin" && (
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => openEditSupplier(sup)}
                                  className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-colors"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => deleteSupplier(sup.id)}
                                  className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 active:bg-red-300 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ERCA VAT Reports */}
          {activeNav === "reports" && (
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4 mb-6">
                {[
                  { label: "Monthly Revenue", value: "2,450,000 ETB", change: "+12%", up: true },
                  { label: "Total VAT Collected", value: "367,500 ETB", change: "+8%", up: true },
                  { label: "Transactions", value: "3,842", change: "+15%", up: true },
                  { label: "Avg. Transaction", value: "637.50 ETB", change: "-3%", up: false },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
                    <p className="text-xs md:text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-lg md:text-2xl font-bold text-[#3E2723]">{stat.value}</p>
                    <div className={cn(
                      "flex items-center gap-1 text-xs md:text-sm mt-2",
                      stat.up ? "text-green-600" : "text-red-600"
                    )}>
                      {stat.up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span>{stat.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                  <h3 className="font-bold text-lg text-[#3E2723]">ERCA VAT Summary</h3>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#D4AF37] text-[#3E2723] rounded-lg font-semibold hover:bg-[#C9A432] active:bg-[#B89428] transition-colors active:scale-[0.98]">
                    <Download className="w-4 h-4" />
                    Export Report
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Period</th>
                        <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Sales</th>
                        <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700 hidden sm:table-cell">VAT Output</th>
                        <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Net VAT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        { period: "Dec 2024", sales: 2450000, output: 367500, input: 125000, net: 242500 },
                        { period: "Nov 2024", sales: 2180000, output: 327000, input: 118000, net: 209000 },
                        { period: "Oct 2024", sales: 2320000, output: 348000, input: 122000, net: 226000 },
                      ].map((row, i) => (
                        <tr key={i}>
                          <td className="px-4 py-3 font-medium text-[#3E2723]">{row.period}</td>
                          <td className="px-4 py-3 text-sm">{row.sales.toLocaleString()} ETB</td>
                          <td className="px-4 py-3 text-sm hidden sm:table-cell">{row.output.toLocaleString()} ETB</td>
                          <td className="px-4 py-3 font-medium text-[#D4AF37]">{row.net.toLocaleString()} ETB</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Product Analytics */}
          {activeNav === "analytics" && (
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              <div className="grid gap-6 lg:grid-cols-2 mb-6">
                {/* Low Performing Products */}
                <div className="bg-white rounded-xl border border-red-200 p-4 md:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingDown className="w-5 h-5 text-red-500" />
                    <h3 className="font-bold text-lg text-[#3E2723]">Waste Risk Items</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Products with less than 10 orders this week</p>
                  <div className="space-y-3 max-h-72 overflow-y-auto">
                    {getLowPerformingProducts().map((prod) => (
                      <div key={prod.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div>
                          <p className="font-medium text-[#3E2723] text-sm">{prod.name}</p>
                          <p className="text-xs text-gray-500">{prod.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-red-600 text-sm">{prod.lastWeekOrders} orders/week</p>
                          <p className="text-xs text-gray-500">Action: Promote or Remove</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Performing Products */}
                <div className="bg-white rounded-xl border border-green-200 p-4 md:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <h3 className="font-bold text-lg text-[#3E2723]">Top Performers</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Best selling products this week</p>
                  <div className="space-y-3">
                    {getTopPerformingProducts().map((prod, i) => (
                      <div key={prod.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold">
                            {i + 1}
                          </span>
                          <div>
                            <p className="font-medium text-[#3E2723] text-sm">{prod.name}</p>
                            <p className="text-xs text-gray-500">{prod.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600 text-sm">{prod.lastWeekOrders} orders</p>
                          <p className="text-xs text-gray-500">{(prod.lastWeekOrders * prod.price).toLocaleString()} ETB</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Category Performance */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
                <h3 className="font-bold text-lg text-[#3E2723] mb-4">Category Performance</h3>
                <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                  {categories.map((cat) => {
                    const catProducts = products.filter(p => p.category === cat && p.isActive)
                    const totalOrders = catProducts.reduce((sum, p) => sum + p.lastWeekOrders, 0)
                    const revenue = catProducts.reduce((sum, p) => sum + (p.lastWeekOrders * p.price), 0)
                    return (
                      <div key={cat} className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-[#3E2723] text-sm mb-2">{cat}</h4>
                        <p className="text-2xl font-bold text-[#D4AF37]">{totalOrders}</p>
                        <p className="text-xs text-gray-500">orders this week</p>
                        <p className="text-sm font-medium text-gray-700 mt-2">{revenue.toLocaleString()} ETB</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Employee Management with Payroll */}
          {activeNav === "employees" && (
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {/* Tabs */}
              <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
                <button
                  onClick={() => setEmployeeTab("employees")}
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all min-h-[40px] active:scale-95",
                    employeeTab === "employees"
                      ? "bg-[#3E2723] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300"
                  )}
                >
                  Employees
                </button>
                <button
                  onClick={() => setEmployeeTab("payroll")}
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all min-h-[40px] active:scale-95",
                    employeeTab === "payroll"
                      ? "bg-[#3E2723] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300"
                  )}
                >
                  Payroll
                </button>
              </div>

              {employeeTab === "employees" && (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search employees..."
                        value={employeeSearch}
                        onChange={(e) => setEmployeeSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                      />
                    </div>
                    <button
                      onClick={openAddEmployee}
                      className="flex items-center gap-2 px-4 py-3 bg-[#3E2723] text-white rounded-lg hover:bg-[#2E1713] active:bg-[#1E0703] transition-colors whitespace-nowrap active:scale-[0.98]"
                    >
                      <PlusCircle className="w-5 h-5" />
                      <span className="hidden sm:inline">Add Employee</span>
                    </button>
                  </div>

                  {/* Employee Stats */}
                  <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-6">
                    {(["admin", "cashier", "waiter", "inventory"] as UserRole[]).map((role) => (
                      <div key={role} className="bg-white rounded-xl p-4 border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          {roleIcons[role]}
                          <span className="text-sm text-gray-600">{roleLabels[role]}s</span>
                        </div>
                        <p className="text-2xl font-bold text-[#3E2723]">
                          {employees.filter(e => e.role === role && e.status === "active").length}
                        </p>
                        <p className="text-xs text-gray-500">active</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredEmployees.map((emp) => (
                      <div
                        key={emp.id}
                        className={cn(
                          "bg-white rounded-xl p-4 border-2 transition-all",
                          emp.status === "active" ? "border-gray-200" : "border-gray-100 opacity-60"
                        )}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-[#3E2723] flex items-center justify-center text-white font-semibold">
                              {emp.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <h4 className="font-semibold text-[#3E2723]">{emp.name}</h4>
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                {roleIcons[emp.role]}
                                <span>{roleLabels[emp.role]}</span>
                              </div>
                            </div>
                          </div>
                          <span className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            emp.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                          )}>
                            {emp.status}
                          </span>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <p className="truncate">{emp.email}</p>
                          <p>{emp.phone}</p>
                          <div className="flex justify-between">
                            <span className="capitalize">Shift: {emp.shift}</span>
                            <span className="font-semibold text-[#D4AF37]">{emp.salary.toLocaleString()} ETB</span>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-3 border-t border-gray-200">
                          <button
                            onClick={() => openEditEmployee(emp)}
                            className="flex-1 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setViewingPayroll(emp)
                              setShowPayrollModal(true)
                            }}
                            className="px-4 py-2 text-sm bg-[#D4AF37]/10 text-[#D4AF37] rounded-lg hover:bg-[#D4AF37]/20 active:bg-[#D4AF37]/30 transition-colors"
                          >
                            <DollarSign className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteEmployee(emp.id)}
                            className="px-4 py-2 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 active:bg-red-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {employeeTab === "payroll" && (
                <>
                  {/* Payroll Summary */}
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 mb-6">
                    <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
                      <p className="text-sm text-gray-600 mb-1">Monthly Payroll</p>
                      <p className="text-2xl font-bold text-[#D4AF37]">{calculateMonthlyPayroll().toLocaleString()} ETB</p>
                      <p className="text-xs text-gray-500 mt-1">{employees.filter(e => e.status === "active").length} active employees</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
                      <p className="text-sm text-gray-600 mb-1">Next Payday</p>
                      <p className="text-2xl font-bold text-[#3E2723]">Dec 30, 2024</p>
                      <p className="text-xs text-gray-500 mt-1">8 days remaining</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
                      <p className="text-sm text-gray-600 mb-1">Avg. Salary</p>
                      <p className="text-2xl font-bold text-[#3E2723]">
                        {Math.round(calculateMonthlyPayroll() / employees.filter(e => e.status === "active").length).toLocaleString()} ETB
                      </p>
                      <p className="text-xs text-gray-500 mt-1">per employee</p>
                    </div>
                  </div>

                  {/* Payroll List */}
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                      <h3 className="font-bold text-[#3E2723]">Payroll Details</h3>
                      <button className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-[#3E2723] rounded-lg font-semibold hover:bg-[#C9A432] active:bg-[#B89428] transition-colors text-sm active:scale-[0.98]">
                        <Download className="w-4 h-4" />
                        Export
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Employee</th>
                            <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700 hidden sm:table-cell">Role</th>
                            <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700 hidden md:table-cell">Bank Account</th>
                            <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Salary</th>
                            <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {employees.map((emp) => (
                            <tr key={emp.id} className={cn("hover:bg-gray-50 transition-colors", emp.status === "inactive" && "opacity-50")}>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-[#3E2723] flex items-center justify-center text-white text-xs font-semibold">
                                    {emp.name.split(' ').map(n => n[0]).join('')}
                                  </div>
                                  <div>
                                    <p className="font-medium text-[#3E2723] text-sm">{emp.name}</p>
                                    <p className="text-xs text-gray-500 sm:hidden">{roleLabels[emp.role]}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600 hidden sm:table-cell">{roleLabels[emp.role]}</td>
                              <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">{emp.bankAccount}</td>
                              <td className="px-4 py-3 font-semibold text-[#D4AF37]">{emp.salary.toLocaleString()} ETB</td>
                              <td className="px-4 py-3">
                                <span className={cn(
                                  "px-2 py-1 rounded-full text-xs font-medium",
                                  emp.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                                )}>
                                  {emp.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-gray-50">
                          <tr>
                            <td colSpan={3} className="px-4 py-3 font-bold text-[#3E2723]">Total Monthly Payroll</td>
                            <td colSpan={2} className="px-4 py-3 font-bold text-[#D4AF37] text-lg">
                              {calculateMonthlyPayroll().toLocaleString()} ETB
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Menu Management */}
          {activeNav === "menu" && (
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        "px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all min-h-[40px] active:scale-95",
                        activeCategory === cat
                          ? "bg-[#3E2723] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300"
                      )}
                    >
                      {cat} ({products.filter(p => p.category === cat).length})
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowQRModal(true)}
                    className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-colors active:scale-[0.98]"
                  >
                    <QrCode className="w-5 h-5" />
                    <span className="hidden sm:inline">QR Code</span>
                  </button>
                  <button
                    onClick={openAddProduct}
                    className="flex items-center gap-2 px-4 py-3 bg-[#D4AF37] text-[#3E2723] rounded-lg hover:bg-[#C9A432] active:bg-[#B89428] transition-colors whitespace-nowrap font-semibold active:scale-[0.98]"
                  >
                    <PlusCircle className="w-5 h-5" />
                    <span className="hidden sm:inline">Add Item</span>
                  </button>
                </div>
              </div>

              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {products.filter(p => p.category === activeCategory).map((prod) => (
                  <div
                    key={prod.id}
                    className={cn(
                      "bg-white rounded-xl p-4 border-2 transition-all",
                      prod.isActive ? "border-gray-200" : "border-gray-100"
                    )}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-[#3E2723]">{prod.name}</h4>
                        {prod.nameAmharic && (
                          <p className="text-sm text-gray-500">{prod.nameAmharic}</p>
                        )}
                      </div>
                      {/* Toggle Switch */}
                      <button
                        onClick={() => toggleProductActive(prod.id)}
                        className={cn(
                          "relative w-12 h-6 rounded-full transition-colors",
                          prod.isActive ? "bg-green-500" : "bg-gray-300"
                        )}
                      >
                        <div className={cn(
                          "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow",
                          prod.isActive ? "translate-x-7" : "translate-x-1"
                        )} />
                      </button>
                    </div>

                    <p className="text-xl font-bold text-[#D4AF37] mb-2">{prod.price.toFixed(2)} ETB</p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span>Total: {prod.totalOrders} orders</span>
                      <span>Week: {prod.lastWeekOrders}</span>
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-gray-200">
                      <button
                        onClick={() => openEditProduct(prod)}
                        className="flex-1 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(prod.id)}
                        className="px-4 py-2 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 active:bg-red-300 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4" onClick={() => setShowCheckout(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-[scaleIn_0.2s_ease-out]" onClick={e => e.stopPropagation()}>
            {orderComplete ? (
              <div className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center animate-[scaleIn_0.3s_ease-out]">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-[#3E2723] mb-2">Payment Successful!</h3>
                <p className="text-gray-600 mb-4">Order #{Date.now().toString().slice(-6)}</p>
                <p className="text-3xl font-bold text-[#D4AF37]">{total.toFixed(2)} ETB</p>
              </div>
            ) : (
              <>
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#3E2723]">Select Payment Method</h3>
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={cn(
                          "p-4 md:p-6 rounded-xl flex flex-col items-center gap-3 transition-all text-white min-h-[100px] md:min-h-[120px] active:scale-[0.98]",
                          method.color,
                          selectedPayment === method.id && "ring-4 ring-[#D4AF37] ring-offset-2"
                        )}
                      >
                        {method.icon}
                        <span className="font-semibold text-base md:text-lg">{method.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span>{subtotal.toFixed(2)} ETB</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">VAT (15%)</span>
                      <span>{vat.toFixed(2)} ETB</span>
                    </div>
                    <div className="h-px bg-gray-200 my-3" />
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-[#3E2723]">Total</span>
                      <span className="text-[#D4AF37]">{total.toFixed(2)} ETB</span>
                    </div>
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={!selectedPayment}
                    className={cn(
                      "w-full py-4 rounded-xl font-semibold text-lg transition-all active:scale-[0.98]",
                      selectedPayment
                        ? "bg-[#3E2723] text-white hover:bg-[#2E1713] active:bg-[#1E0703]"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    )}
                  >
                    Complete Payment
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Employee Modal */}
      {showEmployeeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4" onClick={() => setShowEmployeeModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-[scaleIn_0.2s_ease-out]" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#3E2723]">
                {editingEmployee ? "Edit Employee" : "Add Employee"}
              </h3>
              <button
                onClick={() => setShowEmployeeModal(false)}
                className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={employeeForm.name}
                  onChange={(e) => setEmployeeForm({ ...employeeForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={employeeForm.role}
                  onChange={(e) => setEmployeeForm({ ...employeeForm, role: e.target.value as UserRole })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                >
                  <option value="cashier">Cashier</option>
                  <option value="waiter">Waiter</option>
                  <option value="inventory">Inventory Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={employeeForm.email}
                  onChange={(e) => setEmployeeForm({ ...employeeForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  placeholder="email@luwak.et"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={employeeForm.phone}
                  onChange={(e) => setEmployeeForm({ ...employeeForm, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  placeholder="+251..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={employeeForm.status}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, status: e.target.value as "active" | "inactive" })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shift</label>
                  <select
                    value={employeeForm.shift}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, shift: e.target.value as "morning" | "afternoon" | "evening" })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  >
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salary (ETB)</label>
                  <input
                    type="number"
                    value={employeeForm.salary}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, salary: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hire Date</label>
                  <input
                    type="date"
                    value={employeeForm.hireDate}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, hireDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account</label>
                <input
                  type="text"
                  value={employeeForm.bankAccount}
                  onChange={(e) => setEmployeeForm({ ...employeeForm, bankAccount: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  placeholder="CBE-1000234567"
                />
              </div>
              <button
                onClick={saveEmployee}
                className="w-full py-3 bg-[#3E2723] text-white rounded-lg font-semibold hover:bg-[#2E1713] active:bg-[#1E0703] transition-colors active:scale-[0.98]"
              >
                {editingEmployee ? "Update Employee" : "Add Employee"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payroll Detail Modal */}
      {showPayrollModal && viewingPayroll && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4" onClick={() => setShowPayrollModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md animate-[scaleIn_0.2s_ease-out]" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#3E2723]">Payroll Details</h3>
              <button
                onClick={() => setShowPayrollModal(false)}
                className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[#3E2723] flex items-center justify-center text-white text-xl font-semibold">
                  {viewingPayroll.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-[#3E2723] text-lg">{viewingPayroll.name}</h4>
                  <p className="text-gray-500">{roleLabels[viewingPayroll.role]}</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Monthly Salary</span>
                  <span className="font-bold text-[#D4AF37]">{viewingPayroll.salary.toLocaleString()} ETB</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Bank Account</span>
                  <span className="font-medium">{viewingPayroll.bankAccount}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Hire Date</span>
                  <span className="font-medium">{new Date(viewingPayroll.hireDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Status</span>
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    viewingPayroll.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                  )}>
                    {viewingPayroll.status}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowPayrollModal(false)}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 active:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Modal */}
      {showInventoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4" onClick={() => setShowInventoryModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-[scaleIn_0.2s_ease-out]" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#3E2723]">
                {editingInventoryItem ? "Edit Inventory Item" : "Add Inventory Item"}
              </h3>
              <button
                onClick={() => setShowInventoryModal(false)}
                className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                <input
                  type="text"
                  value={inventoryForm.name}
                  onChange={(e) => setInventoryForm({ ...inventoryForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock</label>
                  <input
                    type="number"
                    value={inventoryForm.stock}
                    onChange={(e) => setInventoryForm({ ...inventoryForm, stock: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                  <input
                    type="text"
                    value={inventoryForm.unit}
                    onChange={(e) => setInventoryForm({ ...inventoryForm, unit: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    placeholder="kg, L, pcs..."
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Stock</label>
                  <input
                    type="number"
                    value={inventoryForm.minStock}
                    onChange={(e) => setInventoryForm({ ...inventoryForm, minStock: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Stock</label>
                  <input
                    type="number"
                    value={inventoryForm.maxStock}
                    onChange={(e) => setInventoryForm({ ...inventoryForm, maxStock: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cost per Unit (ETB)</label>
                <input
                  type="number"
                  value={inventoryForm.costPerUnit}
                  onChange={(e) => setInventoryForm({ ...inventoryForm, costPerUnit: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                <select
                  value={inventoryForm.supplier}
                  onChange={(e) => setInventoryForm({ ...inventoryForm, supplier: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                >
                  <option value="">Select supplier</option>
                  {suppliers.filter(s => s.status === "Active").map(s => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={saveInventory}
                className="w-full py-3 bg-[#3E2723] text-white rounded-lg font-semibold hover:bg-[#2E1713] active:bg-[#1E0703] transition-colors active:scale-[0.98]"
              >
                {editingInventoryItem ? "Update Item" : "Add Item"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Supplier Modal */}
      {showSupplierModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4" onClick={() => setShowSupplierModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-[scaleIn_0.2s_ease-out]" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#3E2723]">
                {editingSupplier ? "Edit Supplier" : "Add Supplier"}
              </h3>
              <button
                onClick={() => setShowSupplierModal(false)}
                className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={supplierForm.name}
                  onChange={(e) => setSupplierForm({ ...supplierForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                <input
                  type="text"
                  value={supplierForm.contact}
                  onChange={(e) => setSupplierForm({ ...supplierForm, contact: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={supplierForm.email}
                    onChange={(e) => setSupplierForm({ ...supplierForm, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={supplierForm.phone}
                    onChange={(e) => setSupplierForm({ ...supplierForm, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={supplierForm.address}
                  onChange={(e) => setSupplierForm({ ...supplierForm, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Items Supplied</label>
                <input
                  type="text"
                  value={supplierForm.items}
                  onChange={(e) => setSupplierForm({ ...supplierForm, items: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  placeholder="e.g., Coffee Beans, Milk"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={supplierForm.status}
                    onChange={(e) => setSupplierForm({ ...supplierForm, status: e.target.value as "Active" | "Inactive" })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
                  <select
                    value={supplierForm.paymentTerms}
                    onChange={(e) => setSupplierForm({ ...supplierForm, paymentTerms: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  >
                    <option value="">Select terms</option>
                    <option value="COD">COD (Cash on Delivery)</option>
                    <option value="Net 15">Net 15</option>
                    <option value="Net 30">Net 30</option>
                    <option value="Net 45">Net 45</option>
                  </select>
                </div>
              </div>
              <button
                onClick={saveSupplier}
                className="w-full py-3 bg-[#3E2723] text-white rounded-lg font-semibold hover:bg-[#2E1713] active:bg-[#1E0703] transition-colors active:scale-[0.98]"
              >
                {editingSupplier ? "Update Supplier" : "Add Supplier"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Menu/Product Modal */}
      {showMenuModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4" onClick={() => setShowMenuModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-[scaleIn_0.2s_ease-out]" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#3E2723]">
                {editingProduct ? "Edit Menu Item" : "Add Menu Item"}
              </h3>
              <button
                onClick={() => setShowMenuModal(false)}
                className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name (English)</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name (Amharic)</label>
                <input
                  type="text"
                  value={productForm.nameAmharic}
                  onChange={(e) => setProductForm({ ...productForm, nameAmharic: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (ETB)</label>
                <input
                  type="number"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Active on Menu</span>
                <button
                  onClick={() => setProductForm({ ...productForm, isActive: !productForm.isActive })}
                  className={cn(
                    "relative w-12 h-6 rounded-full transition-colors",
                    productForm.isActive ? "bg-green-500" : "bg-gray-300"
                  )}
                >
                  <div className={cn(
                    "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow",
                    productForm.isActive ? "translate-x-7" : "translate-x-1"
                  )} />
                </button>
              </div>
              <button
                onClick={saveProduct}
                className="w-full py-3 bg-[#3E2723] text-white rounded-lg font-semibold hover:bg-[#2E1713] active:bg-[#1E0703] transition-colors active:scale-[0.98]"
              >
                {editingProduct ? "Update Item" : "Add Item"}
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-gray-200 bg-white/80 px-4 py-3 text-center text-xs text-gray-500 backdrop-blur-sm">
        Powered by{' '}
        <a
          href="https://beyond.et"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-[#3E2723] transition-colors hover:text-[#D4AF37]"
        >
          beyond.et
        </a>
      </footer>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes steam {
          0%, 100% { transform: translateY(0) scaleY(1); opacity: 0.4; }
          50% { transform: translateY(-20px) scaleY(1.2); opacity: 0; }
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom, 0);
        }
      `}</style>
    </div>
  )
}
