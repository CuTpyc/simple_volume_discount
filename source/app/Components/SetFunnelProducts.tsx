import { InlineGrid, InlineStack, Card, Button, Text, Banner, Thumbnail } from "@shopify/polaris";
import { useState } from "react";

// Define a type for the product structure
type Product = {
  id: string;
  title: string;
  image: string;
};

export default function SetFunnelProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [warning, setWarning] = useState(false);

  async function selectProducts() {
    try {
      const result = await window.shopify.resourcePicker({
        type: 'product',
        action: 'select',
        multiple: true,
      });

      if (result && result.selection) {
        const selectedProducts = result.selection.map((product: any) => ({
          id: product.id,
          title: product.title,
          image: product.images[0]?.originalSrc || '',
        }));

        // Check for existing offers (placeholder condition)
        const hasExistingOffer = selectedProducts.some(product => /* condition to check existing offers */ false);
        setWarning(hasExistingOffer);

        // Combine existing products with newly selected ones, avoiding duplicates
        setProducts(prevProducts => [
          ...prevProducts,
          ...selectedProducts.filter(newProduct =>
            !prevProducts.some(existingProduct => existingProduct.id === newProduct.id)
          )
        ]);
      }
    } catch (error) {
      console.error("Error selecting products:", error);
    }
  }

  const handleProductRemove = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };


  return (
    <div style={{ maxWidth: "100%", display: 'block', gap: "20px" }}>
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
                <InlineGrid columns={['oneHalf', 'oneHalf']} alignItems="center">
                  <div style={{ display: 'flex', gap: "20px", alignItems: 'center' }}>
                    <Thumbnail source={product.image || ''} alt={product.title} />
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

              {/* Скрытые инпуты для отправки данных продукта */}
              <input type="hidden" name="products[]" value={String(product.id)} />
              <input type="hidden" name="titles[]" value={String(product.title)} />
              <input type="hidden" name="images[]" value={String(product.image)} />
            </div>
          ))}

          {warning && (
            <Banner tone="warning" title="These products are already used in another offer">
              <p>Only one offer can be configured per product</p>
            </Banner>
          )}


      </div>
    </div>
  );
}
