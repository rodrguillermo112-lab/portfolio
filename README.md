# Guillermo Rodríguez — Portfolio

Código fuente del portfolio de Guillermo Rodríguez, Video Editor / Motion Designer.
Versión para GitHub: español/inglés, GSAP, Lenis, diez proyectos sin duplicados,
previews ligeros, miniaturas y reproducción completa mediante YouTube.

## Subir a GitHub

1. Descomprime el ZIP.
2. Crea un repositorio en GitHub.
3. Sube el contenido de esta carpeta. `package.json`, `netlify.toml`, `src/` y
   `public/` deben quedar en la raíz del repositorio. Incluye también `.gitignore`,
   `.npmrc` y `.nvmrc`.
4. No subas el ZIP como único archivo del repositorio.

Subir el código a GitHub no publica automáticamente una web en GitHub Pages.
Esta entrega prepara el repositorio para desarrollo y publicación en Netlify.

## Ejecutar

Usa Node.js 22:

```sh
npm install
npm run dev
```

Abre http://127.0.0.1:3000. Los videos usan YouTube también durante el desarrollo;
no necesitas descargar los MP4 completos ni configurar claves privadas.

```sh
npm run lint
npm run check:content
npm run build:pages
```

El resultado de publicación es `out-pages/`, con `index.html` en su raíz.
`npm run build` genera además una exportación estática en `out/`.

## Conectar el repositorio a Netlify

Importa el repositorio desde GitHub. El archivo `netlify.toml` configura:

- Comando de compilación: `npm run build:pages`.
- Directorio que se publica: `out-pages`.
- Node.js: 22.

No selecciones `src` ni la raíz del repositorio como directorio de publicación.
Tras un despliegue exitoso, comprueba que la visibilidad de producción sea pública.
Los permisos y errores de acceso de una cuenta Netlify se resuelven en esa cuenta;
el repositorio no modifica esos permisos.

## Contenido y medios

- `src/data/projects.ts`: títulos, categorías, descripciones, miniaturas e IDs de
  YouTube de los diez proyectos. Es la única fuente de contenido de proyectos.
- `src/data/site.ts`: identidad y contacto.
- `src/data/copy.ts`: textos en español e inglés.
- `public/images/projects/`: miniaturas, incluida la portada corregida de Quoty.
- `public/videos/previews/`: vistas previas silenciosas y ligeras.
- `public/licenses/`: avisos de dependencias y fuentes distribuidas.

Los videos completos están alojados en YouTube como no listados, con inserción
habilitada. No se incluyen originales pesados, `node_modules`, archivos de entorno,
cachés ni credenciales. Los IDs de YouTube son públicos y no son claves secretas.
Los originales y la entrega local anterior permanecen en sus carpetas originales.
Conserva los permisos documentados de publicación de los trabajos.

Contacto: rodrguillermo112@gmail.com · https://instagram.com/guill77rmo/
