import { storefront, formatPrice } from '@/utils'
import type { ShopifyResponse } from '@/app/types'
import Link from 'next/link'

// String.raw is a tricky to see sintax highlight in vscode
const gql = String.raw

const query = gql`
    query Products{
      products (first: 8){
        edges {
          node{
            title
            handle
            tags
            priceRangeV2{
              minVariantPrice{
                amount
              }
            }
            images(first: 1){
              edges {
                node{
                  transformedSrc
                  altText
                }
              }
            }
          }
        }
      }
    }
`

export async function ProductList (){
  const {data}: ShopifyResponse = await storefront(query)
  
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products list</h2>

    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {data.products.edges.map((item) => {
        const product = item.node
        const image = product.images.edges[0]?.node

        return <Link key={product.handle} href={`/products/${product.handle}`} className="group relative">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <picture>
              <img
                src={image?.transformedSrc}
                alt={image?.altText}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </picture>
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <a href={product.handle}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.title}
                </a>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{product.tags[0]}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">{formatPrice(product.priceRangeV2.minVariantPrice.amount)}</p>
          </div>
        </Link>
      })}
    </div>
  </div>
  )
}