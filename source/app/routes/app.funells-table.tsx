import React, { useState } from 'react';
import {
  Page,
  Button,
  Card,
  DataTable,
  LegacyStack,
  Link,
  Text,
  Icon, Layout, BlockStack
} from '@shopify/polaris';
import { DeleteIcon, ChartHistogramGrowthIcon } from '@shopify/polaris-icons';
import {ActionFunction} from "@remix-run/node";
import {getAdminContext} from "../shopify.server";


export const action: ActionFunction = async ({ request }) => {
  const adminContext = await getAdminContext(request);
  const {shop} = adminContext.session;

  const currentShop = await prisma.shop.findUnique({
    where: {
      shop
    }
  })
  console.log('\n\n\n', "currentShop-----action", "\n\n\n", currentShop)
  if (!currentShop) {
    throw new Error('Shop not found');
  }

  const funnel = await prisma.funells.create({
    data: {
      shopId: currentShop.id,
      title: 'New offer',
    }
  })
  console.log('\n\n\n', "funnel-----action", "\n\n\n", funnel)
  return null;
};

function OffersList() {
  const [items, setItems] = useState([
    {
      name: 'ATOP DISCOUNT SCHEDULE - TRANSCIEVERS',
      date: '30/08/2023',
      products: 5,
    },
    {
      name: 'My first offer',
      date: '19/08/2023',
      products: 10,
    },
  ]);

  const rows = items.map((item, index) => [
    <LegacyStack  key={index}>
      <Icon source={ChartHistogramGrowthIcon}  />
      <Link removeUnderline url={"/app"}>{item.name}</Link>
    </LegacyStack>,
    <Text  as="span">{item.date}</Text>,
    <Text as="span" >{item.products}</Text>,
    <Button variant={"primary"} tone={"critical"} icon={DeleteIcon} onClick={() => handleDelete(index)}/>

  ]);

  const handleDelete = (index: any) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const primaryAction = <Button size="medium" url="/app/funell/new"  variant={"primary"} tone={"success"}>Create new funell</Button>

  return (
    <Page
      title="Offers list"
      primaryAction={
        primaryAction
      }
      fullWidth

    >
      <Layout >
        <Layout.Section >
          <BlockStack gap="500" >
            <Card>
              <DataTable
                columnContentTypes={[
                  'text',
                  'numeric',
                  'numeric',
                  'text',
                ]}
                headings={[
                  'Funells name',
                  'Creation data',
                  'Products',
                  'Action',
                ]}

                rows={rows}
                pagination={{
                  hasNext: true,
                  label: `Page 1 of 1`,
                  onNext: () => {},
                }}
              />
            </Card>

          </BlockStack>

        </Layout.Section>

      </Layout>
    </Page>
  );
}

export default OffersList;
