import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ArticleSection from './components/ArticleSection';
import ImageGallery from './components/ImageGallery';
import MapSection from './components/MapSection';
import MethodologySection from './components/MethodologySection';
import { LanguageProvider } from './contexts/LanguageContext';
import { useLanguage } from './contexts/LanguageContext';

function AppContent() {
  const { t } = useLanguage();
  const [articleContent, setArticleContent] = useState('');

  useEffect(() => {
    // Carregar conteúdo do artigo
    fetch('/data/artigo_final.md')
      .then(response => response.text())
      .then(text => {
        setArticleContent(text);
      })
      .catch(error => console.error('Erro ao carregar artigo:', error));
  }, []);

  // Dados para a galeria de imagens
  const discoveryImages = [
    {
      src: '/original_geoglifo.png',
      alt: 'Geoglifo Original',
      translationKey: 'image.geoglyph.original'
    },
    {
      src: '/geoglifo_bordas.png',
      alt: 'Geoglifo com Detecção de Bordas',
      translationKey: 'image.geoglyph.edges'
    },
    {
      src: '/original_aldeia_circular.png',
      alt: 'Aldeia Circular Original',
      translationKey: 'image.village.original'
    },
    {
      src: '/aldeia_circular_bordas.png',
      alt: 'Aldeia Circular com Detecção de Bordas',
      translationKey: 'image.village.edges'
    },
    {
      src: '/original_vala_circular.png',
      alt: 'Vala Circular Original',
      translationKey: 'image.moat.original'
    },
    {
      src: '/vala_circular_bordas.png',
      alt: 'Vala Circular com Detecção de Bordas',
      translationKey: 'image.moat.edges'
    }
  ];

  // Dados para a seção de mapas
  const mapData = [
    {
      src: '/coordenadas/mapa_previsoes_amazonia.png',
      alt: 'Mapa de Previsões - Amazônia',
      title: 'Mapa de Previsões para a Região Amazônica',
      description: 'Este mapa mostra os resultados da aplicação de dois métodos independentes para previsão de coordenadas geográficas de potenciais sítios arqueológicos na região amazônica. Os pontos verdes representam sítios reais, os azuis são previsões corretas de ambos os métodos, e os vermelhos são previsões incorretas.',
      titleTranslationKey: 'maps.amazon.title',
      descriptionTranslationKey: 'maps.amazon.description'
    },
    {
      src: '/coordenadas/mapa_previsoes_xingu.png',
      alt: 'Mapa de Previsões - Xingu',
      title: 'Mapa de Previsões para a Região do Xingu',
      description: 'Análise detalhada da região do Xingu, onde foram identificados padrões de aldeias circulares interconectadas, possivelmente relacionadas à lendária "Cidade Perdida de Z" e ao complexo de Kuhikugu.',
      titleTranslationKey: 'maps.xingu.title',
      descriptionTranslationKey: 'maps.xingu.description'
    },
    {
      src: '/coordenadas/importancia_features_amazonia.png',
      alt: 'Importância das Características - Amazônia',
      title: 'Importância das Características Ambientais',
      description: 'Este gráfico mostra a importância relativa de diferentes características ambientais e topográficas para a previsão de sítios arqueológicos. A proximidade a rios e a elevação moderada são os fatores mais determinantes.',
      titleTranslationKey: 'maps.features.title',
      descriptionTranslationKey: 'maps.features.description'
    }
  ];

  // Dados para a seção de metodologia
  const methodologySteps = [
    {
      number: 1,
      title: 'Aquisição e Integração de Dados Multimodais',
      description: 'Coleta e integração de dados de múltiplas fontes, incluindo imagens de satélite, LIDAR, modelos digitais de elevação, dados históricos e conhecimento indígena.',
      titleTranslationKey: 'methodology.step1.title',
      descriptionTranslationKey: 'methodology.step1.description'
    },
    {
      number: 2,
      title: 'Pré-processamento e Realce Adaptativo',
      description: 'Aplicação de técnicas de pré-processamento e realce para maximizar a detecção de estruturas arqueológicas, incluindo correção atmosférica, filtragem adaptativa e realce de contraste.',
      titleTranslationKey: 'methodology.step2.title',
      descriptionTranslationKey: 'methodology.step2.description'
    },
    {
      number: 3,
      title: 'Detecção Multicamada com Validação Cruzada',
      description: 'Implementação de uma abordagem de detecção em três camadas complementares, com validação cruzada para aumentar a confiabilidade das previsões.',
      titleTranslationKey: 'methodology.step3.title',
      descriptionTranslationKey: 'methodology.step3.description'
    },
    {
      number: 4,
      title: 'Contextualização Histórico-Cultural',
      description: 'Integração de conhecimento arqueológico e indígena para contextualizar as descobertas, incluindo análise de redes culturais e padrões de assentamento.',
      titleTranslationKey: 'methodology.step4.title',
      descriptionTranslationKey: 'methodology.step4.description'
    },
    {
      number: 5,
      title: 'Priorização e Verificação Colaborativa',
      description: 'Sistema de priorização para identificação de sítios para verificação em campo, com plataforma colaborativa para contribuições distribuídas e ciclo de feedback.',
      titleTranslationKey: 'methodology.step5.title',
      descriptionTranslationKey: 'methodology.step5.description'
    }
  ];

  // Extrair o resumo do artigo (primeiros parágrafos)
  const getArticleSummary = () => {
    if (!articleContent) return '';
    const paragraphs = articleContent.split('\n\n');
    // Pegar os parágrafos após o título principal, até o próximo título
    let summary = '';
    let foundFirstTitle = false;
    
    for (let i = 0; i < paragraphs.length; i++) {
      if (paragraphs[i].startsWith('# ')) {
        foundFirstTitle = true;
        continue;
      }
      
      if (foundFirstTitle && !paragraphs[i].startsWith('#')) {
        summary += paragraphs[i] + '\n\n';
      }
      
      if (foundFirstTitle && paragraphs[i].startsWith('## ')) {
        break;
      }
    }
    
    return summary;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        <section id="descobertas" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-emerald-800">{t('discoveries.title')}</h2>
            
            <div className="mb-12">
              <ArticleSection 
                title="Explorando a Amazônia Digital" 
                titleTranslationKey="discoveries.article.title"
                content={getArticleSummary()} 
              />
              
              <div className="text-center mt-8">
                <a 
                  href="#artigo-completo" 
                  className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                  {t('discoveries.button')}
                </a>
              </div>
            </div>
            
            <ImageGallery 
              title="Visualizações de Estruturas Arqueológicas" 
              titleTranslationKey="discoveries.gallery.title"
              images={discoveryImages} 
            />
          </div>
        </section>
        
        <MapSection maps={mapData} />
        
        <MethodologySection 
          steps={methodologySteps} 
        />
        
        <section id="artigo-completo" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-emerald-800">{t('article.title')}</h2>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <ArticleSection 
                title="" 
                content={articleContent} 
              />
            </div>
          </div>
        </section>
        
        <section id="sobre" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-emerald-800">{t('about.title')}</h2>
            
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
              <p className="text-lg mb-6">
                {t('about.p1')}
              </p>
              
              <p className="text-lg mb-6">
                {t('about.p2')}
              </p>
              
              <p className="text-lg">
                {t('about.p3')}
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
