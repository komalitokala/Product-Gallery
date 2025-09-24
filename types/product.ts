export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  inStock: boolean
  createdAt: string
}

export interface ProductFormData {
  name: string
  description: string
  price: number
  category: string
  image: string
  inStock: boolean
}
