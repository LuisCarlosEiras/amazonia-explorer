# Amazônia Explorer - Documentação do Projeto

## Visão Geral

O projeto Amazônia Explorer é uma iniciativa de exploração digital da Floresta Amazônica, utilizando tecnologias como imagens de satélite, LIDAR (Light Detection and Ranging) e inteligência artificial para descobrir e analisar sítios arqueológicos ocultos sob a copa das árvores. O projeto busca preencher lacunas no conhecimento sobre antigas civilizações amazônicas, conectando-se com lendas como a "cidade perdida de Z", Paititi e El Dorado.

## Estrutura do Repositório

O repositório está organizado da seguinte forma:

```
amazonia-github/
├── site/                  # Código-fonte do site web
├── scripts/               # Scripts Python para análise e processamento
├── notebooks/             # Jupyter notebooks com análises e demonstrações
├── data/                  # Dados e resultados
│   └── resultados/        # Resultados das análises
│       ├── coordenadas/   # Mapas e coordenadas de sítios previstos
│       ├── imagens/       # Imagens processadas de estruturas arqueológicas
│       └── notebooks/     # Resultados gerados pelos notebooks
└── docs/                  # Documentação adicional
```

## Requisitos

Para executar os scripts e notebooks deste projeto, você precisará de:

- Python 3.8 ou superior
- Bibliotecas Python: numpy, pandas, matplotlib, scikit-image, scikit-learn, scipy, seaborn
- Node.js 14 ou superior (para o site)

### Instalação de Dependências

```bash
# Instalar dependências Python
pip install numpy pandas matplotlib scikit-image scikit-learn scipy seaborn

# Instalar dependências do site (na pasta site/)
cd site
npm install
```

## Descrição dos Scripts

### deteccao_sitios.py

Este script simula a detecção de diferentes tipos de estruturas arqueológicas na Amazônia usando técnicas de processamento de imagens em dados LIDAR simulados.

**Uso:**
```bash
python scripts/deteccao_sitios.py
```

**Saída:** Imagens de estruturas arqueológicas detectadas em `data/resultados/`.

### previsao_coordenadas_final.py

Este script implementa dois métodos independentes para prever coordenadas geográficas de potenciais sítios arqueológicos na Amazônia, baseados em características ambientais e padrões de assentamento conhecidos.

**Uso:**
```bash
python scripts/previsao_coordenadas_final.py
```

**Saída:** Mapas de previsões e arquivo JSON com resultados em `data/resultados/coordenadas/`.

## Descrição dos Notebooks

### classificacao_estruturas_arqueologicas.ipynb

Este notebook demonstra a classificação de diferentes tipos de estruturas arqueológicas usando aprendizado de máquina.

**Uso:**
```bash
jupyter notebook notebooks/classificacao_estruturas_arqueologicas.ipynb
```

### processamento_imagens_lidar.ipynb

Este notebook demonstra o processamento de imagens LIDAR para detectar estruturas arqueológicas ocultas sob a copa das árvores na Amazônia.

**Uso:**
```bash
jupyter notebook notebooks/processamento_imagens_lidar.ipynb
```

### analise_dados_arqueologicos.ipynb

Este notebook demonstra a análise de dados arqueológicos da Amazônia, incluindo visualização de distribuição espacial e análise de padrões temporais.

**Uso:**
```bash
jupyter notebook notebooks/analise_dados_arqueologicos.ipynb
```

## Site Amazônia Explorer

O site Amazônia Explorer apresenta os resultados da exploração digital da Amazônia em um formato interativo e bilíngue (português e inglês).

### Executando o Site Localmente

```bash
# Navegar até o diretório do site
cd site

# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Construir para produção
npm run build
```

### Site Publicado

O site está disponível publicamente em: https://crzhuhby.manus.space

## Metodologia

A metodologia de exploração digital da Amazônia desenvolvida neste projeto consiste em:

1. **Aquisição e Integração de Dados Multimodais**
   - Imagens de satélite (Sentinel-2, Landsat)
   - Dados LIDAR
   - Modelos digitais de elevação
   - Dados históricos e conhecimento indígena

2. **Pré-processamento e Realce Adaptativo**
   - Correção atmosférica
   - Filtragem adaptativa
   - Realce de contraste
   - Cálculo de índices de vegetação
   - Normalização topográfica

3. **Detecção Multicamada com Validação Cruzada**
   - Reconhecimento de padrões geométricos
   - Detecção de anomalias espectrais
   - Análise contextual
   - Validação independente através de múltiplos métodos

4. **Previsão de Coordenadas**
   - Modelo baseado em características ambientais
   - Modelo de reconhecimento de padrões
   - Validação cruzada entre modelos

5. **Análise e Síntese Histórica**
   - Conexão com relatos históricos e lendas
   - Contextualização com conhecimento arqueológico existente
   - Integração com narrativas indígenas

## Resultados Principais

Os principais resultados deste projeto incluem:

1. **Identificação de Padrões Arqueológicos**
   - Geoglifos geométricos
   - Aldeias circulares
   - Valas defensivas
   - Áreas de terra preta

2. **Mapas de Previsão**
   - Mapa de previsões para a região amazônica
   - Mapa detalhado da região do Xingu
   - Análise de importância de características ambientais

3. **Síntese Histórica**
   - Evidências de urbanismo de baixa densidade
   - Redes de assentamentos interconectados
   - Engenharia ambiental sofisticada
   - Conexões com lendas como a "Cidade Perdida de Z"

## Contribuição

Este projeto é parte do desafio "OpenAI to Z Challenge" e está aberto para contribuições. Se você deseja contribuir, por favor:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-analise`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova análise de padrões'`)
4. Push para a branch (`git push origin feature/nova-analise`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

## Contato

Para mais informações sobre o projeto Amazônia Explorer, entre em contato através do GitHub ou visite o site do projeto.



## Módulo de Análise com IA (amazonia_ai.py)

Para detalhes sobre o módulo de análise com IA, consulte [amazonia_ai.md](amazonia_ai.md).


