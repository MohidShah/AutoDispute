import { ArrowLeft, MessageSquare, Upload, FileText, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function DisputeDetail({
  dispute,
  onBack,
}: {
  dispute: {
    id: number;
    merchant: string;
    amount: string;
    date: string;
    status: string;
    reason: string;
  };
  onBack: () => void;
}) {
  const timeline = [
    {
      date: '2025-11-10',
      time: '10:30 AM',
      event: 'Dispute Created',
      description: 'You initiated the dispute',
      icon: 'create',
    },
    {
      date: '2025-11-10',
      time: '11:15 AM',
      event: 'Evidence Uploaded',
      description: '2 documents uploaded',
      icon: 'upload',
    },
    {
      date: '2025-11-10',
      time: '11:45 AM',
      event: 'Dispute Submitted',
      description: 'Submitted to payment processor',
      icon: 'submit',
    },
    {
      date: 'Pending',
      time: '-',
      event: 'Under Review',
      description: 'Waiting for processor response',
      icon: 'pending',
    },
  ];

  const evidence = [
    {
      name: 'Transaction Receipt.pdf',
      size: '1.2 MB',
      uploaded: '2025-11-10 11:15 AM',
    },
    {
      name: 'Customer Email Communication.pdf',
      size: '890 KB',
      uploaded: '2025-11-10 11:15 AM',
    },
  ];

  const statusColors: { [key: string]: string } = {
<<<<<<< HEAD
    pending: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    won: 'bg-gradient-to-r from-green-500 to-emerald-500',
    lost: 'bg-gradient-to-r from-red-500 to-rose-500',
    draft: 'bg-gray-500',
=======
    pending: 'bg-[#FFA94D]',
    won: 'bg-[#28C76F]',
    lost: 'bg-[#FF6B6B]',
    draft: 'bg-gray-400',
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
  };

  const statusIcons: { [key: string]: any } = {
    pending: AlertCircle,
    won: CheckCircle2,
    lost: AlertCircle,
    draft: Clock,
  };

  const StatusIcon = statusIcons[dispute.status];

  return (
<<<<<<< HEAD
    <div className="flex-1 overflow-auto bg-[#0A0D14]">
      <div className="p-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-400 hover:text-cyan-400 transition-colors mb-6 font-medium"
=======
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#3366FF] hover:text-[#28C76F] transition-colors mb-6 font-medium"
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
        >
          <ArrowLeft size={20} />
          Back to Disputes
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
<<<<<<< HEAD
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {dispute.merchant}
                  </h1>
                  <p className="text-gray-400">{dispute.reason}</p>
                </div>
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold ${statusColors[dispute.status]}`}
=======
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-[#1E1E2F] mb-2">
                    {dispute.merchant}
                  </h1>
                  <p className="text-gray-600">{dispute.reason}</p>
                </div>
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold ${
                    statusColors[dispute.status]
                  }`}
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                >
                  <StatusIcon size={20} />
                  {dispute.status.charAt(0).toUpperCase() + dispute.status.slice(1)}
                </div>
              </div>

<<<<<<< HEAD
              <div className="grid md:grid-cols-2 gap-6 py-6 border-y border-gray-700">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Dispute Amount</p>
                  <p className="text-2xl font-bold text-white">{dispute.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Transaction Date</p>
                  <p className="text-2xl font-bold text-white">{dispute.date}</p>
=======
              <div className="grid md:grid-cols-2 gap-6 py-6 border-y border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Dispute Amount</p>
                  <p className="text-2xl font-bold text-[#1E1E2F]">{dispute.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Transaction Date</p>
                  <p className="text-2xl font-bold text-[#1E1E2F]">{dispute.date}</p>
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                </div>
              </div>

              <div className="mt-6">
<<<<<<< HEAD
                <p className="text-sm text-gray-400 mb-3">Dispute ID</p>
                <p className="font-mono text-gray-300 text-sm bg-gray-800 p-3 rounded-lg border border-gray-700">
=======
                <p className="text-sm text-gray-600 mb-3">Dispute ID</p>
                <p className="font-mono text-[#1E1E2F] text-sm bg-gray-50 p-3 rounded-lg">
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                  dispute_{dispute.id}_autodispute_2025
                </p>
              </div>
            </div>

<<<<<<< HEAD
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-6">Evidence Submitted</h2>
=======
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-xl font-bold text-[#1E1E2F] mb-6">Evidence Submitted</h2>
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714

              <div className="space-y-4 mb-6">
                {evidence.map((file, index) => (
                  <div
                    key={index}
<<<<<<< HEAD
                    className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <FileText size={24} className="text-blue-400" />
                      <div>
                        <p className="font-medium text-white">{file.name}</p>
                        <p className="text-xs text-gray-400">
=======
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText size={24} className="text-[#3366FF]" />
                      <div>
                        <p className="font-medium text-[#1E1E2F]">{file.name}</p>
                        <p className="text-xs text-gray-600">
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                          {file.size} • Uploaded {file.uploaded}
                        </p>
                      </div>
                    </div>
<<<<<<< HEAD
                    <button className="text-gray-400 hover:text-blue-400 transition-colors">
=======
                    <button className="text-gray-600 hover:text-[#3366FF] transition-colors">
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                      →
                    </button>
                  </div>
                ))}
              </div>

<<<<<<< HEAD
              <button className="w-full px-6 py-3 border-2 border-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
=======
              <button className="w-full px-6 py-3 border-2 border-gray-300 text-[#1E1E2F] rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                <Upload size={20} />
                Add More Evidence
              </button>
            </div>

<<<<<<< HEAD
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-6">Messages</h2>

              <div className="space-y-4 mb-6">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full flex items-center justify-center font-semibold">
=======
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-xl font-bold text-[#1E1E2F] mb-6">Messages</h2>

              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#3366FF] text-white rounded-full flex items-center justify-center font-semibold">
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                      AD
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
<<<<<<< HEAD
                        <p className="font-semibold text-white">AutoDispute Assistant</p>
                        <p className="text-xs text-gray-400">2 hours ago</p>
                      </div>
                      <p className="text-gray-300 text-sm">
=======
                        <p className="font-semibold text-[#1E1E2F]">AutoDispute Assistant</p>
                        <p className="text-xs text-gray-600">2 hours ago</p>
                      </div>
                      <p className="text-gray-700 text-sm">
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                        Your dispute has been successfully submitted to the payment processor.
                        We'll monitor its progress and notify you of any updates.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
<<<<<<< HEAD
                  <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg p-4 max-w-xs border border-blue-500/30">
                    <p className="text-gray-300 text-sm">
                      Thank you for using AutoDispute. I'll keep you updated on the status.
                    </p>
                    <p className="text-xs text-gray-400 mt-2">Just now</p>
=======
                  <div className="bg-[#3366FF]/10 rounded-lg p-4 max-w-xs">
                    <p className="text-gray-700 text-sm">
                      Thank you for using AutoDispute. I'll keep you updated on the status.
                    </p>
                    <p className="text-xs text-gray-600 mt-2">Just now</p>
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Add a comment..."
<<<<<<< HEAD
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-white placeholder-gray-400"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg">
=======
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#3366FF] transition-colors"
                />
                <button className="px-6 py-3 bg-[#3366FF] text-white rounded-lg font-medium hover:bg-[#28C76F] transition-colors transform hover:-translate-y-0.5">
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                  <MessageSquare size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
<<<<<<< HEAD
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-6 border border-gray-700 sticky top-8">
              <h2 className="text-lg font-bold text-white mb-6">Timeline</h2>
=======
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
              <h2 className="text-lg font-bold text-[#1E1E2F] mb-6">Timeline</h2>
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714

              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <div key={index} className="relative pb-6 last:pb-0">
                    {index !== timeline.length - 1 && (
<<<<<<< HEAD
                      <div className="absolute left-5 top-12 w-0.5 h-12 bg-gray-700"></div>
=======
                      <div className="absolute left-5 top-12 w-0.5 h-12 bg-gray-200"></div>
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                    )}

                    <div className="flex gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          index < 3
<<<<<<< HEAD
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                            : 'bg-gray-700 text-gray-400'
=======
                            ? 'bg-[#28C76F] text-white'
                            : 'bg-gray-200 text-gray-600'
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                        }`}
                      >
                        {index < 3 ? '✓' : '○'}
                      </div>

                      <div>
<<<<<<< HEAD
                        <p className="font-semibold text-white">{item.event}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {item.date}
                          {item.time !== '-' && ` at ${item.time}`}
                        </p>
                        <p className="text-sm text-gray-300 mt-2">{item.description}</p>
=======
                        <p className="font-semibold text-[#1E1E2F]">{item.event}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          {item.date}
                          {item.time !== '-' && ` at ${item.time}`}
                        </p>
                        <p className="text-sm text-gray-700 mt-2">{item.description}</p>
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

<<<<<<< HEAD
            <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-2xl p-6 mt-6">
              <h3 className="font-semibold text-white mb-3">Dispute Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-400 mb-1">Status</p>
                  <p className="font-medium text-white">
=======
            <div className="bg-[#3366FF]/10 border border-[#3366FF]/20 rounded-xl p-6 mt-6">
              <h3 className="font-semibold text-[#1E1E2F] mb-3">Dispute Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600 mb-1">Status</p>
                  <p className="font-medium text-[#1E1E2F]">
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                    {dispute.status.charAt(0).toUpperCase() + dispute.status.slice(1)}
                  </p>
                </div>
                <div>
<<<<<<< HEAD
                  <p className="text-gray-400 mb-1">Created</p>
                  <p className="font-medium text-white">Nov 10, 2025</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Days Pending</p>
                  <p className="font-medium text-white">0 days</p>
=======
                  <p className="text-gray-600 mb-1">Created</p>
                  <p className="font-medium text-[#1E1E2F]">Nov 10, 2025</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Days Pending</p>
                  <p className="font-medium text-[#1E1E2F]">0 days</p>
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
