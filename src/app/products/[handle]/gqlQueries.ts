// String.raw is a tricky to see sintax highlight in vscode
const gql = String.raw

export const querySingleProduct = gql`
  query SingleProduct($handle: String!){
    productByHandle(handle: $handle){
      title
      description
      updatedAt
      tags
      handle
      totalInventory
      priceRangeV2{
        minVariantPrice{
          amount
        }
      }
      images(first: 1){
        edges{
          node{
            transformedSrc
            altText
          }
        }
      }
      variants(first: 1){
        edges{
          node{
            id
          }
        }
      }
    }
  }
`

export const queryRelatedProducts = gql`
    query Products{
      products (first: 6){
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