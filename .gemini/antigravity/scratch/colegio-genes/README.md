# Colegio Genes - Plataforma Institucional y Sistema Preuniversitario

Plataforma web institucional y landing page adaptativa para el **Colegio Genes**, diseñada con estándares modernos de UX/UI para destacar la excelencia académica, el sistema preuniversitario, sedes, talleres de vacaciones útiles e historias de éxito de alumnos ingresantes.

---

## 🚀 Características Principales

- **Diseño 100% Adaptativo (Responsive)**: Optimización fluida para dispositivos móviles, tablets y monitores de alta resolución (puntos de interrupción a 1024px, 768px y 480px).
- **Canales por Grado Académico (YouTube)**:
  - **Secundaria**: 1.° a 5.° de secundaria integrados con avatares oficiales y enlaces a sus canales virtuales.
  - **Primaria**: Enlaces y estados de disponibilidad para 1.°, 4.°, 5.° y 6.° de primaria.
- **Sección Vacaciones Útiles 2026**: Talleres presenciales organizados por bloques académicos con grids dinámicos y responsivos.
- **Showcase de Ingresantes y Testimonios**: Galería interactiva de afiches de ingresantes a universidades de prestigio (UNMSM, UNI, Callao, PUCP) con ventanas modales descriptivas.
- **Sedes e Infraestructura**: Buscador y modal detallado de sedes con mapas y canales de contacto directo.
- **Widget de WhatsApp Flotante**: Interfaz de atención rápida en tiempo real para admisión e informes.

---

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica, accesibilidad y optimización SEO.
- **CSS3 (Vanilla CSS)**: Sistema de diseño con variables CSS, animaciones micro-interactivas, CSS Grid y Flexbox.
- **JavaScript (ES6+)**: Lógica e interactividad de módulos, control de pestañas, modales y renderizado dinámico de canales.
- **FontAwesome & Google Fonts**: Iconografía vectorial y tipografía moderna (`Montserrat` y `Cinzel`).

---

## 📁 Estructura del Proyecto

```text
colegio-genes/
├── assets/
│   └── images/
│       ├── canales/          # Avatares oficiales de canales de YouTube
│       ├── hero_*.jpg        # Imágenes destacadas de banners
│       └── ingresantes_*.png # Afiches de alumnos ingresantes
├── css/
│   └── styles.css            # Sistema de diseño y media queries responsivas
├── js/
│   └── main.js               # Lógica de componentes, pestañas y modales
├── index.html                # Estructura principal SPA / Landing Page
└── README.md                 # Documentación del proyecto
```

---

## 🔧 Instalación y Ejecución Local

No requiere compilación ni dependencias externas complejas.

1. **Clonar o descargar el repositorio**:
   ```bash
   git clone https://github.com/mfdevelopersupport-spec/mfdevelopersupport-spec.git
   ```

2. **Navegar a la carpeta del proyecto**:
   ```bash
   cd .gemini/antigravity/scratch/colegio-genes
   ```

3. **Ejecutar un servidor local simple (opcional)**:
   - Con Python:
     ```bash
     python -m http.server 8080
     ```
   - Abrir en el navegador: `http://localhost:8080`

---

## 📝 Commits y Control de Versiones

Este proyecto sigue la convención de **Conventional Commits** (`feat:`, `fix:`, `style:`, `docs:`, `chore:`).
