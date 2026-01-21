import React from 'react'
import { Link } from '@tanstack/react-router'
import { RegisterForm } from '@/components/features/auth/RegisterForm'

export function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        <p className="mb-4 text-center text-gray-600">Create a new account</p>
        <RegisterForm />
        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-500 hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  )
}