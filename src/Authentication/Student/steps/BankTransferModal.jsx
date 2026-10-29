import React from 'react';
import { Building2, Check, Loader2 } from 'lucide-react';

export default function BankTransferModal({
  monthlyTotal,
  copied,
  isProcessing,
  onCopy,
  onClose,
  onConfirm
}) {
  return (
    <div className="absolute inset-0 bg-white/95 backdrop-blur-xs z-50 flex flex-col justify-between p-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-[#30336B]">
          <Building2 className="w-6 h-6" />
          <h3 className="text-sm font-bold">Bank Transfer Details</h3>
        </div>
        
        <p className="text-xs text-[#8B94AD]">
          Please transfer the exact amount of <strong className="text-[#111111]">${monthlyTotal.toFixed(2)}</strong> to the account details below:
        </p>

        <div className="bg-[#EEF2F6] p-4 rounded-xl space-y-2 border border-[#E2E8F0]">
          <div className="flex justify-between text-xs">
            <span className="text-[#8B94AD]">Bank Name:</span>
            <span className="font-bold text-[#111111]">Global Trust Bank</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-[#8B94AD]">Account Name:</span>
            <span className="font-bold text-[#111111]">EduLearn Platforms Inc.</span>
          </div>
          <div className="flex justify-between text-xs items-center">
            <span className="text-[#8B94AD]">Account Number:</span>
            <div className="flex items-center space-x-2">
              <span className="font-mono font-bold text-[#30336B]">4098231902</span>
              <button 
                type="button" 
                onClick={onCopy}
                className="text-[#30336B] hover:text-[#252854] p-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <span className="text-[10px] underline">Copy</span>}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-5 border-t border-[#F1F3F7]">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex min-h-[40px] items-center justify-center rounded-xl bg-[#F1F3F7] px-5 text-xs font-bold text-[#30336B] hover:bg-[#E8EBF1] cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isProcessing}
          className="inline-flex min-h-[40px] items-center justify-center rounded-xl bg-[#30336B] px-5 text-xs font-bold text-white hover:bg-[#252854] cursor-pointer gap-2"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Confirming...</span>
            </>
          ) : (
            <span>I Have Made This Transfer</span>
          )}
        </button>
      </div>
    </div>
  );
}