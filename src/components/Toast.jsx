import React from 'react';
import { CheckCircle2, AlertTriangle, HeartHandshake, QrCode, Sparkles, X, Info } from 'lucide-react';

export function ToastContainer({ toasts = [], onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isRescue = toast.type === 'rescue';
        const isWarning = toast.type === 'warning';
        const isQr = toast.type === 'qr';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 p-3.5 flex items-start gap-3 animate-slide-up"
          >
            {/* Icon */}
            <div
              className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-white ${
                isRescue
                  ? 'bg-rose-500 shadow-rose-200'
                  : isWarning
                  ? 'bg-amber-500 shadow-amber-200'
                  : isQr
                  ? 'bg-indigo-600 shadow-indigo-200'
                  : 'bg-emerald-500 shadow-emerald-200'
              } shadow-md`}
            >
              {isRescue && <HeartHandshake className="w-4 h-4" />}
              {isWarning && <AlertTriangle className="w-4 h-4" />}
              {isQr && <QrCode className="w-4 h-4" />}
              {isSuccess && <CheckCircle2 className="w-4 h-4" />}
              {!isRescue && !isWarning && !isQr && !isSuccess && <Info className="w-4 h-4" />}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center justify-between">
                <h5 className="font-bold text-slate-800 text-xs truncate">{toast.title}</h5>
                <span className="text-[10px] text-slate-400">Just now</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">{toast.message}</p>
            </div>

            {/* Close */}
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-slate-600 transition -mr-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
