import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote:
        'AutoDispute cut our dispute handling time by 80% — every SaaS founder needs this.',
      name: 'Jane D.',
      company: 'SaaS Founder',
      avatar: 'JD',
    },
    {
      quote:
        'The AI-powered dispute management saved us thousands in recovered transactions.',
      name: 'Michael R.',
      company: 'E-commerce Director',
      avatar: 'MR',
    },
    {
      quote:
        'Finally, a solution that handles disputes automatically. Game changer for our team.',
      name: 'Sarah L.',
      company: 'Digital Products CEO',
      avatar: 'SL',
    },
    {
      quote:
        'The analytics and reporting features help us understand our dispute patterns better.',
      name: 'David K.',
      company: 'Finance Manager',
      avatar: 'DK',
    },
    {
      quote:
        'Simple to set up, powerful to use. Our win rate increased by 35% in the first month.',
      name: 'Emily T.',
      company: 'Operations Lead',
      avatar: 'ET',
    },
  ];

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1E1E2F] mb-4">
            Loved by Businesses Everywhere
          </h2>
          <p className="text-xl text-gray-600">See what our customers have to say</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-12 min-h-[300px] flex flex-col justify-center">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} className="text-[#FFA94D] fill-[#FFA94D]" />
              ))}
            </div>

            <blockquote className="text-xl text-gray-700 text-center mb-8 leading-relaxed">
              "{testimonials[currentIndex].quote}"
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 bg-[#3366FF] text-white rounded-full flex items-center justify-center font-bold text-lg">
                {testimonials[currentIndex].avatar}
              </div>
              <div className="text-left">
                <p className="font-semibold text-[#1E1E2F]">
                  {testimonials[currentIndex].name}
                </p>
                <p className="text-gray-600 text-sm">
                  {testimonials[currentIndex].company}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#3366FF] hover:bg-[#3366FF] hover:text-white transition-all duration-200 transform hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#3366FF] hover:bg-[#3366FF] hover:text-white transition-all duration-200 transform hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-[#3366FF] w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
