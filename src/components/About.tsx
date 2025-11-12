export default function About() {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'SJ',
      description: 'Former fintech executive with 15+ years in payment processing',
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'MC',
      description: 'AI specialist focused on dispute resolution automation',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Product',
      image: 'ER',
      description: 'Product leader passionate about user experience',
    },
    {
      name: 'David Kim',
      role: 'Head of Customer Success',
      image: 'DK',
      description: 'Dedicated to helping businesses recover every dollar',
    },
  ];

  const values = [
    {
      title: 'Trust First',
      description: 'We handle your financial data with the highest security standards and transparency.',
    },
    {
      title: 'Innovation',
      description: 'Constantly pushing boundaries to make dispute management smarter and faster.',
    },
    {
      title: 'Customer Success',
      description: 'Your wins are our wins. We measure success by the money you recover.',
    },
    {
      title: 'Simplicity',
      description: 'Complex problems deserve simple solutions. We make disputes effortless.',
    },
  ];

  const stats = [
    { number: '$2M+', label: 'Recovered for customers' },
    { number: '500+', label: 'Active businesses' },
    { number: '62%', label: 'Average win rate' },
    { number: '24/7', label: 'AI-powered support' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0D14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            We're on a mission to make
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              dispute management effortless
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            AutoDispute was born from frustration with manual dispute processes. We believe
            businesses should focus on growth, not paperwork.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
            >
              <p className="text-4xl font-bold text-white mb-2">{stat.number}</p>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-24">
          <h2 className="text-4xl font-bold text-white mb-6 text-center">Our Story</h2>
          <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-400 leading-relaxed">
            <p>
              In 2023, our founder Sarah Johnson spent weeks manually disputing thousands of
              dollars in fraudulent charges for her SaaS company. The process was tedious,
              time-consuming, and frustrating.
            </p>
            <p>
              She realized that if she was struggling with this, thousands of other businesses
              were too. That's when the idea for AutoDispute was born.
            </p>
            <p>
              Today, we're helping hundreds of businesses automatically manage and win disputes,
              recovering millions of dollars that would have otherwise been lost.
            </p>
          </div>
        </div>

        <div className="mb-24">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-24">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Meet the Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {member.image}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-blue-400 text-sm mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Join Us on This Journey</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            We're always looking for talented people who share our passion for innovation
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-xl">
            View Open Positions
          </button>
        </div>
      </div>
    </div>
  );
}
