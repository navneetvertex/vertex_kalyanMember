import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../features/auth/authApi';
import { useGetStatesQuery, useGetDistrictsQuery, useGetAreasQuery } from '../features/location/locationApi';
import { setCredentials } from '../features/auth/authSlice';
import { User, Mail, Lock, Phone, Calendar, MapPin, CreditCard, AlertCircle, Eye, EyeOff, CheckCircle } from "lucide-react";
import bgImage from '../assets/images/bg-auth-overlay.png';
import mainLogo from '../assets/images/mainlogo.png';

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const [error, setError] = useState('');
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email_id: '', password: '', confirm_password: '', guardian_name: '',
    date_of_birth: '', area: '', district: '', state: '', guardian_relation: '',
    gender: '', mobile_number: '', payment_method: 'cash', aadhar_number: '',
    pin: '', terms_accepted: false
  });

  // API queries for location data
  const { data: statesData } = useGetStatesQuery();
  const { data: districtsData } = useGetDistrictsQuery(formData.state, { skip: !formData.state });
  const { data: areasData } = useGetAreasQuery(formData.district, { skip: !formData.district });

  const states = statesData?.data || [];
  const districts = districtsData?.data || [];
  const areas = areasData?.data || [];

  // Guardian relation options
  const guardianRelations = ['Father', 'Mother', 'Spouse', 'Brother', 'Sister', 'Son', 'Daughter', ];

  const isSmallScreen = typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      return;
    }
    if (!formData.terms_accepted) {
      setError('Please accept terms and conditions');
      return;
    }
    try {
      const response = await register(formData).unwrap();
      setRegistrationData(response);
      setShowSuccessModal(true);
    } catch (err) {
      setError(err?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const handleLoginRedirect = () => {
    // Store credentials with complete user data structure
    dispatch(setCredentials({
      accessToken: registrationData.accessToken,
      user: {
        ...registrationData.user,
        _id: registrationData.user._id,
        mobile_number: formData.mobile_number,
        email_id: formData.email_id,
        gender: formData.gender,
        date_of_birth: formData.date_of_birth,
        guardian_name: formData.guardian_name,
        guardian_relation: formData.guardian_relation,
        aadhar_number: formData.aadhar_number
      }
    }));
    navigate('/dashboard');
  };

  const handleStayOnPage = () => {
    setShowSuccessModal(false);
    navigate('/login');
  };

  return (
    <div
      className="d-flex flex-column position-relative"
      style={{
        minHeight: '100vh',
        overflowY: 'auto',
        backgroundImage: `url(${bgImage})`, 
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundAttachment: isSmallScreen ? 'scroll' : 'fixed'
      }}
    >
      <div
        className="position-fixed top-0 start-0 w-100"
        style={{
          height: '100vh',
          background: 'linear-gradient(135deg, rgba(212, 205, 138, 0.7) 0%, rgba(228, 217, 131, 0.7) 25%, rgba(235, 224, 124, 0.7) 50%, rgba(237, 228, 168, 0.7) 75%, rgba(236, 223, 118, 0.7) 100%)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      <div className="container position-relative py-4" style={{ zIndex: 2 }}>
        <div className="row justify-content-center">
          <div className="col-12" style={{ maxWidth: '900px' }}>
            <div className="card shadow-lg border-0" style={{ borderRadius: '1.5rem', backgroundColor: '#fffdf7' }}>
              <div className="card-body p-4 p-md-5">
                
                <div className="text-center mb-4">
                  <div className="d-flex justify-content-center mb-3">
                    <img src={mainLogo} alt="Logo" className="img-fluid" style={{ maxWidth: '80px' }} />
                  </div>
                  <h4 className="fw-semibold mb-1" style={{ color: '#8B4513' }}>Membership Registration</h4>
                  <p className="text-muted small mb-0">Join Vertex Kalyan Cooperative Society</p>
                </div>

                {error && (
                  <div className="alert alert-danger d-flex align-items-center mb-3 py-2 small" role="alert">
                    <AlertCircle size={16} className="me-2" />
                    <div>{error}</div>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  
                  {/* Personal Information */}
                  <Section title="Personal Information" icon={<User size={18} />}>
                    <Input icon={<User size={14} />} label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required />
                    <Select icon={<User size={14} />} label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={['Male', 'Female', 'Other']} required />
                    <Input icon={<User size={14} />} label="Guardian Name" name="guardian_name" value={formData.guardian_name} onChange={handleChange} placeholder="Enter guardian's name" required />
                    <Select icon={<User size={14} />} label="Guardian Relation" name="guardian_relation" value={formData.guardian_relation} onChange={handleChange} options={guardianRelations} required />
                    <Input icon={<Calendar size={14} />} label="Date of Birth" type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} required />
                    <Input icon={<CreditCard size={14} />} label="Aadhar Number" name="aadhar_number" value={formData.aadhar_number} onChange={handleChange} placeholder="Enter 12-digit Aadhar number" maxLength="12" required />
                    <Input icon={<Phone size={14} />} label="Mobile Number" name="mobile_number" value={formData.mobile_number} onChange={handleChange} placeholder="Enter 10-digit mobile number" required />
                    <Input icon={<Mail size={14} />} label="Email Address" type="email" name="email_id" value={formData.email_id} onChange={handleChange} placeholder="Enter your email address" required />
                  </Section>

                  {/* Address Information */}
                  <Section title="Address Information" icon={<MapPin size={18} />}>
                    <Select icon={<MapPin size={14} />} label="State" name="state" value={formData.state} onChange={handleChange} options={states.map(s => ({ value: s._id || s.id, label: s.name }))} required />
                    <Select icon={<MapPin size={14} />} label="District" name="district" value={formData.district} onChange={handleChange} options={districts.map(d => ({ value: d._id || d.id, label: d.name }))} required disabled={!formData.state} />
                    <Select icon={<MapPin size={14} />} label="Area" name="area" value={formData.area} onChange={handleChange} options={areas.map(a => ({ value: a._id || a.id, label: a.name }))} required disabled={!formData.district} />
                    {/* <Input icon={<MapPin size={14} />} label="PIN" name="pin" value={formData.pin} onChange={handleChange} placeholder="Enter PIN" required /> */}
                  </Section>

                  {/* Security */}
                  <Section title="Security Information" icon={<Lock size={18} />}>
                    <PasswordInput icon={<Lock size={14} />} label="Password" name="password" value={formData.password} onChange={handleChange} placeholder="Create a strong password" showPassword={showPassword} setShowPassword={setShowPassword} required />
                    <PasswordInput icon={<Lock size={14} />} label="Confirm Password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} placeholder="Confirm your password" showPassword={showConfirmPassword} setShowPassword={setShowConfirmPassword} required />
                  </Section>

                  {/* Payment */}
                  <Section title="Payment Information" icon={<CreditCard size={18} />}>
                    <Select icon={<CreditCard size={14} />} label="Payment Method" name="payment_method" value={formData.payment_method} onChange={handleChange} options={['cash', 'online']} />
                    <Input icon={<Lock size={14} />} label="PIN" type="text" name="pin" value={formData.pin} onChange={handleChange} placeholder="Enter PIN" required />
                  </Section>

                  {/* Terms */}
                  <div 
                    className="border rounded-3 p-4 mb-4" 
                    style={{ 
                      borderColor: '#e0e0e0', 
                      borderWidth: '1px', 
                      backgroundColor: 'transparent',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#d4af37';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e0e0e0';
                      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                    }}
                  >
                    <div className="form-check mb-3">
                      <input type="checkbox" name="terms_accepted" className="form-check-input" id="terms" checked={formData.terms_accepted} onChange={handleChange} style={{ borderColor: '#8B4513' }} />
                      <label className="form-check-label small" htmlFor="terms" style={{ color: '#654321' }}>
                        I accept the <span onClick={() => setShowTermsModal(true)} className="fw-medium" style={{ cursor: 'pointer', color: '#8B4513', textDecoration: 'underline' }}>Terms & Conditions</span>
                      </label>
                    </div>
                    <div className="alert alert-info small mb-0 py-2" style={{ backgroundColor: '#e7f3ff' }}>
                      <strong>Membership Agreement:</strong> By registering, I agree to become a member of Vertex Kalyan Cooperative Society.
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="text-center mb-3">
                    <button type="submit" disabled={isLoading} className="btn btn-lg px-5 text-white fw-semibold" style={{ background: 'linear-gradient(135deg, #8B4513 0%, #654321 100%)', border: 'none', borderRadius: '50px' }}>
                      {isLoading ? 'Registering...' : 'Register Now →'}
                    </button>
                  </div>

                  {/* Login Link */}
                  <div className="text-center">
                    <p className="small mb-0" style={{ color: '#666' }}>
                      Already have an account? <span onClick={() => navigate('/login')} className="fw-semibold" style={{ color: '#8B4513', cursor: 'pointer' }}>Sign In</span>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="text-center py-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <p className="small mb-0 fw-semibold" style={{ color: '#8B4513' }}>All Rights Reserved @ Vertex Kalyan Cooperative Society</p>
      </div>

      {/* Terms & Conditions Modal */}
      {showTermsModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content" style={{ borderRadius: '1rem' }}>
              <div className="modal-header" style={{ backgroundColor: '#8B4513', color: 'white' }}>
                <h5 className="modal-title fw-semibold">Terms & Conditions</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowTermsModal(false)}></button>
              </div>
              <div className="modal-body p-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <div className="terms-content">
                  <h6 className="fw-bold mb-3" style={{ color: '#8B4513' }}>Vertex Kalyan Cooperative Society - Membership Terms & Conditions</h6>
                  
                  <div className="mb-4">
                    <h6 className="fw-semibold mb-2" style={{ color: '#654321' }}>1. Membership Eligibility</h6>
                    <p className="small mb-2">• Applicant must be at least 18 years of age</p>
                    <p className="small mb-2">• Valid government-issued identification required</p>
                    <p className="small mb-2">• Residential proof within the cooperative's operational area</p>
                  </div>

                  <div className="mb-4">
                    <h6 className="fw-semibold mb-2" style={{ color: '#654321' }}>2. Financial Obligations</h6>
                    <p className="small mb-2">• Minimum share capital contribution as per society bylaws</p>
                    <p className="small mb-2">• Annual membership fees and service charges</p>
                    <p className="small mb-2">• Timely payment of loans and interest as applicable</p>
                  </div>

                  <div className="mb-4">
                    <h6 className="fw-semibold mb-2" style={{ color: '#654321' }}>3. Rights and Benefits</h6>
                    <p className="small mb-2">• Access to cooperative financial services</p>
                    <p className="small mb-2">• Participation in annual general meetings</p>
                    <p className="small mb-2">• Dividend distribution based on society performance</p>
                    <p className="small mb-2">• Loan facilities at competitive interest rates</p>
                  </div>

                  <div className="mb-4">
                    <h6 className="fw-semibold mb-2" style={{ color: '#654321' }}>4. Member Responsibilities</h6>
                    <p className="small mb-2">• Comply with society rules and regulations</p>
                    <p className="small mb-2">• Maintain accurate personal and financial information</p>
                    <p className="small mb-2">• Participate actively in cooperative activities</p>
                    <p className="small mb-2">• Report any changes in contact details promptly</p>
                  </div>

                  <div className="mb-4">
                    <h6 className="fw-semibold mb-2" style={{ color: '#654321' }}>5. Termination of Membership</h6>
                    <p className="small mb-2">• Voluntary withdrawal with 30 days notice</p>
                    <p className="small mb-2">• Automatic termination for non-compliance with rules</p>
                    <p className="small mb-2">• Settlement of all dues before membership closure</p>
                  </div>

                  <div className="mb-4">
                    <h6 className="fw-semibold mb-2" style={{ color: '#654321' }}>6. Privacy and Data Protection</h6>
                    <p className="small mb-2">• Personal information will be kept confidential</p>
                    <p className="small mb-2">• Data used only for cooperative business purposes</p>
                    <p className="small mb-2">• Compliance with applicable data protection laws</p>
                  </div>

                  <div className="alert alert-warning small mt-4">
                    <strong>Important:</strong> By accepting these terms, you acknowledge that you have read, understood, and agree to be bound by all the terms and conditions of Vertex Kalyan Cooperative Society membership.
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowTermsModal(false)}>Close</button>
                <button type="button" className="btn" style={{ backgroundColor: '#8B4513', color: 'white' }} onClick={() => { setFormData(prev => ({ ...prev, terms_accepted: true })); setShowTermsModal(false); }}>Accept Terms</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && registrationData && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: '1rem' }}>
              <div className="modal-header border-0 text-center" style={{ backgroundColor: '#28a745', color: 'white' }}>
                <div className="w-100 text-center">
                  <CheckCircle size={48} className="mb-2" />
                  <h5 className="modal-title fw-bold mb-0">Registration Successful!</h5>
                </div>
              </div>
              <div className="modal-body p-4 text-center">
                <div className="mb-4">
                  <h6 className="fw-semibold mb-3" style={{ color: '#8B4513' }}>Welcome to Vertex Kalyan Cooperative Society!</h6>
                  <p className="text-muted mb-3">{registrationData.message}</p>
                  
                  <div className="bg-light rounded p-3 mb-4">
                    <div className="row text-start">
                      <div className="col-6">
                        <small className="text-muted">User ID:</small>
                        <div className="fw-semibold">{registrationData.user.user_id}</div>
                      </div>
                      <div className="col-6">
                        <small className="text-muted">Account No:</small>
                        <div className="fw-semibold">{registrationData.user.account_number}</div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="small text-info mb-4">
                    <strong>Next Step:</strong> Complete your KYC in the profile section to activate all features.
                  </p>
                </div>
                
                <div className="d-flex gap-3 justify-content-center">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={handleStayOnPage}
                  >
                    Go to Login
                  </button>
                  <button 
                    type="button" 
                    className="btn text-white fw-semibold"
                    style={{ backgroundColor: '#8B4513' }}
                    onClick={handleLoginRedirect}
                  >
                    Continue to Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, icon, children }) {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div 
      className="border-2 border-gray-200 hover:border-yellow-600 rounded-3 p-4 mb-4" 
      style={{ 
        // borderColor: isHovered ? '#f0aa13' : '#e0e0e0', 
        borderWidth: '2px', 
        backgroundColor: 'transparent',
        transition: 'all 0.3s ease',
        boxShadow: isHovered ? '0 4px 12px rgba(212, 175, 55, 0.15)' : '0 2px 4px rgba(0,0,0,0.05)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h5 className="d-flex align-items-center gap-2 fw-semibold mb-4" style={{ color: '#8B4513', fontSize: '1rem' }}>
        {icon}
        {title}
      </h5>
      <div className="row g-3">
        {children}
      </div>
    </div>
  );
}

function Input({ label, type = "text", icon, name, value, onChange, required, maxLength, placeholder }) {
  return (
    <div className="col-md-6">
      <label className="form-label d-flex align-items-center gap-2 small fw-medium mb-1" style={{ color: '#8B4513' }}>
        {icon}
        {label}
      </label>
      <input 
        type={type} 
        name={name} 
        value={value} 
        onChange={onChange} 
        required={required} 
        maxLength={maxLength} 
        placeholder={placeholder} 
        className="form-control" 
        onFocus={(e) => e.target.style.borderColor = '#d4af37'} 
        onBlur={(e) => e.target.style.borderColor = '#dee2e6'} 
        style={{ 
          borderColor: '#dee2e6', 
          outline: 'none', 
          boxShadow: 'none'
        }} 
      />
    </div>
  );
}

function PasswordInput({ label, icon, name, value, onChange, required, placeholder, showPassword, setShowPassword }) {
  return (
    <div className="col-md-6">
      <label className="form-label d-flex align-items-center gap-2 small fw-medium mb-1" style={{ color: '#8B4513' }}>
        {icon}
        {label}
      </label>
      <div className="input-group">
        <input 
          type={showPassword ? "text" : "password"}
          name={name} 
          value={value} 
          onChange={onChange} 
          required={required} 
          placeholder={placeholder} 
          className="form-control" 
          onFocus={(e) => e.target.style.borderColor = '#d4af37'} 
          onBlur={(e) => e.target.style.borderColor = '#dee2e6'} 
          style={{ borderColor: '#dee2e6', outline: 'none', boxShadow: 'none' }} 
        />
        <button 
          type="button" 
          className="btn btn-outline-secondary" 
          onClick={() => setShowPassword(!showPassword)}
          style={{ borderColor: '#dee2e6' }}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}

function Select({ label, icon, name, value, onChange, options, required, disabled }) {
  return (
    <div className="col-md-6">
      <label className="form-label d-flex align-items-center gap-2 small fw-medium mb-1" style={{ color: '#8B4513' }}>
        {icon}
        {label}
      </label>
      <select 
        name={name} 
        value={value} 
        onChange={onChange} 
        required={required} 
        disabled={disabled}
        className="form-select" 
        onFocus={(e) => e.target.style.borderColor = '#d4af37'} 
        onBlur={(e) => e.target.style.borderColor = '#dee2e6'} 
        style={{ 
          borderColor: '#dee2e6', 
          outline: 'none', 
          boxShadow: 'none',
          backgroundColor: disabled ? '#f8f9fa' : 'white'
        }}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option 
            key={option.value || option} 
            value={option.value || option}
            style={{ backgroundColor: '#fff8dc' }}
          >
            {option.label || option}
          </option>
        ))}
      </select>
      <style jsx>{`
        select option:hover {
          background-color: #d4af37 !important;
        }
      `}</style>
    </div>
  );
}
