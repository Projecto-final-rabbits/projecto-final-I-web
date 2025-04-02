import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "@config/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z.string({ message: "This field is required" }).email(),
  password: z
    .string({ message: "This field is required" })
    .min(4, { message: "Password must be at least 4 characters" }),
});

const LoginForm: React.FC = () => {
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
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredentials.user?.getIdToken();
    if (token) {
      localStorage.setItem("token", token);
      navigate("/home");
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
          disabled={!form.formState.isValid}
        >
          Continuar
        </Button>
      </Stack>
    </form>
  );
};

export { LoginForm };
