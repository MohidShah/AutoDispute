export default function Terms() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using AutoDispute, you accept and agree to be bound by these Terms of Service and our Privacy Policy.',
        'If you do not agree to these terms, you should not use our services.',
        'We reserve the right to modify these terms at any time, and continued use constitutes acceptance of modified terms.',
      ],
    },
    {
      title: 'Description of Service',
      content: [
        'AutoDispute provides automated dispute management services for payment transactions.',
        'Our platform connects to your payment processors to identify, submit, and track disputes on your behalf.',
        'We use artificial intelligence and automation to streamline the dispute resolution process.',
        'Services are provided on a subscription basis with various pricing tiers.',
      ],
    },
    {
      title: 'Account Registration',
      content: [
        'You must create an account to use AutoDispute services.',
        'You are responsible for maintaining the confidentiality of your account credentials.',
        'You must provide accurate and complete information during registration.',
        'You are responsible for all activities that occur under your account.',
        'You must notify us immediately of any unauthorized access to your account.',
      ],
    },
    {
      title: 'Payment and Billing',
      content: [
        'Subscription fees are billed monthly or annually based on your selected plan.',
        'All fees are non-refundable except as required by law or as explicitly stated.',
        'We reserve the right to change pricing with 30 days notice.',
        'You authorize us to charge your payment method for all applicable fees.',
        'Failure to pay may result in service suspension or termination.',
      ],
    },
    {
      title: 'User Responsibilities',
      content: [
        'You agree to use AutoDispute only for lawful purposes and in accordance with these terms.',
        'You are responsible for ensuring all dispute submissions are accurate and truthful.',
        'You must not attempt to manipulate or abuse the dispute process.',
        'You agree not to use our services to dispute legitimate transactions fraudulently.',
        'You must maintain secure connections to payment processors and keep credentials updated.',
      ],
    },
    {
      title: 'Intellectual Property',
      content: [
        'All content, features, and functionality of AutoDispute are owned by us and protected by copyright, trademark, and other intellectual property laws.',
        'You are granted a limited, non-exclusive, non-transferable license to access and use our services.',
        'You may not copy, modify, distribute, sell, or reverse engineer any part of our platform.',
        'Our trademarks and logos may not be used without express written permission.',
      ],
    },
    {
      title: 'Data and Privacy',
      content: [
        'We collect and process data as described in our Privacy Policy.',
        'You retain ownership of your data and grant us permission to use it to provide services.',
        'We implement security measures to protect your data but cannot guarantee absolute security.',
        'You are responsible for backing up any critical data.',
      ],
    },
    {
      title: 'Disclaimers and Limitations',
      content: [
        'Services are provided "as is" without warranties of any kind, express or implied.',
        'We do not guarantee specific outcomes for any disputes submitted through our platform.',
        'We are not responsible for decisions made by payment processors or financial institutions.',
        'We do not provide legal or financial advice.',
        'Your use of AutoDispute does not create an attorney-client or fiduciary relationship.',
      ],
    },
    {
      title: 'Limitation of Liability',
      content: [
        'To the maximum extent permitted by law, AutoDispute shall not be liable for any indirect, incidental, special, consequential, or punitive damages.',
        'Our total liability shall not exceed the amount you paid for services in the 12 months preceding the claim.',
        'Some jurisdictions do not allow limitation of liability, so these limitations may not apply to you.',
      ],
    },
    {
      title: 'Indemnification',
      content: [
        'You agree to indemnify and hold AutoDispute harmless from any claims, damages, or expenses arising from your use of our services, violation of these terms, or infringement of third-party rights.',
      ],
    },
    {
      title: 'Termination',
      content: [
        'You may cancel your subscription at any time through your account settings.',
        'We reserve the right to suspend or terminate your account for violation of these terms.',
        'Upon termination, your right to access and use the services will immediately cease.',
        'We may retain certain data as required by law or for legitimate business purposes.',
      ],
    },
    {
      title: 'Dispute Resolution',
      content: [
        'Any disputes arising from these terms shall be resolved through binding arbitration.',
        'You agree to waive your right to participate in class actions.',
        'Arbitration shall be conducted in San Francisco, California.',
        'These terms are governed by the laws of California, USA.',
      ],
    },
    {
      title: 'Third-Party Services',
      content: [
        'Our platform integrates with third-party payment processors and services.',
        'We are not responsible for the availability, accuracy, or reliability of third-party services.',
        'Your use of third-party services is subject to their respective terms and policies.',
      ],
    },
    {
      title: 'Changes to Service',
      content: [
        'We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.',
        'We will provide reasonable notice of significant changes when possible.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0D14]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Terms of Service</h1>
          <p className="text-gray-400 text-lg">
            Last updated: November 12, 2025
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 p-6 rounded-2xl border border-blue-500/30 mb-12">
          <p className="text-gray-300 leading-relaxed">
            These Terms of Service govern your use of AutoDispute's dispute management platform
            and services. By using our services, you agree to these terms in full. Please read
            them carefully before proceeding.
          </p>
        </div>

        <div className="space-y-12">
          {sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-2xl font-bold text-white mb-4">
                {index + 1}. {section.title}
              </h2>
              <div className="space-y-4">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-gray-400 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-4">Questions About These Terms?</h2>
          <p className="text-gray-400 mb-4">
            If you have any questions or concerns about these Terms of Service, please contact
            us:
          </p>
          <div className="space-y-2 text-gray-300">
            <p>Email: legal@autodispute.com</p>
            <p>Address: AutoDispute Inc., San Francisco, CA</p>
          </div>
        </div>
      </div>
    </div>
  );
}
