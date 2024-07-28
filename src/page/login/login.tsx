import { zodResolver } from "@hookform/resolvers/zod";
import { Google, LoginOutlined } from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { z } from "zod";
import { supabase } from "../../server";
import { useAuthStore } from "../../store/auth";
import { loginWtihGoogle } from "./service/login-service";

const loginFormSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginForm = z.infer<typeof loginFormSchema>;

export const Login = () => {
  const { control, handleSubmit } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });
  const auth = useAuthStore((state) => state.auth);
  const navigate = useNavigate(); // Usa useNavigate para la navegación
  const setAuth = useAuthStore((state) => state.setAuth);
  const onLogin: SubmitHandler<LoginForm> = async (data) => {
    const { email, password } = data;
    const { data: user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toast.error("no se pudo iniciar sesión");
    } else {
      if (!auth.role) {
        toast.error("no se encontro el rol del usuario");
        return;
      }
      console.log(user);
      if (auth.role === "admin") {
        navigate("/admin");
      } else if (auth.role === "user") {
        navigate("/user");
      }
    }
  };
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        console.log("User is signed in");
        if (session) {
          supabase
            .from("user")
            .select("role")
            .eq("id", session.user.id)
            .single()
            .then((user) => {
              if (!user || !user.data?.role) {
                return;
              }
              setAuth({ id: session.user.id, role: user.data.role });
            });
        }
      } else if (event === "SIGNED_OUT") {
        setAuth({ id: "", role: "" });
      } else if (event === "INITIAL_SESSION") {
        if (session) {
          if (!auth) {
            supabase
              .from("user")
              .select("role")
              .eq("id", session.user.id)
              .single()
              .then((user) => {
                if (!user || !user.data?.role) {
                  return;
                }
                setAuth({ id: session.user.id, role: user.data.role });
              });
          }
        }
      }
    });
  }, [auth]);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Typography variant="h2">Iniciar session </Typography>
      <form
        className="w-full max-w-sm gap-2 flex flex-col"
        onSubmit={handleSubmit(onLogin)}
      >
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField type="text" label="email" {...field} />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField type="password" label="password" {...field} />
          )}
        />
        <Button variant="contained" type="submit" startIcon={<LoginOutlined />}>
          iniciar session
        </Button>
      </form>
      <Button
        variant="contained"
        color={"success"}
        onClick={async () => {
          if (await loginWtihGoogle("google")) {
            console.log(auth);
            if (auth.id) {
              if (!auth.role) {
                toast.error("no se encontro el rol del usuario");
                return;
              }
            }
          }
        }}
        startIcon={<Google />}
      >
        Iniciar session con Google
      </Button>
      <Button
        variant="outlined"
        color={"success"}
        onClick={async () => {
          navigate("/register");
        }}
      >
        Registrar usuario
      </Button>
      <Toaster />
    </div>
  );
};
