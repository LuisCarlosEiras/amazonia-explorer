import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

interface TranslationDict {
  [key: string]: {
    pt: string;
    en: string;
  };
}

const translations: TranslationDict = {
  // Header
  'nav.home': {
    pt: 'Início',
    en: 'Home'
  },
  'nav.discoveries': {
    pt: 'Descobertas',
    en: 'Discoveries'
  },
  'nav.methodology': {
    pt: 'Metodologia',
    en: 'Methodology'
  },
  'nav.maps': {
    pt: 'Mapas',
    en: 'Maps'
  },
  'nav.about': {
    pt: 'Sobre',
    en: 'About'
  },

  // Hero
  'hero.title': {
    pt: 'Explorando a Amazônia Digital',
    en: 'Exploring the Digital Amazon'
  },
  'hero.subtitle': {
    pt: 'Descobrindo civilizações ocultas sob o dossel da floresta através de tecnologias avançadas e métodos inovadores',
    en: 'Discovering hidden civilizations beneath the forest canopy through advanced technologies and innovative methods'
  },
  'hero.button': {
    pt: 'Explorar Descobertas',
    en: 'Explore Discoveries'
  },

  // Discoveries
  'discoveries.title': {
    pt: 'Descobertas Principais',
    en: 'Main Discoveries'
  },
  'discoveries.article.title': {
    pt: 'Explorando a Amazônia Digital',
    en: 'Exploring the Digital Amazon'
  },
  'discoveries.button': {
    pt: 'Ler Artigo Completo',
    en: 'Read Full Article'
  },
  'discoveries.gallery.title': {
    pt: 'Visualizações de Estruturas Arqueológicas',
    en: 'Archaeological Structure Visualizations'
  },
  
  // Image captions
  'image.geoglyph.original': {
    pt: 'Imagem original de geoglifo identificado na região amazônica',
    en: 'Original image of geoglyph identified in the Amazon region'
  },
  'image.geoglyph.edges': {
    pt: 'Aplicação de algoritmo de detecção de bordas para realçar estruturas',
    en: 'Application of edge detection algorithm to enhance structures'
  },
  'image.village.original': {
    pt: 'Imagem original de aldeia circular identificada na região do Xingu',
    en: 'Original image of circular village identified in the Xingu region'
  },
  'image.village.edges': {
    pt: 'Aplicação de algoritmo de detecção de bordas para realçar estruturas',
    en: 'Application of edge detection algorithm to enhance structures'
  },
  'image.moat.original': {
    pt: 'Imagem original de vala circular defensiva identificada',
    en: 'Original image of defensive circular moat identified'
  },
  'image.moat.edges': {
    pt: 'Aplicação de algoritmo de detecção de bordas para realçar estruturas',
    en: 'Application of edge detection algorithm to enhance structures'
  },

  // Maps
  'maps.title': {
    pt: 'Mapas e Visualizações',
    en: 'Maps and Visualizations'
  },
  'maps.description': {
    pt: 'Explore os mapas e visualizações geradas a partir de nossa análise de dados, mostrando potenciais sítios arqueológicos e padrões de assentamento na Amazônia.',
    en: 'Explore the maps and visualizations generated from our data analysis, showing potential archaeological sites and settlement patterns in the Amazon.'
  },
  'maps.amazon.title': {
    pt: 'Mapa de Previsões para a Região Amazônica',
    en: 'Prediction Map for the Amazon Region'
  },
  'maps.amazon.description': {
    pt: 'Este mapa mostra os resultados da aplicação de dois métodos independentes para previsão de coordenadas geográficas de potenciais sítios arqueológicos na região amazônica. Os pontos verdes representam sítios reais, os azuis são previsões corretas de ambos os métodos, e os vermelhos são previsões incorretas.',
    en: 'This map shows the results of applying two independent methods for predicting geographic coordinates of potential archaeological sites in the Amazon region. Green dots represent real sites, blue ones are correct predictions from both methods, and red ones are incorrect predictions.'
  },
  'maps.xingu.title': {
    pt: 'Mapa de Previsões para a Região do Xingu',
    en: 'Prediction Map for the Xingu Region'
  },
  'maps.xingu.description': {
    pt: 'Análise detalhada da região do Xingu, onde foram identificados padrões de aldeias circulares interconectadas, possivelmente relacionadas à lendária "Cidade Perdida de Z" e ao complexo de Kuhikugu.',
    en: 'Detailed analysis of the Xingu region, where patterns of interconnected circular villages were identified, possibly related to the legendary "Lost City of Z" and the Kuhikugu complex.'
  },
  'maps.features.title': {
    pt: 'Importância das Características Ambientais',
    en: 'Importance of Environmental Features'
  },
  'maps.features.description': {
    pt: 'Este gráfico mostra a importância relativa de diferentes características ambientais e topográficas para a previsão de sítios arqueológicos. A proximidade a rios e a elevação moderada são os fatores mais determinantes.',
    en: 'This graph shows the relative importance of different environmental and topographic features for predicting archaeological sites. Proximity to rivers and moderate elevation are the most determining factors.'
  },

  // Methodology
  'methodology.title': {
    pt: 'Metodologia Inovadora',
    en: 'Innovative Methodology'
  },
  'methodology.step1.title': {
    pt: 'Aquisição e Integração de Dados Multimodais',
    en: 'Acquisition and Integration of Multimodal Data'
  },
  'methodology.step1.description': {
    pt: 'Coleta e integração de dados de múltiplas fontes, incluindo imagens de satélite, LIDAR, modelos digitais de elevação, dados históricos e conhecimento indígena.',
    en: 'Collection and integration of data from multiple sources, including satellite imagery, LIDAR, digital elevation models, historical data, and indigenous knowledge.'
  },
  'methodology.step2.title': {
    pt: 'Pré-processamento e Realce Adaptativo',
    en: 'Pre-processing and Adaptive Enhancement'
  },
  'methodology.step2.description': {
    pt: 'Aplicação de técnicas de pré-processamento e realce para maximizar a detecção de estruturas arqueológicas, incluindo correção atmosférica, filtragem adaptativa e realce de contraste.',
    en: 'Application of pre-processing and enhancement techniques to maximize the detection of archaeological structures, including atmospheric correction, adaptive filtering, and contrast enhancement.'
  },
  'methodology.step3.title': {
    pt: 'Detecção Multicamada com Validação Cruzada',
    en: 'Multi-layer Detection with Cross-validation'
  },
  'methodology.step3.description': {
    pt: 'Implementação de uma abordagem de detecção em três camadas complementares, com validação cruzada para aumentar a confiabilidade das previsões.',
    en: 'Implementation of a detection approach in three complementary layers, with cross-validation to increase the reliability of predictions.'
  },
  'methodology.step4.title': {
    pt: 'Contextualização Histórico-Cultural',
    en: 'Historical-Cultural Contextualization'
  },
  'methodology.step4.description': {
    pt: 'Integração de conhecimento arqueológico e indígena para contextualizar as descobertas, incluindo análise de redes culturais e padrões de assentamento.',
    en: 'Integration of archaeological and indigenous knowledge to contextualize findings, including analysis of cultural networks and settlement patterns.'
  },
  'methodology.step5.title': {
    pt: 'Priorização e Verificação Colaborativa',
    en: 'Prioritization and Collaborative Verification'
  },
  'methodology.step5.description': {
    pt: 'Sistema de priorização para identificação de sítios para verificação em campo, com plataforma colaborativa para contribuições distribuídas e ciclo de feedback.',
    en: 'Prioritization system for identifying sites for field verification, with a collaborative platform for distributed contributions and feedback cycle.'
  },

  // Full Article
  'article.title': {
    pt: 'Artigo Completo',
    en: 'Full Article'
  },

  // About
  'about.title': {
    pt: 'Sobre o Projeto',
    en: 'About the Project'
  },
  'about.p1': {
    pt: 'Este projeto de exploração digital da Amazônia utiliza tecnologias avançadas como imagens de satélite, LIDAR e inteligência artificial para identificar e analisar potenciais sítios arqueológicos ocultos sob o dossel da floresta.',
    en: 'This digital exploration project of the Amazon uses advanced technologies such as satellite imagery, LIDAR, and artificial intelligence to identify and analyze potential archaeological sites hidden beneath the forest canopy.'
  },
  'about.p2': {
    pt: 'Através da integração de múltiplas fontes de dados, desenvolvimento de metodologias inovadoras de detecção e validação cruzada, o estudo revela novos insights sobre as antigas civilizações amazônicas e propõe uma abordagem revolucionária para a descoberta arqueológica em grande escala.',
    en: 'Through the integration of multiple data sources, development of innovative detection methodologies, and cross-validation, the study reveals new insights about ancient Amazonian civilizations and proposes a revolutionary approach to large-scale archaeological discovery.'
  },
  'about.p3': {
    pt: 'Os resultados sugerem uma Amazônia pré-colombiana muito mais densamente povoada e culturalmente complexa do que se acreditava anteriormente, com evidências que conectam lendas como a "Cidade Perdida de Z", Paititi e El Dorado a padrões reais de assentamentos antigos.',
    en: 'The results suggest a pre-Columbian Amazon that was much more densely populated and culturally complex than previously believed, with evidence connecting legends such as the "Lost City of Z", Paititi, and El Dorado to real patterns of ancient settlements.'
  },

  // Footer
  'footer.title': {
    pt: 'Amazônia Explorer',
    en: 'Amazon Explorer'
  },
  'footer.description': {
    pt: 'Explorando civilizações ocultas sob o dossel da floresta amazônica através de tecnologias avançadas e métodos inovadores.',
    en: 'Exploring hidden civilizations beneath the Amazon forest canopy through advanced technologies and innovative methods.'
  },
  'footer.quicklinks': {
    pt: 'Links Rápidos',
    en: 'Quick Links'
  },
  'footer.references': {
    pt: 'Referências',
    en: 'References'
  },
  'footer.references.articles': {
    pt: 'Artigos Científicos',
    en: 'Scientific Articles'
  },
  'footer.references.datasources': {
    pt: 'Fontes de Dados',
    en: 'Data Sources'
  },
  'footer.references.methodology': {
    pt: 'Metodologia Completa',
    en: 'Complete Methodology'
  },
  'footer.copyright': {
    pt: 'Todos os direitos reservados.',
    en: 'All rights reserved.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
