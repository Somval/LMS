import React, { useState } from 'react';
import { ChevronRight, X, Save, Check } from 'lucide-react';
import { api } from '../../lib/api';

const EMPTY_FORM = { currentPassword: '', newPassword: '', confirmPassword: '' };

export const AccountSecurity = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
    setForm(EMPTY_FORM);
    setError('');
    setDone(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const { currentPassword, newPassword, confirmPassword } = form;
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    if (newPassword.length < 8 || !/[A-Za-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      setError('Your new password needs at least 8 characters, with a letter and a number.');
      return;
    }
    setSaving(true);
    try {
      await api.post('/account/change-password', { currentPassword, newPassword });
      setDone(true);
      setTimeout(closeModal, 1500);
    } catch (err) {
      setError(err.message || 'Could not change your password. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const items = [
    {
      icon: <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.75 23.625C15.75 22.3824 16.7574 21.375 18 21.375C19.2426 21.375 20.25 22.3824 20.25 23.625C20.25 24.8676 19.2426 25.875 18 25.875C16.7574 25.875 15.75 24.8676 15.75 23.625Z" fill="#0E1011"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 0C13.0294 0 9 4.02944 9 9V13.5C6.51472 13.5 4.5 15.5147 4.5 18V31.5C4.5 33.9853 6.51472 36 9 36H27C29.4853 36 31.5 33.9853 31.5 31.5V18C31.5 15.5147 29.4853 13.5 27 13.5V9C27 4.02944 22.9706 0 18 0ZM24.75 13.5V9C24.75 5.27208 21.7279 2.25 18 2.25C14.2721 2.25 11.25 5.27208 11.25 9V13.5H24.75ZM9 15.75C7.75736 15.75 6.75 16.7574 6.75 18V31.5C6.75 32.7426 7.75736 33.75 9 33.75H27C28.2426 33.75 29.25 32.7426 29.25 31.5V18C29.25 16.7574 28.2426 15.75 27 15.75H9Z" fill="#0E1011"/>
</svg>
,
      title: 'Change Password',
      desc: 'Update your password regularly.',
      onClick: () => setModalOpen(true),
    },
    {
      icon: <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1054_3584)">
<path d="M27.8715 3.21036L18.474 0.0768612C18.1663 -0.0256204 17.8337 -0.0256204 17.526 0.0768612L8.1285 3.21036C6.63436 3.70668 5.33463 4.66125 4.41397 5.93843C3.49331 7.21561 2.99856 8.75044 3 10.3249V18.0004C3 29.3449 16.8 35.6104 17.391 35.8714C17.5827 35.9565 17.7902 36.0006 18 36.0006C18.2098 36.0006 18.4173 35.9565 18.609 35.8714C19.2 35.6104 33 29.3449 33 18.0004V10.3249C33.0014 8.75044 32.5067 7.21561 31.586 5.93843C30.6654 4.66125 29.3656 3.70668 27.8715 3.21036ZM30 18.0004C30 26.1829 20.5215 31.5499 18 32.8339C15.4755 31.5544 6 26.2039 6 18.0004V10.3249C6.00009 9.38028 6.29742 8.45967 6.84985 7.69348C7.40229 6.92728 8.18182 6.35435 9.078 6.05586L18 3.08136L26.922 6.05586C27.8182 6.35435 28.5977 6.92728 29.1502 7.69348C29.7026 8.45967 29.9999 9.38028 30 10.3249V18.0004Z" fill="#0E1011"/>
<path d="M22.9497 12.4496L16.6677 18.7496L13.3017 15.2396C13.1666 15.0919 13.0033 14.9728 12.8215 14.8892C12.6396 14.8055 12.4429 14.7592 12.2428 14.7527C12.0428 14.7463 11.8435 14.78 11.6566 14.8519C11.4698 14.9237 11.2993 15.0321 11.155 15.1709C11.0107 15.3096 10.8957 15.4759 10.8167 15.6598C10.7377 15.8436 10.6962 16.0415 10.6949 16.2416C10.6935 16.4418 10.7322 16.6402 10.8087 16.8252C10.8851 17.0101 10.9979 17.1779 11.1402 17.3186L14.5992 20.9186C14.8572 21.1973 15.1689 21.4207 15.5157 21.5754C15.8625 21.7301 16.237 21.8128 16.6167 21.8186H16.6662C17.0383 21.8199 17.4069 21.7472 17.7507 21.6048C18.0944 21.4624 18.4065 21.2531 18.6687 20.9891L25.0767 14.5811C25.2166 14.4415 25.3277 14.2756 25.4036 14.093C25.4794 13.9104 25.5186 13.7147 25.5188 13.517C25.519 13.3192 25.4803 13.1234 25.4048 12.9407C25.3293 12.7579 25.2186 12.5918 25.0789 12.4519C24.9393 12.3119 24.7734 12.2008 24.5908 12.125C24.4082 12.0491 24.2125 12.01 24.0148 12.0098C23.8171 12.0096 23.6212 12.0483 23.4385 12.1238C23.2557 12.1992 23.0896 12.31 22.9497 12.4496Z" fill="#0E1011"/>
</g>
<defs>
<clipPath id="clip0_1054_3584">
<rect width="36" height="36" fill="white"/>
</clipPath>
</defs>
</svg>
,
      title: 'Two-Factor Authentication',
      desc: 'Add an extra layer of security to your account.',
      comingSoon: true,
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Account & Security</h2>
      <div className="divide-y divide-gray-100">
        {items.map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={item.onClick}
            disabled={item.comingSoon}
            className={`w-full flex items-center justify-between py-4 px-2 rounded-lg transition-colors text-left ${
              item.comingSoon ? 'opacity-70 cursor-default' : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 rounded-lg">{item.icon}</div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
            </div>
            {item.comingSoon ? (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-500">Coming soon</span>
            ) : (
              <ChevronRight size={18} className="text-gray-400" />
            )}
          </button>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true" aria-labelledby="change-password-title">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 id="change-password-title" className="text-lg font-bold text-gray-900">Change Password</h3>
              <button type="button" onClick={closeModal} aria-label="Close" className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>

            {done ? (
              <div className="flex flex-col items-center gap-2 py-8 text-center">
                <Check className="h-10 w-10 text-emerald-500" />
                <p className="text-sm font-semibold text-gray-900">Password updated</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && <p role="alert" className="text-sm font-medium text-red-600">{error}</p>}
                {[
                  ['currentPassword', 'Current password', 'current-password'],
                  ['newPassword', 'New password', 'new-password'],
                  ['confirmPassword', 'Confirm new password', 'new-password'],
                ].map(([key, label, autoComplete]) => (
                  <div key={key}>
                    <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-gray-500">{label}</label>
                    <input
                      type="password"
                      required
                      autoComplete={autoComplete}
                      value={form[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button type="button" onClick={closeModal} className="rounded-xl border border-gray-300 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2 text-xs font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-60">
                    <Save size={14} /> {saving ? 'Saving…' : 'Update Password'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};