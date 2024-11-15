// export async function setMetafield(productId: string,  volumes: string, dicounts: string, admin): Promise<any> {
//   const query = `
//     mutation {
//       metafieldsSet(metafields: [
//         {
//           namespace: "product_data",
//           key: "volume_discount",
//           type: "string",
//           value: "${metafieldValue}",
//           ownerId: "gid://shopify/Product/${productId}"
//         }
//       ]) {
//         userErrors {
//           field
//           message
//         }
//         metafields {
//           id
//           namespace
//           key
//           value
//         }
//       }
//     }
//   `;
//
//   await admin.graphql(query);
//
//   return null;
// }
