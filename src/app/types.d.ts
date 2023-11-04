export interface ShopifyResponse {
  data: Data
  extensions: Extensions
}

export interface Data {
  products: Products
}

export interface Products {
  edges: Edge[]
}

export interface Edge {
  node: Node
}

export interface Node {
  title: string
  handle: string
  tags: string[]
  priceRangeV2: PriceRangeV2
  images: Images
}

export interface PriceRangeV2 {
  minVariantPrice: MinVariantPrice
}

export interface MinVariantPrice {
  amount: string
}

export interface Images {
  edges: Edge2[]
}

export interface Edge2 {
  node: Node2
}

export interface Node2 {
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
