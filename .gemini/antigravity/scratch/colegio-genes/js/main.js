/* ==========================================================================
   COLEGIO GENES - JAVASCRIPT COMPLETO CON CANALES, VIDEOS Y NAVEGACIÓN
   ========================================================================== */

function closeDropdowns() {
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
}

function showSistemaSubSection(subId) {
    const mainSelection = document.getElementById('sistema-level-selection');
    const primariaDetail = document.getElementById('subseccion-primaria-detail');
    const secundariaDetail = document.getElementById('subseccion-secundaria-detail');
    
    if (mainSelection) mainSelection.style.display = 'none';
    if (primariaDetail) primariaDetail.style.display = 'none';
    if (secundariaDetail) secundariaDetail.style.display = 'none';

    if (subId === 'selection-main') {
        if (mainSelection) mainSelection.style.display = 'block';
    } else if (subId === 'primaria-detail') {
        if (primariaDetail) primariaDetail.style.display = 'block';
    } else if (subId === 'secundaria-detail') {
        if (secundariaDetail) secundariaDetail.style.display = 'block';
    }

    const targetSection = document.getElementById('primaria');
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
}

const sectionSeoTitles = {
    'inicio': 'Colegio Genes | Sistema Educativo Preuniversitario 2026',
    'primaria': 'Sistema Educativo - Primaria y Secundaria | Colegio Genes',
    'secundaria': 'Sistema Educativo - Secundaria | Colegio Genes',
    'sedes': 'Nuestras Sedes en Lima Metropolitana | Colegio Genes',
    'vacaciones': 'Programa de Vacaciones Útiles 2026 | Colegio Genes',
    'ingresantes': 'Historias de Éxito e Ingresantes Destacados | Colegio Genes',
    'videos-primaria': 'Videos Educativos Nivel Primaria | Colegio Genes',
    'videos-secundaria': 'Videos Educativos Nivel Secundaria | Colegio Genes',
    'contacto': 'Contacto y Atención a Padres | Colegio Genes',
    'admision': 'Proceso de Admisión 2026 | Colegio Genes'
};

function showSection(id, updateHash = true) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) {
        target.classList.add('active');
    }
    
    document.querySelectorAll('.nav-links a:not(.btn-admision)').forEach(a => a.classList.remove('active'));

    const link = document.getElementById('link-' + id);
    if (link) {
        link.classList.add('active');
    } else if (id === 'videos-primaria' || id === 'videos-secundaria') {
        const videosLink = document.getElementById('link-videos');
        if (videosLink) videosLink.classList.add('active');
    } else if (id === 'primaria' || id === 'secundaria') {
        const sistemaLink = document.getElementById('link-sistema');
        if (sistemaLink) sistemaLink.classList.add('active');
        showSistemaSubSection('selection-main');
    }

    // Actualización dinámica de SEO Document Title y URL Hash
    if (sectionSeoTitles[id]) {
        document.title = sectionSeoTitles[id];
    }

    if (updateHash && window.location.hash !== '#' + id) {
        history.pushState(null, '', '#' + id);
    }

    closeDropdowns();
    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navegación por Hash / Deep Linking para Motores de Búsqueda (SEO)
function handleHashRouting() {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
        showSection(hash, false);
    }
}

window.addEventListener('popstate', handleHashRouting);
window.addEventListener('hashchange', handleHashRouting);

let testimonialIndex = 0;
let testimonialTimer = null;

const testimoniosIngresantes = [
    {
        nombre: "Valeria Torres",
        carrera: "Medicina Humana",
        universidad: "UNMSM - San Marcos",
        puesto: "1er. Puesto Cómputo General",
        comentario: "El sistema de Genes me dio la disciplina, el seguimiento constante y una base preuniversitaria inquebrantable. Sentí que cada simulacro semanal y cada tutoría personalizada me acercaban de verdad a mi ingreso.",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=250&auto=format&fit=crop"
    },
    {
        nombre: "Diego Salazar",
        carrera: "Ingeniería de Sistemas",
        universidad: "UNI - U. Nacional de Ingeniería",
        puesto: "2do. Puesto Facultad de Sistemas",
        comentario: "Lo que más valoro de Colegio Genes es la exigencia bien orientada. No solo nos preparaban para resolver preguntas difíciles, sino para pensar con orden, velocidad y total confianza ante cualquier examen.",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=250&auto=format&fit=crop"
    },
    {
        nombre: "Axel Fernández",
        carrera: "Ingeniería Industrial",
        universidad: "PUCP - U. Católica del Perú",
        puesto: "Ingreso Directo 1era Opción",
        comentario: "Genes me ayudó a fortalecer mi lógica matemática, comprensión lectora y constancia. El acompañamiento de las profesoras tutoras hizo que el proceso fuera exigente pero siempre motivador.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop"
    },
    {
        nombre: "Yohan López",
        carrera: "Ingeniería de Alimentos",
        universidad: "UNAC - U. Nacional del Callao",
        puesto: "3er. Puesto General",
        comentario: "Aprendí a sostener un ritmo de estudio constante sin acumular dudas. Las clases en video de repaso y las evaluaciones continuas marcaron la diferencia para asegurar mi ingreso.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&auto=format&fit=crop"
    },
    {
        nombre: "Lucía Fernández",
        carrera: "Psicología",
        universidad: "UNFV - U. Federico Villarreal",
        puesto: "1er. Puesto Especialidad",
        comentario: "En Genes encontré un ambiente académico de alta exigencia, pero al mismo tiempo un equipo de monitores que creía en nosotros. Logré ingresar con la tranquilidad de estar bien preparada.",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop"
    }
];

function renderTestimonio(index) {
    const data = testimoniosIngresantes[index];
    const avatar = document.getElementById('testimonio-avatar');
    const nombre = document.getElementById('testimonio-nombre');
    const carrera = document.getElementById('testimonio-carrera');
    const uni = document.getElementById('testimonio-uni');
    const puesto = document.getElementById('testimonio-puesto');
    const comentario = document.getElementById('testimonio-comentario');
    const dots = document.querySelectorAll('#testimonio-dots-wrapper .testimonio-dot');

    if (!data || !avatar) return;

    avatar.src = data.avatar;
    avatar.alt = data.nombre;
    if (nombre) nombre.textContent = data.nombre;
    if (carrera) carrera.textContent = data.carrera;
    if (uni) uni.textContent = data.universidad;
    if (puesto) puesto.innerHTML = `<i class="fas fa-trophy" style="color: #FACC15;"></i> ${data.puesto}`;
    if (comentario) comentario.textContent = `"${data.comentario}"`;

    dots.forEach((dot, dIdx) => {
        dot.classList.toggle('active', dIdx === index);
    });
}

function showTestimonio(index) {
    testimonialIndex = index;
    renderTestimonio(testimonialIndex);
    startTestimonioAuto();
}

function prevTestimonio() {
    testimonialIndex = (testimonialIndex - 1 + testimoniosIngresantes.length) % testimoniosIngresantes.length;
    renderTestimonio(testimonialIndex);
    startTestimonioAuto();
}

function nextTestimonio() {
    testimonialIndex = (testimonialIndex + 1) % testimoniosIngresantes.length;
    renderTestimonio(testimonialIndex);
    startTestimonioAuto();
}

function startTestimonioAuto() {
    clearInterval(testimonialTimer);
    testimonialTimer = setInterval(function () {
        testimonialIndex = (testimonialIndex + 1) % testimoniosIngresantes.length;
        renderTestimonio(testimonialIndex);
    }, 6500);
}

/* --------------------------------------------------------------------------
   SUBPANELES DE PRIMARIA Y SECUNDARIA
   -------------------------------------------------------------------------- */
function showPrimariaPanel(panelId, button) {
    document.querySelectorAll('.primaria-panel').forEach(panel => panel.classList.remove('active'));
    document.querySelectorAll('#primaria .sistema-tab').forEach(tab => tab.classList.remove('active'));

    const targetPanel = document.getElementById(panelId);
    if (targetPanel) targetPanel.classList.add('active');
    if (button) button.classList.add('active');
}

function showSecundariaPanel(panelId, button) {
    document.querySelectorAll('.secundaria-panel').forEach(panel => panel.classList.remove('active'));
    document.querySelectorAll('#secundaria .sistema-tab').forEach(tab => tab.classList.remove('active'));

    const targetPanel = document.getElementById(panelId);
    if (targetPanel) targetPanel.classList.add('active');
    if (button) button.classList.add('active');
}

/* --------------------------------------------------------------------------
   CANALES POR GRADO
   -------------------------------------------------------------------------- */
const primaryChannelsData = {
    grado1: {
        titulo: "1ro de Primaria",
        descripcion: "Accede al canal virtual oficial de 1er. Grado de Primaria para reforzar las clases y revisar el contenido académico.",
        link: "https://www.youtube.com/@genesclasevirtual1ro.prima508",
        imagen: "assets/images/canales/1ro_prim.jpg",
        disponible: true
    },
    grado2: {
        titulo: "2do de Primaria",
        descripcion: "Canal virtual oficial de 2do. Grado de Primaria para reforzamiento escolar y solucionarios.",
        link: "https://www.youtube.com/@genesclasevirtual2do.prima19",
        imagen: "assets/images/canales/1ro_prim.jpg",
        disponible: true
    },
    grado3: {
        titulo: "3ro de Primaria",
        descripcion: "Canal virtual oficial de 3er. Grado de Primaria. Refuerzo académico y compendios.",
        link: "https://www.youtube.com/@genesclasevirtual3ro.primaria",
        imagen: "assets/images/canales/1ro_prim.jpg",
        disponible: true
    },
    grado4: {
        titulo: "4to de Primaria",
        descripcion: "Canal virtual oficial para 4to. Grado de Primaria. Refuerzo académico progresivo.",
        link: "https://www.youtube.com/@genesclasevirtual4to.prima398",
        imagen: "assets/images/canales/4to_prim.jpg",
        disponible: true
    },
    grado5: {
        titulo: "5to de Primaria",
        descripcion: "Canal virtual para 5to. Grado de Primaria. Preparación con exigencia académica.",
        link: "https://www.youtube.com/@genesclasevirtual5to.prima354",
        imagen: "assets/images/canales/5to_prim.jpg",
        disponible: true
    },
    grado6: {
        titulo: "6to de Primaria",
        descripcion: "Canal virtual oficial para 6to. Grado de Primaria. Preparación y consolidación de estudios.",
        link: "https://www.youtube.com/@genesclasevirtual6to.primaria",
        imagen: "assets/images/canales/5to_prim.jpg",
        disponible: true
    }
};

function switchCanalesLevel(level, button) {
    const gridPrimaria = document.getElementById('canales-grid-primaria');
    const gridSecundaria = document.getElementById('canales-grid-secundaria');
    const tabPrimaria = document.getElementById('tab-btn-primaria');
    const tabSecundaria = document.getElementById('tab-btn-secundaria');

    if (level === 'primaria') {
        if (gridPrimaria) gridPrimaria.style.display = 'grid';
        if (gridSecundaria) gridSecundaria.style.display = 'none';

        if (tabPrimaria) {
            tabPrimaria.style.background = 'var(--bg-dark-navy)';
            tabPrimaria.style.color = '#FFFFFF';
            tabPrimaria.style.border = 'none';
        }
        if (tabSecundaria) {
            tabSecundaria.style.background = '#F8FAFC';
            tabSecundaria.style.color = '#475569';
            tabSecundaria.style.border = '1px solid #CBD5E1';
        }
    } else {
        if (gridPrimaria) gridPrimaria.style.display = 'none';
        if (gridSecundaria) gridSecundaria.style.display = 'grid';

        if (tabSecundaria) {
            tabSecundaria.style.background = 'var(--bg-dark-navy)';
            tabSecundaria.style.color = '#FFFFFF';
            tabSecundaria.style.border = 'none';
        }
        if (tabPrimaria) {
            tabPrimaria.style.background = '#F8FAFC';
            tabPrimaria.style.color = '#475569';
            tabPrimaria.style.border = '1px solid #CBD5E1';
        }
    }
}

function showPrimaryChannel(gradoKey, button) {
    const data = primaryChannelsData[gradoKey] || primaryChannelsData['grado1'];
    
    document.querySelectorAll('.canales-primaria-tabs .canal-primaria-tab').forEach(btn => btn.classList.remove('active'));
    if (button) button.classList.add('active');

    const titleEl = document.getElementById('primary-channel-title');
    const descEl = document.getElementById('primary-channel-description');
    const linkEl = document.getElementById('primary-channel-link');
    const imgEl = document.getElementById('primary-channel-image');

    if (titleEl) titleEl.textContent = data.titulo;
    if (descEl) descEl.textContent = data.descripcion;
    if (imgEl) imgEl.src = data.imagen;

    if (linkEl) {
        if (data.disponible === false) {
            linkEl.href = "javascript:void(0);";
            linkEl.style.background = "#64748B";
            linkEl.style.boxShadow = "none";
            linkEl.style.cursor = "not-allowed";
            linkEl.innerHTML = `<i class="fas fa-exclamation-circle"></i> Canal no disponible`;
        } else {
            linkEl.href = data.link;
            linkEl.style.background = "#FF0000";
            linkEl.style.boxShadow = "0 4px 12px rgba(255,0,0,0.3)";
            linkEl.style.cursor = "pointer";
            linkEl.innerHTML = `<i class="fab fa-youtube"></i> Ingresar al canal`;
        }
    }
}

const secondaryChannelsData = {
    grado1: {
        titulo: "1ro de Secundaria",
        descripcion: "Canal virtual oficial de 1er. Año de Secundaria. Clases de ciencias exactas y letras.",
        link: "https://www.youtube.com/@genesclasevirtual1rosecund681",
        imagen: "assets/images/canales/1ro_sec.jpg",
        disponible: true
    },
    grado2: {
        titulo: "2do de Secundaria",
        descripcion: "Canal virtual oficial para 2do. Año de Secundaria. Explicaciones dinámicas y compendios.",
        link: "https://www.youtube.com/@genesclasevirtual2do.secun258",
        imagen: "assets/images/canales/2do_sec.jpg",
        disponible: true
    },
    grado3: {
        titulo: "3ro de Secundaria",
        descripcion: "Canal virtual oficial para 3er. Año de Secundaria. Preparación preuniversitaria intensiva.",
        link: "https://www.youtube.com/@genesclasevirtual3ro.secun539",
        imagen: "assets/images/canales/3ro_sec.jpg",
        disponible: true
    },
    grado4: {
        titulo: "4to de Secundaria",
        descripcion: "Canal virtual oficial para 4to. Año de Secundaria. Exigencia académica y preguntas de admisión.",
        link: "https://www.youtube.com/@genesclasevirtual4to.secun736",
        imagen: "assets/images/canales/4to_sec.jpg",
        disponible: true
    },
    grado5: {
        titulo: "5to de Secundaria",
        descripcion: "Canal virtual oficial de 5to. Año de Secundaria. Máximo nivel con resolución de ejercicios tipo examen.",
        link: "https://www.youtube.com/@genesclasevirtual5to.secun175",
        imagen: "assets/images/canales/5to_sec.jpg",
        disponible: true
    }
};

function showSecundariaChannel(gradoKey, button) {
    const data = secondaryChannelsData[gradoKey] || secondaryChannelsData['grado1'];
    
    document.querySelectorAll('.canales-secundaria-tabs .canal-secundaria-tab').forEach(btn => btn.classList.remove('active'));
    if (button) button.classList.add('active');

    const titleEl = document.getElementById('secondary-channel-title');
    const descEl = document.getElementById('secondary-channel-description');
    const linkEl = document.getElementById('secondary-channel-link');
    const imgEl = document.getElementById('secondary-channel-image');

    if (titleEl) titleEl.textContent = data.titulo;
    if (descEl) descEl.textContent = data.descripcion;
    if (imgEl) imgEl.src = data.imagen;

    if (linkEl) {
        if (data.disponible === false) {
            linkEl.href = "javascript:void(0);";
            linkEl.style.background = "#64748B";
            linkEl.style.boxShadow = "none";
            linkEl.style.cursor = "not-allowed";
            linkEl.innerHTML = `<i class="fas fa-exclamation-circle"></i> Canal no disponible`;
        } else {
            linkEl.href = data.link;
            linkEl.style.background = "#FF0000";
            linkEl.style.boxShadow = "0 4px 12px rgba(255,0,0,0.3)";
            linkEl.style.cursor = "pointer";
            linkEl.innerHTML = `<i class="fab fa-youtube"></i> Ingresar al canal`;
        }
    }
}

/* --------------------------------------------------------------------------
   VIDEOS EDUCATIVOS CON NOMBRES EXACTOS Y TRADICIONALES DE CURSOS DEL ORIGINAL
   -------------------------------------------------------------------------- */
const videosPrimariaData = {
    primaria1: {
        cursos: [
            { nombre: "Matemática", link: "https://youtu.be/9teroVL1Txg", icono: "fas fa-calculator" },
            { nombre: "Razonamiento Matemático", link: "https://youtu.be/Ppxgmqum0y8", icono: "fas fa-brain" },
            { nombre: "Comunicación", link: "https://youtu.be/X0OzTIUla04", icono: "fas fa-book-open" },
            { nombre: "Ortografía", link: "https://youtu.be/1bHUwUf1ey8", icono: "fas fa-pen-nib" },
            { nombre: "Razonamiento Verbal", link: "https://youtu.be/RyBfavmiKFY", icono: "fas fa-comments" },
            { nombre: "Taller de Lectura", link: "https://youtu.be/tPtPIr-TpHs", icono: "fas fa-book" },
            { nombre: "Ciencia y Tecnología", link: "https://youtu.be/X0OzTIUla04", icono: "fas fa-flask" },
            { nombre: "Personal Social", link: "https://youtu.be/tPtPIr-TpHs", icono: "fas fa-users" },
            { nombre: "Arte", link: "https://youtu.be/slice9@3x.png", icono: "fas fa-palette" },
            { nombre: "Inglés", link: "https://youtu.be/slice10@3x.png", icono: "fas fa-language" }
        ]
    },
    primaria2: {
        cursos: [
            { nombre: "Matemática", link: "https://youtu.be/DFvta53hE8Q", icono: "fas fa-calculator" },
            { nombre: "Razonamiento Matemático", link: "https://youtu.be/Ppxgmqum0y8", icono: "fas fa-brain" },
            { nombre: "Comunicación", link: "https://youtu.be/TrDPKqGbwYE", icono: "fas fa-book-open" },
            { nombre: "Ortografía", link: "https://youtu.be/6EF_gx39xd0", icono: "fas fa-pen-nib" },
            { nombre: "Razonamiento Verbal", link: "https://youtu.be/RyBfavmiKFY", icono: "fas fa-comments" },
            { nombre: "Taller de Lectura", link: "https://youtu.be/tPtPIr-TpHs", icono: "fas fa-book" },
            { nombre: "Ciencia y Tecnología", link: "https://youtu.be/X0OzTIUla04", icono: "fas fa-flask" },
            { nombre: "Personal Social", link: "https://youtu.be/tPtPIr-TpHs", icono: "fas fa-users" },
            { nombre: "Arte", link: "https://youtu.be/slice9@3x.png", icono: "fas fa-palette" },
            { nombre: "Inglés", link: "https://youtu.be/slice10@3x.png", icono: "fas fa-language" }
        ]
    },
    primaria3: {
        cursos: [
            { nombre: "Aritmética", link: "https://youtu.be/dOdc8ij6kh0", icono: "fas fa-calculator" },
            { nombre: "Álgebra", link: "https://youtu.be/AWscpVMkWuc", icono: "fas fa-square-root-alt" },
            { nombre: "Geometría", link: "https://youtu.be/g1tWczbKadE", icono: "fas fa-draw-polygon" },
            { nombre: "Razonamiento Matemático", link: "https://youtu.be/Ppxgmqum0y8", icono: "fas fa-brain" },
            { nombre: "Lenguaje", link: "https://youtu.be/TrDPKqGbwYE", icono: "fas fa-book-open" },
            { nombre: "Ortografía", link: "https://youtu.be/1bHUwUf1ey8", icono: "fas fa-pen-nib" },
            { nombre: "Razonamiento Verbal", link: "https://youtu.be/RyBfavmiKFY", icono: "fas fa-comments" },
            { nombre: "Taller de Lectura", link: "https://youtu.be/tPtPIr-TpHs", icono: "fas fa-book" },
            { nombre: "Ciencia y Ambiente", link: "https://youtu.be/eYLTONYvzrU", icono: "fas fa-flask" },
            { nombre: "Personal Social", link: "https://youtu.be/tPtPIr-TpHs", icono: "fas fa-users" },
            { nombre: "Inglés", link: "https://youtu.be/slice10@3x.png", icono: "fas fa-language" }
        ]
    },
    primaria4: {
        cursos: [
            { nombre: "Aritmética", link: "https://youtu.be/dOdc8ij6kh0", icono: "fas fa-calculator" },
            { nombre: "Álgebra", link: "https://youtu.be/AWscpVMkWuc", icono: "fas fa-square-root-alt" },
            { nombre: "Geometría", link: "https://youtu.be/g1tWczbKadE", icono: "fas fa-draw-polygon" },
            { nombre: "Razonamiento Matemático", link: "https://youtu.be/Ppxgmqum0y8", icono: "fas fa-brain" },
            { nombre: "Física", link: "https://youtu.be/9ht-HF0A_04", icono: "fas fa-atom" },
            { nombre: "Química", link: "https://youtu.be/eYLTONYvzrU", icono: "fas fa-flask" },
            { nombre: "Biología", link: "https://youtu.be/9ht-HF0A_04", icono: "fas fa-dna" },
            { nombre: "Lenguaje", link: "https://youtu.be/TrDPKqGbwYE", icono: "fas fa-book-open" },
            { nombre: "Castellano", link: "https://youtu.be/1bHUwUf1ey8", icono: "fas fa-spell-check" },
            { nombre: "Razonamiento Verbal", link: "https://youtu.be/RyBfavmiKFY", icono: "fas fa-comments" },
            { nombre: "Taller de Lectura", link: "https://youtu.be/tPtPIr-TpHs", icono: "fas fa-book" },
            { nombre: "Historia del Perú", link: "https://youtu.be/tPtPIr-TpHs", icono: "fas fa-landmark" },
            { nombre: "Geografía", link: "https://youtu.be/tPtPIr-TpHs", icono: "fas fa-globe-americas" },
            { nombre: "Inglés", link: "https://youtu.be/slice10@3x.png", icono: "fas fa-language" }
        ]
    },
    primaria5: {
        cursos: [
            { nombre: "Aritmética", link: "https://youtu.be/dOdc8ij6kh0", icono: "fas fa-calculator" },
            { nombre: "Álgebra", link: "https://youtu.be/AWscpVMkWuc", icono: "fas fa-square-root-alt" },
            { nombre: "Geometría", link: "https://youtu.be/g1tWczbKadE", icono: "fas fa-draw-polygon" },
            { nombre: "Trigonometría", link: "https://youtu.be/nTpoHPz6JRw", icono: "fas fa-ruler-combined" },
            { nombre: "Razonamiento Matemático", link: "https://youtu.be/Ppxgmqum0y8", icono: "fas fa-brain" },
            { nombre: "Física", link: "https://youtu.be/9ht-HF0A_04", icono: "fas fa-atom" },
            { nombre: "Química", link: "https://youtu.be/eYLTONYvzrU", icono: "fas fa-flask" },
            { nombre: "Biología", link: "https://youtu.be/9ht-HF0A_04", icono: "fas fa-dna" },
            { nombre: "Lenguaje", link: "https://youtu.be/TrDPKqGbwYE", icono: "fas fa-book-open" },
            { nombre: "Castellano", link: "https://youtu.be/1bHUwUf1ey8", icono: "fas fa-spell-check" },
            { nombre: "Razonamiento Verbal", link: "https://youtu.be/RyBfavmiKFY", icono: "fas fa-comments" },
            { nombre: "Taller de Lectura", link: "https://youtu.be/tPtPIr-TpHs", icono: "fas fa-book" },
            { nombre: "Historia del Perú", link: "https://youtu.be/tPtPIr-TpHs", icono: "fas fa-landmark" },
            { nombre: "Geografía", link: "https://youtu.be/tPtPIr-TpHs", icono: "fas fa-globe-americas" },
            { nombre: "Inglés", link: "https://youtu.be/slice10@3x.png", icono: "fas fa-language" }
        ]
    },
    primaria6: {
        cursos: [
            { nombre: "Aritmética", link: "https://youtu.be/dOdc8ij6kh0", icono: "fas fa-calculator" },
            { nombre: "Álgebra", link: "https://youtu.be/AWscpVMkWuc", icono: "fas fa-square-root-alt" },
            { nombre: "Geometría", link: "https://youtu.be/g1tWczbKadE", icono: "fas fa-draw-polygon" },
            { nombre: "Trigonometría", link: "https://youtu.be/nTpoHPz6JRw", icono: "fas fa-ruler-combined" },
            { nombre: "Razonamiento Matemático", link: "https://youtu.be/Ppxgmqum0y8", icono: "fas fa-brain" },
            { nombre: "Física", link: "https://youtu.be/9ht-HF0A_04", icono: "fas fa-atom" },
            { nombre: "Química", link: "https://youtu.be/eYLTONYvzrU", icono: "fas fa-flask" },
            { nombre: "Biología", link: "https://youtu.be/9ht-HF0A_04", icono: "fas fa-dna" },
            { nombre: "Lenguaje", link: "https://youtu.be/TrDPKqGbwYE", icono: "fas fa-book-open" },
            { nombre: "Castellano", link: "https://youtu.be/1bHUwUf1ey8", icono: "fas fa-spell-check" },
            { nombre: "Razonamiento Verbal", link: "https://youtu.be/RyBfavmiKFY", icono: "fas fa-comments" },
            { nombre: "Taller de Lectura", link: "https://youtu.be/tPtPIr-TpHs", icono: "fas fa-book" },
            { nombre: "Historia del Perú", link: "https://youtu.be/tPtPIr-TpHs", icono: "fas fa-landmark" },
            { nombre: "Historia Universal", link: "https://youtu.be/tPtPIr-TpHs", icono: "fas fa-globe-europe" },
            { nombre: "Geografía", link: "https://youtu.be/tPtPIr-TpHs", icono: "fas fa-globe-americas" },
            { nombre: "Cívica", link: "https://youtu.be/tPtPIr-TpHs", icono: "fas fa-balance-scale" },
            { nombre: "Inglés", link: "https://youtu.be/slice10@3x.png", icono: "fas fa-language" }
        ]
    }
};

/* --------------------------------------------------------------------------
   VIDEOS EDUCATIVOS - ASIGNACIÓN DE COLORES HARMONIOSOS POR ÁREA DE CURSO
   -------------------------------------------------------------------------- */
function getCourseTheme(nombre) {
    const n = nombre.toLowerCase();
    
    // MATEMÁTICAS (Azul Imperial / Navy)
    if (n.includes('mate') || n.includes('álgebra') || n.includes('geometría') || n.includes('trigono') || n.includes('aritmética') || n.includes('razonamiento mat')) {
        return { bg: 'rgba(32, 38, 130, 0.08)', border: 'rgba(32, 38, 130, 0.2)', color: '#202682', topBorder: '#202682' };
    }
    // CIENCIAS Y TECNOLOGÍA (Teal / Esmeralda)
    if (n.includes('física') || n.includes('química') || n.includes('biología') || n.includes('ciencia') || n.includes('ambiente')) {
        return { bg: 'rgba(13, 148, 136, 0.08)', border: 'rgba(13, 148, 136, 0.2)', color: '#0D9488', topBorder: '#0D9488' };
    }
    // HISTORIA Y SOCIALES (Ámbar Cálido / Bronce)
    if (n.includes('historia') || n.includes('geografía') || n.includes('cívica') || n.includes('economía') || n.includes('filosofía') || n.includes('personal social')) {
        return { bg: 'rgba(217, 119, 6, 0.08)', border: 'rgba(217, 119, 6, 0.2)', color: '#D97706', topBorder: '#D97706' };
    }
    // IDIOMAS, ARTE Y PSICOLOGÍA (Violeta / Índigo)
    if (n.includes('inglés') || n.includes('arte') || n.includes('psicología')) {
        return { bg: 'rgba(124, 58, 237, 0.08)', border: 'rgba(124, 58, 237, 0.2)', color: '#7C3AED', topBorder: '#7C3AED' };
    }
    // COMUNICACIÓN, LENGUAJE, LECTURA, LITERATURA, ORTOGRAFÍA (Carmesí Elegante)
    return { bg: 'rgba(185, 28, 28, 0.08)', border: 'rgba(185, 28, 28, 0.2)', color: '#B91C1C', topBorder: '#B91C1C' };
}

function renderVideosPrimaria(key) {
    const bloque = videosPrimariaData[key] || videosPrimariaData['primaria1'];
    const grid = document.getElementById("videos-edu-grid");
    if (!grid) return;
    grid.innerHTML = bloque.cursos.map(curso => {
        const theme = getCourseTheme(curso.nombre);
        return `
            <article class="video-curso-card" style="border-top: 4px solid ${theme.topBorder};">
                <div class="video-curso-icon-box" style="background: ${theme.bg}; border-color: ${theme.border}; color: ${theme.color};">
                    <i class="${curso.icono}"></i>
                </div>
                <h4>${curso.nombre}</h4>
                <p>Accede al contenido oficial del curso en YouTube.</p>
                <a href="${curso.link}" target="_blank" rel="noopener noreferrer" class="btn-ver-video-yt">
                    <i class="fab fa-youtube"></i> Ver video
                </a>
            </article>
        `;
    }).join("");
}

function showVideosPrimaria(key, button) {
    document.querySelectorAll("#videos-primaria .canales-primaria-tabs .canal-primaria-tab").forEach(tab => tab.classList.remove("active"));
    if (button) button.classList.add("active");
    renderVideosPrimaria(key);
}

function renderVideosSecundaria(key) {
    const bloque = videosSecundariaData[key] || videosSecundariaData['secundaria1'];
    const grid = document.getElementById("videos-sec-grid");
    if (!grid) return;
    grid.innerHTML = bloque.cursos.map(curso => {
        const theme = getCourseTheme(curso.nombre);
        return `
            <article class="video-curso-card" style="border-top: 4px solid ${theme.topBorder};">
                <div class="video-curso-icon-box" style="background: ${theme.bg}; border-color: ${theme.border}; color: ${theme.color};">
                    <i class="${curso.icono}"></i>
                </div>
                <h4>${curso.nombre}</h4>
                <p>Accede al contenido oficial del curso en YouTube.</p>
                <a href="${curso.link}" target="_blank" rel="noopener noreferrer" class="btn-ver-video-yt">
                    <i class="fab fa-youtube"></i> Ver video
                </a>
            </article>
        `;
    }).join("");
}

function showVideosSecundaria(key, button) {
    document.querySelectorAll("#videos-secundaria .canales-secundaria-tabs .canal-secundaria-tab").forEach(tab => tab.classList.remove("active"));
    if (button) button.classList.add("active");
    renderVideosSecundaria(key);
}

/* --------------------------------------------------------------------------
   SEDES - POPUP MODAL E INFORMACIÓN COMPLETA
   -------------------------------------------------------------------------- */
const sedesData = {
    alborada: {
        nombre: "GENES ALBORADA",
        distrito: "Comas",
        nivel: "Primaria - Secundaria",
        direccion: "Av. Universitaria 9880",
        fijo: "015573002",
        celular: "945850041",
        correo: "genes1@colegiogenes.edu.pe",
        mapa: "https://www.google.com/maps?q=Av.%20Universitaria%209880%20Comas&output=embed"
    },
    genes2: {
        nombre: "GENES II",
        distrito: "Comas",
        nivel: "Secundaria",
        direccion: "Av. Universitaria 8257, entre Av. Jamaica y Av. Micaela Bastidas",
        fijo: "015218596",
        celular: "945850081",
        correo: "genes2@colegiogenes.edu.pe",
        mapa: "https://www.google.com/maps?q=Av.%20Universitaria%208257%20Comas&output=embed"
    },
    losolivos: {
        nombre: "GENES LOS OLIVOS",
        distrito: "Los Olivos",
        nivel: "Primaria - Secundaria",
        direccion: "Av. Universitaria 5306, cruce con Av. Marañón",
        fijo: "015218596",
        celular: "963974465",
        correo: "geneslosolivos@colegiogenes.edu.pe",
        mapa: "https://www.google.com/maps?q=Av.%20Universitaria%205306%20Los%20Olivos&output=embed"
    },
    primavera: {
        nombre: "GENES PRIMAVERA",
        distrito: "Comas",
        nivel: "Primaria",
        direccion: "Calle 2 Mz. G Lote 27 - Coop. Primavera",
        fijo: "015570144",
        celular: "933909609",
        correo: "genesprimavera@colegiogenes.edu.pe",
        mapa: "https://www.google.com/maps?q=Calle%202%20Mz.%20G%20Lote%2027%20Coop.%20Primavera%20Comas&output=embed"
    },
    smp: {
        nombre: "GENES DE S.M.P.",
        distrito: "San Martín de Porres",
        nivel: "Primaria - Secundaria",
        direccion: "Coop. Virgen de Fátima Mz. L Lote 3, Alt. Cdra. 19 Av. Carlos Izaguirre",
        fijo: "014852475",
        celular: "945850038",
        correo: "genessmp@colegiogenes.edu.pe",
        mapa: "https://www.google.com/maps?q=Av.%20Carlos%20Izaguirre%2019%20San%20Martin%20de%20Porres&output=embed"
    },
    norte: {
        nombre: "GENES DEL NORTE",
        distrito: "Puente Piedra",
        nivel: "Primaria - Secundaria",
        direccion: "Urb. Leoncio Prado Mz. N Lt. 179, Panamericana Norte con Néstor Gambeta",
        fijo: "012889074",
        celular: "933840061",
        correo: "genesdelnorte@colegiogenes.edu.pe",
        mapa: "https://www.google.com/maps?q=Panamericana%20Norte%20con%20Nestor%20Gambeta%20Puente%20Piedra&output=embed"
    },
    gamarra: {
        nombre: "GENES GAMARRA",
        distrito: "San Martín de Porres",
        nivel: "Primaria - Secundaria",
        direccion: "Calle Germán Stiglich Mz. A Lote 3, Urb. Antares",
        fijo: "013987127",
        celular: "923852495",
        correo: "genesgamarra@colegiogenes.edu.pe",
        mapa: "https://www.google.com/maps?q=Calle%20German%20Stiglich%20Urb.%20Antares%20San%20Martin%20de%20Porres&output=embed"
    },
    pinar: {
        nombre: "GENES DEL PINAR",
        distrito: "Comas",
        nivel: "Primaria - Secundaria",
        direccion: "Calle Los Naranjos Mz. H Lote 8 y 9 - Urb. El Pinar",
        fijo: "",
        celular: "945850041",
        correo: "genesdelpinar@colegiogenes.edu.pe",
        mapa: "https://www.google.com/maps?q=Calle%20Los%20Naranjos%20Urb.%20El%20Pinar%20Comas&output=embed"
    }
};

function openSedeModal(id) {
    const sede = sedesData[id];
    if (!sede) return;

    document.getElementById("sede-modal-titulo").textContent = sede.nombre;
    document.getElementById("sede-modal-distrito").textContent = sede.distrito;
    document.getElementById("sede-modal-nivel").textContent = sede.nivel;
    document.getElementById("sede-modal-direccion").textContent = sede.direccion;

    const fijo = document.getElementById("sede-modal-fijo");
    fijo.innerHTML = `<i class="fas fa-phone-alt"></i> <span>${sede.fijo || "Sin fijo"}</span>`;
    fijo.href = sede.fijo ? `tel:${sede.fijo}` : "#";

    const celular = document.getElementById("sede-modal-celular");
    celular.innerHTML = `<i class="fab fa-whatsapp"></i> <span>${sede.celular}</span>`;
    celular.href = `https://wa.me/51${sede.celular}`;

    const correo = document.getElementById("sede-modal-correo");
    correo.innerHTML = `<i class="far fa-envelope"></i> <span>${sede.correo}</span>`;
    correo.href = `mailto:${sede.correo}`;

    document.getElementById("sede-modal-mapa").src = sede.mapa;
    document.getElementById("sede-modal").classList.add("open");
}

function closeSedeModal() {
    const modal = document.getElementById("sede-modal");
    if (modal) modal.classList.remove("open");
}

function showVacacionesPanel(panelId, button) {
    document.querySelectorAll('.vacaciones-panel').forEach(panel => panel.classList.remove('active'));
    document.querySelectorAll('#vacaciones .canal-primaria-tab').forEach(tab => tab.classList.remove('active'));

    const target = document.getElementById(panelId);
    if (target) target.classList.add('active');
    if (button) button.classList.add('active');
}

/* TOGGLES DROPDOWN CON AUTO-CLOSE */
function toggleDropdown(event) {
    event.preventDefault();
    event.stopPropagation();
    const dropdown = document.getElementById('dropdown-sistema');
    const videosDropdown = document.getElementById('dropdown-videos');
    if (videosDropdown) videosDropdown.classList.remove('open');
    if (dropdown) dropdown.classList.toggle('open');
}

function toggleVideosDropdown(event) {
    event.preventDefault();
    event.stopPropagation();
    const dropdown = document.getElementById('dropdown-videos');
    const sistemaDropdown = document.getElementById('dropdown-sistema');
    if (sistemaDropdown) sistemaDropdown.classList.remove('open');
    if (dropdown) dropdown.classList.toggle('open');
}

function toggleMobileMenu() {
    const nav = document.querySelector("nav");
    if (nav) nav.classList.toggle("nav-open");
}

function closeMobileMenu() {
    const nav = document.querySelector("nav");
    if (nav) nav.classList.remove("nav-open");
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        closeDropdowns();
    }
});

/* --------------------------------------------------------------------------
   HERO BANNER SLIDER AUTOMÁTICO (CAMBIO CADA 5 SEGUNDOS)
   -------------------------------------------------------------------------- */
let currentHeroSlide = 0;
let heroSlideTimer = null;
const HERO_SLIDE_INTERVAL = 5000;

function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    if (!slides || slides.length === 0) return;

    startHeroSlideTimer();
}

function renderHeroSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');

    if (!slides || slides.length === 0) return;

    currentHeroSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentHeroSlide);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentHeroSlide);
        const progressSpan = dot.querySelector('.hero-dot-progress');
        if (progressSpan) {
            if (i === currentHeroSlide) {
                progressSpan.style.transition = 'none';
                progressSpan.style.width = '0%';
                setTimeout(() => {
                    progressSpan.style.transition = `width ${HERO_SLIDE_INTERVAL}ms linear`;
                    progressSpan.style.width = '100%';
                }, 20);
            } else {
                progressSpan.style.transition = 'none';
                progressSpan.style.width = '0%';
            }
        }
    });
}

function changeHeroSlide(direction) {
    pauseHeroSlideTimer();
    renderHeroSlide(currentHeroSlide + direction);
    startHeroSlideTimer();
}

function setHeroSlide(index) {
    pauseHeroSlideTimer();
    renderHeroSlide(index);
    startHeroSlideTimer();
}

function startHeroSlideTimer() {
    pauseHeroSlideTimer();
    renderHeroSlide(currentHeroSlide);
    heroSlideTimer = setInterval(() => {
        renderHeroSlide(currentHeroSlide + 1);
    }, HERO_SLIDE_INTERVAL);
}

function pauseHeroSlideTimer() {
    if (heroSlideTimer) {
        clearInterval(heroSlideTimer);
        heroSlideTimer = null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    startTestimonioAuto();
    renderVideosPrimaria('primaria1');
    renderVideosSecundaria('secundaria1');
    handleHashRouting();
});

/* --------------------------------------------------------------------------
   SECCIÓN INGRESANTES & LIGHTBOX MODAL DE AFICHES CON ZOOM Y TAMAÑO REAL
   -------------------------------------------------------------------------- */
let isModalImgZoomed = false;

function filterIngresantes(uniKey, button) {
    document.querySelectorAll('.ingresantes-tabs .ingresante-tab').forEach(btn => btn.classList.remove('active'));
    if (button) button.classList.add('active');

    const cards = document.querySelectorAll('.ingresantes-grid .ingresante-card');
    cards.forEach(card => {
        const uni = card.getAttribute('data-uni');
        if (uniKey === 'todos' || uni === uniKey) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function openIngresanteModal(imgSrc, uniTitle) {
    const modal = document.getElementById('ingresante-modal');
    const modalImg = document.getElementById('ingresante-modal-img');
    const modalTitle = document.getElementById('ingresante-modal-title');
    const btnOriginal = document.getElementById('btn-open-original-img');
    const zoomText = document.getElementById('zoom-toggle-text');

    if (modal && modalImg) {
        modalImg.src = imgSrc;
        modalImg.classList.remove('zoomed-100');
        isModalImgZoomed = false;
        if (zoomText) zoomText.textContent = "Ampliar al 100%";
        if (btnOriginal) btnOriginal.href = imgSrc;
        if (modalTitle && uniTitle) modalTitle.textContent = 'Publicación Oficial: ' + uniTitle;
        modal.classList.add('active');
    }
}

function toggleZoomModalImg() {
    const modalImg = document.getElementById('ingresante-modal-img');
    const zoomText = document.getElementById('zoom-toggle-text');
    if (!modalImg) return;

    isModalImgZoomed = !isModalImgZoomed;
    if (isModalImgZoomed) {
        modalImg.classList.add('zoomed-100');
        if (zoomText) zoomText.textContent = "Ajustar a pantalla";
    } else {
        modalImg.classList.remove('zoomed-100');
        if (zoomText) zoomText.textContent = "Ampliar al 100%";
    }
}

function closeIngresanteModal(event) {
    if (event && event.target && !event.target.classList.contains('modal-backdrop') && !event.target.classList.contains('modal-close-btn')) {
        return;
    }
    const modal = document.getElementById('ingresante-modal');
    if (modal) modal.classList.remove('active');
}
