import {BlockStack, Card, FormLayout, Layout, Page,} from '@shopify/polaris';
import {LoaderFunction} from "@remix-run/node";
import React from "react";
import {Form, useLoaderData} from "@remix-run/react";
import ViewFunellName from "../Components/ViewFunnel/ViewFunellName";
import ViewDiscountConfiguration from "../Components/ViewFunnel/ViewFunnelVolumes";
import {getAdminContext} from "../shopify.server";
import {ViewFunnelProducts} from "../Components/ViewFunnel/ViewFunnelProducts";



export const loader: LoaderFunction = async ({request, params}) => {
  const adminContext = await getAdminContext(request);
  const shop = adminContext.session.shop;

  const { id: shopId } = await prisma.shop.findUniqueOrThrow({
    where: { shop: shop },
    select: { id: true },
  })

  const funnelId = params.id;
  console.log("\n\n\n",funnelId, "\n\n\n",'funnelId',"\n\n\n")
  const funnel = await prisma.funells.findUnique({
    where: {
      id: Number(funnelId),
    },
    select: {
      title: true,
      products: true,
      FunellsVolume: true,
    }
  })
  return funnel
}

export default function ViewFunnel() {
  const data = useLoaderData<typeof loader>();

  return (
      <Page
        backAction={{content: 'Settings', url: '/app/funells-table'}}
        title={`${data.title}`}
        fullWidth
      >
        <Layout>
          <Layout.Section>
            <BlockStack gap="500" align="end">
              <Card>
                <FormLayout>
                  <ViewFunellName funnelName={data.title}/>
                  <ViewFunnelProducts products={data.products}/>
                  <ViewDiscountConfiguration volumes={data.FunellsVolume}/>
                </FormLayout>

              </Card>

            </BlockStack>

          </Layout.Section>

        </Layout>
      </Page>

  )
}
