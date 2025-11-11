import { useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Upload,
  Check,
  AlertCircle,
  FileText,
  X,
} from 'lucide-react';

export default function NewDisputeWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    transaction: '',
    reason: '',
    evidence: '',
    attachments: [] as File[],
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const steps = [
    { number: 1, title: 'Select Transaction', description: 'Choose transaction to dispute' },
    { number: 2, title: 'Dispute Reason', description: 'Tell us what happened' },
    { number: 3, title: 'Evidence', description: 'Upload supporting documents' },
    { number: 4, title: 'Review', description: 'Confirm and submit' },
  ];

  const transactions = [
    { id: '1', merchant: 'Acme Corp', amount: '$245.00', date: '2025-11-10' },
    { id: '2', merchant: 'Tech Solutions', amount: '$89.99', date: '2025-11-09' },
    { id: '3', merchant: 'Digital Services', amount: '$156.50', date: '2025-11-08' },
  ];

  const disputeReasons = [
    'Unauthorized charge',
    'Duplicate charge',
    'Service not received',
    'Product not as described',
    'Billing error',
    'Quality issue',
    'Other',
  ];

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1 && !formData.transaction) {
      newErrors.transaction = 'Please select a transaction';
    }
    if (step === 2 && !formData.reason) {
      newErrors.reason = 'Please select a dispute reason';
    }
    if (step === 3 && formData.attachments.length === 0) {
      newErrors.attachments = 'Please upload at least one document';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...files],
      }));
      setErrors((prev) => ({ ...prev, attachments: '' }));
    }
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    console.log('Submitting dispute:', formData);
    setStep(1);
    setFormData({ transaction: '', reason: '', evidence: '', attachments: [] });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#1E1E2F]">Start a Dispute</h2>
          <button className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex gap-2 mb-8">
            {steps.map((s) => (
              <div key={s.number} className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                      s.number < step
                        ? 'bg-[#28C76F] text-white'
                        : s.number === step
                          ? 'bg-[#3366FF] text-white'
                          : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {s.number < step ? <Check size={16} /> : s.number}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#1E1E2F]">{s.title}</p>
                    <p className="text-xs text-gray-600">{s.description}</p>
                  </div>
                </div>
                {s.number < steps.length && (
                  <div
                    className={`h-1 ${
                      s.number < step ? 'bg-[#28C76F]' : 'bg-gray-200'
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>

          <div className="min-h-96">
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1E1E2F] mb-6">
                  Select Transaction to Dispute
                </h3>
                {transactions.map((tx) => (
                  <button
                    key={tx.id}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, transaction: tx.id }))
                    }
                    className={`w-full p-4 rounded-lg border-2 transition-all ${
                      formData.transaction === tx.id
                        ? 'border-[#3366FF] bg-[#3366FF]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <p className="font-semibold text-[#1E1E2F]">{tx.merchant}</p>
                        <p className="text-sm text-gray-600">{tx.date}</p>
                      </div>
                      <p className="font-bold text-[#1E1E2F]">{tx.amount}</p>
                    </div>
                  </button>
                ))}
                {errors.transaction && (
                  <div className="flex items-center gap-2 text-[#FF6B6B] text-sm mt-4">
                    <AlertCircle size={16} />
                    {errors.transaction}
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1E1E2F] mb-6">
                  Why are you disputing this transaction?
                </h3>
                <div className="space-y-3">
                  {disputeReasons.map((reason) => (
                    <button
                      key={reason}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, reason }))
                      }
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        formData.reason === reason
                          ? 'border-[#3366FF] bg-[#3366FF]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <p className="font-medium text-[#1E1E2F]">{reason}</p>
                    </button>
                  ))}
                </div>
                {errors.reason && (
                  <div className="flex items-center gap-2 text-[#FF6B6B] text-sm mt-4">
                    <AlertCircle size={16} />
                    {errors.reason}
                  </div>
                )}
                <textarea
                  placeholder="Provide any additional details about the dispute..."
                  value={formData.evidence}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, evidence: e.target.value }))
                  }
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#3366FF] resize-none"
                  rows={4}
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1E1E2F] mb-6">
                  Upload Supporting Evidence
                </h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#3366FF] transition-colors cursor-pointer">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer block">
                    <Upload className="mx-auto mb-3 text-[#3366FF]" size={32} />
                    <p className="text-[#1E1E2F] font-semibold">
                      Drop files here or click to select
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Supported: PDF, images, documents (Max 10MB each)
                    </p>
                  </label>
                </div>

                {formData.attachments.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-[#1E1E2F]">
                      Uploaded Files ({formData.attachments.length})
                    </p>
                    {formData.attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <FileText size={20} className="text-gray-600" />
                          <div className="text-left">
                            <p className="text-sm font-medium text-[#1E1E2F]">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-600">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-gray-500 hover:text-[#FF6B6B] transition-colors"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {errors.attachments && (
                  <div className="flex items-center gap-2 text-[#FF6B6B] text-sm">
                    <AlertCircle size={16} />
                    {errors.attachments}
                  </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1E1E2F] mb-6">
                  Review Your Dispute
                </h3>
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Transaction</p>
                    <p className="font-semibold text-[#1E1E2F]">
                      {transactions.find((tx) => tx.id === formData.transaction)?.merchant} -{' '}
                      {transactions.find((tx) => tx.id === formData.transaction)?.amount}
                    </p>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-600 mb-1">Dispute Reason</p>
                    <p className="font-semibold text-[#1E1E2F]">{formData.reason}</p>
                  </div>
                  {formData.evidence && (
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-sm text-gray-600 mb-1">Additional Details</p>
                      <p className="text-[#1E1E2F]">{formData.evidence}</p>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-600 mb-2">Evidence Files</p>
                    <div className="space-y-2">
                      {formData.attachments.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-[#1E1E2F]"
                        >
                          <FileText size={16} />
                          {file.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-[#28C76F]/10 border border-[#28C76F] rounded-lg p-4 flex items-start gap-3">
                  <Check className="text-[#28C76F] flex-shrink-0 mt-1" size={20} />
                  <p className="text-sm text-[#1E1E2F]">
                    Your dispute is ready to submit. Our AI will help you track and resolve
                    this with your payment processor.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="flex-1 px-6 py-3 border border-gray-300 text-[#1E1E2F] rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <ChevronLeft size={20} />
              Previous
            </button>

            {step < 4 && (
              <button
                onClick={handleNext}
                className="flex-1 px-6 py-3 bg-[#3366FF] text-white rounded-lg font-medium hover:bg-[#28C76F] transition-colors transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Next
                <ChevronRight size={20} />
              </button>
            )}

            {step === 4 && (
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-[#28C76F] text-white rounded-lg font-medium hover:bg-[#3366FF] transition-colors transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Check size={20} />
                Submit Dispute
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
