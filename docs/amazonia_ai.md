# amazonia_ai.py

Este script Python demonstra como um modelo de IA pode ser utilizado para analisar textos históricos e extrair insights relevantes para a arqueologia amazônica. Embora este seja um modelo simulado para fins de demonstração, ele ilustra o potencial da inteligência artificial na interpretação de diários coloniais, mapas orais indígenas e outros documentos textuais.

## Funcionalidade

O script `amazonia_ai.py` contém a função `analyze_historical_text(text)` que:

- Recebe um bloco de texto como entrada.
- Identifica palavras-chave predefinidas relacionadas à arqueologia e à Amazônia.
- Gera um insight simulado com base na presença dessas palavras-chave.

## Como usar

Para executar o script, navegue até o diretório `scripts` e execute o comando:

```bash
python3 amazonia_ai.py
```

O script inclui exemplos de uso que demonstram como a função `analyze_historical_text` pode ser chamada com diferentes textos de entrada.

## Saída

A saída do script é um objeto JSON contendo:

- `analise_texto`: Uma amostra do texto analisado.
- `palavras_chave_identificadas`: Uma lista das palavras-chave encontradas no texto.
- `insight_gerado`: Um insight gerado pelo modelo de IA simulado.

## Exemplo de Saída

```json
{
    "analise_texto": "Hoje, em 15 de junho de 1750, nossa expedição adentrou mais profundamente na floresta amazônica...",
    "palavras_chave_identificadas": [
        "civilização",
        "arqueologia",
        "lendas",
        "descobertas"
    ],
    "insight_gerado": "Este texto sugere a presença de civilizações antigas na Amazônia e a importância de novas descobertas arqueológicas."
}
```

Este componente destaca como a IA pode ser uma ferramenta poderosa para processar e interpretar grandes volumes de dados textuais, complementando as análises de imagens de satélite e dados LIDAR na descoberta de civilizações ocultas na Amazônia.

