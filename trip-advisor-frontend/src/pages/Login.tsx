import { Link } from "@tanstack/react-router";
import { LoginForm } from "@/components/features/auth/LoginForm";

export function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <p className="mb-4 text-center text-gray-600">Login to your account</p>
        <LoginForm />
        <div className="mt-4 text-center">
          <Link to="/register" className="text-blue-500 hover:underline">
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
}
