
import React from 'react';
import { SignalResponse, MarketSignal } from '../types';
import { TrendingUp, TrendingDown, Minus, ShieldAlert, Target, Zap } from 'lucide-react';

// Lucide-react doesn't work with standard imports here, using generic icons or SVG
const SignalIcon = ({ type }: { type: MarketSignal }) => {
  switch (type) {
    case MarketSignal.BUY:
      return <div className="text-green-400 bg-green-400/10 p-3 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg></div>;
    case MarketSignal.SELL:
      return <div className="text-red-400 bg-red-400/10 p-3 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline><polyline points="16 17 22 17 22 11"></polyline></svg></div>;
    default:
      return <div className="text-blue-400 bg-blue-400/10 p-3 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg></div>;
  }
};

const SignalDisplay: React.FC<{ signal: SignalResponse }> = ({ signal }) => {
  const getSignalColor = (type: MarketSignal) => {
    switch (type) {
      case MarketSignal.BUY: return 'text-green-400';
      case MarketSignal.SELL: return 'text-red-400';
      default: return 'text-blue-400';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'LOW': return 'text-green-300';
      case 'MEDIUM': return 'text-yellow-300';
      case 'HIGH': return 'text-red-300';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="w-full glass rounded-2xl p-6 border-l-4 border-l-blue-500 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">AI Recommendation</p>
          <div className="flex items-center gap-3">
             <SignalIcon type={signal.signal} />
             <h2 className={`text-5xl font-black tracking-tighter ${getSignalColor(signal.signal)}`}>
               {signal.signal}
             </h2>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400 uppercase font-semibold">Confidence</p>
          <p className="text-2xl font-mono text-white">{signal.confidence}%</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass bg-white/5 p-4 rounded-xl border border-white/5">
          <div className="flex items-center gap-2 mb-2 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            <span className="text-xs font-bold">RISK LEVEL</span>
          </div>
          <p className={`text-lg font-bold ${getRiskColor(signal.riskLevel)}`}>{signal.riskLevel}</p>
        </div>
        <div className="glass bg-white/5 p-4 rounded-xl border border-white/5">
          <div className="flex items-center gap-2 mb-2 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
            <span className="text-xs font-bold">TARGET PRICE</span>
          </div>
          <p className="text-lg font-bold text-white font-mono">{signal.targetPrice}</p>
        </div>
        <div className="glass bg-white/5 p-4 rounded-xl border border-white/5">
          <div className="flex items-center gap-2 mb-2 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span className="text-xs font-bold">TIMESTAMP</span>
          </div>
          <p className="text-lg font-medium text-slate-300">{new Date(signal.timestamp).toLocaleTimeString()}</p>
        </div>
      </div>

      <div className="mt-6 border-t border-white/10 pt-4">
        <p className="text-sm font-semibold text-blue-400 mb-2">Quant reasoning:</p>
        <p className="text-slate-300 leading-relaxed italic text-sm md:text-base">
          "{signal.reasoning}"
        </p>
      </div>
    </div>
  );
};

export default SignalDisplay;
