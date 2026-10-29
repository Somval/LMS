import React from 'react';
import { Headphones, ChevronRight } from 'lucide-react';

export const PrivacyAndSupport = () => {
  const links = ['Privacy & Terms', 'Help & Support', 'Report an Issue'];

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
          <Headphones size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Privacy & Support</h2>
          <p className="text-xs text-gray-400">Find help, report issues, and review our policies.</p>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {links.map((link, idx) => (
          <button
            key={idx}
            className="w-full flex items-center justify-between py-4 hover:bg-gray-50 px-2 rounded-lg transition-colors text-left"
          >
            <span className="text-sm font-semibold text-gray-800">{link}</span>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );
};