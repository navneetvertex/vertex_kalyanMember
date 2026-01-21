import React from "react";
import { Printer, Download, User, MapPin, Phone, Mail, Calendar, CreditCard, Shield } from "lucide-react";
import mainLogo from '../assets/images/mainlogo.png';

export default function ProfileDocument() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-8 px-4">
      {/* PAGE */}
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img
              src={mainLogo}
              alt="Vertex Logo"
              className="h-16 w-16 object-contain bg-white rounded-xl p-2 shadow-lg"
            />
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-wide">VERTEX KALYAN</h1>
              <h2 className="text-sm font-medium opacity-90">Cooperative Urban Thrift & Credit Society Ltd.</h2>
            </div>
          </div>
          <div className="text-center text-sm opacity-90 leading-relaxed">
            <p className="mb-1">Registered under Government of India</p>
            <p className="mb-1">Regd. Office: Plot No-53, 3rd Floor, Main Road, Opp. Mother Dairy, Pandav Nagar, East Delhi - 110092</p>
            <p className="text-blue-200 font-medium">www.vertexsociety.com</p>
          </div>
        </div>

        <div className="p-8">
          {/* MEMBERSHIP INFO */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-200">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 text-blue-700 font-semibold">
                <User size={16} />
                <span>User ID: 01001945</span>
              </div>
              <div className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold text-sm shadow-lg">
                Membership Application
              </div>
              <div className="flex items-center gap-2 text-blue-700 font-semibold">
                <CreditCard size={16} />
                <span>Account No: 960275514342</span>
              </div>
            </div>
          </div>

          {/* APPLICATION LETTER SECTION */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                <div className="space-y-4 text-sm leading-relaxed">
                  <div className="mb-6">
                    <p className="font-semibold text-gray-800">To,</p>
                    <p className="mt-2 text-gray-700">
                      The Secretary/President,<br />
                      <span className="font-medium">VERTEX KALYAN COOPERATIVE URBAN THRIFT & CREDIT SOCIETY LTD.</span>
                    </p>
                  </div>

                  <p className="font-medium text-gray-800 mb-4">Dear Sir/Madam,</p>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <p className="text-gray-800 text-justify leading-relaxed">
                      I willingly apply for admission as a member of your society. I understand all the Rules & regulation of the Society and I follow all Rules & regulation of society. Do hereby declare that all documents and information given by me below is True to the best of my knowledge and belief. I understand that any false information or violation of the cooperative rules may result in cancellation of my membership.
                    </p>
                  </div>

                  <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg mt-4">
                    <p className="text-gray-800 text-justify leading-relaxed text-sm" style={{fontFamily: 'serif'}}>
                      मैं आपकी सोसायटी के सदस्य के रूप में प्रवेश के लिए स्वेच्छा से आवेदन करता हूँ। मैं सोसायटी के सभी नियमों और विनियमों को समझता हूँ और सोसायटी के सभी नियमों और विनियमों का पालन करता हूँ। मैं एतद्द्वारा घोषणा करता हूँ कि मेरे द्वारा नीचे दिए गए सभी दस्तावेज़ और जानकारी मेरे सर्वोत्तम ज्ञान और विश्वास के अनुसार सत्य हैं। मैं समझता हूँ कि किसी भी गलत जानकारी या सहकारी नियमों के उल्लंघन के परिणामस्वरूप मेरी सदस्यता रद्द हो सकती है।
                    </p>
                  </div>
                </div>
              </div>

              {/* PHOTO SECTION */}
              <div className="bg-white border-2 border-gray-300 rounded-xl p-4 shadow-sm">
                <h4 className="text-center font-semibold text-gray-700 mb-4">SELF PHOTO</h4>
                <div className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center bg-gray-50">
                  <div className="text-center text-gray-500">
                    <User size={48} className="mx-auto mb-2 opacity-50" />
                    <p className="text-xs font-medium">Passport Size Photo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PERSONAL INFORMATION WITH PHOTO */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <User size={24} />
                Member Profile Information
              </h3>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* PHOTO SECTION */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 rounded-2xl p-6 text-center shadow-inner">
                    <h4 className="font-bold text-blue-800 mb-4 text-sm uppercase tracking-wide">SELF PHOTO</h4>
                    <div className="bg-white border-2 border-dashed border-blue-300 rounded-xl h-48 w-full flex items-center justify-center shadow-sm">
                      <div className="text-center text-blue-400">
                        <User size={64} className="mx-auto mb-3 opacity-60" />
                        <p className="text-xs font-medium text-blue-600">Passport Size</p>
                        <p className="text-xs text-blue-500">Photo Required</p>
                      </div>
                    </div>
                    <div className="mt-4 text-xs text-blue-700 bg-blue-50 p-2 rounded-lg">
                      <p className="font-medium">Photo Guidelines:</p>
                      <p>• Recent passport size</p>
                      <p>• Clear background</p>
                      <p>• Professional attire</p>
                    </div>
                  </div>
                </div>

                {/* PERSONAL DETAILS */}
                <div className="lg:col-span-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DetailCard icon={<User size={16} />} label="Full Name" value="Navneet Yadav" />
                    <DetailCard icon={<User size={16} />} label="Guardian Name" value="Mayank (Brother)" />
                    <DetailCard icon={<Calendar size={16} />} label="Date of Birth" value="16-07-1997 (Age: 28)" />
                    <DetailCard icon={<User size={16} />} label="Gender" value="Male" />
                    <DetailCard icon={<User size={16} />} label="Marital Status" value="Single" />
                    <DetailCard icon={<CreditCard size={16} />} label="Occupation" value="Software Developer" />
                    <DetailCard icon={<Shield size={16} />} label="Aadhar Number" value="123456789567" />
                    <DetailCard icon={<Phone size={16} />} label="Mobile Number" value="6396465590" />
                    <DetailCard icon={<Mail size={16} />} label="Email ID" value="yamini12@gmail.com" />
                    <DetailCard icon={<MapPin size={16} />} label="Location" value="Delhi, East Delhi, Mayur Vihar" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MEMBERSHIP TERMS & CONDITIONS */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Shield className="text-blue-600" size={20} />
              Membership Terms & Financial Commitments
            </h3>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-6">
              <h4 className="font-bold text-blue-800 mb-4 text-center">NOTE - MEMBERSHIP DECLARATION</h4>
              <div className="space-y-4 text-sm leading-relaxed text-gray-800">
                <p className="text-justify">
                  I apply for admission as a member of your society. I understand the Rules & By-laws of the Society and hereby agree to abide by them and any subsequent modifications thereto. I also hereby declare that I am neither a member of any other Co-operative Thrift & Credit Society operating or working in the State of Delhi nor taken any kind of Loan which is outstanding as on date.
                </p>
                
                <div className="bg-white border border-blue-300 rounded-lg p-4 shadow-sm">
                  <h5 className="font-semibold text-blue-700 mb-3">Financial Commitments:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">₹</div>
                      <div>
                        <p className="font-semibold text-green-800">Share Allocation</p>
                        <p className="text-sm text-green-700">1 Share of Rs. 500/-</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">₹</div>
                      <div>
                        <p className="font-semibold text-blue-800">Monthly Deposit</p>
                        <p className="text-sm text-blue-700">Rs. 200/- Compulsory</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">₹</div>
                      <div>
                        <p className="font-semibold text-orange-800">Admission Fee</p>
                        <p className="text-sm text-orange-700">Rs. 100/- One Time</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">₹</div>
                      <div>
                        <p className="font-semibold text-purple-800">Other Funds</p>
                        <p className="text-sm text-purple-700">Building, Welfare, Misc.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-justify bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <span className="font-semibold text-yellow-800">Nomination Declaration:</span> I hereby nominate the following person to whom all money due to me by the society or payable by me to the society, in the event of my death, may be paid or recovered as the case may be.
                </p>
              </div>
            </div>
          </div>
          {/* DOCUMENTS SECTION */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <CreditCard size={24} />
                Identity & Supporting Documents
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DocumentBox label="Aadhar Front" />
                <DocumentBox label="Aadhar Back" />
                <DocumentBox label="PAN Card" />
              </div>
            </div>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="flex justify-center gap-4 pt-6 border-t border-gray-200">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Printer size={18} />
              Print Profile
            </button>
            <button className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition-colors font-medium">
              <Download size={18} />
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* MODERN COMPONENTS */
function DetailCard({ icon, label, value }) {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300 group">
      <div className="flex items-center gap-3">
        <div className="text-blue-600 group-hover:text-blue-700 transition-colors">{icon}</div>
        <div className="flex-1">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{label}</p>
          <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-800 transition-colors">{value}</p>
        </div>
      </div>
    </div>
  );
}

function DocumentBox({ label }) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-dashed border-blue-300 rounded-xl h-40 flex flex-col items-center justify-center hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 hover:border-blue-400 transition-all duration-300 group">
      <CreditCard size={32} className="text-blue-400 mb-3 group-hover:text-blue-600 transition-colors" />
      <span className="text-sm font-semibold text-blue-700 group-hover:text-blue-800 transition-colors">{label}</span>
      <span className="text-xs text-blue-500 mt-1">Upload Required</span>
    </div>
  );
}
