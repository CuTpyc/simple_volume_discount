// import {chunkArray} from "./chunk-array";
// import {setMetafield} from "./set-metafield";
//
//
// export async function processLargeDataset<T>(
//   dataset: T[],             // Массив данных о продуктах
//   chunkSize: number,        // Размер чанка
//   volumeData: string,     // Конкатенированные данные о объемах
//   discountData: string,   // Конкатенированные данные о скидках
//   admin: any,               // Объект администратора
//   // processFn: (item: T) => Promise<any> // Функция обработки данных
// ): Promise<any[]> {
//   const chunks = chunkArray(dataset, chunkSize); // Разбиваем данные на чанки
//   const results: any[] = [];
//
//   for (const chunk of chunks) {
//     console.log(`Processing chunk: ${chunk}`);
//
//     // Обрабатываем каждый элемент в чанке через переданную функцию
//     const chunkResults = await Promise.all(
//       chunk.map(async (item) => {
//         await setMetafield(item.id, volumeData, discountData, admin);
//       }
//    ));
//     results.push(...chunkResults);
//
//     console.log(`Results for chunk: ${chunkResults}`);
//   }
//
//   return results;
// }
