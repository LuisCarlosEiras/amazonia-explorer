import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface MapSectionProps {
  maps: {
    src: string;
    alt: string;
    title: string;
    description: string;
    titleTranslationKey: string;
    descriptionTranslationKey: string;
  }[];
}

const MapSection: React.FC<MapSectionProps> = ({ maps }) => {
  const { t } = useLanguage();
  
  return (
    <section id="mapas" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-emerald-800">{t('maps.title')}</h2>
        <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-12 text-center">
          {t('maps.description')}
        </p>
        
        <div className="space-y-16">
          {maps.map((map, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
            >
              <div className="w-full md:w-1/2">
                <img 
                  src={map.src} 
                  alt={t(map.titleTranslationKey) || map.alt} 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-bold mb-4 text-emerald-700">{t(map.titleTranslationKey) || map.title}</h3>
                <p className="text-gray-700">{t(map.descriptionTranslationKey) || map.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MapSection;
