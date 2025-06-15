# Amazônia Explorer  - Português / English

## Explorando Civilizações Ocultas sob o Dossel da Floresta

### Luís Carlos Silva Eiras / Manus.ai 

![IndianaJones](IndianaJones.png)

# Amazônia Explorer

## Explorando Civilizações Ocultas sob o Dossel da Floresta

Este repositório contém o código-fonte, dados e documentação do projeto Amazônia Explorer, uma iniciativa de exploração digital da Floresta Amazônica utilizando tecnologias como imagens de satélite, LIDAR (Light Detection and Ranging) e inteligência artificial para descobrir e analisar sítios arqueológicos ocultos sob a copa das árvores.

## 🌎 [Acesse o Site](https://crzhuhby.manus.space)

O site Amazônia Explorer apresenta os resultados da exploração digital em formato interativo e bilíngue (português e inglês).

## 🔍 Sobre o Projeto

Com mais de 6.000.000 km² de extensão e abrangendo nove países, a Floresta Amazônica guarda a história de civilizações passadas e serve como lar ativo para inúmeros grupos indígenas. Recursos como imagens de satélite e tecnologia LIDAR estão ajudando a preencher as lacunas de uma parte do mundo até então desconhecida.

Este projeto utiliza inteligência artificial para explorar dados abertos — imagens de satélite de alta resolução, blocos de LIDAR publicados, diários coloniais, mapas orais indígenas e artigos de levantamentos arqueológicos — para descobrir segredos escondidos sob a copa das árvores.

## 🧠 Modelos OpenAI

Este projeto integra os novos modelos OpenAI (o3/o4 mini e GPT-4.1) para análise avançada de dados arqueológicos, interpretação de imagens e integração de fontes históricas, atendendo aos requisitos do edital do Kaggle.

## 📊 Principais Resultados

- **Metodologia de detecção** adaptada para diferentes tipos de estruturas (geoglifos, aldeias circulares, valas defensivas)
- **Validação cruzada** com dois métodos independentes para previsão de coordenadas geográficas
- **Síntese histórica** conectando os achados com lendas como a "Cidade Perdida de Z", Paititi e El Dorado
- **Metodologia inovadora** para descoberta arqueológica em grande escala
- **Análise com IA generativa** utilizando modelos OpenAI para interpretação avançada de dados

## 📁 Estrutura do Repositório

```
amazonia-github/
├── site/                  # Código-fonte do site web
├── scripts/               # Scripts Python para análise e processamento
│   └── amazonia_ai.py     # Módulo de integração com modelos OpenAI
├── notebooks/             # Jupyter notebooks com análises e demonstrações
├── data/                  # Dados e resultados
│   └── resultados/        # Resultados das análises
│       └── ai_analysis/   # Resultados das análises com IA
└── docs/                  # Documentação adicional
    └── amazonia_ai.md     # Documentação do módulo de IA
```

## 🚀 Como Começar

### Requisitos

- Python 3.8 ou superior
- Node.js 14 ou superior (para o site)
- Chave de API da OpenAI (para funcionalidades de IA)

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/amazonia-explorer.git
cd amazonia-explorer

# Instalar dependências Python
pip install -r requirements.txt

# Instalar dependências do site
cd site
npm install
```

### Configuração da API OpenAI

Para utilizar o módulo AmazoniaAI, crie um arquivo `.env` na raiz do projeto:

```
OPENAI_API_KEY=sua_chave_aqui
```

### Executando os Scripts

```bash
# Detecção de sítios arqueológicos
python scripts/deteccao_sitios.py

# Previsão de coordenadas
python scripts/previsao_coordenadas_final.py

# Análise com IA (requer chave da API OpenAI)
python scripts/amazonia_ai.py
```

### Executando o Site Localmente

```bash
cd site
npm run dev
```

## 📖 Documentação

Para documentação detalhada, consulte o diretório [docs/](docs/):

- [Documentação Completa](docs/documentacao.md)
- [Módulo AmazoniaAI](docs/amazonia_ai.md)
- [Instruções de Execução](docs/EXECUTION.md)

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, leia as [diretrizes de contribuição](docs/CONTRIBUTING.md) antes de enviar um pull request.

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

# Amazonia Explorer

## Exploring Hidden Civilizations beneath the Forest Canopy

This repository contains the source code, data, and documentation for the Amazonia Explorer project, a digital exploration initiative of the Amazon Rainforest using technologies such as satellite imagery, LIDAR (Light Detection and Ranging), and artificial intelligence to discover and analyze archaeological sites hidden beneath the tree canopy.

## 🌎 [Visit the Website](https://crzhuhby.manus.space)

The Amazonia Explorer website presents the results of digital exploration in an interactive and bilingual format (Portuguese and English).

## 🔍 About the Project

With over 6,000,000 km² of extension spanning nine countries, the Amazon Rainforest holds the history of past civilizations and serves as an active home to numerous indigenous groups. Resources such as satellite imagery and LIDAR technology are helping to fill the gaps in a previously unknown part of the world.

This project uses artificial intelligence to explore open data — high-resolution satellite imagery, published LIDAR blocks, colonial diaries, indigenous oral maps, and archaeological survey articles — to discover secrets hidden beneath the tree canopy.

## 🧠 OpenAI Models

This project integrates the new OpenAI models (o3/o4 mini and GPT-4.1) for advanced archaeological data analysis, image interpretation, and historical source integration, meeting the requirements of the Kaggle challenge.

## 📊 Main Results

- **Detection methodology** adapted for different types of structures (geoglyphs, circular villages, defensive moats)
- **Cross-validation** with two independent methods for predicting geographical coordinates
- **Historical synthesis** connecting the findings with legends such as the "Lost City of Z", Paititi, and El Dorado
- **Innovative methodology** for large-scale archaeological discovery
- **Generative AI analysis** using OpenAI models for advanced data interpretation

## 📁 Repository Structure

```
amazonia-github/
├── site/                  # Website source code
├── scripts/               # Python scripts for analysis and processing
│   └── amazonia_ai.py     # OpenAI models integration module
├── notebooks/             # Jupyter notebooks with analyses and demonstrations
├── data/                  # Data and results
│   └── resultados/        # Analysis results
│       └── ai_analysis/   # AI analysis results
└── docs/                  # Additional documentation
    └── amazonia_ai.md     # AI module documentation
```

## 🚀 Getting Started

### Requirements

- Python 3.8 or higher
- Node.js 14 or higher (for the website)
- OpenAI API key (for AI features)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/amazonia-explorer.git
cd amazonia-explorer

# Install Python dependencies
pip install -r requirements.txt

# Install website dependencies
cd site
npm install
```

### OpenAI API Configuration

To use the AmazoniaAI module, create a `.env` file in the project root:

```
OPENAI_API_KEY=your_key_here
```

### Running the Scripts

```bash
# Archaeological site detection
python scripts/deteccao_sitios.py

# Coordinate prediction
python scripts/previsao_coordenadas_final.py

# AI analysis (requires OpenAI API key)
python scripts/amazonia_ai.py
```

### Running the Website Locally

```bash
cd site
npm run dev
```

## 📖 Documentation

For detailed documentation, see the [docs/](docs/) directory:

- [Complete Documentation](docs/documentacao.md)
- [AmazoniaAI Module](docs/amazonia_ai.md)
- [Execution Instructions](docs/EXECUTION.md)

## 🤝 Contributing

Contributions are welcome! Please read the [contribution guidelines](docs/CONTRIBUTING.md) before submitting a pull request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.




