# Beit Hesed Bakery

Reposteria y panaderia artesanal. Aplicacion web profesional construida con React JSX, React Router, Context API y Supabase.

## Funcionalidades

- Catalogo con filtros por categoria, ocasion, disponibilidad y rango de precio.
- Buscador con URLs amigables.
- Carrito persistente en `localStorage`.
- Sistema de pedidos conectado a Supabase.
- Panel administrativo protegido con Supabase Auth.
- CRUD de productos y gestion de pedidos.
- SEO basico con React Helmet.
- Diseno responsive mobile-first.
- Configuracion lista para Netlify.

## Instalacion local

```bash
npm install
copy .env.example .env
npm run dev
```

En macOS/Linux:

```bash
cp .env.example .env
```

## Conexion con Supabase

1. Crea un proyecto en Supabase.
2. Abre `supabase/schema.sql` y ejecutalo en Supabase Dashboard > SQL Editor.
3. Abre `supabase/seed.sql` y ejecutalo para cargar productos iniciales.
4. En Supabase Dashboard > Authentication > Users, crea un usuario administrador.
5. En Supabase Dashboard > Project Settings > API, copia:
   - Project URL
   - anon public key o publishable key
6. Completa `.env`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Si tu panel muestra publishable key:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

## Rutas principales

- `/` Inicio.
- `/catalogo` Catalogo con filtros.
- `/catalogo/:slug` Detalle de producto.
- `/carrito` Carrito.
- `/pedido` Checkout.
- `/admin/login` Acceso administrativo.
- `/admin` Dashboard.
- `/admin/productos` CRUD de productos.
- `/admin/pedidos` Gestion de pedidos.

## Despliegue en Netlify

1. Sube el proyecto a GitHub.
2. En Netlify, crea un sitio desde ese repositorio.
3. Usa:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Agrega las mismas variables de entorno de Supabase en Netlify.

## Verificacion

```bash
npm run lint
npm run build
```
