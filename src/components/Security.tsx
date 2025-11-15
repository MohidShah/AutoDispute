import { Shield, Lock, Eye, Server, CheckCircle2 } from 'lucide-react';

export default function Security() {
  const features = [
    {
      icon: Lock,
      title: 'Bank-Level Encryption',
      description:
        '256-bit SSL encryption for all data in transit and at rest. Your information is protected with the same security standards used by major financial institutions.',
    },
    {
      icon: Shield,
      title: 'PCI-DSS Compliant',
      description:
        'We maintain full compliance with Payment Card Industry Data Security Standards, ensuring your payment data is handled with the highest security protocols.',
    },
    {
      icon: Server,
      title: 'Secure Infrastructure',
      description:
        'Our platform runs on enterprise-grade infrastructure with redundant systems, automated backups, and 99.9% uptime guarantee.',
    },
    {
      icon: Eye,
      title: 'Regular Security Audits',
      description:
        'Third-party security audits and penetration testing conducted quarterly to identify and address potential vulnerabilities.',
    },
  ];

  const practices = [
    {
      title: 'Data Encryption',
      points: [
        'All data encrypted with AES-256 encryption',
        'TLS 1.3 for secure data transmission',
        'End-to-end encryption for sensitive information',
        'Encrypted database backups',
      ],
    },
    {
      title: 'Access Control',
      points: [
        'Multi-factor authentication (MFA) required',
        'Role-based access control (RBAC)',
        'IP whitelisting available',
        'Session timeout and management',
      ],
    },
    {
      title: 'Monitoring & Detection',
      points: [
        '24/7 security monitoring',
        'Automated threat detection',
        'Real-time alert systems',
        'Comprehensive audit logs',
      ],
    },
    {
      title: 'Data Privacy',
      points: [
        'GDPR and CCPA compliant',
        'Data minimization practices',
        'Right to deletion honored',
        'Transparent data usage policies',
      ],
    },
  ];

  const certifications = [
    {
      name: 'SOC 2 Type II',
      description: 'Certified for security, availability, and confidentiality',
    },
    {
      name: 'ISO 27001',
      description: 'Information security management system certified',
    },
    {
      name: 'PCI-DSS Level 1',
      description: 'Highest level of payment card security compliance',
    },
    {
      name: 'GDPR Compliant',
      description: 'Full compliance with EU data protection regulations',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0D14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Security{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              You Can Trust
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Your financial data deserves the highest level of protection. We employ
            enterprise-grade security measures to keep your information safe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                  <Icon size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mb-24">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Security Practices
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {practices.map((practice, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-800"
              >
                <h3 className="text-xl font-bold text-white mb-4">{practice.title}</h3>
                <ul className="space-y-3">
                  {practice.points.map((point, pIndex) => (
                    <li key={pIndex} className="flex items-start gap-2 text-gray-400 text-sm">
                      <CheckCircle2 size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-24">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Certifications & Compliance
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-800 text-center hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{cert.name}</h3>
                <p className="text-gray-400 text-sm">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-12 rounded-3xl border border-gray-800 mb-24">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Incident Response
          </h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-8 leading-relaxed">
            In the unlikely event of a security incident, we have comprehensive response
            procedures in place to quickly identify, contain, and resolve any issues while
            keeping you informed every step of the way.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">{'<'}15min</div>
              <p className="text-gray-400 text-sm">Initial response time</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">24/7</div>
              <p className="text-gray-400 text-sm">Security team availability</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">100%</div>
              <p className="text-gray-400 text-sm">Incident transparency</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 p-8 rounded-2xl border border-blue-500/30">
          <div className="flex items-start gap-4">
            <Shield className="text-blue-400 flex-shrink-0 mt-1" size={32} />
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Responsible Disclosure
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                We welcome security researchers to responsibly disclose any vulnerabilities
                they discover. We commit to acknowledging and addressing reports promptly.
              </p>
              <a
                href="mailto:security@autodispute.com"
                className="text-blue-400 font-semibold hover:text-blue-300 transition-colors"
              >
                security@autodispute.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
