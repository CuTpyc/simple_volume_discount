
import {
  Page,
  Button,
  Card,
  Layout,
  BlockStack, PageActions, FormLayout,
} from '@shopify/polaris';
import {ActionFunction, LoaderFunction} from "@remix-run/node";
import HelpTextExample from "../Components/setFunellName";
import React from "react";
import {Form} from "@remix-run/react";

export const loader: LoaderFunction = async ({request}) => {
  return null;
}

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData();
  console.log(formData, 'formData')
  return null
}



export default function newFunnel() {


  return (
    <Form method="post">
      <input type="hidden" name="returnedStatus" value={String('Hello world')}/>
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
                  <HelpTextExample/>
                </FormLayout>

              </Card>

            </BlockStack>

          </Layout.Section>

        </Layout>
        <PageActions
          primaryAction={
            <Button size="medium" url="#" submit variant={"primary"} tone={"success"}>Create</Button>
          }
        />
      </Page>
    </Form>
  )
}
