import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Building, Mail, Phone, MapPin, Upload, QrCode } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';

export const SignUp: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });

  const [businessInfo, setBusinessInfo] = useState({
    businessImage: '',
    businessName: '',
    address: '',
    contactInfo: '',
    legalDocs: [] as File[]
  });

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handlePersonalInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleBusinessInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userData = {
        ...personalInfo,
        ...businessInfo
      };
      
      const success = await signUp(userData);
      if (success) {
        setSuccess(true);
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setBusinessInfo(prev => ({ ...prev, legalDocs: files }));
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mb-4">
              <Building className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Registration Submitted</h2>
            <p className="mt-2 text-sm text-gray-600">
              Your account request has been sent for admin verification
            </p>
          </div>

          <Card className="p-8 text-center space-y-4">
            <p className="text-gray-600">
              Thank you for registering with LoyaltyPro! Your account request has been submitted to our admin team for verification.
            </p>
            <p className="text-gray-600">
              You will receive an email notification once your account is approved and activated.
            </p>
            
            <div className="pt-4">
              <Link to="/login" className="block w-full">
                <Button className="w-full">
                  Back to Sign In
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <QrCode className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create Merchant Account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join LoyaltyPro and start building customer loyalty
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-4">
          <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              1
            </div>
            <span className="ml-2 text-sm font-medium">Personal Info</span>
          </div>
          <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              2
            </div>
            <span className="ml-2 text-sm font-medium">Business Info</span>
          </div>
        </div>

        <Card className="p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handlePersonalInfoSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    value={personalInfo.firstName}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, firstName: e.target.value }))}
                    icon={User}
                    required
                  />
                  <Input
                    label="Last Name"
                    value={personalInfo.lastName}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, lastName: e.target.value }))}
                    icon={User}
                    required
                  />
                </div>
                <Input
                  label="Email Address"
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, email: e.target.value }))}
                  icon={Mail}
                  required
                />
                <Input
                  label="Phone Number"
                  value={personalInfo.phoneNumber}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  icon={Phone}
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Continue to Business Information
              </Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleBusinessInfoSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Business Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Image
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <label htmlFor="business-image" className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-gray-900">
                            Upload business logo or image
                          </span>
                          <input
                            id="business-image"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setBusinessInfo(prev => ({ ...prev, businessImage: file.name }));
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <Input
                    label="Business Name"
                    value={businessInfo.businessName}
                    onChange={(e) => setBusinessInfo(prev => ({ ...prev, businessName: e.target.value }))}
                    icon={Building}
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={businessInfo.address}
                      onChange={(e) => setBusinessInfo(prev => ({ ...prev, address: e.target.value }))}
                      rows={3}
                      className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Enter complete business address"
                      required
                    />
                  </div>

                  <Input
                    label="Contact Information"
                    value={businessInfo.contactInfo}
                    onChange={(e) => setBusinessInfo(prev => ({ ...prev, contactInfo: e.target.value }))}
                    icon={Phone}
                    placeholder="Business contact number"
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Legal Documents
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <label htmlFor="legal-docs" className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-gray-900">
                            Upload business license, registration, etc.
                          </span>
                          <input
                            id="legal-docs"
                            type="file"
                            className="sr-only"
                            multiple
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={handleFileUpload}
                          />
                        </label>
                      </div>
                      {businessInfo.legalDocs.length > 0 && (
                        <div className="mt-2 text-sm text-gray-600">
                          {businessInfo.legalDocs.length} file(s) selected
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  loading={loading}
                  className="flex-1"
                  size="lg"
                >
                  Submit Registration
                </Button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in here
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};