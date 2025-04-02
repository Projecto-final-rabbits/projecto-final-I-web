import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
  return (
    <form onSubmit={form.handleSubmit(() => console.log("submit"))}>
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
