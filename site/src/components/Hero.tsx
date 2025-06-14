import React from 'react';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section 
      id="inicio" 
      className="relative flex flex-col items-center justify-start text-white"
    >
      {/* Título e subtítulo acima da imagem */}
      <div className="container mx-auto px-4 text-center py-10 bg-emerald-800">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {t('hero.title')}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          {t('hero.subtitle')}
        </p>
        <a 
          href="#descobertas" 
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
        >
          {t('hero.button')}
        </a>
      </div>
      
      {/* Imagem abaixo do título */}
      <div className="w-full h-[calc(100vh-250px)] relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('/hero-background.jpg')`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#1a1a1a'
          }}
        ></div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <a href="#descobertas" className="text-white">
          <ArrowDown size={32} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
