import type { LoaderFunctionArgs } from "@remix-run/node";
import { getAdminContext} from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await getAdminContext(request);

  return null;
};
