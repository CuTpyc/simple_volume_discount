import { InlineGrid, InlineStack, Card, Button, Text, Banner, Thumbnail } from "@shopify/polaris";
import { FC, useState } from "react";

// Define a type for the product structure
type Product = {
  id: string;
  title: string;
  image: string;
};

type ExistingProduct = {
  shopifyId: string;
};

export interface ListProps {
  existingProductsId: ExistingProduct[];
}

export const ViewFunnelProducts: FC<ListProps> = ({ existingProductsId }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [warning, setWarning] = useState(false);
  const [existingProductTitles, setExistingProductTitles] = useState<string[]>([]); // To store titles of existing products

  async function selectProducts() {
    try {
      const result = await window.shopify.resourcePicker({
        type: "product",
        action: "select",
        multiple: true,
      });

      if (result && result.selection) {
        const selectedProducts = result.selection.map((product: any) => ({
          id: product.id,
          title: product.title,
          image: product.images[0]?.originalSrc || "",
        }));

        // Filter out products that already exist in the database
        const alreadyExistingProducts = selectedProducts.filter((product) =>
          existingProductsId.some((existing) => existing.shopifyId === product.id)
        );

        // Extract titles of existing products for warning
        const existingTitles = alreadyExistingProducts.map((product) => product.title);

        // Set warning if there are existing products
        if (existingTitles.length > 0) {
          setWarning(true);
          setExistingProductTitles(existingTitles);
        } else {
          setWarning(false);
          setExistingProductTitles([]);
        }

        // Filter new products to exclude existing ones and avoid duplicates in the current state
        const newProducts = selectedProducts.filter(
          (product) =>
            !alreadyExistingProducts.some((existing) => existing.id === product.id) &&
            !products.some((existingProduct) => existingProduct.id === product.id)
        );

        // Update the state with new products
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      }
    } catch (error) {
      console.error("Error selecting products:", error);
    }
  }

  const handleProductRemove = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div style={{ maxWidth: "100%", display: "block", gap: "20px" }}>
      <Text as="h2" fontWeight="bold">
        Apply offer to
      </Text>
      <div style={{ marginTop: "10px" }}>
        <Button variant="primary" onClick={selectProducts}>
          Select products
        </Button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {products.map((product) => (
          <div style={{ marginBottom: "10px" }} key={product.id}>
            <Card>
              <InlineGrid columns={["oneHalf", "oneHalf"]} alignItems="center">
                <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                  <Thumbnail source={product.image || ""} alt={product.title} />
                  <Text as="span" variant="headingMd">
                    {product.title}
                  </Text>
                </div>
                <InlineStack align="end">
                  <Button variant="plain" onClick={() => handleProductRemove(product.id)}>
                    X
                  </Button>
                </InlineStack>
              </InlineGrid>
            </Card>

            {/* Hidden inputs for sending product data */}
            <input type="hidden" name="products" value={JSON.stringify(products)} />
          </div>
        ))}

        {warning && (
          <Banner tone="warning" title="Some products are already in another offer">
            <p>Only one offer can be configured per product. The following products are already used:</p>
            <ul>
              {existingProductTitles.map((title, index) => (
                <li key={index}>{title}</li>
              ))}
            </ul>
          </Banner>
        )}
      </div>
    </div>
  );
};
