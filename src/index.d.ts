declare namespace NodeJS {
  interface ProcessEnv {
    readonly VITE_PUBLIC_SUPABASE_URL:  string;
    readonly VITE_PUBLIC_SUPABASE_KEY: string;
  }
}