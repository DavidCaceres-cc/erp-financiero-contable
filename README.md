# ERP Financiero Contable

Sistema de gestión financiera y contable profesional, diseñado para auditores y contadores. Replicación funcional con arquitectura moderna y diseño premium.

## 🚀 Stack Tecnológico

- **Frontend**: Next.js 14 (App Router) + Chakra UI + Lucide Icons
- **Backend**: Next.js API Routes
- **Base de Datos**: PostgreSQL + Prisma ORM
- **Exportación**: @react-pdf/renderer para reportes en PDF
- **Validación**: React Hook Form + Zod
- **Estado Global**: Zustand

## 📋 Módulos Implementados

### Phase 1 (Actual)
- ✅ Estructura de proyecto profesional
- ✅ Schema Prisma completo (Catálogo de cuentas Guatemala)
- ✅ Componente de Partida Contable con validación de Partida Doble
- ✅ Dashboard base con estructura responsive
- ✅ Sistema de roles (Auditor, Contador, Admin)

### Phase 2 (Próxima)
- 📋 API Backend completamente funcional
- 📊 Integración de base de datos
- 📄 Generador de PDFs para reportes formales
- 🔗 Conciliación y clasificación de transacciones

## 🏗️ Estructura del Proyecto

```
erp-financiero-contable/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Layout principal
│   │   ├── page.tsx              # Home/Dashboard
│   │   ├── dashboard/            # Módulo de Dashboard
│   │   ├── partidas/             # Módulo de Partidas Contables
│   │   ├── api/                  # API Routes
│   │   └── (auth)/               # Auth layout
│   ├── components/               # Componentes reutilizables
│   │   ├── ui/                   # Componentes UI básicos
│   │   ├── partidas/             # Componentes del módulo de partidas
│   │   └── dashboard/            # Componentes del dashboard
│   ├── lib/                      # Utilidades y helpers
│   │   ├── prisma.ts             # Cliente Prisma
│   │   ├── constants.ts          # Constantes de la app
│   │   └── validators.ts         # Validadores Zod
│   ├── hooks/                    # Custom React Hooks
│   ├── stores/                   # Zustand stores
│   ├── types/                    # TypeScript types
│   └── styles/                   # Estilos globales
├── prisma/
│   └── schema.prisma             # Schema de base de datos
├── public/                       # Assets estáticos
├── .env.example                  # Ejemplo de variables de entorno
├── next.config.js                # Configuración de Next.js
├── tsconfig.json                 # Configuración de TypeScript
└── package.json                  # Dependencias del proyecto
```

## 🚀 Inicio Rápido

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/DavidCaceres-cc/erp-financiero-contable.git
   cd erp-financiero-contable
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   # Editar .env con tu conexión a BD
   ```

4. **Generar cliente Prisma**
   ```bash
   npm run prisma:generate
   ```

5. **Ejecutar migraciones**
   ```bash
   npm run prisma:migrate
   ```

6. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

7. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 📊 Plan de Cuentas (Guatemala - SAT)

El catálogo de cuentas está precargado en Prisma con la clasificación oficial:

- **1000-1999**: Activos
- **2000-2999**: Pasivos
- **3000-3999**: Patrimonio
- **4000-4999**: Ingresos
- **5000-5999**: Costos
- **6000-6999**: Gastos
- **7000-7999**: Otros Ingresos
- **8000-8999**: Otros Gastos

## 🔐 Roles y Permisos

- **Admin**: Acceso total, gestión de usuarios y configuración
- **Contador**: Crear y editar partidas, ver reportes
- **Auditor**: Ver reportes, exportar a PDF, consultar historial

## 📄 Licencia

Proyecto académico para Ingeniería en Sistemas.

---

**Desarrollado con ❤️ como trabajo profesional**
