
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../server";
import { useAuthStore } from "../store/auth";
const initUser = {
  created_at: '',
  name: '',
  email: '',
  id: '',
  image_url: '',
}

export default function useUser() {
 const auth = useAuthStore( (state) => state.auth);
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (auth) {
        const { data: user } = await supabase
          .from("profile")
          .select("*")
          .eq("id", auth.id)
          .single();
        return user;
      }
      return initUser;
    },
    
  });
}
