# Detecção de Sítios Arqueológicos na Amazônia
# Autor: Amazônia Explorer
# Data: Junho 2025
# Descrição: Este script simula a detecção de diferentes tipos de estruturas arqueológicas
# na Amazônia usando técnicas de processamento de imagens em dados LIDAR simulados.

import os
import numpy as np
import matplotlib.pyplot as plt
from skimage import filters, feature, segmentation, color
from scipy import ndimage
import random

# Configurações
RANDOM_SEED = 42
np.random.seed(RANDOM_SEED)
random.seed(RANDOM_SEED)

# Diretório para salvar resultados
RESULTS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'data', 'resultados')
os.makedirs(RESULTS_DIR, exist_ok=True)

def criar_diretorio_se_nao_existir(diretorio):
    """
    Cria um diretório se ele não existir.
    
    Args:
        diretorio (str): Caminho do diretório a ser criado
    """
    if not os.path.exists(diretorio):
        os.makedirs(diretorio)

def gerar_imagem_lidar_simulada(tamanho=512, tipo='geoglifo'):
    """
    Gera uma imagem LIDAR simulada com diferentes tipos de estruturas arqueológicas.
    
    Args:
        tamanho (int): Tamanho da imagem (quadrada)
        tipo (str): Tipo de estrutura ('geoglifo', 'aldeia_circular', 'vala_circular')
    
    Returns:
        numpy.ndarray: Imagem LIDAR simulada
    """
    # Base da imagem (terreno natural)
    imagem = np.random.normal(0.5, 0.1, (tamanho, tamanho))
    
    # Suavizar para simular terreno natural
    imagem = ndimage.gaussian_filter(imagem, sigma=5)
    
    # Adicionar ruído de vegetação
    vegetacao = np.random.normal(0, 0.05, (tamanho, tamanho))
    imagem += vegetacao
    
    # Normalizar para [0, 1]
    imagem = (imagem - imagem.min()) / (imagem.max() - imagem.min())
    
    # Adicionar estrutura arqueológica
    centro_x, centro_y = tamanho // 2, tamanho // 2
    
    if tipo == 'geoglifo':
        # Criar geoglifo geométrico (quadrado com linhas internas)
        tamanho_geoglifo = tamanho // 4
        espessura = tamanho // 50
        
        # Quadrado externo
        imagem[centro_y-tamanho_geoglifo:centro_y-tamanho_geoglifo+espessura, 
               centro_x-tamanho_geoglifo:centro_x+tamanho_geoglifo] += 0.3
        imagem[centro_y+tamanho_geoglifo-espessura:centro_y+tamanho_geoglifo, 
               centro_x-tamanho_geoglifo:centro_x+tamanho_geoglifo] += 0.3
        imagem[centro_y-tamanho_geoglifo:centro_y+tamanho_geoglifo, 
               centro_x-tamanho_geoglifo:centro_x-tamanho_geoglifo+espessura] += 0.3
        imagem[centro_y-tamanho_geoglifo:centro_y+tamanho_geoglifo, 
               centro_x+tamanho_geoglifo-espessura:centro_x+tamanho_geoglifo] += 0.3
        
        # Linhas internas
        imagem[centro_y-espessura//2:centro_y+espessura//2, 
               centro_x-tamanho_geoglifo:centro_x+tamanho_geoglifo] += 0.3
        imagem[centro_y-tamanho_geoglifo:centro_y+tamanho_geoglifo, 
               centro_x-espessura//2:centro_x+espessura//2] += 0.3
        
    elif tipo == 'aldeia_circular':
        # Criar aldeia circular com estruturas internas
        raio = tamanho // 5
        y, x = np.ogrid[-centro_y:tamanho-centro_y, -centro_x:tamanho-centro_x]
        mascara_externa = x*x + y*y <= raio*raio
        mascara_interna = x*x + y*y <= (raio-tamanho//50)*(raio-tamanho//50)
        mascara_anel = mascara_externa & ~mascara_interna
        imagem[mascara_anel] += 0.3
        
        # Adicionar estruturas internas (casas)
        num_estruturas = 8
        raio_interno = raio * 0.6
        for i in range(num_estruturas):
            angulo = 2 * np.pi * i / num_estruturas
            pos_x = int(centro_x + raio_interno * np.cos(angulo))
            pos_y = int(centro_y + raio_interno * np.sin(angulo))
            tamanho_estrutura = tamanho // 40
            imagem[pos_y-tamanho_estrutura:pos_y+tamanho_estrutura, 
                   pos_x-tamanho_estrutura:pos_x+tamanho_estrutura] += 0.25
            
    elif tipo == 'vala_circular':
        # Criar vala circular defensiva
        raio_externo = tamanho // 4
        raio_interno = raio_externo - tamanho // 20
        y, x = np.ogrid[-centro_y:tamanho-centro_y, -centro_x:tamanho-centro_x]
        mascara_externa = x*x + y*y <= raio_externo*raio_externo
        mascara_interna = x*x + y*y <= raio_interno*raio_interno
        mascara_vala = mascara_externa & ~mascara_interna
        imagem[mascara_vala] -= 0.3  # Valas são depressões (valores mais baixos)
        
        # Adicionar entrada (abertura na vala)
        angulo_entrada = np.pi / 4
        largura_entrada = np.pi / 16
        for y in range(tamanho):
            for x in range(tamanho):
                if mascara_vala[y, x]:
                    dx, dy = x - centro_x, y - centro_y
                    angulo = np.arctan2(dy, dx) % (2 * np.pi)
                    if abs(angulo - angulo_entrada) < largura_entrada:
                        imagem[y, x] += 0.3  # Reverter a depressão na entrada
    
    # Normalizar novamente após adicionar estruturas
    imagem = np.clip(imagem, 0, 1)
    
    # Adicionar mais ruído para simular imperfeições na captura LIDAR
    imagem += np.random.normal(0, 0.02, (tamanho, tamanho))
    imagem = np.clip(imagem, 0, 1)
    
    return imagem

def detectar_bordas(imagem):
    """
    Detecta bordas em uma imagem usando o algoritmo Canny.
    
    Args:
        imagem (numpy.ndarray): Imagem de entrada
    
    Returns:
        numpy.ndarray: Imagem com bordas detectadas
    """
    # Aplicar filtro gaussiano para reduzir ruído
    imagem_suavizada = filters.gaussian(imagem, sigma=1.0)
    
    # Detectar bordas com Canny
    bordas = feature.canny(imagem_suavizada, sigma=2.0)
    
    return bordas

def realcar_estruturas(imagem):
    """
    Realça estruturas na imagem usando equalização de histograma local.
    
    Args:
        imagem (numpy.ndarray): Imagem de entrada
    
    Returns:
        numpy.ndarray: Imagem com estruturas realçadas
    """
    # Equalização de histograma local
    from skimage import exposure
    imagem_realcada = exposure.equalize_adapthist(imagem, clip_limit=0.03)
    
    return imagem_realcada

def segmentar_estruturas(imagem):
    """
    Segmenta estruturas na imagem usando limiarização e watershed.
    
    Args:
        imagem (numpy.ndarray): Imagem de entrada
    
    Returns:
        numpy.ndarray: Imagem segmentada
    """
    # Limiarização
    limiar = filters.threshold_otsu(imagem)
    mascara_binaria = imagem > limiar
    
    # Distância euclidiana para watershed
    distancia = ndimage.distance_transform_edt(mascara_binaria)
    
    # Encontrar máximos locais
    from scipy import ndimage as ndi
    maximos_locais = feature.peak_local_max(distancia, min_distance=20, labels=mascara_binaria)
    marcadores = np.zeros_like(distancia, dtype=bool)
    marcadores[tuple(maximos_locais.T)] = True
    marcadores = ndi.label(marcadores)[0]
    
    # Aplicar watershed
    rotulos = segmentation.watershed(-distancia, marcadores, mask=mascara_binaria)
    
    # Criar imagem colorida para visualização
    imagem_segmentada = color.label2rgb(rotulos, imagem, alpha=0.5, bg_label=0)
    
    return imagem_segmentada

def processar_e_salvar_imagens():
    """
    Processa e salva imagens para diferentes tipos de estruturas arqueológicas.
    """
    tipos = ['geoglifo', 'aldeia_circular', 'vala_circular']
    
    for tipo in tipos:
        print(f"Processando {tipo}...")
        
        # Gerar imagem simulada
        imagem_original = gerar_imagem_lidar_simulada(tipo=tipo)
        
        # Detectar bordas
        bordas = detectar_bordas(imagem_original)
        
        # Realçar estruturas
        realce = realcar_estruturas(imagem_original)
        
        # Segmentar estruturas
        segmentacao = segmentar_estruturas(imagem_original)
        
        # Salvar resultados
        plt.figure(figsize=(10, 8))
        plt.imshow(imagem_original, cmap='terrain')
        plt.title(f"Imagem Original - {tipo.replace('_', ' ').title()}")
        plt.colorbar(label='Elevação')
        plt.axis('off')
        plt.tight_layout()
        plt.savefig(os.path.join(RESULTS_DIR, f"original_{tipo}.png"), dpi=300)
        
        plt.figure(figsize=(10, 8))
        plt.imshow(bordas, cmap='gray')
        plt.title(f"Detecção de Bordas - {tipo.replace('_', ' ').title()}")
        plt.axis('off')
        plt.tight_layout()
        plt.savefig(os.path.join(RESULTS_DIR, f"{tipo}_bordas.png"), dpi=300)
        
        plt.figure(figsize=(10, 8))
        plt.imshow(realce, cmap='viridis')
        plt.title(f"Estruturas Realçadas - {tipo.replace('_', ' ').title()}")
        plt.colorbar(label='Intensidade')
        plt.axis('off')
        plt.tight_layout()
        plt.savefig(os.path.join(RESULTS_DIR, f"{tipo}_realce.png"), dpi=300)
        
        plt.figure(figsize=(10, 8))
        plt.imshow(segmentacao)
        plt.title(f"Segmentação de Estruturas - {tipo.replace('_', ' ').title()}")
        plt.axis('off')
        plt.tight_layout()
        plt.savefig(os.path.join(RESULTS_DIR, f"{tipo}_segmentacao.png"), dpi=300)
        
        plt.close('all')

if __name__ == "__main__":
    """
    Ponto de entrada principal do script.
    """
    print("Iniciando detecção de sítios arqueológicos na Amazônia...")
    criar_diretorio_se_nao_existir(RESULTS_DIR)
    processar_e_salvar_imagens()
    print(f"Processamento concluído. Resultados salvos em: {RESULTS_DIR}")
