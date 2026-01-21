import { useForm } from "@tanstack/react-form";
// import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const registerSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
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
      password: "",
      confirmPassword: "",
    },
    validators: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange: registerSchema as any,
    },
    onSubmit: async ({ value }) => {
      // Handle register
      console.log(value);
      alert("Register clicked (mock)");
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
                {field.state.meta.errors.join(", ")}
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
                {field.state.meta.errors.join(", ")}
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
