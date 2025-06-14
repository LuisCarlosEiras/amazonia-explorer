import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">{t('footer.title')}</h3>
            <p className="text-gray-400">
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">{t('footer.quicklinks')}</h3>
            <ul className="space-y-2">
              <li><a href="#inicio" className="text-gray-400 hover:text-emerald-300 transition-colors">{t('nav.home')}</a></li>
              <li><a href="#descobertas" className="text-gray-400 hover:text-emerald-300 transition-colors">{t('nav.discoveries')}</a></li>
              <li><a href="#metodologia" className="text-gray-400 hover:text-emerald-300 transition-colors">{t('nav.methodology')}</a></li>
              <li><a href="#mapas" className="text-gray-400 hover:text-emerald-300 transition-colors">{t('nav.maps')}</a></li>
              <li><a href="#sobre" className="text-gray-400 hover:text-emerald-300 transition-colors">{t('nav.about')}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">{t('footer.references')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-emerald-300 transition-colors">{t('footer.references.articles')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-300 transition-colors">{t('footer.references.datasources')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-300 transition-colors">{t('footer.references.methodology')}</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
          <p>&copy; {currentYear} {t('footer.title')}. {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
