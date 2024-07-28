import { supabase } from "../../../server";

export const login = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    return false;
  }

  return true;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    return false;
  }

  return true;
};

export const loginWtihGoogle = async (
  provider: "google" | "facebook" | "github" | "twitter"
) => {
  const { error } = await supabase.auth.signInWithOAuth({ provider });

  if (error) {
    return false;
  }

  return true;
};
