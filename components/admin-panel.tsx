"use client"

import { useState } from "react"
import type { Product, ProductFormData } from "@/types/product"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductForm } from "@/components/product-form"
import { Plus, Edit, Trash2 } from "lucide-react"
import Image from "next/image"

interface AdminPanelProps {
  products: Product[]
  onProductsUpdate: (products: Product[]) => void
}

export function AdminPanel({ products, onProductsUpdate }: AdminPanelProps) {
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const handleAddProduct = (formData: ProductFormData) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
    }
    onProductsUpdate([...products, newProduct])
    setShowForm(false)
  }

  const handleEditProduct = (formData: ProductFormData) => {
    if (!editingProduct) return

    const updatedProducts = products.map((p) => (p.id === editingProduct.id ? { ...p, ...formData } : p))
    onProductsUpdate(updatedProducts)
    setEditingProduct(null)
  }

  const handleDeleteProduct = (productId: string) => {
    const updatedProducts = products.filter((p) => p.id !== productId)
    onProductsUpdate(updatedProducts)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingProduct(null)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Admin Panel</h2>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>

        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {(showForm || editingProduct) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingProduct ? "Edit Product" : "Add New Product"}</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductForm
              initialData={editingProduct || undefined}
              onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
              onCancel={handleCancelForm}
            />
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group">
            <CardContent className="p-4 space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>

              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-foreground line-clamp-1">{product.name}</h3>
                  <Badge variant={product.inStock ? "default" : "destructive"}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                  <Badge variant="secondary">{product.category}</Badge>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setEditingProduct(product)} className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteProduct(product.id)}
                  className="flex-1"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
