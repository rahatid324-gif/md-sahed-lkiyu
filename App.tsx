
import React, { useState, useEffect, useCallback } from 'react';
import MarketChart from './components/MarketChart';
import SignalDisplay from './components/SignalDisplay';
import { getMarketAnalysis } from './services/geminiService';
import { MarketSignal, SignalResponse, PriceDataPoint, MarketState } from './types';

const INITIAL_MOCK_DATA: PriceDataPoint[] = [
  { time: '08:00', price: 62450 },
  { time: '10:00', price: 63100 },
  { time: '12:00', price: 62800 },
  { time: '14:00', price: 63500 },
  { time: '16:00', price: 64200 },
  { time: '18:00', price: 63900 },
  { time: '20:00', price: 64100 },
];

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [signal, setSignal] = useState<SignalResponse | null>(null);
  const [history, setHistory] = useState<SignalResponse[]>([]);
  const [market, setMarket] = useState<MarketState>({
    ticker: 'BTC/USD',
    currentPrice: 64120.55,
    change24h: 2.45,
    volume: '34.2B'
  });

  const handleGetSignal = async () => {
    setLoading(true);
    try {
      // Simulate real-time price fluctuation before analysis
      const newPrice = market.currentPrice + (Math.random() - 0.5) * 500;
      setMarket(prev => ({ ...prev, currentPrice: newPrice }));

      const context = `BTC Price: $${newPrice.toFixed(2)}, 24h Change: ${market.change24h}%, Volume: ${market.volume}. Previous trend: rising.`;
      const result = await getMarketAnalysis(market.ticker, context);
      
      setSignal(result);
      setHistory(prev => [result, ...prev].slice(0, 10));
    } catch (error) {
      console.error("Signal generation failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 py-8 md:py-12 flex flex-col gap-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/50">
                <span className="font-black text-white text-lg">Y</span>
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-white">YQT <span className="text-blue-500">QUANT</span> SAFE</h1>
          </div>
          <p className="text-slate-400 text-sm">Autonomous Algorithmic Intelligence Engine v3.1</p>
        </div>
        <div className="flex items-center gap-6 glass px-6 py-3 rounded-2xl border border-white/5">
          <div className="text-center">
             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Ticker</p>
             <p className="text-sm font-bold text-white font-mono">{market.ticker}</p>
          </div>
          <div className="text-center">
             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Price</p>
             <p className="text-sm font-bold text-white font-mono">${market.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
          <div className="text-center">
             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Change</p>
             <p className={`text-sm font-bold font-mono ${market.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
               {market.change24h >= 0 ? '+' : ''}{market.change24h}%
             </p>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Visualization & Controls */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* Main Action Card */}
          <div className="glass rounded-3xl p-8 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
            <h3 className="text-xl font-bold text-white mb-2">Market Sentiment Analysis</h3>
            <p className="text-slate-400 text-sm mb-6 max-w-lg">
              Generate a high-precision market signal using our neural processing layer. 
              Gemini 3 analyzes macro sentiment, order flow, and technical indicators in real-time.
            </p>

            <button 
              onClick={handleGetSignal}
              disabled={loading}
              className={`
                w-full md:w-auto relative group flex items-center justify-center gap-3 
                px-10 py-5 rounded-2xl transition-all duration-300 font-bold text-lg
                ${loading 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                  : 'bg-blue-500 text-white hover:bg-blue-400 hover:scale-[1.02] neon-glow animate-pulse-border border-2 border-transparent'}
              `}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-6 w-6 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>THINKING...</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>
                  <span>GET SIGNAL</span>
                </>
              )}
            </button>
          </div>

          {/* Result Area */}
          {signal ? (
            <SignalDisplay signal={signal} />
          ) : !loading && (
            <div className="glass rounded-2xl p-12 border border-dashed border-white/10 flex flex-col items-center justify-center text-center opacity-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
              <p className="text-slate-400 font-medium">No active analysis. Click the button to start the engine.</p>
            </div>
          )}

          {/* Chart */}
          <div className="flex flex-col gap-4">
             <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Live Trend Pipeline</h3>
                <span className="flex items-center gap-1.5">
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                   <span className="text-[10px] text-slate-400 font-bold uppercase">Streaming Data</span>
                </span>
             </div>
             <MarketChart data={INITIAL_MOCK_DATA} />
          </div>
        </div>

        {/* Right Column: History & Stats */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="glass rounded-2xl p-6 border border-white/5 flex flex-col gap-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-blue-400">Signal Log</h3>
            <div className="flex flex-col gap-3">
              {history.length > 0 ? (
                history.map((h, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        h.signal === MarketSignal.BUY ? 'bg-green-400' : h.signal === MarketSignal.SELL ? 'bg-red-400' : 'bg-blue-400'
                      }`}></div>
                      <span className="font-bold text-xs font-mono">{h.signal}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] text-slate-500">{new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <span className="text-[10px] font-bold text-slate-300">{h.confidence}% conf.</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 italic py-8 text-center">No logs recorded yet.</p>
              )}
            </div>
          </div>

          <div className="glass rounded-2xl p-6 border border-white/5">
             <h3 className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-4">System Integrity</h3>
             <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                   <span className="text-slate-400">API Latency</span>
                   <span className="text-green-400 font-mono">142ms</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1">
                   <div className="bg-green-400 h-1 rounded-full w-[94%]"></div>
                </div>
                
                <div className="flex justify-between items-center text-xs">
                   <span className="text-slate-400">Model Load</span>
                   <span className="text-blue-400 font-mono">12.5%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1">
                   <div className="bg-blue-400 h-1 rounded-full w-[12%]"></div>
                </div>

                <div className="flex justify-between items-center text-xs">
                   <span className="text-slate-400">Storage Usage</span>
                   <span className="text-slate-300 font-mono">0.01 GB</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1">
                   <div className="bg-slate-600 h-1 rounded-full w-[5%]"></div>
                </div>
             </div>
             
             <div className="mt-8 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                <p className="text-[10px] text-blue-400 font-bold uppercase mb-2">Safety Notice</p>
                <p className="text-[10px] text-slate-500 leading-tight">
                   YQT Safe-Bot signals are generated by AI. Past performance is not indicative of future results. Trade at your own risk.
                </p>
             </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-8 text-center text-slate-600 text-xs border-t border-white/5">
        <p>© 2025 YQT Quant Technologies. Powered by Gemini 3 Flash.</p>
      </footer>
    </div>
  );
};

export default App;
