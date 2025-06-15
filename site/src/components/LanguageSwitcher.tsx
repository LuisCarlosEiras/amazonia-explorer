import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center space-x-1 bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1 rounded-full text-sm transition-colors"
    >
      <Globe size={16} />
      <span>{language === 'pt' ? 'EN' : 'PT'}</span>
    </button>
  );
};

export default LanguageSwitcher;
