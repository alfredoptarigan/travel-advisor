import { useForm } from "@tanstack/react-form";
// import { zodValidator } from '@tanstack/zod-form-adapter'
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function LoginForm() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange: loginSchema as any,
    },
    onSubmit: async ({ value }) => {
      // Handle login
      console.log(value);
      alert("Login clicked (mock)");
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
                {field.state.meta.errors.join(", ")}
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
                {field.state.meta.errors.join(", ")}
              </em>
            ) : null}
          </div>
        )}
      />
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
}
