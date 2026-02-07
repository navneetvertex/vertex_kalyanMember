import React from "react";
import { useSelector } from 'react-redux';
import { Printer, Download, Shield, CheckCircle, Lock, Award } from "lucide-react";
import { selectCurrentUser } from '../features/auth/authSlice';
import { useGetUserByIdQuery } from '../features/auth/authApi';

export default function IdCard() {
  const user = useSelector(selectCurrentUser);
  
  // Handle case where user is just an ID string
  const userId = typeof user === 'string' ? user : user?._id;
  
  const { data: userData, isLoading: loading, error } = useGetUserByIdQuery(userId, {
    skip: !userId,
    pollingInterval: 0, // Disable polling
    refetchOnMountOrArgChange: false, // Prevent refetch on mount
    refetchOnFocus: false, // Prevent refetch on window focus
    refetchOnReconnect: false // Prevent refetch on reconnect
  });

  // Extract user data from API response - data is nested as userData.data.user
  const actualUserData = userData?.data?.user;

  // Only log once when data changes
  React.useEffect(() => {
    if (userData) {
      console.log('Final user data:', actualUserData);
    }
  }, [userData]);
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your ID card...</p>
        </div>
      </div>
    );
  }

  if (error || !actualUserData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="text-red-600" size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Unable to Load ID Card</h2>
          <p className="text-slate-600 mb-4">{error?.message || 'Failed to fetch user data'}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const getExpiryDate = (createdDate) => {
    if (!createdDate) return "N/A";
    const expiry = new Date(createdDate);
    expiry.setFullYear(expiry.getFullYear() + 1);
    return expiry.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Top Bar */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
              <Shield className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Vertex Kalyan Cooperative Society</h1>
              <p className="text-sm text-slate-500">Digital Membership Card Portal</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
            >
              <Printer size={18} />
              <span className="font-medium">Print</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              <Download size={18} />
              <span className="font-medium">Download</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Status Banner */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="text-white" size={20} />
            </div>
            <div>
              <p className="font-semibold text-green-900">Membership Active</p>
              <p className="text-sm text-green-700">Your digital ID card is ready to use</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-green-700">Valid Until</p>
            <p className="font-bold text-green-900">{getExpiryDate(actualUserData?.created_date)}</p>
          </div>
        </div>

        {/* ID Cards Container */}
        <div className="print-area">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto px-2 sm:px-4">
            
            {/* Front Card */}
            <div className="w-full">
              <div className="flex items-center justify-between mb-3 sm:mb-4 no-print">
                <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
                  <div className="w-6 sm:w-8 h-6 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Award className="text-blue-600" size={14} />
                  </div>
                  <span className="text-sm sm:text-base">Card Front</span>
                </h2>
                <span className="text-xs text-slate-500 bg-slate-100 px-2 sm:px-3 py-1 rounded-full">Official ID</span>
              </div>
              
              <div className="relative group">
                {/* Card Shadow/Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity"></div>
                
                {/* Actual Card */}
                <div className="relative w-full aspect-[1.586/1] bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                  {/* Card Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50"></div>
                  <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-gradient-to-br from-blue-100/40 to-transparent rounded-full -mr-16 sm:-mr-32 -mt-16 sm:-mt-32"></div>
                  <div className="absolute bottom-0 left-0 w-24 sm:w-48 h-24 sm:h-48 bg-gradient-to-tr from-indigo-100/40 to-transparent rounded-full -ml-12 sm:-ml-24 -mb-12 sm:-mb-24"></div>
                  
                  {/* Card Content */}
                  <div className="relative z-10 p-3 sm:p-4 lg:p-6 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3 sm:mb-6">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md">
                          <Shield className="text-white" size={16} />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800 text-xs sm:text-sm leading-tight">VERTEX KALYAN</h3>
                          <p className="text-[10px] sm:text-xs text-slate-600">Cooperative Society Ltd.</p>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold shadow-md">
                        {actualUserData?.shg_status === 'Approved' ? 'SHG MEMBER' : 'MEMBER'}
                      </div>
                    </div>

                    {/* Member Info */}
                    <div className="flex items-start gap-2 sm:gap-4 mb-3 sm:mb-6">
                      <div className="w-12 sm:w-16 lg:w-20 h-14 sm:h-20 lg:h-24 bg-white rounded-lg sm:rounded-xl overflow-hidden border-2 border-slate-200 shadow-md flex-shrink-0">
                        <img
                          src={actualUserData?.profile_image }
                          alt="Member"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base lg:text-lg mb-1 sm:mb-2 leading-tight truncate">{actualUserData?.name}</h4>
                        <div className="space-y-0.5 sm:space-y-1.5">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <span className="text-[10px] sm:text-xs text-slate-500 w-12 sm:w-16 shrink-0">Member ID</span>
                            <span className="text-xs sm:text-sm font-mono font-semibold text-slate-800 truncate">{actualUserData?.user_id || 'N/A'}</span>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-2">
                            <span className="text-[10px] sm:text-xs text-slate-500 w-12 sm:w-16 shrink-0">Account</span>
                            <span className="text-xs sm:text-sm font-medium text-slate-700 truncate">{actualUserData?.account_number || 'N/A'}</span>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-2">
                            <span className="text-[10px] sm:text-xs text-slate-500 w-12 sm:w-16 shrink-0">Gender</span>
                            <span className="text-xs sm:text-sm font-medium text-slate-700 truncate">{actualUserData?.gender || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto flex items-end justify-between pt-2 sm:pt-4 border-t border-slate-200">
                      <div>
                        <p className="text-[8px] sm:text-xs text-slate-500 mb-0.5">Valid Through</p>
                        <p className="font-mono font-bold text-slate-800 text-xs sm:text-sm">{getExpiryDate(actualUserData?.created_date)}</p>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-1.5 text-slate-600">
                        <Lock className="text-green-600" size={12} />
                        <span className="text-[8px] sm:text-xs font-semibold text-green-600">VERIFIED</span>
                      </div>
                    </div>
                  </div>

                  {/* Hologram Effect */}
                  <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-8 sm:w-12 h-8 sm:h-12 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-xl"></div>
                </div>
              </div>
            </div>

            {/* Back Card */}
            <div className="w-full">
              <div className="flex items-center justify-between mb-3 sm:mb-4 no-print">
                <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
                  <div className="w-6 sm:w-8 h-6 sm:h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Lock className="text-indigo-600" size={14} />
                  </div>
                  <span className="text-sm sm:text-base">Card Back</span>
                </h2>
                <span className="text-xs text-slate-500 bg-slate-100 px-2 sm:px-3 py-1 rounded-full">Secure ID</span>
              </div>
              
              <div className="relative group">
                {/* Card Shadow/Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl sm:rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity"></div>
                
                {/* Actual Card */}
                <div className="relative w-full aspect-[1.586/1] bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                  {/* Card Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-indigo-50"></div>
                  
                  {/* Magnetic Stripe */}
                  <div className="absolute top-6 sm:top-8 left-0 right-0 h-6 sm:h-10 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 shadow-inner"></div>
                  
                  {/* Card Content */}
                  <div className="relative z-10 p-3 sm:p-4 lg:p-6 h-full flex flex-col">
                    {/* Header with ID */}
                    <div className="flex items-center justify-between mb-2 sm:mb-4 mt-6 sm:mt-10">
                      <div className="flex items-center gap-1 sm:gap-2 bg-blue-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg shadow-md">
                        <Shield size={10} />
                        <span className="font-bold text-[8px] sm:text-xs">OFFICIAL MEMBER CARD</span>
                      </div>
                      <span className="font-mono text-[8px] sm:text-xs font-semibold text-slate-600 bg-slate-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                        {actualUserData?.user_id}
                      </span>
                    </div>

                    {/* Terms */}
                    <div className="bg-slate-50 rounded-lg sm:rounded-xl p-2 sm:p-3 mb-1 sm:mb-2 border border-slate-200 flex-1">
                      <h4 className="font-bold text-[8px] sm:text-xs text-slate-700 mb-1 sm:mb-2">Important Notice</h4>
                      <ul className="text-[8px] sm:text-xs text-slate-600 leading-tight space-y-0.5 sm:space-y-1">
                        <li>• Property of Vertex Kalyan Cooperative Society Ltd.</li>
                        <li>• Non-transferable - must be presented during all transactions</li>
                        <li>• Report loss or theft immediately to the office</li>
                        <li>• Valid for official identification purposes only</li>
                      </ul>
                    </div>

                    {/* Footer */}
                    <div className="flex items-end justify-between pt-1 sm:pt-2">
                      <div className="text-[8px] sm:text-xs text-slate-600">
                        <p>Member ID: <span className="font-semibold text-slate-800">{actualUserData?.user_id}</span></p>
                        <p>Card ID: <span className="font-semibold text-slate-800">{actualUserData?._id?.slice(-8).toUpperCase()}</span></p>
                      </div>
                      <div className="bg-slate-800 rounded px-1 sm:px-1.5 py-0.5">
                        <div className="flex items-center gap-0.5">
                          {[...Array(6)].map((_, i) => (
                            <div key={i} className="w-0.5 h-2 sm:h-3 bg-white" style={{ opacity: Math.random() * 0.5 + 0.5 }}></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 sm:gap-6 no-print">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-slate-200">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
              <Shield className="text-blue-600" size={20} />
            </div>
            <h3 className="font-bold text-slate-800 mb-2 text-sm sm:text-base">Secure & Verified</h3>
            <p className="text-xs sm:text-sm text-slate-600">Your digital ID card is encrypted and verified by our secure banking-grade system.</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-slate-200">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
              <CheckCircle className="text-green-600" size={20} />
            </div>
            <h3 className="font-bold text-slate-800 mb-2 text-sm sm:text-base">Always Accessible</h3>
            <p className="text-xs sm:text-sm text-slate-600">Access your membership card anytime, anywhere through our digital platform.</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-slate-200">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
              <Award className="text-purple-600" size={20} />
            </div>
            <h3 className="font-bold text-slate-800 mb-2 text-sm sm:text-base">Premium Benefits</h3>
            <p className="text-xs sm:text-sm text-slate-600">Enjoy exclusive member benefits and priority services with your active membership.</p>
          </div>
        </div>
      </div>

      {/* PRINT STYLES */}
      <style>{`
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          body {
            margin: 0;
            padding: 0;
          }

          body * {
            visibility: hidden;
          }

          .print-area,
          .print-area * {
            visibility: visible;
          }

          .print-area {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            padding: 15mm;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .print-area .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20mm;
            width: 100%;
            max-width: 180mm;
          }

          .print-area .relative.group {
            width: auto;
            height: auto;
            margin: 0;
            page-break-inside: avoid;
            transform: scale(0.8);
          }

          .print-area .aspect-\[1\.586\/1\] {
            aspect-ratio: 1.586/1;
            width: 100mm;
            height: 63mm;
          }

          /* Force desktop styles for print */
          .print-area .rounded-xl {
            border-radius: 1rem !important;
          }

          .print-area .sm\:rounded-2xl {
            border-radius: 1rem !important;
          }

          .print-area .p-3 {
            padding: 1.5rem !important;
          }

          .print-area .sm\:p-4 {
            padding: 1.5rem !important;
          }

          .print-area .lg\:p-6 {
            padding: 1.5rem !important;
          }

          .print-area .text-\[8px\] {
            font-size: 0.75rem !important;
          }

          .print-area .sm\:text-xs {
            font-size: 0.75rem !important;
          }

          .print-area .text-xs {
            font-size: 0.75rem !important;
          }

          .print-area .text-sm {
            font-size: 0.875rem !important;
          }

          .print-area .text-base {
            font-size: 1rem !important;
          }

          .print-area .w-8 {
            width: 2rem !important;
          }

          .print-area .h-8 {
            height: 2rem !important;
          }

          .print-area .sm\:w-10 {
            width: 2.5rem !important;
          }

          .print-area .sm\:h-10 {
            height: 2.5rem !important;
          }

          .print-area .lg\:w-12 {
            width: 3rem !important;
          }

          .print-area .lg\:h-12 {
            height: 3rem !important;
          }

          .print-area .w-12 {
            width: 3rem !important;
          }

          .print-area .h-14 {
            height: 3.5rem !important;
          }

          .print-area .sm\:w-16 {
            width: 4rem !important;
          }

          .print-area .sm\:h-20 {
            height: 5rem !important;
          }

          .print-area .lg\:w-20 {
            width: 5rem !important;
          }

          .print-area .lg\:h-24 {
            height: 6rem !important;
          }

          .print-area .gap-2 {
            gap: 0.5rem !important;
          }

          .print-area .sm\:gap-3 {
            gap: 0.75rem !important;
          }

          .print-area .mb-3 {
            margin-bottom: 0.75rem !important;
          }

          .print-area .sm\:mb-6 {
            margin-bottom: 1.5rem !important;
          }

          .print-area .mt-6 {
            margin-top: 1.5rem !important;
          }

          .print-area .sm\:mt-10 {
            margin-top: 2.5rem !important;
          }

          @page {
            size: A4 landscape;
            margin: 10mm;
          }

          .no-print {
            display: none !important;
          }
        }

        @media screen and (max-width: 640px) {
          .grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .max-w-7xl {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }

        @media screen and (max-width: 480px) {
          .max-w-7xl {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
        }
      `}</style>

    </div>
  );
}