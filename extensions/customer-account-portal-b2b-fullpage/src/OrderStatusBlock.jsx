import {
  reactExtension,
  Banner,
  useApi,
  TextBlock,
  useAuthenticatedAccountCustomer,
} from "@shopify/ui-extensions-react/customer-account";
import { useEffect, useState } from "react";

export default reactExtension(
  "customer-account.page.render",
  () => <PromotionBanner />
);

function PromotionBanner() {
  const { sessionToken } = useApi();
  const [lastName, setLastName] = useState(null);
  const [customerId, setCustomerId] = useState(null);

  const customer = useAuthenticatedAccountCustomer();

  console.log("This is the customer" , customer);

  useEffect(() => {
    async function getCustomerData() {
      try {
        const token = await sessionToken.get();
        console.log('Session token:', token);
        
        // Decode the JWT token to get customer ID
        const payloadBase64 = token.split('.')[1];
        const payload = JSON.parse(atob(payloadBase64));
        console.log('Token payload:', payload);

        const client = new shopify.clients.Storefront({
          domain: payload.dest,
          token,
        });
        

        const data = await client.query({
          data: `query {
            customer(customerAccessToken: "${token}") {
              id
              firstName
              lastName
              acceptsMarketing
              email
              phone
            }
          }`,
        });

        console.log("This is the data MAJOR" , data);


        // Extract customer ID from the 'sub' field
        const customerGid = payload.sub; // This will be "gid://shopify/Customer/123456"
        const customerId = customerGid.split('/').pop(); // Extract just the ID number
        setCustomerId(customerId);
        
        console.log('Customer ID:', customerId);
        
        // Now make a fetch request to your app's backend or Shopify API
        // You'll need to implement this based on your app's architecture
        setLastName('Customer ID: ' + customerId);
        
      } catch (error) {
        console.error('Error:', error);
      }
    }
    getCustomerData();
  }, [sessionToken]);

  return (
    <Banner>
      <TextBlock>
        {lastName || 'Loading...'}
      </TextBlock>
    </Banner>
  );
}