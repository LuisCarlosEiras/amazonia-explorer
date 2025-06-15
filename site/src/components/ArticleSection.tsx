import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ArticleSectionProps {
  title: string;
  content: string;
  id?: string;
  titleTranslationKey?: string;
}

const ArticleSection: React.FC<ArticleSectionProps> = ({ title, content, id, titleTranslationKey }) => {
  const { t, language } = useLanguage();
  const [translatedContent, setTranslatedContent] = useState(content);
  
  useEffect(() => {
    // Carregar conteúdo do artigo traduzido quando o idioma for inglês
    if (language === 'en' && content) {
      try {
        fetch('/data/article_english.md')
          .then(response => response.text())
          .then(text => {
            if (text) {
              setTranslatedContent(text);
            } else {
              setTranslatedContent(content); // Fallback para o conteúdo original
            }
          })
          .catch(error => {
            console.error('Erro ao carregar artigo em inglês:', error);
            setTranslatedContent(content); // Fallback para o conteúdo original
          });
      } catch (error) {
        console.error('Erro ao carregar artigo em inglês:', error);
        setTranslatedContent(content); // Fallback para o conteúdo original
      }
    } else {
      setTranslatedContent(content);
    }
  }, [language, content]);
  
  // Função para converter markdown para HTML básico
  const renderMarkdown = (text: string) => {
    if (!text) return '';
    
    // Substituir cabeçalhos
    let html = text
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-6 mb-3">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-10 mb-5">$1</h1>');
    
    // Substituir parágrafos
    html = html.replace(/^\s*(\n)?(.+)/gim, function(m) {
      return /\<(\/)?(h|ul|ol|li|blockquote|pre|img)/.test(m) ? m : '<p class="mb-4">' + m + '</p>';
    });
    
    // Substituir ênfase
    html = html
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>');
    
    // Substituir listas
    html = html
      .replace(/^\s*\n\* (.*)/gim, '<ul class="list-disc pl-5 mb-4"><li>$1</li></ul>')
      .replace(/^\s*\n\d\. (.*)/gim, '<ol class="list-decimal pl-5 mb-4"><li>$1</li></ol>');
    
    // Limpar múltiplas tags de lista
    html = html
      .replace(/<\/ul>\s*<ul>/gim, '')
      .replace(/<\/ol>\s*<ol>/gim, '');
    
    // Substituir links
    html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" class="text-emerald-600 hover:text-emerald-800 underline">$1</a>');
    
    return html;
  };

  return (
    <section id={id} className="py-12">
      <div className="container mx-auto px-4">
        {(title || titleTranslationKey) && (
          <h2 className="text-3xl font-bold mb-6 text-emerald-800">
            {titleTranslationKey ? t(titleTranslationKey) : title}
          </h2>
        )}
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(translatedContent) }}
        />
      </div>
    </section>
  );
};

export default ArticleSection;
