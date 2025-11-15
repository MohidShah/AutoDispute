export default function Privacy() {
  const sections = [
    {
      title: 'Information We Collect',
      content: [
        'We collect information that you provide directly to us, including when you create an account, connect payment processors, submit disputes, or contact our support team.',
        'This information may include your name, email address, company name, payment processor credentials (stored securely), transaction data, and dispute-related documentation.',
        'We automatically collect certain information about your device and how you interact with our services, including IP addresses, browser type, operating system, and usage patterns.',
      ],
    },
    {
      title: 'How We Use Your Information',
      content: [
        'To provide, maintain, and improve our dispute management services',
        'To process and manage your payment disputes',
        'To communicate with you about your account and disputes',
        'To detect and prevent fraud and security threats',
        'To comply with legal obligations and enforce our terms',
        'To analyze usage patterns and improve user experience',
      ],
    },
    {
      title: 'Data Security',
      content: [
        'We implement bank-level security measures to protect your information, including 256-bit SSL encryption for data in transit and at rest.',
        'We are PCI-DSS compliant and undergo regular security audits.',
        'Payment processor credentials are encrypted and stored using industry-standard security protocols.',
        'Access to your data is restricted to authorized personnel only, and all access is logged and monitored.',
        'We maintain comprehensive backup and disaster recovery procedures to ensure data availability.',
      ],
    },
    {
      title: 'Data Sharing and Disclosure',
      content: [
        'We do not sell your personal information to third parties.',
        'We may share your information with payment processors and financial institutions as necessary to process disputes on your behalf.',
        'We may disclose information to comply with legal obligations, respond to lawful requests, or protect our rights and safety.',
        'We may share anonymized, aggregated data for research and analytics purposes.',
      ],
    },
    {
      title: 'Your Rights and Choices',
      content: [
        'You have the right to access, update, or delete your personal information at any time through your account settings.',
        'You can opt out of marketing communications while still receiving important account notifications.',
        'You have the right to request a copy of your data or request that we delete your account.',
        'You can disable certain data collection features, though this may limit functionality.',
        'For users in the EU, GDPR rights apply, including data portability and the right to be forgotten.',
      ],
    },
    {
      title: 'Data Retention',
      content: [
        'We retain your information for as long as your account is active or as needed to provide services.',
        'Dispute-related data is retained for 7 years to comply with financial regulations.',
        'When you close your account, we will delete or anonymize your personal information within 90 days, except where retention is required by law.',
      ],
    },
    {
      title: 'Cookies and Tracking',
      content: [
        'We use cookies and similar technologies to provide functionality, analyze usage, and improve our services.',
        'You can control cookie preferences through your browser settings.',
        'We use analytics tools to understand how users interact with our platform.',
      ],
    },
    {
      title: 'International Data Transfers',
      content: [
        'Your information may be transferred to and processed in countries other than your country of residence.',
        'We ensure appropriate safeguards are in place for international data transfers, including standard contractual clauses.',
      ],
    },
    {
      title: 'Children\'s Privacy',
      content: [
        'Our services are not intended for individuals under the age of 18.',
        'We do not knowingly collect information from children.',
      ],
    },
    {
      title: 'Changes to This Policy',
      content: [
        'We may update this privacy policy from time to time.',
        'We will notify you of significant changes via email or through our platform.',
        'Continued use of our services after changes constitutes acceptance of the updated policy.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0D14]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Privacy Policy</h1>
          <p className="text-gray-400 text-lg">
            Last updated: November 12, 2025
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 p-6 rounded-2xl border border-blue-500/30 mb-12">
          <p className="text-gray-300 leading-relaxed">
            At AutoDispute, we take your privacy seriously. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you use our dispute
            management platform. Please read this policy carefully.
          </p>
        </div>

        <div className="space-y-12">
          {sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
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
          <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-gray-400 mb-4">
            If you have questions or concerns about this Privacy Policy or our data practices,
            please contact us:
          </p>
          <div className="space-y-2 text-gray-300">
            <p>Email: privacy@autodispute.com</p>
            <p>Address: AutoDispute Inc., San Francisco, CA</p>
          </div>
        </div>
      </div>
    </div>
  );
}
