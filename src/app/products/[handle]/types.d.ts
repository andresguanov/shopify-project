export interface ProductByHandle {
  data: Data
  extensions: Extensions
}

export interface Data {
  productByHandle: ProductByHandle
}

export interface ProductByHandle {
  title: string
  description: string
  updatedAt: string
  tags: string[]
  priceRangeV2: PriceRangeV2
  images: Images
  totalInventory: number
  handle: string
  variants: Variants
}

export interface PriceRangeV2 {
  minVariantPrice: MinVariantPrice
}

export interface MinVariantPrice {
  amount: string
}

export interface Images {
  edges: Edge[]
}

export interface Edge {
  node: Node
}

export interface Node {
  transformedSrc: string
  altText: string
}

export interface Extensions {
  cost: Cost
}

export interface Cost {
  requestedQueryCost: number
  actualQueryCost: number
  throttleStatus: ThrottleStatus
}

export interface ThrottleStatus {
  maximumAvailable: number
  currentlyAvailable: number
  restoreRate: number
}

export interface Variants {
  edges: Edge2[]
}

export interface Edge2 {
  node: Node2
}

export interface Node2 {
  id: string
}