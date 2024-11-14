
import {
  Page,
  Button,
  Card,
  Layout,
  BlockStack, PageActions, FormLayout,
} from '@shopify/polaris';
import {ActionFunction, LoaderFunction} from "@remix-run/node";
import React from "react";
import {Form} from "@remix-run/react";
import SetFunellName from "../Components/setFunellName";
import SetFunnelProducts from "../Components/SetFunnelProducts";

export const loader: LoaderFunction = async ({request}) => {
  return null;
}

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData();
  console.log("\n\n\n",formData, "\n\n\n",'formData',"\n\n\n")
  return null
}



export default function NewFunnel() {


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
                  <SetFunnelProducts/>
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
