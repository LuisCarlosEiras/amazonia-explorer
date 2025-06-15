# Instruções de Execução

Este documento fornece instruções detalhadas para executar os scripts e notebooks do projeto Amazônia Explorer.

## Requisitos

Antes de executar os scripts, certifique-se de ter instalado todas as dependências:

```bash
pip install -r requirements.txt
```

## Tempo de Execução

**Importante**: Alguns scripts podem demorar vários minutos para serem executados completamente, especialmente aqueles que processam imagens ou realizam análises complexas. Por favor, seja paciente durante a execução.

## Scripts Python

### deteccao_sitios.py

Este script simula a detecção de diferentes tipos de estruturas arqueológicas usando processamento de imagens.

**Tempo estimado de execução**: 3-5 minutos

```bash
python scripts/deteccao_sitios.py
```

**Resultados**: Imagens salvas em `data/resultados/`

### previsao_coordenadas_final.py

Este script implementa dois métodos independentes para prever coordenadas geográficas de potenciais sítios arqueológicos.

**Tempo estimado de execução**: 2-4 minutos

```bash
python scripts/previsao_coordenadas_final.py
```

**Resultados**: Mapas e dados JSON salvos em `data/resultados/coordenadas/`

## Notebooks Jupyter

Para executar os notebooks, inicie o Jupyter Notebook:

```bash
jupyter notebook
```

### classificacao_estruturas_arqueologicas.ipynb

Este notebook demonstra a classificação de diferentes tipos de estruturas arqueológicas.

**Tempo estimado de execução**: 2-3 minutos

### processamento_imagens_lidar.ipynb

Este notebook demonstra o processamento de imagens LIDAR para detectar estruturas arqueológicas.

**Tempo estimado de execução**: 3-5 minutos

### analise_dados_arqueologicos.ipynb

Este notebook demonstra a análise de dados arqueológicos da Amazônia.

**Tempo estimado de execução**: 2-3 minutos

## Versão Rápida para Testes

Para testar rapidamente a funcionalidade dos scripts, você pode usar os seguintes comandos que executam versões simplificadas:

```bash
# Versão rápida de detecção de sítios (apenas geoglifos)
python -c "import sys; sys.path.append('scripts'); from deteccao_sitios import gerar_imagem_lidar_simulada, detectar_bordas; img = gerar_imagem_lidar_simulada(tamanho=256, tipo='geoglifo'); bordas = detectar_bordas(img); print('Teste de detecção concluído com sucesso!')"

# Versão rápida de previsão de coordenadas (amostra reduzida)
python -c "import sys; sys.path.append('scripts'); from previsao_coordenadas_final import gerar_dados_simulados; X, y = gerar_dados_simulados(n_amostras=20); print('Teste de geração de dados concluído com sucesso!'); print(f'Características: {X.shape}, Coordenadas: {y.shape}')"
```

## Site Web

Para executar o site localmente:

```bash
cd site
npm install
npm run dev
```

O site estará disponível em `http://localhost:3000`

## Solução de Problemas

Se encontrar problemas durante a execução:

1. Verifique se todas as dependências estão instaladas corretamente
2. Certifique-se de estar executando os comandos no diretório raiz do projeto
3. Verifique se os diretórios de saída existem e têm permissões de escrita

Para problemas específicos, consulte a seção de Issues no GitHub ou entre em contato com os mantenedores do projeto.

---

# Execution Instructions

This document provides detailed instructions for running the scripts and notebooks of the Amazônia Explorer project.

## Requirements

Before running the scripts, make sure you have installed all dependencies:

```bash
pip install -r requirements.txt
```

## Execution Time

**Important**: Some scripts may take several minutes to run completely, especially those that process images or perform complex analyses. Please be patient during execution.

## Python Scripts

### deteccao_sitios.py

This script simulates the detection of different types of archaeological structures using image processing.

**Estimated execution time**: 3-5 minutes

```bash
python scripts/deteccao_sitios.py
```

**Results**: Images saved in `data/resultados/`

### previsao_coordenadas_final.py

This script implements two independent methods to predict geographical coordinates of potential archaeological sites.

**Estimated execution time**: 2-4 minutes

```bash
python scripts/previsao_coordenadas_final.py
```

**Results**: Maps and JSON data saved in `data/resultados/coordenadas/`

## Jupyter Notebooks

To run the notebooks, start Jupyter Notebook:

```bash
jupyter notebook
```

### classificacao_estruturas_arqueologicas.ipynb

This notebook demonstrates the classification of different types of archaeological structures.

**Estimated execution time**: 2-3 minutes

### processamento_imagens_lidar.ipynb

This notebook demonstrates LIDAR image processing to detect archaeological structures.

**Estimated execution time**: 3-5 minutes

### analise_dados_arqueologicos.ipynb

This notebook demonstrates the analysis of archaeological data from the Amazon.

**Estimated execution time**: 2-3 minutes

## Quick Version for Testing

To quickly test the functionality of the scripts, you can use the following commands that run simplified versions:

```bash
# Quick version of site detection (geoglyphs only)
python -c "import sys; sys.path.append('scripts'); from deteccao_sitios import gerar_imagem_lidar_simulada, detectar_bordas; img = gerar_imagem_lidar_simulada(tamanho=256, tipo='geoglifo'); bordas = detectar_bordas(img); print('Detection test completed successfully!')"

# Quick version of coordinate prediction (reduced sample)
python -c "import sys; sys.path.append('scripts'); from previsao_coordenadas_final import gerar_dados_simulados; X, y = gerar_dados_simulados(n_amostras=20); print('Data generation test completed successfully!'); print(f'Features: {X.shape}, Coordinates: {y.shape}')"
```

## Website

To run the website locally:

```bash
cd site
npm install
npm run dev
```

The website will be available at `http://localhost:3000`

## Troubleshooting

If you encounter problems during execution:

1. Check that all dependencies are correctly installed
2. Make sure you are running the commands in the project root directory
3. Check that the output directories exist and have write permissions

For specific problems, consult the Issues section on GitHub or contact the project maintainers.
