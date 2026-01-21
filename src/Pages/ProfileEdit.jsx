import React, { useState } from "react";
import { Upload, User, Phone, Mail, MapPin, Calendar, CreditCard, Shield, Camera, FileText, Building, Users } from "lucide-react";
import mainLogo from '../assets/images/mainlogo.png';

export default function EditProfile() {
  const [isKYCCompleted, setIsKYCCompleted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    guardian_name: "",
    guardian_relation: "",
    mother_name: "",
    dob: "",
    gender: "",
    marital_status: "",
    spouse_name: "",
    aadhar: "",
    pan: "",
    mobile1: "",
    mobile2: "",
    email: "",
    whatsapp: "",
    occupation: "",
    is_divyang: false,
    nominee_name: "",
    nominee_relation: "",
    nominee_mobile: "",
  });

  const [images, setImages] = useState({
    profile: null,
    aadharFront: null,
    aadharBack: null,
    pan: null,
    signature: null,
    passbook: null,
    disability: null,
  });

  const nomineeRelation = [
    "Father",
    "Mother",
    "Wife",
    "Husband",
    "Son",
    "Daughter",
    "Brother",
    "Sister",
  ];

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "radio" ? value : value,
    });
  };

  const handleImage = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setImages({ ...images, [key]: URL.createObjectURL(file) });
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-4 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200">

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
              <h2 className="text-sm font-medium opacity-90">COOPERATIVE URBAN THRIFT & CREDIT SOCIETY LTD.</h2>
            </div>
          </div>
          <div className="text-center text-sm opacity-90 leading-relaxed">
            <p className="mb-1">REGISTERED UNDER GOVERNMENT OF INDIA</p>
            <p className="mb-1">REGD.OFFICE- PLOT NO.-53, 3RD FLOOR, MAIN ROAD, OPP. MOTHER DAIRY, PANDAV NAGAR, EAST DELHI- 110092</p>
            <p className="text-blue-200 font-medium">WWW.VERTEXSOCIETY.COM</p>
          </div>
        </div>

        <div className="p-8">
          {isKYCCompleted && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 mb-6 rounded-xl animate-pulse">
              <div className="flex items-center gap-2">
                <Shield size={20} />
                <span className="font-semibold">Profile Under Review:</span>
                <span>Your profile is under approval. You cannot edit fields.</span>
              </div>
            </div>
          )}

          {/* MEMBERSHIP INFO */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-200">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 text-blue-700 font-semibold">
                <User size={16} />
                <span>USER ID: 01001945</span>
              </div>
              <div className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold text-sm shadow-lg">
                Edit Profile
              </div>
              <div className="flex items-center gap-2 text-blue-700 font-semibold">
                <CreditCard size={16} />
                <span>ACCOUNT NO: 960275514342</span>
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

              {/* PHOTO UPLOAD SECTION */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 rounded-2xl p-6 text-center shadow-inner">
                <h4 className="font-bold text-blue-800 mb-4 text-sm uppercase tracking-wide">SELF PHOTO</h4>
                <div 
                  className="bg-white border-2 border-dashed border-blue-300 rounded-xl h-48 w-full flex items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors group"
                  onClick={() => document.getElementById("profile").click()}
                >
                  {images.profile ? (
                    <img src={images.profile} className="w-full h-full object-cover rounded-lg" alt="Profile" />
                  ) : (
                    <div className="text-center text-blue-400">
                      <Camera size={48} className="mx-auto mb-3 group-hover:text-blue-600 transition-colors" />
                      <p className="text-sm font-medium text-blue-600">Upload your Photo</p>
                      <p className="text-xs text-blue-500 mt-1">Click to browse</p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="profile"
                  hidden
                  accept="image/*"
                  onChange={(e) => handleImage(e, "profile")}
                />
                <div className="mt-4 text-xs text-blue-700 bg-blue-50 p-2 rounded-lg">
                  <p className="font-medium">Photo Guidelines:</p>
                  <p>• Recent passport size</p>
                  <p>• Clear background</p>
                  <p>• Professional attire</p>
                </div>
              </div>
            </div>
          </div>

          {/* PERSONAL INFORMATION FORM */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <User size={24} />
                Personal Information
              </h3>
            </div>
            
            <div className="p-8 space-y-6">
              <FormField label="Name of Applicant, Mr./Mrs./Miss" icon={<User size={16} />}>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="NAVNEET YADAV"
                  disabled={isKYCCompleted}
                />
              </FormField>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField label="Guardian Name" icon={<User size={16} />}>
                  <input
                    name="guardian_name"
                    value={formData.guardian_name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="MAYANK"
                    disabled={isKYCCompleted}
                  />
                </FormField>
                <FormField label="Relationship" icon={<Users size={16} />}>
                  <select
                    name="guardian_relation"
                    value={formData.guardian_relation}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isKYCCompleted}
                  >
                    <option value="">Select Relationship</option>
                    {nomineeRelation.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Mother Name" icon={<User size={16} />}>
                  <input
                    name="mother_name"
                    value={formData.mother_name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Your Mother Name"
                    disabled={isKYCCompleted}
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Date of Birth" icon={<Calendar size={16} />}>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isKYCCompleted}
                  />
                  <p className="text-sm text-gray-500 mt-1">16-07-1997 (Age: 28 years)</p>
                </FormField>
                <FormField label="Gender" icon={<User size={16} />}>
                  <div className="flex gap-6 pt-2">
                    {["Male", "Female", "Other"].map((g) => (
                      <label key={g} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={formData.gender === g}
                          onChange={handleChange}
                          className="text-blue-600 focus:ring-blue-500"
                          disabled={isKYCCompleted}
                        />
                        <span className="text-gray-700">{g}</span>
                      </label>
                    ))}
                  </div>
                </FormField>
              </div>

              <FormField label="Marital Status" icon={<User size={16} />}>
                <div className="flex gap-6 pt-2">
                  {["Single", "Married"].map((s) => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="marital_status"
                        value={s}
                        checked={formData.marital_status === s}
                        onChange={handleChange}
                        className="text-blue-600 focus:ring-blue-500"
                        disabled={isKYCCompleted}
                      />
                      <span className="text-gray-700">{s}</span>
                    </label>
                  ))}
                </div>
              </FormField>

              <FormField label="Aadhar Number" icon={<Shield size={16} />}>
                <input
                  name="aadhar"
                  value={formData.aadhar}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="123455678967"
                  disabled={isKYCCompleted}
                />
              </FormField>

              {/* DOCUMENT UPLOADS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DocumentUpload 
                  label="Aadhar Front" 
                  id="aadharFront" 
                  image={images.aadharFront} 
                  onUpload={(e) => handleImage(e, "aadharFront")}
                  disabled={isKYCCompleted}
                />
                <DocumentUpload 
                  label="Aadhar Back" 
                  id="aadharBack" 
                  image={images.aadharBack} 
                  onUpload={(e) => handleImage(e, "aadharBack")}
                  disabled={isKYCCompleted}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="PAN Number" icon={<CreditCard size={16} />}>
                  <input
                    name="pan"
                    value={formData.pan}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter PAN Number"
                    disabled={isKYCCompleted}
                  />
                </FormField>
                <DocumentUpload 
                  label="PAN Image" 
                  id="panImage" 
                  image={images.pan} 
                  onUpload={(e) => handleImage(e, "pan")}
                  disabled={isKYCCompleted}
                />
              </div>
            </div>
          </div>

          {/* LOCATION & CONTACT INFORMATION */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <MapPin size={24} />
                Location & Contact Details
              </h3>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField label="State" icon={<MapPin size={16} />}>
                  <input
                    name="state"
                    value="DELHI"
                    className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50"
                    disabled
                  />
                </FormField>
                <FormField label="District" icon={<MapPin size={16} />}>
                  <input
                    name="district"
                    value="East Delhi"
                    className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50"
                    disabled
                  />
                </FormField>
                <FormField label="Area" icon={<MapPin size={16} />}>
                  <input
                    name="area"
                    value="Mayur Vihar"
                    className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50"
                    disabled
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Mobile 1" icon={<Phone size={16} />}>
                  <input
                    name="mobile1"
                    value={formData.mobile1}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="6396465590"
                    disabled={isKYCCompleted}
                  />
                </FormField>
                <FormField label="Mobile 2" icon={<Phone size={16} />}>
                  <input
                    name="mobile2"
                    value={formData.mobile2}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Mobile Number 2"
                    disabled={isKYCCompleted}
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Email ID" icon={<Mail size={16} />}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="yamini12@gmail.com"
                    disabled={isKYCCompleted}
                  />
                </FormField>
                <FormField label="WhatsApp No." icon={<Phone size={16} />}>
                  <input
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter WhatsApp No."
                    disabled={isKYCCompleted}
                  />
                </FormField>
              </div>
            </div>
          </div>

          {/* BANK DETAILS & NOMINEE */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <Building size={24} />
                Bank Details & Nominee Information
              </h3>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h4 className="font-bold text-blue-800 mb-4">Bank Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Bank Name" icon={<Building size={16} />}>
                    <input
                      name="bank_name"
                      value={formData.bank_name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Bank Name"
                      disabled={isKYCCompleted}
                    />
                  </FormField>
                  <FormField label="Account Number" icon={<CreditCard size={16} />}>
                    <input
                      name="account_number"
                      value={formData.account_number}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Account Number"
                      disabled={isKYCCompleted}
                    />
                  </FormField>
                  <FormField label="IFSC Code" icon={<CreditCard size={16} />}>
                    <input
                      name="ifsc_code"
                      value={formData.ifsc_code}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="IFSC Code"
                      disabled={isKYCCompleted}
                    />
                  </FormField>
                  <FormField label="Branch Name" icon={<Building size={16} />}>
                    <input
                      name="branch_name"
                      value={formData.branch_name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Branch Name"
                      disabled={isKYCCompleted}
                    />
                  </FormField>
                </div>
                <div className="mt-4">
                  <DocumentUpload 
                    label="Passbook/Cheque" 
                    id="passbook" 
                    image={images.passbook} 
                    onUpload={(e) => handleImage(e, "passbook")}
                    disabled={isKYCCompleted}
                  />
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h4 className="font-bold text-green-800 mb-4">Nominee Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Name of the Nominee" icon={<User size={16} />}>
                    <input
                      name="nominee_name"
                      value={formData.nominee_name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter Nominee Name"
                      disabled={isKYCCompleted}
                    />
                  </FormField>
                  <FormField label="Relationship" icon={<Users size={16} />}>
                    <select
                      name="nominee_relation"
                      value={formData.nominee_relation}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={isKYCCompleted}
                    >
                      <option value="">Select Relationship</option>
                      {nomineeRelation.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </FormField>
                  <FormField label="Nominee DOB" icon={<Calendar size={16} />}>
                    <input
                      type="date"
                      name="nominee_dob"
                      value={formData.nominee_dob}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={isKYCCompleted}
                    />
                  </FormField>
                  <FormField label="Nominee Mobile" icon={<Phone size={16} />}>
                    <input
                      name="nominee_mobile"
                      value={formData.nominee_mobile}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Nominee Mobile"
                      disabled={isKYCCompleted}
                    />
                  </FormField>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Are you disabled?" icon={<Shield size={16} />}>
                  <div className="flex gap-6 pt-2">
                    {["Yes", "No"].map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="is_divyang"
                          value={option}
                          checked={formData.is_divyang === option}
                          onChange={handleChange}
                          className="text-blue-600 focus:ring-blue-500"
                          disabled={isKYCCompleted}
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </FormField>
                <FormField label="Occupation" icon={<CreditCard size={16} />}>
                  <div className="flex gap-6 pt-2">
                    {["Service", "Business"].map((occ) => (
                      <label key={occ} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="occupation"
                          value={occ}
                          checked={formData.occupation === occ}
                          onChange={handleChange}
                          className="text-blue-600 focus:ring-blue-500"
                          disabled={isKYCCompleted}
                        />
                        <span className="text-gray-700">{occ}</span>
                      </label>
                    ))}
                  </div>
                </FormField>
              </div>
            </div>
          </div>
          {/* FOOTER ACTIONS */}
          <div className="flex justify-center gap-4 pt-6 border-t border-gray-200">
            <button 
              className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors font-medium"
              disabled={isKYCCompleted}
            >
              <FileText size={18} />
              Save Draft
            </button>
            <button
              className="flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-green-700 transition-colors font-medium"
              onClick={() => setIsKYCCompleted(true)}
            >
              <Shield size={18} />
              Complete KYC
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* HELPER COMPONENTS */
function FormField({ label, icon, children }) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        <span className="text-blue-600">{icon}</span>
        {label}
      </label>
      {children}
    </div>
  );
}

function DocumentUpload({ label, id, image, onUpload, disabled }) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        <CreditCard size={16} className="text-blue-600" />
        {label}
      </label>
      <div 
        className={`border-2 border-dashed border-gray-300 rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors group ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={() => !disabled && document.getElementById(id).click()}
      >
        {image ? (
          <img src={image} className="w-full h-full object-cover rounded-lg" alt={label} />
        ) : (
          <div className="text-center text-gray-500">
            <Upload size={24} className="mx-auto mb-2 group-hover:text-blue-600 transition-colors" />
            <span className="text-sm font-medium">Upload {label}</span>
            <p className="text-xs text-gray-400 mt-1">Click to browse</p>
          </div>
        )}
      </div>
      <input
        type="file"
        id={id}
        hidden
        accept="image/*"
        onChange={onUpload}
        disabled={disabled}
      />
    </div>
  );
}
