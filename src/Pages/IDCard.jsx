import { Printer, Download, Shield, Calendar, Phone, Mail, MapPin, User, CreditCard } from "lucide-react";
import mainLogo from '../assets/images/mainlogo.png';

export default function IdCard() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-8 px-4">
      {/* ================= HEADER ================= */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img
                src={mainLogo}
                alt="Vertex Logo"
                className="h-12 w-12 object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Digital ID Card</h1>
                <p className="text-sm text-gray-600">Official Member Identification</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Profile / ID Card</p>
              <div className="flex gap-3 mt-2">
                <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors font-medium">
                  <Printer size={18} /> Print ID Card
                </button>
                <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 text-white shadow-lg hover:bg-green-700 transition-colors font-medium">
                  <Download size={18} /> Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ID CARD FRONT ================= */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Member ID Card - Front</h2>
          
          <div className="flex justify-center">
            <div className="w-80 h-[500px] bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white rounded-3xl shadow-2xl p-6 relative overflow-hidden border-2 border-blue-300">
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>
              <div className="absolute inset-0 border-2 border-white/20 rounded-3xl m-2" />

              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <img
                    src={mainLogo}
                    alt="Vertex Logo"
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h2 className="font-bold text-lg leading-tight">VERTEX KALYAN</h2>
                <p className="text-xs opacity-90 leading-tight mb-1">
                  COOPERATIVE URBAN THRIFT &<br />CREDIT SOCIETY LTD.
                </p>
                <p className="text-[10px] opacity-70 bg-white/20 rounded-full px-3 py-1 inline-block">
                  REGD. NO: VS/2024/0001 | GOI REGISTERED
                </p>
              </div>

              {/* Member Photo */}
              <div className="flex justify-center mb-4">
                <div className="w-24 h-28 bg-white rounded-xl overflow-hidden shadow-lg border-4 border-white/30">
                  <img
                    src="https://i.pravatar.cc/150"
                    alt="Member Photo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Member Details */}
              <div className="text-center mb-6">
                <h3 className="font-bold text-xl mb-2">NAVNEET YADAV</h3>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 mb-3">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <CreditCard size={16} />
                    <span className="text-sm font-medium">MEMBER ID</span>
                  </div>
                  <p className="font-mono text-lg font-bold">01001945</p>
                </div>
                <span className="inline-block px-4 py-2 text-sm rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 font-bold shadow-lg">
                  PREMIUM MEMBER
                </span>
              </div>

              {/* Details Grid */}
              <div className="space-y-2 text-xs mb-4">
                <DetailCard label="GUARDIAN" value="MAYANK" icon={<User size={12} />} />
                <DetailCard label="DOB" value="16/07/1997" icon={<Calendar size={12} />} />
                <DetailCard label="MOBILE" value="6396465590" icon={<Phone size={12} />} />
                <DetailCard label="EMAIL" value="yamini12@gmail.com" icon={<Mail size={12} />} />
              </div>

              {/* Footer */}
              <div className="flex justify-between items-end">
                <div className="bg-white p-2 rounded-lg shadow-lg">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=VERTEX-01001945-NAVNEET-YADAV"
                    alt="QR Code"
                    className="w-12 h-12"
                  />
                </div>
                <div className="text-[10px] text-right">
                  <div className="bg-white/20 rounded-lg px-3 py-2 mb-2">
                    <p className="font-semibold">VALID TILL</p>
                    <p className="font-mono text-sm">31/03/2027</p>
                  </div>
                  <div className="bg-white/20 rounded-lg px-3 py-2">
                    <p className="font-semibold">ISSUED ON</p>
                    <p className="font-mono text-sm">17/01/2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ID CARD BACK ================= */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Member ID Card - Back</h2>
          
          <div className="flex justify-center">
            <div className="w-80 h-[500px] bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white rounded-3xl shadow-2xl p-6 relative overflow-hidden border-2 border-blue-300">
              {/* Decorative pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white rounded-full"></div>
              </div>

              {/* Header */}
              <div className="text-center mb-6 relative z-10">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Shield className="text-yellow-400" size={20} />
                  <h3 className="font-bold text-lg">MEMBER ID CARD</h3>
                </div>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mb-4"></div>
              </div>

              {/* Terms Section */}
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/20 relative z-10">
                <h4 className="font-bold text-sm mb-3 text-center text-yellow-400">TERMS & CONDITIONS</h4>
                <div className="text-[10px] leading-relaxed space-y-2">
                  <p className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold">•</span>
                    <span>This card is the property of Vertex Kalyan Cooperative Society.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold">•</span>
                    <span>Must be carried during all society transactions and meetings.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold">•</span>
                    <span>Report immediately if card is lost, stolen, or damaged.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold">•</span>
                    <span>Valid only with government approved photo identification.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold">•</span>
                    <span>Society reserves rights to cancel membership without notice.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold">•</span>
                    <span>Card must be renewed annually before expiry date.</span>
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 mb-6 relative z-10">
                <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Phone size={12} className="text-yellow-400" />
                    <span className="font-semibold text-xs">24/7 Helpline</span>
                  </div>
                  <p className="font-mono text-sm">1800-123-VERTEX</p>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Mail size={12} className="text-yellow-400" />
                    <span className="font-semibold text-xs">Support Email</span>
                  </div>
                  <p className="font-mono text-sm">support@vertexsociety.com</p>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin size={12} className="text-yellow-400" />
                    <span className="font-semibold text-xs">Registered Office</span>
                  </div>
                  <p className="text-xs leading-tight">Plot No. 53, 3rd Floor, Main Road,<br />Pandav Nagar, East Delhi - 110092</p>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center relative z-10">
                <div className="bg-white rounded-xl p-3 shadow-lg">
                  <div className="bg-gray-100 p-2 rounded-lg mb-2">
                    <div className="font-mono text-black text-base tracking-widest">
                      ||||| |||| ||| ||||| |||| ||||| ||||
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-700 font-semibold">
                    MEMBER ID: 01001945
                  </p>
                  <p className="text-[8px] text-gray-500">
                    Scan for verification
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* HELPER COMPONENTS */
function DetailCard({ label, value, icon }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-yellow-400">{icon}</span>
        <p className="text-[10px] opacity-80 font-medium">{label}</p>
      </div>
      <p className="font-semibold text-sm truncate">{value}</p>
    </div>
  );
}
