import { useState } from 'react';
import { Menu, X, Languages, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { LocaleSwitch } from '../ui/LocaleSwitch';
import { useLocaleStore } from '../../store/localeStore';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useLocaleStore((state) => state.t);

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Languages className="h-8 w-8" />
              <span className="font-bold text-xl">Languador</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Button
              as={Link}
              to="/learn"
              variant="primary"
              className="font-semibold"
            >
              {t('nav.learn')}
            </Button>
            <Button
              as={Link}
              to="/practice"
              variant="primary"
              className="font-semibold"
            >
              {t('nav.practice')}
            </Button>
            <Button
              as={Link}
              to="/admin"
              variant="primary"
              className="font-semibold"
            >
              <Settings className="h-4 w-4 mr-1" />
              {t('nav.admin')}
            </Button>
            <LocaleSwitch />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LocaleSwitch />
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="primary"
              className="!p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-2">
              <Button
                as={Link}
                to="/learn"
                variant="primary"
                className="w-full justify-start"
              >
                {t('nav.learn')}
              </Button>
              <Button
                as={Link}
                to="/practice"
                variant="primary"
                className="w-full justify-start"
              >
                {t('nav.practice')}
              </Button>
              <Button
                as={Link}
                to="/admin"
                variant="primary"
                className="w-full justify-start"
              >
                <Settings className="h-4 w-4 mr-2" />
                {t('nav.admin')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}