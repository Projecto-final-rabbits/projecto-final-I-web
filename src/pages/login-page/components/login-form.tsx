import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth, firestoreDb } from "@config/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { setUser } from "@/state-managment/slices";
import { useDispatch } from "react-redux";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string({ message: "El campo es requerido" }).email(),
  password: z
    .string({ message: "El campo es requerido" })
    .min(4, { message: "Password must be at least 4 characters" }),
});

const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const handleSubmit = async ({
    email,
    password,
  }: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredentials.user?.getIdToken();

      if (token) {
        const docRef = await getDoc(
          doc(firestoreDb, `users/${userCredentials.user?.uid}`)
        );

        if (docRef.exists()) {
          const userData = docRef.data();

          const user = {
            id: userCredentials.user.uid,
            fullname: userData.fullname,
            email: userCredentials.user.email,
            role: userData.role,
          };

          // Dispatch user data to the store
          dispatch(setUser(user));
          navigate("/home");
        } else {
          console.log("No user document found");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit((data) => handleSubmit(data))}>
      <Stack spacing={2}>
        <TextField
          label="Email"
          variant="outlined"
          error={!!form.formState.errors.email}
          helperText={form.formState.errors.email?.message}
          fullWidth
          size="small"
          {...form.register("email")}
        />
        <TextField
          label="Password"
          variant="outlined"
          error={!!form.formState.errors.password}
          helperText={form.formState.errors.password?.message}
          fullWidth
          size="small"
          {...form.register("password")}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
          loading={isLoading}
          disabled={!form.formState.isValid}
        >
          Continuar
        </Button>
      </Stack>
    </form>
  );
};

export { LoginForm };
