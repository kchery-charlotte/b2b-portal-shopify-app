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
  const { i18n } = useApi();
  const purchasingCompany =
    useAuthenticatedAccountPurchasingCompany();

  const customer = useAuthenticatedAccountCustomer();
  
  const [customerId, setCustomerId] = useState(null);
  const [firstName, setFirstName] = useState(null);

  const token = useSessionToken();



    const companyLocationId =
    purchasingCompany?.location?.id;

    useEffect(() => {
      const fetchOrders = async () => {
        if (!purchasingCompany?.location?.id) return;
        console.log("This is the purchasingCompany" , purchasingCompany);
        console.log("This is the customer" , customer);
        console.log("This is the companyLocationId" , companyLocationId);
      
      };
  
      fetchOrders();
    }, [purchasingCompany]);

    useEffect(() => {
      const fetchCustomerIdFromToken = async () => {
        const token = await token.get(); // this gives you a JWT string
        const payloadBase64 = token.split('.')[1]; // JWT = header.payload.signature
        const payload = JSON.parse(atob(payloadBase64)); // decode base64 -> JSON
        const customerId = payload.sub; // this is the customer GID

        console.log("This is the customerId" , customerId);
        console.log("This is the token" , token);
        console.log("This is the payload" , payload);
        console.log("This is the payloadBase64" , payloadBase64);
      };

      fetchCustomerIdFromToken();
    }, [token]);





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