import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    product: [
      { name: 'Dashboard', href: '#dashboard' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Features', href: '#benefits' },
    ],
    company: [
      { name: 'About', href: '#about' },
      { name: 'Blog', href: '#blog' },
      { name: 'Contact', href: '#contact' },
      { name: 'FAQ', href: '#faq' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Security', href: '#security' },
    ],
  };

  const socialLinks = [
    { Icon: Twitter, href: '#', label: 'Twitter' },
    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
    { Icon: Github, href: '#', label: 'Github' },
    { Icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="bg-[#1E1E2F] text-[#F5F7FA] pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">AutoDispute</h3>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
              Automated dispute management for modern businesses. Save time, recover more,
              and stay organized with AI-powered tools.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#3366FF] transition-colors duration-200"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#3366FF] transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#3366FF] transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#3366FF] transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 AutoDispute. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Made with care for businesses everywhere
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
