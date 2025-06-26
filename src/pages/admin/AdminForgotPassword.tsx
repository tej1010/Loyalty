import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Shield } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const AdminForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const { forgotPassword } = useAdminAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await forgotPassword(email);
      if (success) {
        setSent(true);
      } else {
        setError('Failed to send reset email. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Check Your Email</h2>
            <p className="mt-2 text-sm text-gray-600">
              We've sent a password reset link to {email}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 text-center space-y-4">
            <p className="text-gray-600">
              Click the link in the email to reset your password. If you don't see it, check your spam folder.
            </p>
            
            <div className="space-y-3">
              <Button
                onClick={() => {
                  setSent(false);
                  setEmail('');
                }}
                variant="outline"
                className="w-full"
              >
                Send Another Email
              </Button>
              
              <Link to="/admin/login" className="block w-full">
                <Button variant="ghost" className="w-full">
                  Back to Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Forgot Password?</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email address and we'll send you a reset link
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={Mail}
              placeholder="Enter your email address"
              required
            />

            <Button
              type="submit"
              loading={loading}
              className="w-full bg-red-600 hover:bg-red-700"
              size="lg"
            >
              Send Reset Link
            </Button>

            <Link
              to="/admin/login"
              className="flex items-center justify-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign In
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};