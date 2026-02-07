import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  UserPlus,
  Lock,
  Clock,
  ShieldCheck,
  X,
  FileText,
  Download,
  CheckCircle,
  AlertTriangle,
  CreditCard
} from "lucide-react";
import alreadyDoneImg from '../assets/images/already_done.png';
import advisorRequestImg from '../assets/images/advisor_request.png';
import termsDoc from '../assets/documents/terms-and-conditions.pdf';

export default function AdvisorRequest() {
  const navigate = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showSahyogAlert, setShowSahyogAlert] = useState(false);

  // MOCK STATES (replace with API data)
  const isAlreadyRequested = false;
  const isAdvisorAccount = false;
  const hasSahyogCard = false; // Mock state for Sahyog Card

  const handleRequestAdvisor = () => {
    if (!hasSahyogCard) {
      setShowSahyogAlert(true);
      return;
    }
    // Proceed with advisor request
    console.log('Advisor request submitted');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-2 sm:p-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-800">
            Advisor Request
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Request professional financial guidance
          </p>
        </div>
       
      </div>

      {/* ================= MAIN CARD ================= */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-3 sm:p-6 lg:p-8 border border-gray-100">
        {/* ================= REQUEST FORM ================= */}
        {!isAlreadyRequested && !isAdvisorAccount && (
          <div className="flex flex-col items-center text-center">
            <div className="relative w-full max-w-xs sm:w-80 h-48 sm:h-64 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mb-6 sm:mb-8 overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-500/20"></div>
              <div className="relative z-10 w-full h-full flex items-center justify-center p-4 sm:p-6">
                <img
                  src={advisorRequestImg}
                  className="max-w-full max-h-full object-contain drop-shadow-lg"
                  alt="Advisor Request"
                />
              </div>
              <div className="absolute top-4 right-4 w-6 sm:w-8 h-6 sm:h-8 bg-white/30 rounded-full"></div>
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 w-4 sm:w-6 h-4 sm:h-6 bg-white/20 rounded-full"></div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3 px-4">
              Request for Advisor
            </h2>
            <p className="text-gray-600 mb-6 sm:mb-8 max-w-md px-4 text-sm sm:text-base">
              Get personalized financial guidance from our certified advisors to help you make informed decisions.
            </p>

            {/* PROFESSIONAL TERMS SECTION */}
            <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4 sm:mb-6 pb-4 border-b border-gray-100">
                <div className="w-8 sm:w-10 h-8 sm:h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="text-blue-600" size={16} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Terms and Conditions</h3>
                  <p className="text-xs sm:text-sm text-gray-500">Please review before proceeding</p>
                </div>
              </div>

              {/* Acceptance Checkbox */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-6 mb-4 sm:mb-6">
                <label className="flex items-start gap-4 sm:gap-6 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer flex-shrink-0 mt-0.5"
                  />
                  <span className="font-medium text-gray-900 text-sm sm:text-base leading-relaxed ml-2 sm:ml-4">
                    I Accept the Terms and Conditions. By checking this box, I confirm that I have read, understood, and agree to be bound by the terms and conditions.
                  </span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col items-center gap-2 sm:gap-3 mb-4">
                <button
                  onClick={() => setShowTerms(true)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm min-w-[200px] max-w-xs w-auto"
                >
                  <FileText size={16} />
                  <span>View Terms & Conditions</span>
                </button>
                {/* <a
                  href={termsDoc}
                  download
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm min-w-[200px] max-w-xs w-auto"
                >
                  <Download size={16} />
                  <span>Download PDF</span>
                </a> */}
              </div>

              {/* Status Messages */}
              {termsAccepted ? (
                <div className="flex items-center gap-2 text-green-700 bg-green-50 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-green-200">
                  <CheckCircle size={16} className="flex-shrink-0" />
                  <span className="font-medium text-sm sm:text-base">Terms accepted successfully</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-amber-700 bg-amber-50 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-amber-200">
                  <AlertTriangle size={16} className="flex-shrink-0" />
                  <span className="font-medium text-sm sm:text-base">Please accept the terms and conditions to proceed</span>
                </div>
              )}
            </div>

            {/* ENHANCED BUTTON */}
            <button
              onClick={handleRequestAdvisor}
              disabled={!termsAccepted}
              className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-3 transition-all duration-300 transform
                ${
                  termsAccepted
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-105"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
            >
              <UserPlus size={18} />
              Request Advisor
            </button>
          </div>
        )}

        {/* ================= REQUESTED STATUS ================= */}
        {isAlreadyRequested && !isAdvisorAccount && (
          <div className="flex flex-col items-center text-center px-4">
            <div className="w-full max-w-xs sm:w-80 h-48 sm:h-64 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl flex items-center justify-center mb-6 sm:mb-8">
              <div className="text-4xl sm:text-6xl text-yellow-500">
                ⏳
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 sm:p-8 w-full max-w-xl shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-blue-700 mb-4">
                <Clock size={24} /> 
                Request Under Review
              </h3>
              <p className="text-gray-700 text-base sm:text-lg">
                Your advisor request has been submitted successfully. Our team will review your application and notify you once approved.
              </p>
            </div>

            <div className="mt-6 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold shadow-lg text-sm sm:text-base">
              ⏱ Status: Pending Approval
            </div>
          </div>
        )}

        {/* ================= ALREADY ADVISOR ================= */}
        {isAdvisorAccount && (
          <div className="flex flex-col items-center text-center px-4">
            <div className="relative w-full max-w-xs sm:w-80 h-48 sm:h-64 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl mb-6 sm:mb-8 overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-500/20"></div>
              <div className="relative z-10 w-full h-full flex items-center justify-center p-4 sm:p-6">
                <img
                  src={alreadyDoneImg}
                  className="max-w-full max-h-full object-contain drop-shadow-lg"
                  alt="Already Done"
                />
              </div>
              <div className="absolute top-4 right-4 w-6 sm:w-8 h-6 sm:h-8 bg-white/30 rounded-full"></div>
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 w-4 sm:w-6 h-4 sm:h-6 bg-white/20 rounded-full"></div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 sm:p-8 w-full max-w-xl shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-green-700 mb-4">
                <ShieldCheck size={24} /> 
                Advisor Account Active
              </h3>
              <p className="text-gray-700 text-base sm:text-lg">
                Congratulations! You already have an active advisor account with full access to all advisory features.
              </p>
            </div>

            <div className="mt-6 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-lg text-sm sm:text-base">
              ✓ Status: Active Advisor
            </div>
          </div>
        )}
      </div>

      {/* ================= SAHYOG CARD ALERT MODAL ================= */}
      {showSahyogAlert && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-t-2xl">
              <h4 className="flex items-center gap-3 font-bold text-lg">
                <AlertTriangle size={24} /> 
                Sahyog Card Required
              </h4>
              <button 
                onClick={() => setShowSahyogAlert(false)}
                className="hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard size={32} className="text-red-500" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                No Active Sahyog Card Found
              </h3>
              
              <p className="text-gray-600 mb-6">
                You do not have any active Sahyog Card! Please apply for a Sahyog Card to request an advisor.
              </p>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-amber-700">
                  <strong>Note:</strong> A valid Sahyog Card is required to access advisory services.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 px-6 py-4 bg-gray-50 rounded-b-2xl">
              <button
                onClick={() => setShowSahyogAlert(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-medium transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowSahyogAlert(false);
                  navigate('/sahyog-card');
                }}
                className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:shadow-lg transition-all"
              >
                Apply for Sahyog Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= TERMS MODAL ================= */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-2xl">
              <h4 className="flex items-center gap-3 font-bold text-lg">
                <FileText size={24} /> 
                Terms and Conditions
              </h4>
              <button 
                onClick={() => setShowTerms(false)}
                className="hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body - Formatted Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="prose max-w-none">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl mb-6 border-l-4 border-blue-500">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Vertex Kalyan Cooperative - Advisor Terms & Conditions</h2>
                  <p className="text-gray-600">Effective Date: January 1, 2024</p>
                </div>

                <div className="space-y-6">
                  <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">1</span>
                      Advisor Eligibility
                    </h3>
                    <ul className="space-y-2 text-gray-700 ml-10">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        Must be a registered member of Vertex Kalyan Cooperative
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        Minimum 2 years of financial services experience
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        Valid certification in financial advisory services
                      </li>
                    </ul>
                  </section>

                  <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">2</span>
                      Responsibilities
                    </h3>
                    <ul className="space-y-2 text-gray-700 ml-10">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        Provide accurate and timely financial guidance
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        Maintain client confidentiality at all times
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        Follow all cooperative policies and procedures
                      </li>
                    </ul>
                  </section>

                  <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">3</span>
                      Compensation
                    </h3>
                    <ul className="space-y-2 text-gray-700 ml-10">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">•</span>
                        Commission-based structure as per cooperative guidelines
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">•</span>
                        Monthly performance bonuses available
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">•</span>
                        Annual recognition and rewards program
                      </li>
                    </ul>
                  </section>

                  <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-sm">4</span>
                      Code of Conduct
                    </h3>
                    <ul className="space-y-2 text-gray-700 ml-10">
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        Maintain professional behavior with all clients
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        No conflicts of interest or personal financial gain
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        Regular training and skill development required
                      </li>
                    </ul>
                  </section>

                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl border-l-4 border-amber-500">
                    <p className="text-sm text-gray-700">
                      <strong>Note:</strong> By accepting these terms, you agree to uphold the highest standards of professional conduct and represent Vertex Kalyan Cooperative with integrity and excellence.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center px-6 py-4 bg-gray-50 rounded-b-2xl border-t">
              {/* <a
                href={termsDoc}
                download
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Download size={16} />
                Download PDF
              </a> */}
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowTerms(false)}
                  className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setTermsAccepted(true);
                    setShowTerms(false);
                  }}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:shadow-lg transition-all"
                >
                  I Accept Terms
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
