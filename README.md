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
