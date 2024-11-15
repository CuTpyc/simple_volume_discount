import {BlockStack, Button, Card, FormLayout, Layout, Page, PageActions,} from '@shopify/polaris';
import {ActionFunction, LoaderFunction, redirect} from "@remix-run/node";
import React from "react";
import {Form, useLoaderData} from "@remix-run/react";
import SetFunellName from "../Components/setFunellName";
import DiscountConfiguration from "../Components/SetFunnelVolumes";
import {getAdminContext} from "../shopify.server";
import {concatenateVolumeAndDiscount} from "../Utils/concatDiscountAndVolumes";
import {SetFunnelProducts} from "../Components/SetFunnelProducts";

type Product = {
  shopifyId: string;
}

export const loader: LoaderFunction = async ({request}) => {
  const adminContext = await getAdminContext(request);
  const shop = adminContext.session.shop;

  const { id: shopId } = await prisma.shop.findUniqueOrThrow({
    where: { shop: shop },
    select: { id: true },
  })

  const product = await prisma.products.findMany({
    where: {
      shopId: shopId,
    },
    select: {
      shopifyId: true,
    },
  });
  if(!product) {
    return null;
  }
  return product
}

export const action: ActionFunction = async ({request}) => {
  const adminContext = await getAdminContext(request);


  const { id: shopId } = await prisma.shop.findUniqueOrThrow({
    where: { shop: adminContext.session.shop },
    select: { id: true },
  });

  console.log("\n\n\n",shopId, "\n\n\n",'shopId',"\n\n\n")
  const formData = await request.formData();
  // console.log("\n\n\n",formData, "\n\n\n",'formData',"\n\n\n")

  const funnel = await prisma.funells.create({
    data: {
      title: formData.get('funnelName') as string || 'New funnel',
      shop: {
        connect: { id: shopId },
      },
    },
  })

  const productsJson = formData.get('products') as string;
  const products = JSON.parse(productsJson);
  const discountLevelsJSON = formData.get('discountLevelsJSON') as string;
  const discountLevels = JSON.parse(discountLevelsJSON);

  console.log("\n\n\n",products, "\n\n\n",'products',"\n\n\n")
  console.log("\n\n\n",discountLevels, "\n\n\n",'discountLevels',"\n\n\n")
  if (!products) {
    throw new Error('products is null or undefined');
  }
  if (!discountLevels) {
    throw new Error('discountLevels is null or undefined');
  }

  await prisma.products.createMany({
    data: products.map((product: any) => ({
      shopId: shopId,
      funellId: funnel.id,
      shopifyId: product.id,
      title: product.title,
      image: product.image,
    }))
  })


  await prisma.funellsVolume.createMany({
    data: discountLevels.map((level: { volume: string; discount: string }) => ({
      shopId: shopId,
      funellId: funnel.id,
      volume: parseInt(level.volume),
      discount: parseInt(level.discount),
    })),
  });

  // const chunkSize = 10;
  const { volumes, discounts } = concatenateVolumeAndDiscount(discountLevels);

  console.log("\n\n\n",volumes, "\n\n\n",'volumes',"\n\n\n")
  console.log("\n\n\n",discounts, "\n\n\n",'discounts',"\n\n\n")

  return redirect('/app/funells-table');
}



export default function NewFunnel() {
  const existingProductsId = useLoaderData<Product[]>();

  return (
    <Form method="post">

      {/*<input type="hidden" name="returnedStatus" value={'Hello world'}/>*/}
      <Page
        backAction={{content: 'Settings', url: '/app/funells-table'}}
        title="Create new funnel"
        fullWidth
      >
        <Layout>
          <Layout.Section>
            <BlockStack gap="500" align="end">
              <Card>
                <FormLayout>
                  <SetFunellName/>
                  <SetFunnelProducts existingProductsId={existingProductsId}/>
                  <DiscountConfiguration/>
                </FormLayout>

              </Card>

            </BlockStack>

          </Layout.Section>

        </Layout>
        <PageActions
          primaryAction={
            <Button size="medium" submit variant={"primary"} tone={"success"}>Create</Button>
          }
        />
      </Page>

    </Form>
  )
}
