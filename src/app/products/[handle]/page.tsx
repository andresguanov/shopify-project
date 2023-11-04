import { formatDate, formatPrice, storefront } from "@/utils"
import type { ProductByHandle } from "./types"
import { queryRelatedProducts, querySingleProduct } from "./gqlQueries"
import { ShopifyResponse } from "@/app/types"
import Link from "next/link"

async function getProduct(handle: string) {
  const currentProductData: ProductByHandle = await storefront(querySingleProduct, { handle })
  const relatedProductsData: ShopifyResponse = await storefront(queryRelatedProducts)

  
  const currentProduct = currentProductData.data.productByHandle
  const relatedProducts = relatedProductsData.data.products.edges.filter((item) => item.node.handle !== currentProduct.handle).slice(0, 3)

  return {
    currentProduct,
    relatedProducts
  }
}

interface ParamsPage {
  params: {
    handle: string
  }
}

export default async function ProductPage({ params }: ParamsPage) {

  const {currentProduct: product, relatedProducts} = await getProduct(params.handle)
  const image = product.images.edges[0].node
  const variantId = product.variants.edges[0].node.id

  return (
    <div className="bg-gray-100 dark:bg-gray-800 pt-20 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              <picture>
                <img className="w-full h-full object-cover" src={image.transformedSrc} alt={image.altText} />
              </picture>
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
              <button disabled className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Add to Cart</button>
              </div>
              <div className="w-1/2 px-2">
                <button disabled className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Add to Wishlist</button>
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{product.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Updated at: {formatDate(product.updatedAt)}
            </p>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                <span className="text-gray-600 dark:text-gray-300">{formatPrice(product.priceRangeV2.minVariantPrice.amount)}</span>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
                <span className="text-gray-600 dark:text-gray-300">{product.totalInventory > 0 ? 'In Stock' : 'No Stock'}</span>
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">Select Color:</span>
              <div className="flex items-center mt-2">
                <button disabled className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                <button disabled className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                <button disabled className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                <button disabled className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">Select Size:</span>
              <div className="flex items-center mt-2">
                <button disabled className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">S</button>
                <button disabled className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">M</button>
                <button disabled className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">L</button>
                <button disabled className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">XL</button>
                <button disabled className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">XXL</button>
              </div>
            </div>
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                {product.description || 'No description'}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8">Related products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((item) => {
              const image = item.node.images.edges[0].node
              return (
                <div key={item.node.title} className="bg-white rounded-lg shadow-lg p-8">
                  <div className="relative overflow-hidden">
                    <picture>
                      <img className="object-cover w-full h-full" src={image.transformedSrc} alt={image.altText} />
                    </picture>
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Link href={`/products/${item.node.handle}`} className="bg-white text-gray-900 py-2 px-6 rounded-full font-bold hover:bg-gray-300">View Product</Link>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-4">{item.node.title}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-gray-900 font-bold text-lg">{formatPrice(item.node.priceRangeV2.minVariantPrice.amount)}</span>
                  </div>
                </div>
              )
            }
            )}
          </div>
        </div>
      </div>
    </div>
  )
}