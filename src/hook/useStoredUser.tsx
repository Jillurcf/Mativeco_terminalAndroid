import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export interface User {
  id: string;
  name: string;
  stripe_account_id: string;
  // add more fields if you have them
}


export default function useStoredUser() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("AUTH_TOKEN");
        const storedUser = await AsyncStorage.getItem("USER_INFO");

        if (storedToken && storedUser) {
          const parsedUser: User = JSON.parse(storedUser);
          setUser(parsedUser);
          setToken(storedToken);
        }
      } catch (error) {
        console.log("❌ Failed to load user from storage", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  return { user, token, loading };
}
