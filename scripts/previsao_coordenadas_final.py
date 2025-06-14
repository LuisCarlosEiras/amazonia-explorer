# Previsão de Coordenadas de Sítios Arqueológicos na Amazônia
# Autor: Amazônia Explorer
# Data: Junho 2025
# Descrição: Este script implementa dois métodos independentes para prever coordenadas
# geográficas de potenciais sítios arqueológicos na Amazônia, baseados em características
# ambientais e padrões de assentamento conhecidos.

import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import json
import random
from matplotlib.colors import LinearSegmentedColormap

# Configurações
RANDOM_SEED = 42
np.random.seed(RANDOM_SEED)
random.seed(RANDOM_SEED)

# Diretório para salvar resultados
RESULTS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'data', 'resultados', 'coordenadas')
os.makedirs(RESULTS_DIR, exist_ok=True)

def criar_diretorio_se_nao_existir(diretorio):
    """
    Cria um diretório se ele não existir.
    
    Args:
        diretorio (str): Caminho do diretório a ser criado
    """
    if not os.path.exists(diretorio):
        os.makedirs(diretorio)

def gerar_dados_simulados(n_amostras=100):
    """
    Gera dados simulados de sítios arqueológicos na Amazônia.
    
    Args:
        n_amostras (int): Número de amostras a serem geradas
    
    Returns:
        tuple: (X, y) onde X são as características e y são as coordenadas
    """
    # Definir região da Amazônia (coordenadas aproximadas)
    # Latitude: -10 a 5 (Sul a Norte)
    # Longitude: -75 a -50 (Oeste a Leste)
    
    # Características ambientais simuladas
    X = pd.DataFrame({
        'elevacao': np.random.normal(100, 50, n_amostras),  # Elevação em metros
        'dist_rio': np.random.exponential(5, n_amostras),   # Distância ao rio mais próximo em km
        'declividade': np.random.gamma(2, 2, n_amostras),   # Declividade do terreno em graus
        'precipitacao': np.random.normal(2500, 500, n_amostras),  # Precipitação anual em mm
        'tipo_solo': np.random.randint(1, 6, n_amostras),   # Tipos de solo (categórico)
        'cobertura_vegetal': np.random.randint(1, 4, n_amostras),  # Tipos de vegetação (categórico)
        'dist_assentamento': np.random.exponential(20, n_amostras)  # Distância ao assentamento conhecido mais próximo em km
    })
    
    # Coordenadas simuladas (latitude, longitude)
    # Criamos uma relação não-linear entre as características e as coordenadas
    lat_base = -5 + np.random.normal(0, 2, n_amostras)  # Centrado em -5 graus (meio da Amazônia)
    lon_base = -65 + np.random.normal(0, 5, n_amostras)  # Centrado em -65 graus
    
    # Adicionar influência das características nas coordenadas
    # Sítios tendem a estar perto de rios
    lat_ajuste = -0.01 * X['dist_rio'] + 0.005 * X['elevacao'] / 100
    lon_ajuste = -0.02 * X['dist_rio'] + 0.01 * X['precipitacao'] / 1000
    
    # Sítios tendem a estar em elevações moderadas (nem muito baixas nem muito altas)
    elevacao_ideal = 150
    lat_ajuste += -0.005 * np.abs(X['elevacao'] - elevacao_ideal) / 100
    lon_ajuste += -0.01 * np.abs(X['elevacao'] - elevacao_ideal) / 100
    
    # Sítios tendem a formar clusters (influência de assentamentos próximos)
    lat_ajuste += -0.02 * X['dist_assentamento'] / 10
    lon_ajuste += -0.03 * X['dist_assentamento'] / 10
    
    # Aplicar ajustes
    latitude = lat_base + lat_ajuste
    longitude = lon_base + lon_ajuste
    
    # Garantir que estamos dentro dos limites da Amazônia
    latitude = np.clip(latitude, -10, 5)
    longitude = np.clip(longitude, -75, -50)
    
    y = pd.DataFrame({
        'latitude': latitude,
        'longitude': longitude
    })
    
    return X, y

def treinar_modelo_rf(X_train, y_train):
    """
    Treina um modelo de Random Forest para prever coordenadas.
    
    Args:
        X_train (pandas.DataFrame): Características de treinamento
        y_train (pandas.DataFrame): Coordenadas de treinamento
    
    Returns:
        tuple: (modelo_lat, modelo_lon) modelos treinados para latitude e longitude
    """
    print("Treinando modelo Random Forest...")
    
    # Modelo para latitude
    modelo_lat = RandomForestRegressor(
        n_estimators=100,
        max_depth=10,
        random_state=RANDOM_SEED
    )
    modelo_lat.fit(X_train, y_train['latitude'])
    
    # Modelo para longitude
    modelo_lon = RandomForestRegressor(
        n_estimators=100,
        max_depth=10,
        random_state=RANDOM_SEED
    )
    modelo_lon.fit(X_train, y_train['longitude'])
    
    return modelo_lat, modelo_lon

def treinar_modelo_gb(X_train, y_train):
    """
    Treina um modelo de Gradient Boosting para prever coordenadas.
    
    Args:
        X_train (pandas.DataFrame): Características de treinamento
        y_train (pandas.DataFrame): Coordenadas de treinamento
    
    Returns:
        tuple: (modelo_lat, modelo_lon) modelos treinados para latitude e longitude
    """
    print("Treinando modelo Gradient Boosting...")
    
    # Modelo para latitude
    modelo_lat = GradientBoostingRegressor(
        n_estimators=100,
        max_depth=5,
        learning_rate=0.1,
        random_state=RANDOM_SEED
    )
    modelo_lat.fit(X_train, y_train['latitude'])
    
    # Modelo para longitude
    modelo_lon = GradientBoostingRegressor(
        n_estimators=100,
        max_depth=5,
        learning_rate=0.1,
        random_state=RANDOM_SEED
    )
    modelo_lon.fit(X_train, y_train['longitude'])
    
    return modelo_lat, modelo_lon

def avaliar_modelo(modelo_lat, modelo_lon, X_test, y_test, nome_modelo):
    """
    Avalia o desempenho do modelo.
    
    Args:
        modelo_lat: Modelo treinado para latitude
        modelo_lon: Modelo treinado para longitude
        X_test (pandas.DataFrame): Características de teste
        y_test (pandas.DataFrame): Coordenadas de teste
        nome_modelo (str): Nome do modelo para exibição
    
    Returns:
        dict: Métricas de avaliação
    """
    print(f"Avaliando modelo {nome_modelo}...")
    
    # Fazer previsões
    y_pred_lat = modelo_lat.predict(X_test)
    y_pred_lon = modelo_lon.predict(X_test)
    
    # Calcular métricas
    rmse_lat = np.sqrt(mean_squared_error(y_test['latitude'], y_pred_lat))
    rmse_lon = np.sqrt(mean_squared_error(y_test['longitude'], y_pred_lon))
    r2_lat = r2_score(y_test['latitude'], y_pred_lat)
    r2_lon = r2_score(y_test['longitude'], y_pred_lon)
    
    # Calcular erro de distância em km (aproximação)
    # 1 grau de latitude ≈ 111 km
    # 1 grau de longitude ≈ 111 * cos(latitude) km
    lat_media = y_test['latitude'].mean()
    erro_lat_km = rmse_lat * 111
    erro_lon_km = rmse_lon * 111 * np.cos(np.radians(lat_media))
    erro_dist_km = np.sqrt(erro_lat_km**2 + erro_lon_km**2)
    
    print(f"  RMSE Latitude: {rmse_lat:.6f} graus ({erro_lat_km:.2f} km)")
    print(f"  RMSE Longitude: {rmse_lon:.6f} graus ({erro_lon_km:.2f} km)")
    print(f"  Erro de distância médio: {erro_dist_km:.2f} km")
    print(f"  R² Latitude: {r2_lat:.4f}")
    print(f"  R² Longitude: {r2_lon:.4f}")
    
    return {
        'nome': nome_modelo,
        'rmse_lat': rmse_lat,
        'rmse_lon': rmse_lon,
        'r2_lat': r2_lat,
        'r2_lon': r2_lon,
        'erro_dist_km': erro_dist_km,
        'y_pred_lat': y_pred_lat.tolist(),
        'y_pred_lon': y_pred_lon.tolist()
    }

def calcular_importancia_features(modelo_rf_lat, modelo_rf_lon, X):
    """
    Calcula e visualiza a importância das características.
    
    Args:
        modelo_rf_lat: Modelo Random Forest para latitude
        modelo_rf_lon: Modelo Random Forest para longitude
        X (pandas.DataFrame): DataFrame com as características
    """
    print("Calculando importância das características...")
    
    # Obter importância das características
    importancia_lat = modelo_rf_lat.feature_importances_
    importancia_lon = modelo_rf_lon.feature_importances_
    
    # Importância média entre latitude e longitude
    importancia_media = (importancia_lat + importancia_lon) / 2
    
    # Criar DataFrame para visualização
    df_importancia = pd.DataFrame({
        'Característica': X.columns,
        'Importância': importancia_media
    }).sort_values('Importância', ascending=False)
    
    print(df_importancia)
    
    # Visualizar importância
    plt.figure(figsize=(10, 6))
    plt.barh(df_importancia['Característica'], df_importancia['Importância'], color='teal')
    plt.xlabel('Importância Relativa')
    plt.ylabel('Característica')
    plt.title('Importância das Características para Previsão de Sítios Arqueológicos')
    plt.tight_layout()
    plt.savefig(os.path.join(RESULTS_DIR, 'importancia_features_amazonia.png'), dpi=300)
    
    return df_importancia

def visualizar_previsoes(y_test, resultados_rf, resultados_gb):
    """
    Visualiza as previsões dos modelos em um mapa.
    
    Args:
        y_test (pandas.DataFrame): Coordenadas reais
        resultados_rf (dict): Resultados do modelo Random Forest
        resultados_gb (dict): Resultados do modelo Gradient Boosting
    """
    print("Visualizando previsões...")
    
    # Extrair dados
    lat_real = y_test['latitude'].values
    lon_real = y_test['longitude'].values
    lat_rf = np.array(resultados_rf['y_pred_lat'])
    lon_rf = np.array(resultados_rf['y_pred_lon'])
    lat_gb = np.array(resultados_gb['y_pred_lat'])
    lon_gb = np.array(resultados_gb['y_pred_lon'])
    
    # Calcular concordância entre modelos (distância < 5km)
    # 0.045 graus ≈ 5km
    limiar_concordancia = 0.045
    distancia_entre_modelos = np.sqrt((lat_rf - lat_gb)**2 + (lon_rf - lon_gb)**2)
    concordancia = distancia_entre_modelos < limiar_concordancia
    
    # Calcular acurácia (distância < 10km do real)
    # 0.09 graus ≈ 10km
    limiar_acuracia = 0.09
    distancia_rf = np.sqrt((lat_rf - lat_real)**2 + (lon_rf - lon_real)**2)
    distancia_gb = np.sqrt((lat_gb - lat_real)**2 + (lon_gb - lon_real)**2)
    acuracia_rf = distancia_rf < limiar_acuracia
    acuracia_gb = distancia_gb < limiar_acuracia
    
    # Criar mapa da Amazônia
    plt.figure(figsize=(12, 8))
    
    # Limites do mapa (Amazônia)
    plt.xlim(-75, -50)
    plt.ylim(-10, 5)
    
    # Plotar pontos reais
    plt.scatter(lon_real, lat_real, c='green', s=50, label='Sítios Reais', zorder=3)
    
    # Plotar previsões com concordância entre modelos
    for i in range(len(lat_real)):
        if concordancia[i]:
            # Média das previsões quando há concordância
            lat_media = (lat_rf[i] + lat_gb[i]) / 2
            lon_media = (lon_rf[i] + lon_gb[i]) / 2
            
            if acuracia_rf[i] and acuracia_gb[i]:
                # Ambos modelos acertaram (azul)
                plt.scatter(lon_media, lat_media, c='blue', s=30, alpha=0.8, zorder=2)
            else:
                # Concordância mas errado (vermelho)
                plt.scatter(lon_media, lat_media, c='red', s=30, alpha=0.8, zorder=2)
    
    # Adicionar grade e rótulos
    plt.grid(True, linestyle='--', alpha=0.7)
    plt.xlabel('Longitude')
    plt.ylabel('Latitude')
    plt.title('Mapa de Previsões de Sítios Arqueológicos na Amazônia')
    
    # Legenda
    from matplotlib.lines import Line2D
    legend_elements = [
        Line2D([0], [0], marker='o', color='w', markerfacecolor='green', markersize=10, label='Sítios Reais'),
        Line2D([0], [0], marker='o', color='w', markerfacecolor='blue', markersize=8, label='Previsão Correta'),
        Line2D([0], [0], marker='o', color='w', markerfacecolor='red', markersize=8, label='Previsão Incorreta')
    ]
    plt.legend(handles=legend_elements, loc='lower right')
    
    # Adicionar informações de acurácia
    acuracia_combinada = np.mean(acuracia_rf & acuracia_gb)
    concordancia_percentual = np.mean(concordancia) * 100
    plt.annotate(f'Acurácia: {acuracia_combinada:.1%}\nConcordância: {concordancia_percentual:.1f}%', 
                 xy=(0.02, 0.02), xycoords='axes fraction', 
                 bbox=dict(boxstyle="round,pad=0.3", fc="white", ec="gray", alpha=0.8))
    
    plt.tight_layout()
    plt.savefig(os.path.join(RESULTS_DIR, 'mapa_previsoes_amazonia.png'), dpi=300)
    
    # Criar visualização para região do Xingu (zoom)
    plt.figure(figsize=(10, 8))
    
    # Limites do mapa (Xingu)
    plt.xlim(-54, -51)
    plt.ylim(-5, -2)
    
    # Plotar pontos reais
    plt.scatter(lon_real, lat_real, c='green', s=50, label='Sítios Reais', zorder=3)
    
    # Plotar previsões com concordância entre modelos
    for i in range(len(lat_real)):
        if concordancia[i]:
            # Média das previsões quando há concordância
            lat_media = (lat_rf[i] + lat_gb[i]) / 2
            lon_media = (lon_rf[i] + lon_gb[i]) / 2
            
            if acuracia_rf[i] and acuracia_gb[i]:
                # Ambos modelos acertaram (azul)
                plt.scatter(lon_media, lat_media, c='blue', s=30, alpha=0.8, zorder=2)
            else:
                # Concordância mas errado (vermelho)
                plt.scatter(lon_media, lat_media, c='red', s=30, alpha=0.8, zorder=2)
    
    # Adicionar grade e rótulos
    plt.grid(True, linestyle='--', alpha=0.7)
    plt.xlabel('Longitude')
    plt.ylabel('Latitude')
    plt.title('Mapa de Previsões de Sítios Arqueológicos na Região do Xingu')
    
    # Legenda
    plt.legend(handles=legend_elements, loc='lower right')
    
    plt.tight_layout()
    plt.savefig(os.path.join(RESULTS_DIR, 'mapa_previsoes_xingu.png'), dpi=300)
    
    # Calcular estatísticas
    estatisticas = {
        'acuracia_rf': float(np.mean(acuracia_rf)),
        'acuracia_gb': float(np.mean(acuracia_gb)),
        'acuracia_combinada': float(acuracia_combinada),
        'concordancia': float(np.mean(concordancia)),
        'erro_medio_rf_km': float(resultados_rf['erro_dist_km']),
        'erro_medio_gb_km': float(resultados_gb['erro_dist_km'])
    }
    
    return estatisticas

def salvar_resultados(X, y_test, resultados_rf, resultados_gb, estatisticas, df_importancia):
    """
    Salva os resultados em formato JSON.
    
    Args:
        X (pandas.DataFrame): Características
        y_test (pandas.DataFrame): Coordenadas reais
        resultados_rf (dict): Resultados do modelo Random Forest
        resultados_gb (dict): Resultados do modelo Gradient Boosting
        estatisticas (dict): Estatísticas de desempenho
        df_importancia (pandas.DataFrame): Importância das características
    """
    print("Salvando resultados...")
    
    # Criar dicionário de resultados
    resultados = {
        'caracteristicas': X.columns.tolist(),
        'importancia_features': df_importancia.to_dict(orient='records'),
        'coordenadas_reais': {
            'latitude': y_test['latitude'].tolist(),
            'longitude': y_test['longitude'].tolist()
        },
        'resultados_random_forest': resultados_rf,
        'resultados_gradient_boosting': resultados_gb,
        'estatisticas': estatisticas
    }
    
    # Salvar como JSON
    with open(os.path.join(RESULTS_DIR, 'resumo_amazonia.json'), 'w') as f:
        json.dump(resultados, f, indent=2)
    
    print(f"Resultados salvos em: {os.path.join(RESULTS_DIR, 'resumo_amazonia.json')}")

def executar_pipeline():
    """
    Executa o pipeline completo de previsão de coordenadas.
    """
    print("Iniciando pipeline de previsão de coordenadas...")
    
    # Criar diretório de resultados
    criar_diretorio_se_nao_existir(RESULTS_DIR)
    
    # Gerar dados simulados
    X, y = gerar_dados_simulados(n_amostras=200)
    
    # Dividir em treino e teste
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.3, random_state=RANDOM_SEED
    )
    
    # Treinar modelos
    modelo_rf_lat, modelo_rf_lon = treinar_modelo_rf(X_train, y_train)
    modelo_gb_lat, modelo_gb_lon = treinar_modelo_gb(X_train, y_train)
    
    # Avaliar modelos
    resultados_rf = avaliar_modelo(modelo_rf_lat, modelo_rf_lon, X_test, y_test, "Random Forest")
    resultados_gb = avaliar_modelo(modelo_gb_lat, modelo_gb_lon, X_test, y_test, "Gradient Boosting")
    
    # Calcular importância das características
    df_importancia = calcular_importancia_features(modelo_rf_lat, modelo_rf_lon, X)
    
    # Visualizar previsões
    estatisticas = visualizar_previsoes(y_test, resultados_rf, resultados_gb)
    
    # Salvar resultados
    salvar_resultados(X, y_test, resultados_rf, resultados_gb, estatisticas, df_importancia)
    
    print("Pipeline concluído com sucesso!")

if __name__ == "__main__":
    """
    Ponto de entrada principal do script.
    """
    print("Iniciando previsão de coordenadas de sítios arqueológicos na Amazônia...")
    executar_pipeline()
    print("Processamento concluído!")
