"use client"

import { useState } from "react"
import { ProductGallery } from "@/components/product-gallery"
import { ProductModal } from "@/components/product-modal"
import { AdminPanel } from "@/components/admin-panel"
import { Header } from "@/components/header"
import type { Product } from "@/types/product"

// Mock data - replace with Supabase data later
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
    price: 299.99,
    category: "Electronics",
    image: "/premium-wireless-headphones.png",
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable organic cotton t-shirt in various colors.",
    price: 29.99,
    category: "Clothing",
    image: "/organic-cotton-t-shirt.jpg",
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Smart Fitness Tracker",
    description: "Advanced fitness tracker with heart rate monitoring and GPS.",
    price: 199.99,
    category: "Electronics",
    image: "/smart-fitness-tracker.png",
    inStock: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Artisan Coffee Beans",
    description: "Premium single-origin coffee beans roasted to perfection.",
    price: 24.99,
    category: "Food & Beverage",
    image: "/artisan-coffee-beans.jpg",
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Minimalist Desk Lamp",
    description: "Modern LED desk lamp with adjustable brightness and color temperature.",
    price: 89.99,
    category: "Home & Garden",
    image: "/minimalist-desk-lamp.png",
    inStock: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Leather Messenger Bag",
    description: "Handcrafted leather messenger bag perfect for work or travel.",
    price: 149.99,
    category: "Accessories",
    image: "/leather-messenger-bag.png",
    inStock: true,
    createdAt: new Date().toISOString(),
  },
]

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showAdmin, setShowAdmin] = useState(false)
  const [products, setProducts] = useState<Product[]>(mockProducts)

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
  }

  const handleCloseModal = () => {
    setSelectedProduct(null)
  }

  const handleProductUpdate = (updatedProducts: Product[]) => {
    setProducts(updatedProducts)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onAdminToggle={() => setShowAdmin(!showAdmin)} showAdmin={showAdmin} />

      <main className="container mx-auto px-4 py-8">
        {showAdmin ? (
          <AdminPanel products={products} onProductsUpdate={handleProductUpdate} />
        ) : (
          <ProductGallery products={products} onProductClick={handleProductClick} />
        )}
      </main>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={handleCloseModal} />}
    </div>
  )
}
