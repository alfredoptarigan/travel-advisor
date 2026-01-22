import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { formatErrors } from "@/lib/utils";

const registerSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    phoneNumber: z.string().min(6),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export function RegisterForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange: registerSchema as any,
    },
    onSubmit: async ({ value }) => {
      try {
        const { name, email, password, phoneNumber } = value;
        const { error } = await authClient.signUp.email({
          name,
          email,
          password,
          phoneNumber,
        } as any);
        if (error) {
          alert(`Registrasi gagal: ${error.message}`);
          return;
        }
        alert("Registrasi berhasil");
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Terjadi kesalahan";
        alert(`Registrasi gagal: ${message}`);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <form.Field
        name="name"
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Full Name</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.handleChange(e.target.value)
              }
              placeholder="John Doe"
            />
            {field.state.meta.errors ? (
              <em role="alert" className="text-destructive text-xs">
                {formatErrors(field.state.meta.errors)}
              </em>
            ) : null}
          </div>
        )}
      />
      <form.Field
        name="email"
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Email</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.handleChange(e.target.value)
              }
              placeholder="name@example.com"
            />
            {field.state.meta.errors ? (
              <em role="alert" className="text-destructive text-xs">
                {formatErrors(field.state.meta.errors)}
              </em>
            ) : null}
          </div>
        )}
      />
      <form.Field
        name="phoneNumber"
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Phone Number</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.handleChange(e.target.value)
              }
              placeholder="08xxxxxxxxxx"
            />
            {field.state.meta.errors ? (
              <em role="alert" className="text-destructive text-xs">
                {formatErrors(field.state.meta.errors)}
              </em>
            ) : null}
          </div>
        )}
      />
      <form.Field
        name="password"
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Password</Label>
            <Input
              id={field.name}
              name={field.name}
              type="password"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.handleChange(e.target.value)
              }
            />
            {field.state.meta.errors ? (
              <em role="alert" className="text-destructive text-xs">
                {formatErrors(field.state.meta.errors)}
              </em>
            ) : null}
          </div>
        )}
      />
      <form.Field
        name="confirmPassword"
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Confirm Password</Label>
            <Input
              id={field.name}
              name={field.name}
              type="password"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.handleChange(e.target.value)
              }
            />
            {field.state.meta.errors ? (
              <em role="alert" className="text-destructive text-xs">
                {formatErrors(field.state.meta.errors)}
              </em>
            ) : null}
          </div>
        )}
      />
      <Button type="submit" className="w-full">
        Register
      </Button>
    </form>
  );
}
