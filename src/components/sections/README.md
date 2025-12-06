# Estructura de Secciones del Seller Dashboard

## Componentes Separados por Sección

Cada sección ahora tiene su propio archivo de componente independiente:

### 📁 Estructura de Archivos

```
src/components/sections/
├── products-section.tsx    # Sección de productos
├── settings-section.tsx    # Sección de configuración
├── support-section.tsx     # Sección de soporte
└── feedback-section.tsx    # Sección de feedback
```

## Cómo Personalizar Cada Sección

### 1. Products Section
**Archivo:** `src/components/sections/products-section.tsx`

**Botones de ejemplo incluidos:**
- "Import" - Para importar productos
- "Add Product" - Para agregar nuevos productos

**Para personalizar:**
```tsx
// Edita la sección de botones en el header
<div className="ml-auto flex items-center gap-2">
  <Button size="sm" variant="outline">
    Import
  </Button>
  <Button size="sm">
    <Plus className="h-4 w-4 mr-1" />
    Add Product
  </Button>
  {/* Agrega más botones aquí */}
</div>
```

### 2. Settings Section
**Archivo:** `src/components/sections/settings-section.tsx`

**Botones de ejemplo incluidos:**
- "Reset" - Para resetear configuraciones
- "Save Changes" - Para guardar cambios

### 3. Support Section
**Archivo:** `src/components/sections/support-section.tsx`

**Botones de ejemplo incluidos:**
- "Contact Support" - Para contactar soporte

### 4. Feedback Section
**Archivo:** `src/components/sections/feedback-section.tsx`

**Botones de ejemplo incluidos:**
- "Submit Feedback" - Para enviar feedback

## Ventajas de Esta Estructura

✅ **Independencia total** - Cada sección es completamente independiente
✅ **Fácil personalización** - Edita solo el archivo de la sección que necesites
✅ **Headers únicos** - Cada sección puede tener sus propios botones y acciones
✅ **Mantenible** - Código organizado y fácil de encontrar
✅ **Escalable** - Agregar nuevas secciones es simple

## Ejemplo: Agregar un Nuevo Botón

Para agregar un botón de "Export" a la sección de Products:

1. Abre `src/components/sections/products-section.tsx`
2. Importa el ícono necesario:
   ```tsx
   import { Plus, Download } from "lucide-react"
   ```
3. Agrega el botón en la sección de acciones:
   ```tsx
   <Button size="sm" variant="outline">
     <Download className="h-4 w-4 mr-1" />
     Export
   </Button>
   ```

## Agregar Funcionalidad a los Botones

Ejemplo de cómo agregar un handler a un botón:

```tsx
const handleAddProduct = () => {
  console.log("Adding new product...")
  // Tu lógica aquí
}

<Button size="sm" onClick={handleAddProduct}>
  <Plus className="h-4 w-4 mr-1" />
  Add Product
</Button>
```
