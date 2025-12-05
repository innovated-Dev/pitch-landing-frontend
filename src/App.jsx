import React, { useState } from 'react';
import { ArrowRight, TrendingUp, ChevronDown, X } from 'lucide-react';
import { API_URL, TELEGRAM_GROUP, PLATFORM_URL } from './config';


export default function TokenMarketsLanding() {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedVIP, setSelectedVIP] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const sendToBrevo = async (emailAddress, vipLevel = null) => {
    setIsLoading(true);
    
    try {
      // Call your Express backend
      const response = await fetch(`${API_URL}/api/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailAddress,
          vipLevel: vipLevel || 'Not Subscribed'
        })
      });

      const data = await response.json();

      if (data.success) {
        setShowModal(true);
        setEmail('');
        setSelectedVIP(null);
        setIsLoading(false);
        
        if (data.duplicate) {
          alert('You are already subscribed! Please check your email for details.');
        }
        
        return true;
      } else {
        throw new Error(data.error || 'Failed to subscribe');
      }
      
    } catch (error) {
      setIsLoading(false);
      alert(`Oops! Something went wrong: ${error.message}`);
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    await sendToBrevo(email, selectedVIP);
  };

  const handleVIPClick = async (level) => {
    setSelectedVIP(level);
    if (email && email.includes('@')) {
      await sendToBrevo(email, level);
    } else {
      const userEmail = prompt(`Enter your email to get started with VIP ${level}:`);
      if (userEmail && userEmail.includes('@')) {
        setEmail(userEmail);
        await sendToBrevo(userEmail, level);
      }
    }
  };

  const vipPackages = [
    { level: 1, price: 100, limit: '5,000', groups: 5, color: 'from-blue-400 to-blue-600' },
    { level: 2, price: 250, limit: '20,000', groups: 20, color: 'from-blue-500 to-cyan-500' },
    { level: 3, price: 550, limit: '100,000', groups: 50, color: 'from-cyan-500 to-teal-500' },
    { level: 4, price: 1250, limit: '300,000', groups: 100, color: 'from-teal-500 to-emerald-500' },
    { level: 5, price: 3550, limit: '600,000', groups: 'Unlimited', color: 'from-emerald-500 to-green-500' },
    { level: 6, price: 10550, limit: 'Unlimited', groups: 'Unlimited', color: 'from-purple-500 via-pink-500 to-blue-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse top-0 -left-20"></div>
        <div className="absolute w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse bottom-0 -right-20 animation-delay-2000"></div>
        <div className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-blue-900/30 backdrop-blur-sm bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">TOKEN MARKETS</span>
            </div>
            <a href={PLATFORM_URL} target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all font-semibold">
              Launch App
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-blue-900/30 backdrop-blur-sm border border-blue-500/30 rounded-full">
            <span className="text-cyan-400 font-semibold">🚀 Trade Smarter, Not Harder</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight">
            A Smarter Way to Build
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Digital Wealth
            </span>
          </h1>
          <p className="text-xl text-blue-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            Trade tokens with full control. Unlock higher trading limits with VIP ranks. Withdraw profits anytime. No lock-ins. No forced investment.
          </p>
          
          {/* Email Signup */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={isLoading}
                className="flex-1 px-6 py-4 bg-slate-900/50 backdrop-blur-sm border border-blue-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-blue-300/50 disabled:opacity-50"
              />
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all font-semibold flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : 'Get Started'} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <a href="#vip-packages" className="text-blue-300 hover:text-cyan-400 transition-colors flex items-center gap-2 mx-auto w-fit">
            View VIP Packages <ChevronDown className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 py-20 px-4 bg-slate-950/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            How <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Token Markets</span> Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Choose Your VIP Rank', desc: 'Unlock your trading tier and receive the same amount in your ledger balance.' },
              { step: 2, title: 'Trade Tokens Anytime', desc: 'Buy, hold, swap, and sell tokens at your pace based on real-time market performance.' },
              { step: 3, title: 'Earn Through Smart Trading', desc: 'Sell when the market rises. Convert between tokens, including BTC, USDT, and others.' },
              { step: 4, title: 'Withdraw Anytime', desc: 'Take profits whenever you choose. A small network & platform fee applies.' }
            ].map((item) => (
              <div key={item.step} className="relative p-6 bg-gradient-to-br from-slate-900/80 to-blue-950/50 backdrop-blur-sm rounded-xl border border-blue-500/20 hover:border-cyan-400/50 transition-all">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/50">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3 mt-4 text-cyan-300">{item.title}</h3>
                <p className="text-blue-200/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIP Packages */}
      <section id="vip-packages" className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">VIP Packages</span>
          </h2>
          <p className="text-center text-blue-200 mb-16">Choose the tier that matches your trading ambitions</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vipPackages.map((pkg) => (
              <div key={pkg.level} className={`relative p-8 bg-gradient-to-br from-slate-900/80 to-blue-950/60 backdrop-blur-sm rounded-2xl border ${pkg.level === 6 ? 'border-purple-500/50 shadow-2xl shadow-purple-500/30' : 'border-blue-500/20'} hover:scale-105 transition-all`}>
                <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-gradient-to-r ${pkg.color} rounded-full font-bold shadow-lg`}>
                  VIP {pkg.level}
                </div>
                <div className="mt-6 text-center">
                  <div className="text-5xl font-bold mb-6">
                    <span className="text-3xl text-blue-300">$</span>
                    {pkg.price.toLocaleString()}
                  </div>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between py-3 border-b border-blue-500/20">
                      <span className="text-blue-200">Trade Limit</span>
                      <span className="font-bold text-cyan-400">${pkg.limit}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-blue-500/20">
                      <span className="text-blue-200">Groups</span>
                      <span className="font-bold text-cyan-400">{pkg.groups}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleVIPClick(pkg.level)}
                    disabled={isLoading}
                    className={`w-full py-4 bg-gradient-to-r ${pkg.color} rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all font-semibold disabled:opacity-50`}
                  >
                    {isLoading ? 'Processing...' : `Upgrade to VIP ${pkg.level}`}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-blue-900/30 backdrop-blur-sm bg-slate-950/50 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">TOKEN MARKETS</span>
          </div>
          <p className="text-blue-300 mb-6">A Smarter Way to Build Digital Wealth</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-300 mb-6">
            <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Support</a>
            <a href={TELEGRAM_GROUP} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Telegram Community</a>
          </div>
          <p className="text-blue-400/60">© Token Markets — All rights reserved</p>
        </div>
      </footer>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-8 rounded-2xl border border-cyan-500/30 max-w-md w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-blue-300 hover:text-cyan-400"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">✓</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Check Your Email! 📧</h3>
              <p className="text-blue-200 mb-6">
                We've sent you a welcome email with:
                <br/><br/>
                ✅ Telegram group invite link<br/>
                ✅ Platform access details<br/>
                ✅ Next steps to get started
                <br/><br/>
                <strong>Check your inbox in the next 5 minutes!</strong>
              </p>
              <div className="space-y-3">
                <a
                  href={TELEGRAM_GROUP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all font-semibold"
                >
                  Join Telegram Now
                </a>
                <button
                  onClick={() => setShowModal(false)}
                  className="block w-full px-8 py-3 border border-blue-500/30 rounded-lg hover:border-cyan-400/50 transition-all"
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}