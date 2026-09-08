# Colegio Genes - Plataforma Web e Intranet Institucional

Plataforma web institucional y landing page adaptativa para el **Colegio Genes**, diseñada con estándares modernos de UX/UI para destacar la excelencia académica, el sistema preuniversitario, sedes en Lima Metropolitana, compendios académicos bimestrales, talleres de vacaciones útiles e historias de éxito de alumnos ingresantes.

---

## 🚀 Características Principales

- **Diseño 100% Adaptativo (Responsive)**: Optimización fluida para dispositivos móviles, tablets y monitores de alta resolución.
- **Activos 100% Locales**: Logotipos, imágenes de las 8 sedes, portadas de compendios y horarios de talleres alojados internamente en `assets/images/`.
- **Canales por Grado Académico (YouTube)**:
  - **Secundaria**: 1.° a 5.° de secundaria integrados con enlaces a sus canales virtuales.
  - **Primaria**: Enlaces y canales por grado de 1.° a 6.° de primaria.
- **Programa Vacaciones Útiles 2026**: Horarios oficiales y talleres presenciales organizados en 4 subsecciones.
- **Showcase de Ingresantes y Testimonios**: Galería interactiva de afiches de ingresantes a universidades de prestigio (UNMSM, UNI, Callao, PUCP).
- **Directorio de Sedes**: Tarjetas detalladas de las 8 sedes con mapas y canales de contacto directo.
- **Widget de WhatsApp Flotante**: Atención rápida e informes en tiempo real.

---

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica, accesibilidad y SEO.
- **CSS3 (Vanilla CSS)**: Sistema de diseño modular, variables CSS, animaciones micro-interactivas, Flexbox y CSS Grid.
- **JavaScript (ES6+)**: Lógica e interactividad de módulos, control de pestañas y modales.
- **FontAwesome & Google Fonts**: Iconografía vectorial y tipografía (`Montserrat` y `Cinzel`).

---

## 📁 Estructura de Archivos del Proyecto

```text
colegio-genes/
├── assets/
│   └── images/
│       ├── logo.png                # Logotipo oficial Colegio Genes
│       ├── compendios/             # Portadas oficiales de compendios (1° a 4° Bimestre)
│       ├── sedes/                  # Imágenes oficiales de las 8 sedes de Lima
│       ├── vacaciones/             # Horarios oficiales del programa Vacaciones Útiles
│       ├── canales/                # Avatares oficiales de canales por grado
│       ├── hero_*.jpg              # Banners principales del carrusel
│       └── ingresantes_*.png       # Afiches de alumnos ingresantes
├── css/
│   └── styles.css                  # Hoja de estilos principal y responsive
├── js/
│   └── main.js                     # Lógica interactiva
├── index.html                      # Landing page principal
└── README.md                       # Documentación del proyecto
```

---

## ☁️ Guía Paso a Paso para Despliegue en aaPanel

### Opción A: Despliegue mediante Git en aaPanel (Recomendado)

1. **Iniciar sesión en aaPanel**: Accede a tu panel de control de aaPanel.
2. **Crear el Sitio Web**:
   - Ve a la sección **Website** > **Add site**.
   - Ingresa el dominio registrado (ej. `colegiogenes.edu.pe`).
   - Selecciona **Pure HTML** o deja **PHP** según preferencia.
3. **Clonar el Repositorio desde aaPanel**:
   - Ve a **Website** > haz clic en la carpeta del sitio web (`/www/wwwroot/tu-dominio.com`).
   - Abre la **Terminal** interna de aaPanel o ejecuta por SSH:
     ```bash
     cd /www/wwwroot/tu-dominio.com
     git clone https://github.com/mfdevelopersupport-spec/mfdevelopersupport-spec.git .
     ```
4. **Configurar Permisos**:
   - Asegúrate de que los archivos tengan permisos `755` y propietario `www:www`.
5. **Activar Certificado SSL (HTTPS)**:
   - En aaPanel, ingresa a la configuración del dominio > **SSL** > selecciona **Let's Encrypt** y haz clic en **Apply**.

---

### Opción B: Despliegue subiendo Archivo ZIP en aaPanel

1. **Empaquetar el Proyecto**:
   - Selecciona los archivos `index.html`, `README.md`, carpeta `assets/`, `css/` y `js/` y comprímelos en un archivo `colegio-genes.zip`.
2. **Subir mediante File Manager de aaPanel**:
   - Abre **Files** en aaPanel y navega a `/www/wwwroot/tu-dominio.com`.
   - Haz clic en **Upload**, selecciona `colegio-genes.zip` y sube el archivo.
3. **Descomprimir**:
   - Haz clic derecho sobre `colegio-genes.zip` > **Uncompress**.
4. **Verificación**:
   - Verifica que `index.html` quede en la raíz de `/www/wwwroot/tu-dominio.com`.

---

## 🔧 Ejecución Local para Desarrollo

```bash
# 1. Clonar repositorio
git clone https://github.com/mfdevelopersupport-spec/mfdevelopersupport-spec.git

# 2. Navegar a la carpeta del proyecto
cd colegio-genes

# 3. Iniciar servidor local HTTP
python -m http.server 8080
```
Acceder a: `http://localhost:8080`

---

## 📝 Convención de Commits

Este proyecto sigue la norma de **Conventional Commits**:
- `feat:` Nuevas características.
- `fix:` Corrección de errores.
- `style:` Cambios de diseño/CSS sin afectar la funcionalidad.
- `docs:` Cambios en documentación.
- `chore:` Tareas generales y mantenimiento.
