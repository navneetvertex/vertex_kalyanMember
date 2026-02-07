import React from 'react';
import { AlertTriangle, UserPlus, CreditCard, ArrowLeft, CheckCircle, Clock, Shield, Phone, Mail, MapPin, FileText, Lock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SahyogCard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banking Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                <ArrowLeft size={20} />
                Back
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <nav className="flex items-center gap-2 text-sm text-gray-600">
                <span>Home</span>
                <span>/</span>
                <span>Cards</span>
                <span>/</span>
                <span className="text-blue-600 font-medium">Sahyog Card</span>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone size={16} />
                <span>1800-XXX-XXXX</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sahyog Card Application</h1>
          <p className="text-gray-600">Complete your application to access exclusive cooperative banking services</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Application Status: Pending Activation</h3>
                    <p className="text-gray-600 mb-4">
                      Your Sahyog Card application requires completion of profile verification to activate your account and access banking services.
                    </p>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-orange-800 mb-1">Required Actions</p>
                          <ul className="text-sm text-orange-700 space-y-1">
                            <li>• Complete personal information</li>
                            <li>• Upload identity documents</li>
                            <li>• Verify contact details</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Process */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Application Process</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      1
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">Personal Information</h4>
                      <p className="text-sm text-gray-600 mb-2">Complete your profile with accurate personal details</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                        <span className="text-sm text-orange-600 font-medium">Pending</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-500 mb-1">Document Verification</h4>
                      <p className="text-sm text-gray-500 mb-2">Upload required identity and address proof documents</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        <span className="text-sm text-gray-500">Waiting</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-500 mb-1">Account Activation</h4>
                      <p className="text-sm text-gray-500 mb-2">Final verification and account activation</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        <span className="text-sm text-gray-500">Waiting</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Ready to Continue?</h3>
                    <p className="text-gray-600">Complete your profile to activate your Sahyog Card</p>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2">
                    <UserPlus className="w-5 h-5" />
                    Complete Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Card Preview */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Sahyog Card</h3>
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white relative overflow-hidden">
                    <div className="absolute top-4 right-4">
                      <CreditCard className="w-8 h-8 text-white/70" />
                    </div>
                    <div className="absolute bottom-6 left-6">
                      <div className="text-xs text-blue-200 mb-1">SAHYOG CARD</div>
                      <div className="text-lg font-bold tracking-wider">•••• •••• •••• 1234</div>
                      <div className="text-xs text-blue-200 mt-2">VERTEX KALYAN COOPERATIVE</div>
                    </div>
                    <div className="absolute top-6 left-6">
                      <div className="w-12 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded opacity-90"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Card Benefits</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Access to all cooperative services</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Priority customer support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Exclusive member benefits</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Financial advisory services</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-blue-50 rounded-lg border border-blue-200">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Call Us</div>
                      <div className="text-sm text-gray-600">1800-XXX-XXXX</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Email Support</div>
                      <div className="text-sm text-gray-600">support@vertexkalyan.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}