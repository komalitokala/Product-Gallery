"use client"

import type React from "react"

import { useState } from "react"
import type { Product, ProductFormData } from "@/types/product"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductFormProps {
  initialData?: Product
  onSubmit: (data: ProductFormData) => void
  onCancel: () => void
}

const categories = [
  "Electronics",
  "Clothing",
  "Food & Beverage",
  "Home & Garden",
  "Accessories",
  "Sports & Outdoors",
  "Books & Media",
  "Health & Beauty",
]

export function ProductForm({ initialData, onSubmit, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    category: initialData?.category || "",
    image: initialData?.image || "",
    inStock: initialData?.inStock ?? true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Generate placeholder image if no image provided
    const imageUrl =
      formData.image || `/placeholder.svg?height=300&width=300&query=${encodeURIComponent(formData.name)}`

    onSubmit({
      ...formData,
      image: imageUrl,
    })
  }

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input id="name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={(e) => handleInputChange("price", Number.parseFloat(e.target.value) || 0)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Image URL (optional)</Label>
          <Input
            id="image"
            type="url"
            value={formData.image}
            onChange={(e) => handleInputChange("image", e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="inStock"
          checked={formData.inStock}
          onCheckedChange={(checked) => handleInputChange("inStock", checked)}
        />
        <Label htmlFor="inStock">In Stock</Label>
      </div>

      <div className="flex gap-4">
        <Button type="submit" className="flex-1">
          {initialData ? "Update Product" : "Add Product"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
          Cancel
        </Button>
      </div>
    </form>
  )
}
