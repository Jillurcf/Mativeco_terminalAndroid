import { useStripeTerminal } from "@stripe/stripe-terminal-react-native";
import { Alert } from "react-native";

export const useStripeTerminalService = () => {
  const terminal = useStripeTerminal();

  const fetchLocations = async () => {
    try {
      const result = await terminal.getLocations({
        limit: 100,
      });

      console.log("Stripe Locations:", result.locations);
      // Alert.alert("Fetched Locations from main", JSON.stringify(result.locations, null, 2));
      return result.locations;

    } catch (error) {
      console.log("Failed to fetch locations", error);
      return [];
    }
  };

  return {
    terminal,
    fetchLocations,
  };
};
