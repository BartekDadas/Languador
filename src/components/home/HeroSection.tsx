import { ArrowRight, Brain, Target, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useLocaleStore } from '../../store/localeStore';

export function HeroSection() {
  const t = useLocaleStore((state) => state.t);

  return (
    <div className="relative bg-gradient-to-br from-primary to-primary-dark text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Button
              as={Link}
              to="/learn"
              size="lg"
              className="bg-yellow-400 text-primary-dark hover:bg-yellow-300 font-semibold"
            >
              {t('hero.startLearning')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              as={Link}
              to="/practice"
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 font-semibold"
            >
              {t('hero.practiceNow')}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Brain className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {t('hero.features.adaptive.title')}
              </h3>
              <p className="text-white/80">
                {t('hero.features.adaptive.desc')}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Target className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {t('hero.features.challenges.title')}
              </h3>
              <p className="text-white/80">
                {t('hero.features.challenges.desc')}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Trophy className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {t('hero.features.progress.title')}
              </h3>
              <p className="text-white/80">
                {t('hero.features.progress.desc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}