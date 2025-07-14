
# 🌌 Universo Dual – Tienda Esotérica Online creada como proyecto final para el curso de Tech Adultos - React.js

Universo Dual es una tienda digital de productos místicos, especializada en velas artesanales, inciensos y artículos de ritual. 
Esta SPA moderna, construida con React y TypeScript, combina estética, fluidez y espiritualidad en una sola experiencia.

<img width="1920" height="1027" alt="image" src="https://github.com/user-attachments/assets/1f1b8219-d232-4e70-ab7d-2fc962543753" />

<img width="1920" height="2973" alt="image" src="https://github.com/user-attachments/assets/753cc2b5-50bd-402c-bd33-994b29eab298" />

## 🧰 Tecnologías Utilizadas

### 🖥️ Frontend
- ⚛️ **React 18.3.1** – Interfaces responsivas y reactivas
- 🧾 **TypeScript** – Tipado fuerte para seguridad y escalabilidad
- ⚡ **Vite** – Compilación ultrarrápida
- 🧭 **React Router DOM** – Navegación fluida por rutas
- 🎨 **Tailwind CSS** – Diseño responsivo con utilidades CSS

### 💫 UI/UX
- 🧱 **Shadcn/ui & Radix UI** – Componentes accesibles y personalizables
- 🖼️ **Lucide React** – Iconografía SVG moderna
- 🔔 **Sonner** – Toasts visuales y sutiles

### 🔄 Gestión de Estado
- 🎛️ **React Context API** – Manejo global del carrito y productos
- 🔍 **TanStack Query** – Sincronización eficiente con el servidor
- 📑 **React Hook Form + Zod** – Formularios con validación precisa

### 🧩 Otras Utilidades
- 🌐 **Helmet Async** – SEO dinámico por página
- 📅 **Date-fns** – Manipulación de fechas
- 🎠 **Embla Carousel** – Carrusel fluido de productos
- 🔌 **MockAPI** – API simulada para testing

## 🏗️ Estructura del Proyecto

```
src/
├── components/              # Componentes reutilizables
│   ├── ui/                 # Componentes de interfaz base (Shadcn)
│   ├── ProductCard.tsx     # Tarjeta de producto
│   ├── Cart.tsx           # Carrito de compras
│   └── ...
├── contexts/              # Contextos de React
│   ├── CarritoContext.tsx
│   └── ProductsContext.tsx
├── hooks/                 # Hooks personalizados
├── pages/                 # Páginas de la aplicación
├── services/              # Servicios de API
│   └── mockApi.ts         # API simulada
├── types/                 # Definiciones de tipos TypeScript
└── lib/                   # Utilidades y configuraciones
```

## 🚀 Cómo Ejecutar el Proyecto

### 🔧 Requisitos
- Node.js v16+
- npm o yarn

### 📥 Pasos de Instalación

```bash
git clone [URL_DEL_REPOSITORIO]
cd universodual
npm install
npm run dev
```

🌐 Accede en tu navegador a **http://localhost:8080**

## 🧪 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Modo desarrollo |
| `npm run build` | Compilación para producción |
| `npm run preview` | Previsualización post build |
| `npm run lint` | Corrección de estilo con ESLint |

## 📱 Características Principales

- 🧿 Catálogo de productos esotéricos
- 🛍️ Carrito funcional con lógica completa
- 📂 Navegación por categorías mágicas
- 🔎 Búsqueda dinámica
- 📲 Diseño responsive
- 🧠 SEO optimizado con meta tags dinámicos y JSON-LD
- 🛠️ Panel administrativo de gestión

## 🔐 Acceso al Panel de Administración

**Usuario de prueba:**
- Por primera vez crear el usuario y luego iniciar sesión con las siguientes credenciales:
- 📧 `admin@universodual.com`
- 🔒 `123456`

## 🎨 Diseño y Estética

- 🎨 **Paleta:** tonos morados y dorados
- ✒️ **Tipografía:** Playfair Display (títulos) + Montserrat (texto)
- ♿ **Accesibilidad** con Radix UI
- ✨ **Animaciones** suaves con Tailwind

## 📈 Optimización SEO & Rendimiento

- Meta tags dinámicos
- Estructura JSON-LD
- Lazy loading de imágenes
- Preconexión de fuentes externas

## 🛡️ Gestión de Errores

- 🧱 Boundaries para captura de fallos
- 💬 Mensajes amigables para estados de error
- ⏳ Indicadores claros de carga

## 📦 Dependencias

Consulta el archivo `package.json` para ver la lista completa.
