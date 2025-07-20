import {
  BlockStack,
  reactExtension,
  TextBlock,
  Banner,
  useApi,
  useAuthenticatedAccountPurchasingCompany,
  useAuthenticatedAccountCustomer,
  useSessionToken,
} from "@shopify/ui-extensions-react/customer-account";
import { useEffect, useState } from "react";


export default reactExtension(
  "customer-account.page.render",
  () => <PromotionBanner />
);

function PromotionBanner() {
  const { i18n , query } = useApi();
  const purchasingCompany =
    useAuthenticatedAccountPurchasingCompany();
    const customer = useAuthenticatedAccountCustomer();



    const companyLocationId =
    purchasingCompany?.location?.id;

    const customerId = customer?.id;






  return (
    <Banner>
      <BlockStack inlineAlignment="center" >
        <TextBlock>
          {i18n.translate("earnPoints")}
        </TextBlock>
      </BlockStack>
    </Banner>
  );
}