import json

def analyze_historical_text(text):
    """
    Simula a análise de texto histórico usando um modelo de IA.
    Para o propósito desta demonstração, ele simplesmente identifica palavras-chave
    e gera um insight simulado.
    """
    keywords = []
    if "civilização" in text.lower():
        keywords.append("civilização")
    if "amazônia" in text.lower():
        keywords.append("amazônia")
    if "arqueologia" in text.lower():
        keywords.append("arqueologia")
    if "lendas" in text.lower():
        keywords.append("lendas")
    if "descobertas" in text.lower():
        keywords.append("descobertas")

    insight = {
        "analise_texto": text[:100] + "...",
        "palavras_chave_identificadas": keywords,
        "insight_gerado": "Este texto sugere a presença de civilizações antigas na Amazônia e a importância de novas descobertas arqueológicas."
    }
    return insight

if __name__ == "__main__":
    # Exemplo de uso com um texto simulado de um diário colonial
    sample_text = """
    Hoje, em 15 de junho de 1750, nossa expedição adentrou mais profundamente na floresta amazônica.
    Os guias indígenas relataram lendas de uma grande civilização que habitava estas terras há séculos.
    Encontramos vestígios de antigas estruturas, o que sugere a presença de uma rica arqueologia.
    Esperamos fazer grandes descobertas nos próximos dias.
    """

    print("Analisando texto histórico com IA simulada...")
    result = analyze_historical_text(sample_text)
    print(json.dumps(result, indent=4, ensure_ascii=False))

    # Exemplo de uso com outro texto
    sample_text_2 = """
    O desmatamento na Amazônia ameaça sítios arqueológicos ainda não descobertos.
    A tecnologia LIDAR pode ajudar a identificar esses locais antes que sejam perdidos para sempre.
    """
    print("\nAnalisando outro texto...")
    result_2 = analyze_historical_text(sample_text_2)
    print(json.dumps(result_2, indent=4, ensure_ascii=False))


