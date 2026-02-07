import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetDashboardDataQuery, useGetNotificationsQuery } from '../features/auth/dashboardApi';
import { isTokenExpired, getTimeUntilExpiry } from '../utils/tokenUtils';

import {
  Home,
  User,
  Edit,
  CreditCard,
  Bell,
  Menu,
  LogOut,
  ChevronDown,
  X,
  Phone
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import profileImg from '../assets/images/profile-img.png';
import mainLogo from '../assets/images/mainlogo.png';
import  Advisor from './Advisor';
import IdCard from './IDCard';
import ProfileView from './ProfileView';
import ProfileEdit from './ProfileEdit';

export default function ProfileDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [chartPeriod, setChartPeriod] = useState('monthly');
  const [tokenInfo, setTokenInfo] = useState(null);
  const dropdownRef = useRef(null);

  // RTK Query hooks
  const { data: dashboardData, error, isLoading } = useGetDashboardDataQuery();
  const { data: notificationsData } = useGetNotificationsQuery();
  
  // Handle authentication errors
  useEffect(() => {
    if (error?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  }, [error]);
  
  // Check token expiration - TEMPORARILY DISABLED FOR TESTING
  useEffect(() => {
    console.log('Dashboard: Token check disabled for testing')
    // const checkToken = () => {
    //   const token = localStorage.getItem('token');
    //   if (!token) {
    //     setTokenInfo({ expired: true, message: 'No token' });
    //     return;
    //   }
      
    //   const expired = isTokenExpired(token);
    //   const timeLeft = getTimeUntilExpiry(token) / 1000;
      
    //   setTokenInfo({
    //     expired,
    //     timeLeft,
    //     message: expired ? 'Expired' : `${Math.floor(timeLeft / 60)}m ${Math.floor(timeLeft % 60)}s`
    //   });
    // };
    
    // checkToken();
    // const interval = setInterval(checkToken, 1000);
    
    // return () => clearInterval(interval);
  }, []);
  
  // Get user from localStorage as fallback
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const currentUser = dashboardData?.data?.user || storedUser;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderTabContent = (tab) => {
    switch(tab) {
      case 'Dashboard':
        return <DashboardContent />;
      case 'Advisor':
        return <Advisor />;
      case 'Profile View':
        return <ProfileView />;
      case 'Profile Edit':
        return <ProfileEdit />;
      case 'ID Card':
        // return <IdCard />;
      default:
        return <DashboardContent />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* ================= SIDEBAR ================= */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 ${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white border-r fixed md:relative z-30 h-full transition-all duration-300 ease-in-out shadow-lg md:shadow-none flex-shrink-0`}>
        <div className="px-4 py-6 border-b bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
          <div className="flex justify-between items-center">
            <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'hidden' : 'block'}`}>
              <img 
                src={mainLogo} 
                alt="Vertex Logo" 
                className="w-10 h-10 object-contain bg-white rounded-lg p-1"
              />
              <div className="text-white">
                <div className="text-lg font-bold leading-tight">VERTEX</div>
                <div className="text-xs opacity-90 font-medium">Cooperative Society</div>
              </div>
            </div>
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <Menu size={18} />
            </button>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-white hover:bg-white/20 p-2 rounded-lg ml-2"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <nav className="mt-2 px-2">
          <div className="">
            <MenuItem icon={<Home size={20} />} label="Dashboard" active={activeTab === 'Dashboard'} collapsed={sidebarCollapsed} onClick={() => setActiveTab('Dashboard')} />
            <MenuItem icon={<User size={20} />} label="Advisor" active={activeTab === 'Advisor'} collapsed={sidebarCollapsed} onClick={() => setActiveTab('Advisor')} />
            <MenuItem icon={<User size={20} />} label="Profile View" active={activeTab === 'Profile View'} collapsed={sidebarCollapsed} onClick={() => setActiveTab('Profile View')} />
            <MenuItem icon={<Edit size={20} />} label="Profile Edit" active={activeTab === 'Profile Edit'} collapsed={sidebarCollapsed} onClick={() => setActiveTab('Profile Edit')} />
            <MenuItem icon={<CreditCard size={20} />} label="ID Card" active={activeTab === 'ID Card'} collapsed={sidebarCollapsed} onClick={() => setActiveTab('ID Card')} />
          </div>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* ================= NAVBAR ================= */}
        <header className="flex justify-between items-center bg-white px-6 py-4 border-b shadow-sm flex-shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu size={20} className="text-gray-600" />
            </button>
            <div className="hidden md:flex items-center gap-3">
              <img 
                src={mainLogo} 
                alt="Vertex Logo" 
                className="w-10 h-10 object-contain"
              />
              <div className="text-gray-800">
                <div className="text-sm font-bold">VERTEX KALYAN</div>
                <div className="text-xs text-gray-600">Cooperative Urban Thrift & Credit Society Ltd.</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={20} className="text-gray-500" />
              {notificationsData?.unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {notificationsData.unreadCount}
                </span>
              )}
            </button>
            
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                {currentUser?.profile_image ? (
                  <img
                    src={currentUser.profile_image}
                    alt="Profile"
                    className="w-8 h-8 rounded-full ring-2 ring-indigo-200"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-indigo-100 ring-2 ring-indigo-200 flex items-center justify-center">
                    <User size={16} className="text-indigo-600" />
                  </div>
                )}
                <span className="text-sm font-medium hidden sm:block text-gray-700">
                  {currentUser?.name || 'User'}
                </span>
                <ChevronDown size={16} className="text-gray-500" />
              </button>
              
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50 animate-in slide-in-from-top-2">
                  <div className="p-3 border-b bg-gradient-to-r from-indigo-50 to-purple-50">
                    <p className="font-medium text-sm text-gray-800">{currentUser?.name || 'User'}</p>
                    <p className="text-xs text-gray-500">Member ID: {currentUser?.user_id || 'N/A'}</p>
                    {/* {tokenInfo && (
                      <p className={`text-xs mt-1 ${
                        tokenInfo.expired ? 'text-red-500' : 
                        tokenInfo.timeLeft < 300 ? 'text-orange-500' : 'text-green-500'
                      }`}>
                        {tokenInfo.expired ? 'Session Expired' : `Session: ${tokenInfo.message}`}
                      </p>
                    )} */}
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ================= CONTENT ================= */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Alert - Only show on Dashboard tab */}
          {/* {activeTab === 'Dashboard' && (
            <div className="bg-red-50 text-red-600 px-4 py-2 rounded-md text-sm">
              Please complete your profile in Profile menu.
            </div>
          )} */}

          {/* Render content based on active tab */}
          {activeTab === 'Dashboard' ? (
            <DashboardContent 
              chartPeriod={chartPeriod} 
              setChartPeriod={setChartPeriod} 
              dashboardData={dashboardData}
              currentUser={currentUser}
              loading={isLoading}
            />
          ) : (
            renderTabContent(activeTab)
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= HELPERS ================= */

function MenuItem({ icon, label, active, collapsed, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`relative flex items-center ${collapsed ? 'justify-center px-3' : 'gap-4 px-4'} py-3.5 rounded-xl cursor-pointer transition-all duration-300 group overflow-hidden
      ${
        active
          ? "bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white shadow-lg transform scale-[1.02]"
          : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:via-indigo-50 hover:to-purple-50 hover:text-blue-700 hover:shadow-md hover:transform hover:scale-[1.01]"
      }`}
      title={collapsed ? label : ''}
    >
      {/* Background decoration for active state */}
      {active && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50"></div>
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/30 rounded-l-full"></div>
        </>
      )}
      
      {/* Icon container */}
      <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
        active 
          ? 'bg-white/20 text-white shadow-lg' 
          : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-700 group-hover:shadow-md'
      }`}>
        {icon}
      </div>
      
      {/* Label */}
      {!collapsed && (
        <span className={`relative z-10 text-sm font-semibold transition-all duration-300 ${
          active ? 'text-white' : 'text-gray-700 group-hover:text-blue-700'
        }`}>
          {label}
        </span>
      )}
      
      {/* Hover effect */}
      {!active && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/5 transition-all duration-300 rounded-xl"></div>
      )}
    </div>
  );
}

function StatCard({ title, amount }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-800">₹ {amount}</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 group-hover:from-indigo-500 group-hover:to-purple-500 group-hover:text-white transition-all duration-200">
          ₹
        </div>
      </div>
    </div>
  );
}

function InfoCardProfessional({ label, value, icon, bgColor, iconBg, textColor }) {
  return (
    <div className={`${bgColor} rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer`}>
      <div className="flex items-start gap-3">
        <div className={`${iconBg} w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
          <span className="text-xl">{icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-medium ${textColor} uppercase tracking-wide mb-1`}>{label}</p>
          <p className="font-semibold text-gray-800 text-sm truncate" title={value}>{value}</p>
        </div>
      </div>
    </div>
  );
}

function InfoRowProfessional({ label, value, icon }) {
  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <span className="text-sm text-gray-600 font-medium">{label}</span>
      </div>
      <span className="text-sm font-semibold text-gray-800">{value}</span>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between py-2 border-b last:border-b-0 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

// Tab Content Components
const DashboardContent = ({ chartPeriod, setChartPeriod, dashboardData, currentUser, loading }) => {
  // Greeting and live time state
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const userName = currentUser?.name || 'Navneet';

  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  const formattedTime = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  const formattedDate = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  // Birthday check (compare month and day)
  let isBirthday = false;
  try {
    const dob = dashboardData?.data?.user?.date_of_birth || currentUser?.date_of_birth;
    if (dob) {
      const d = new Date(dob);
      if (!isNaN(d)) {
        isBirthday = d.getDate() === now.getDate() && d.getMonth() === now.getMonth();
      }
    }
  } catch (e) {
    isBirthday = false;
  }

  // Transform API data to chart format
  const transformApiDataToChart = (apiData, period) => {
    if (!apiData?.data) return null;
    
    const summaryKey = period === 'monthly' ? 'monthlySummary' : 'weeklySummary';
    const summary = apiData.data[summaryKey];
    
    if (!summary || !Array.isArray(summary)) return null;
    
    // Create month/week labels
    const labels = period === 'monthly' 
      ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      : ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];
    
    // Transform data structure
    const chartData = labels.map((label, index) => {
      const dataPoint = { name: label };
      
      summary.forEach(item => {
        const key = item.name.toLowerCase().replace(/\s+/g, '');
        const mappedKey = {
          'compulsorydeposits': 'compulsoryDeposit',
          'recurringdeposits': 'recurringDeposit', 
          'fixeddeposits': 'fixedDeposit',
          'loans': 'loans',
          'sahyogcard': 'sahyogCard'
        }[key] || key;
        
        dataPoint[mappedKey] = item.data[index] || 0;
      });
      
      return dataPoint;
    });
    
    return chartData;
  };
  
  // Use API data for chart if available
  const getChartData = () => {
    const apiChartData = transformApiDataToChart(dashboardData, chartPeriod);
    if (apiChartData) {
      console.log('Using API chart data:', apiChartData);
      return apiChartData;
    }
    
    // Return empty data structure if no API data
    const labels = chartPeriod === 'monthly' 
      ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      : ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];
    
    return labels.map(label => ({
      name: label,
      sahyogCard: 0,
      compulsoryDeposit: 0,
      loans: 0,
      recurringDeposit: 0,
      fixedDeposit: 0
    }));
  };
  
  const currentData = getChartData();
  
  return (
    <>

      <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {isBirthday ? `🎉 Happy Birthday, ${userName}! 🎂` : `${greeting}, ${userName}! 👋`}
            </h2>
            <p className="text-sm text-gray-600">Welcome back to your dashboard. Have a productive day ahead!</p>
          </div>

          <div className="text-sm text-right">
            <div className="text-base font-medium text-gray-900">{formattedTime}</div>
            <div className="text-xs text-gray-500 mt-0.5">{formattedDate}</div>
          </div>
        </div>
        
        {/* Profile Completion Alert */}
        {(!dashboardData?.data?.user?.profile_image || !dashboardData?.data?.user?.kyc) && (
          <div className="mt-4 p-3 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="animate-pulse">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
              </div>
              <p className="text-sm font-medium text-orange-800 animate-pulse">
                📋 Complete your Profile to proceed with KYC process and unlock all features!
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
       
        {/* Profile Card */}
        <div 
          className="relative rounded-xl overflow-hidden shadow-xl"
          style={{
            backgroundImage: `url(${profileImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-linear-to-br from-indigo-600/90 via-purple-600/90 to-indigo-800/90"></div>
          <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>
          
          <div className="relative z-10 p-6 text-white">
            <div className="flex flex-col items-center mb-6">
              <div className="w-full bg-white/20 backdrop-blur-xl rounded-2xl p-6 mb-4 relative overflow-hidden border border-white/30 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300/20 rounded-full translate-y-12 -translate-x-12 blur-xl"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 bg-white/6 rounded-md px-3 py-1 mb-4 border border-white/10">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400 shrink-0" aria-hidden="true" />
                      <div className="leading-tight">
                        <div className="text-[10px] text-white/80 uppercase tracking-wide">Status</div>
                        <div className="text-sm font-medium text-white">Active Member</div>
                      </div>
                    </div>
                    
                   
                    
                    <p className="text-sm opacity-95 leading-relaxed font-medium px-2">
                      Vertex Kalyan Cooperative Urban Thrift & Credit Society Ltd.
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-center mb-8">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                      {dashboardData?.data?.user?.profile_image ? (
                        <img 
                          src={dashboardData.data.user.profile_image} 
                          className="relative w-28 h-28 rounded-full border-4 border-white shadow-2xl object-cover" 
                          alt="Profile" 
                        />
                      ) : (
                        <div className="relative w-28 h-28 rounded-full border-4 border-white shadow-2xl bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500 flex items-center justify-center">
                          <User size={52} className="text-white drop-shadow-lg" />
                        </div>
                      )}
                      <div className="absolute -bottom-1 -right-1 w-9 h-9 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-4 border-white flex items-center justify-center shadow-xl">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="font-bold text-2xl mb-2 text-white drop-shadow-lg">{dashboardData?.data?.user?.name || 'Loading...'}</h3>
                    <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-4">
                      <CreditCard size={14} className="text-white/80" />
                      <p className="text-sm font-medium text-white/90">{dashboardData?.data?.user?.account_number || 'Loading...'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-4 text-center border border-blue-100 shadow-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <p className="text-xs text-gray-600 font-medium mb-1">Joining Date</p>
                <p className="font-bold text-sm text-gray-800">
                  {dashboardData?.data?.user?.created_date ? new Date(dashboardData.data.user.created_date).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl p-4 text-center border border-purple-100 shadow-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <CreditCard size={16} className="text-white" />
                </div>
                <p className="text-xs text-gray-600 font-medium mb-1">User ID</p>
                <p className="font-bold text-sm text-gray-800">{dashboardData?.data?.user?.user_id || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard 
              title="Compulsory Deposit" 
              amount={dashboardData?.data?.totalCompulsoryDeposits || "0"} 
            />
            <StatCard 
              title="Sahyog Card" 
              amount={dashboardData?.data?.totalCreditCards || "0"} 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard 
              title="Direct Referral" 
              amount={dashboardData?.data?.directReferralAmount || "0"} 
            />
            <StatCard 
              title="Shared Money" 
              amount={dashboardData?.data?.shared_money || "0"} 
            />
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-t-xl border-b">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">Financial Products Analysis</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setChartPeriod('monthly')}
                    className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                      chartPeriod === 'monthly' 
                        ? 'bg-indigo-600 text-white' 
                        : 'border border-indigo-200 text-indigo-600 hover:bg-indigo-50'
                    }`}
                  >
                    Monthly
                  </button>
                  <button 
                    onClick={() => setChartPeriod('weekly')}
                    className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                      chartPeriod === 'weekly' 
                        ? 'bg-indigo-600 text-white' 
                        : 'border border-indigo-200 text-indigo-600 hover:bg-indigo-50'
                    }`}
                  >
                    Weekly
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              {/* Chart Legend */}
              <div className="mb-4 flex flex-wrap gap-4 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-blue-500"></div>
                  <span className="text-xs text-gray-600">Sahyog Card</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-green-500"></div>
                  <span className="text-xs text-gray-600">Compulsory Deposit</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-amber-500"></div>
                  <span className="text-xs text-gray-600">Loans</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-purple-500"></div>
                  <span className="text-xs text-gray-600">Recurring Deposit</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-red-500"></div>
                  <span className="text-xs text-gray-600">Fixed Deposit</span>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={{ stroke: '#e0e0e0' }} />
                    <YAxis tick={{ fontSize: 12 }} axisLine={{ stroke: '#e0e0e0' }} />
                    <Tooltip 
                      formatter={(value, name) => [`₹${value.toLocaleString()}`, name]} 
                      labelFormatter={(label) => `${chartPeriod === 'monthly' ? 'Month' : 'Week'}: ${label}`} 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} 
                    />
                    <Bar dataKey="sahyogCard" fill="#3b82f6" name="Sahyog Card" radius={[2, 2, 0, 0]} maxBarSize={40} />
                    <Bar dataKey="compulsoryDeposit" fill="#10b981" name="Compulsory Deposit" radius={[2, 2, 0, 0]} maxBarSize={40} />
                    <Bar dataKey="loans" fill="#f59e0b" name="Loans" radius={[2, 2, 0, 0]} maxBarSize={40} />
                    <Bar dataKey="recurringDeposit" fill="#8b5cf6" name="Recurring Deposit" radius={[2, 2, 0, 0]} maxBarSize={40} />
                    <Bar dataKey="fixedDeposit" fill="#ef4444" name="Fixed Deposit" radius={[2, 2, 0, 0]} maxBarSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
          <h3 className="font-bold text-white text-lg flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            Personal Information
          </h3>
          <p className="text-white/80 text-sm mt-1">Your profile details and contact information</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoCardProfessional 
              label="Full Name" 
              value={dashboardData?.data?.user?.name || "N/A"} 
              icon="👤" 
              bgColor="bg-blue-50" 
              iconBg="bg-blue-100" 
              textColor="text-blue-600" 
            />
            <InfoCardProfessional 
              label="Mobile" 
              value={dashboardData?.data?.user?.mobile_number || "N/A"} 
              icon="📱" 
              bgColor="bg-green-50" 
              iconBg="bg-green-100" 
              textColor="text-green-600" 
            />
            <InfoCardProfessional 
              label="E-mail" 
              value={dashboardData?.data?.user?.email_id || "N/A"} 
              icon="✉️" 
              bgColor="bg-purple-50" 
              iconBg="bg-purple-100" 
              textColor="text-purple-600" 
            />
            <InfoCardProfessional 
              label="Gender" 
              value={dashboardData?.data?.user?.gender || "N/A"} 
              icon="⚤" 
              bgColor="bg-orange-50" 
              iconBg="bg-orange-100" 
              textColor="text-orange-600" 
            />
            <InfoCardProfessional 
              label="Date of Birth" 
              value={dashboardData?.data?.user?.date_of_birth ? new Date(dashboardData.data.user.date_of_birth).toLocaleDateString() : "N/A"} 
              icon="🎂" 
              bgColor="bg-pink-50" 
              iconBg="bg-pink-100" 
              textColor="text-pink-600" 
            />
            <InfoCardProfessional 
              label="Registered On" 
              value={dashboardData?.data?.user?.created_date ? new Date(dashboardData.data.user.created_date).toLocaleDateString() : "N/A"} 
              icon="📅" 
              bgColor="bg-indigo-50" 
              iconBg="bg-indigo-100" 
              textColor="text-indigo-600" 
            />
          </div>
        </div>
      </div>
    </>
  );
};