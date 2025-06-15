import React from 'react';
import { Menu } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { t } = useLanguage();

  return (
    <header className="bg-gradient-to-r from-emerald-800 to-green-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img 
              src="/amazon-logo.png" 
              alt="Amazônia Explorer Logo" 
              className="h-10 w-10 rounded-full bg-white p-1"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/40?text=AE";
              }}
            />
            <div>
              <h1 className="text-2xl font-bold">{t('footer.title')}</h1>
              <p className="text-sm text-emerald-200">{t('hero.subtitle').split(' ').slice(0, 3).join(' ')}...</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8">
              <a href="#inicio" className="hover:text-emerald-300 transition-colors">{t('nav.home')}</a>
              <a href="#descobertas" className="hover:text-emerald-300 transition-colors">{t('nav.discoveries')}</a>
              <a href="#metodologia" className="hover:text-emerald-300 transition-colors">{t('nav.methodology')}</a>
              <a href="#mapas" className="hover:text-emerald-300 transition-colors">{t('nav.maps')}</a>
              <a href="#sobre" className="hover:text-emerald-300 transition-colors">{t('nav.about')}</a>
            </nav>
            <LanguageSwitcher />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            <button 
              className="text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col space-y-3 pb-3">
            <a href="#inicio" className="hover:text-emerald-300 transition-colors">{t('nav.home')}</a>
            <a href="#descobertas" className="hover:text-emerald-300 transition-colors">{t('nav.discoveries')}</a>
            <a href="#metodologia" className="hover:text-emerald-300 transition-colors">{t('nav.methodology')}</a>
            <a href="#mapas" className="hover:text-emerald-300 transition-colors">{t('nav.maps')}</a>
            <a href="#sobre" className="hover:text-emerald-300 transition-colors">{t('nav.about')}</a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
