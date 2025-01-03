import { Brain, Users, Trophy, Zap } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Adaptive Learning',
    description: 'Our AI adjusts to your learning pace and style, ensuring optimal progress.',
  },
  {
    icon: Users,
    title: 'Multiplayer Battles',
    description: 'Challenge friends or random opponents to test your skills in real-time.',
  },
  {
    icon: Trophy,
    title: 'Achievement System',
    description: 'Earn badges and climb the leaderboard as you master new skills.',
  },
  {
    icon: Zap,
    title: 'Power-Ups',
    description: 'Use special abilities to enhance your learning experience.',
  },
];

export function FeaturesSection() {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose LinguaQuest?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience a revolutionary way to learn Spanish through gamification and interactive challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}