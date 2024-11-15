import React, { useState } from "react";
import {
  Page,
  Button,
  Card,
  DataTable,
  LegacyStack,
  Link,
  Text,
  Icon,
  Layout,
  BlockStack,
} from "@shopify/polaris";
import { DeleteIcon, ChartHistogramGrowthIcon } from "@shopify/polaris-icons";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react"; // Import to use loader data in component
import { getAdminContext } from "../shopify.server";

export const loader: LoaderFunction = async ({ request }) => {
  const adminContext = await getAdminContext(request);
  const { shop } = adminContext.session;

  const currentShop = await prisma.shop.findUnique({
    where: {
      shop,
    },
  });

  if (!currentShop) {
    throw new Error("Shop not found");
  }

  const funells = await prisma.funells.findMany({
    where: {shopId: currentShop.id},
  }); // Fetch all funells from DB
  console.log("\n\n\n", funells, "\n\n\n", 'funells')
  return funells;
};

export const action: ActionFunction = async ({ request }) => {
  const adminContext = await getAdminContext(request);
  const { shop } = adminContext.session;

  const currentShop = await prisma.shop.findUnique({
    where: {
      shop,
    },
  });

  if (!currentShop) {
    throw new Error("Shop not found");
  }

  return null;
};

export default function OffersList() {
  const funnels = useLoaderData(); // Загрузка данных
  const [items, setItems] = useState(funnels); // Состояние

  const rows = items.map((funnel: any) => [
    <LegacyStack key={funnel.id}>
      <Icon source={ChartHistogramGrowthIcon} />
      <Link removeUnderline url={`/app/funell/${funnel.id}`}>
        {funnel.title}
      </Link>
    </LegacyStack>,
    <Text as="span">{new Date(funnel.createdAt).toLocaleDateString()}</Text>,
    <Button
      variant="primary"
      tone="critical"
      icon={DeleteIcon}
      onClick={() => handleDelete(funnel.id)}
    />,
  ]);

  const handleDelete = (id: number) => {
    const newItems = items.filter((item: any) => item.id !== id);
    setItems(newItems);
  };

  const primaryAction = (
    <Button size="medium" url="/app/funell/new" variant="primary" tone="success">
      Create new funell
    </Button>
  );

  return (

    <Page title="Offers list" primaryAction={primaryAction} fullWidth>
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            <Card>
              <DataTable
                columnContentTypes={["text", "text", "text"]}
                headings={["Funells name", "Creation date", "Action"]}
                rows={rows}
                pagination={{
                  hasNext: true,
                  label: `Page 1 of 1`,
                  onNext: () => {}, // Логика для следующей страницы
                }}
              />
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

