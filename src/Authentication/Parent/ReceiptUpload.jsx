import React, { useState } from 'react';
import { UploadCloud, FileText } from 'lucide-react';
import BankTransferDetails from './BankTransferDetails';

const ACCEPTED = ['application/pdf', 'image/jpeg', 'image/png'];
const MAX_SIZE = 10 * 1024 * 1024;

// Shown after a bank-transfer payment is created: transfer details + receipt upload.
export default function ReceiptUpload({ payment, bank, onSubmit }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const choose = (f) => {
    if (!f) return;
    if (!ACCEPTED.includes(f.type)) return setError('Please choose a PDF, JPG or PNG file.');
    if (f.size > MAX_SIZE) return setError('The file must not exceed 10 MB.');
    setError('');
    setFile(f);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    if (!file) return setError('Upload your payment receipt first.');
    setSubmitting(true);
    try {
      await onSubmit(file);
    } catch (err) {
      setError(err.message || 'Could not upload your receipt.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form id="onboarding-form" onSubmit={submit} className="w-full max-w-2xl space-y-6 font-sans text-gray-800">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Complete your bank transfer</h2>
        <p className="mt-1 text-sm text-gray-400">
          Make the transfer, then upload your receipt. We will activate the account as soon as the payment is confirmed.
        </p>
      </div>

      <BankTransferDetails totalAmount={payment.amount} bank={bank} reference={payment.reference} />

      <div>
        <label htmlFor="receipt" className="mb-2 block text-sm font-semibold text-gray-800">Payment receipt</label>
        <label htmlFor="receipt" className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 px-4 py-8 text-center hover:border-indigo-400">
          {file ? (
            <>
              <FileText className="h-6 w-6 text-indigo-600" />
              <span className="text-sm font-medium text-gray-800">{file.name}</span>
              <span className="text-xs text-gray-400">Click to choose a different file</span>
            </>
          ) : (
            <>
              <UploadCloud className="h-6 w-6 text-gray-400" />
              <span className="text-sm font-medium text-gray-600">Click to upload your receipt</span>
              <span className="text-xs text-gray-400">PDF, JPG or PNG, up to 10 MB</span>
            </>
          )}
        </label>
        <input id="receipt" type="file" accept=".pdf,.jpg,.jpeg,.png" className="sr-only" onChange={(e) => choose(e.target.files?.[0])} />
      </div>

      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
      <button type="submit" className="hidden">Submit receipt</button>
    </form>
  );
}
