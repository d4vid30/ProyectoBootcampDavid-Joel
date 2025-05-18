import matplotlib
matplotlib.use('Agg')  # Usar backend no interactivo para evitar GUI
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
import os

def generar_todos_los_graficos(output_path):
    # === Gráfico original de torta animado ===
    df_total = pd.read_csv('csv/04 share-electricity-renewables.csv')
    df_wind = pd.read_csv('csv/11 share-electricity-wind.csv')
    df_solar = pd.read_csv('csv/15 share-electricity-solar.csv')
    df_hydro = pd.read_csv('csv/07 share-electricity-hydro.csv')

    df_total = df_total.rename(columns={df_total.columns[-1]: 'Renewables'})
    df_wind = df_wind.rename(columns={df_wind.columns[-1]: 'Wind'})
    df_solar = df_solar.rename(columns={df_solar.columns[-1]: 'Solar'})
    df_hydro = df_hydro.rename(columns={df_hydro.columns[-1]: 'Hydro'})

    years = sorted(set(df_total['Year']) & set(df_wind['Year']) & set(df_solar['Year']) & set(df_hydro['Year']))
    years = [y for y in years if 1990 <= y <= 2022]

    fig, ax = plt.subplots(figsize=(6, 6))
    ax.axis('equal')
    title = ax.text(0, 1.1, '', ha='center', va='center', fontsize=14)

    def get_avg(df, year, col):
        return df[df['Year'] == year][col].mean()

    def update(year):
        ax.clear()
        ax.axis('equal')
        wind = get_avg(df_wind, year, 'Wind')
        solar = get_avg(df_solar, year, 'Solar')
        hydro = get_avg(df_hydro, year, 'Hydro')
        total = get_avg(df_total, year, 'Renewables')
        others = max(0, total - (wind + solar + hydro))

        values = [wind, solar, hydro, others]
        labels = ['Eólica', 'Solar', 'Hidro', 'Otras']
        colors = ['#4f99ff', '#ffc107', '#00c49a', '#8884d8']
        ax.pie(values, labels=labels, autopct='%1.1f%%', colors=colors, startangle=140)
        title.set_text(f'Participación de Energías Renovables ({year})')
        fig.suptitle(f"Año: {year}", fontsize=12)

    ani = FuncAnimation(fig, update, frames=years, repeat=False, interval=700)
    ani.save(os.path.join(output_path, 'grafico_torta_renovables.gif'), writer='pillow')

    # === Gráfico de líneas: Capacidad instalada ===
    generar_grafico_lineas_capacidad_instalada(output_path)

    # === Gráfico de área: Renovable vs Convencional ===
    generar_grafico_area_consumo_total(output_path)



def generar_grafico_lineas_capacidad_instalada(output_path):
    """
    Gráfico de Líneas: Tendencia en la Capacidad Instalada
    Descripción: Muestra la evolución de la capacidad instalada de las diferentes fuentes de energía renovable a lo largo del tiempo.
    Datos: cumulative-installed-wind-energy-capacity-gigawatts, installed-solar-PV-capacity, installed-geothermal-capacity.
    Animación: Se genera un GIF animado mostrando la evolución año a año.
    """
    import matplotlib.pyplot as plt
    from matplotlib.animation import FuncAnimation

    # Lectura de datos
    df_wind = pd.read_csv('csv/09 cumulative-installed-wind-energy-capacity-gigawatts.csv')
    df_solar = pd.read_csv('csv/13 installed-solar-PV-capacity.csv')
    df_geo = pd.read_csv('csv/17 installed-geothermal-capacity.csv')
    
    # Agrupamos y ordenamos datos por año
    grupo_wind = df_wind.groupby('Year')[df_wind.columns[-1]].mean().sort_index()
    grupo_solar = df_solar.groupby('Year')[df_solar.columns[-1]].mean().sort_index()
    grupo_geo = df_geo.groupby('Year')[df_geo.columns[-1]].mean().sort_index()
    
    # Usamos el conjunto de años comunes
    years = sorted(set(grupo_wind.index) & set(grupo_solar.index) & set(grupo_geo.index))
    
    fig, ax = plt.subplots(figsize=(10,6))
    
    def update(i):
        ax.clear()
        current_years = [y for y in years if y <= years[i]]
        # Datos acumulados hasta el año actual
        y_wind = [grupo_wind[y] for y in current_years]
        y_solar = [grupo_solar[y] for y in current_years]
        y_geo = [grupo_geo[y] for y in current_years]
        
        ax.plot(current_years, y_wind, label='Eólica', linewidth=2, color='#4f99ff')
        ax.plot(current_years, y_solar, label='Solar', linewidth=2, color='#ffc107')
        ax.plot(current_years, y_geo, label='Geotérmica', linewidth=2, color='#ff5722')
        
        ax.set_title('Tendencia de Capacidad Instalada de Energía Renovable\nAño Actual: {}'.format(years[i]))
        ax.set_xlabel('Año')
        ax.set_ylabel('Capacidad (GW)')
        ax.legend()
        ax.grid(True)
        plt.tight_layout()
    
    ani = FuncAnimation(fig, update, frames=len(years), interval=700, repeat=False)
    ani.save(os.path.join(output_path, 'grafico_lineas_capacidad_instalada.gif'), writer='pillow')
    plt.close()


def generar_grafico_area_consumo_total(output_path):
    """
    Gráfico de Área: Comparación entre Consumo de Energía Renovable y Convencional
    Descripción: Compara el consumo de energía renovable con el consumo de energía convencional a lo largo del tiempo.
    Datos: modern-renewable-energy-consumption y, si están disponibles, datos de consumo de energía convencional.
    Animación: Se genera un GIF animado mostrando la evolución año a año.
    """
    import matplotlib.pyplot as plt
    from matplotlib.animation import FuncAnimation

    # Lectura de datos
    df_renovable = pd.read_csv('csv/02 modern-renewable-energy-consumption.csv')
    df_total = pd.read_csv('csv/01 renewable-share-energy.csv')
    
    # Agrupamos datos por año
    grupo_ren = df_renovable.groupby('Year')[df_renovable.columns[-1]].mean().sort_index()
    grupo_tot = df_total.groupby('Year')[df_total.columns[-1]].mean().sort_index()
    
    # Asegurar que existen años en común
    years = sorted(set(grupo_ren.index) & set(grupo_tot.index))
    
    fig, ax = plt.subplots(figsize=(10,6))
    
    def update(i):
        ax.clear()
        current_years = [y for y in years if y <= years[i]]
        # Datos acumulados hasta el año actual
        renovable = [grupo_ren[y] for y in current_years]
        total = [grupo_tot[y] for y in current_years]
        # Consumo convencional = Total - Renovable
        convencional = [t - r for t, r in zip(total, renovable)]
        
        ax.stackplot(current_years, renovable, convencional,
                     labels=['Renovable', 'Convencional'],
                     colors=['#00c49a', '#8884d8'])
        
        ax.set_title('Comparación de Consumo de Energía: Renovable vs Convencional\nAño Actual: {}'.format(years[i]))
        ax.set_xlabel('Año')
        ax.set_ylabel('Consumo de Energía (TWh)')
        ax.legend()
        ax.grid(True)
        plt.tight_layout()
    
    ani = FuncAnimation(fig, update, frames=len(years), interval=700, repeat=False)
    ani.save(os.path.join(output_path, 'grafico_area_consumo_energia.gif'), writer='pillow')
    plt.close()
