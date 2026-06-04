// Constantes de la aplicación
export const MONEDAS = {
  GTQ: { codigo: 'GTQ', simbolo: 'Q', nombre: 'Quetzal Guatemalteco' },
  USD: { codigo: 'USD', simbolo: '$', nombre: 'Dólar Estadounidense' },
};

export const TIPOS_CUENTA = {
  ACTIVO: 'Activo',
  PASIVO: 'Pasivo',
  PATRIMONIO: 'Patrimonio',
  INGRESO: 'Ingreso',
  COSTO: 'Costo',
  GASTO: 'Gasto',
  OTRO_INGRESO: 'Otro Ingreso',
  OTRO_GASTO: 'Otro Gasto',
};

export const RANGO_CUENTAS = {
  ACTIVOS: { inicio: 1000, fin: 1999 },
  PASIVOS: { inicio: 2000, fin: 2999 },
  PATRIMONIO: { inicio: 3000, fin: 3999 },
  INGRESOS: { inicio: 4000, fin: 4999 },
  COSTOS: { inicio: 5000, fin: 5999 },
  GASTOS: { inicio: 6000, fin: 6999 },
  OTROS_INGRESOS: { inicio: 7000, fin: 7999 },
  OTROS_GASTOS: { inicio: 8000, fin: 8999 },
};

export const NATURALEZA_CUENTA = {
  DEUDORA: 'Deudora',
  ACREEDORA: 'Acreedora',
};

export const ROLES_USUARIO = {
  ADMIN: { valor: 'ADMIN', label: 'Administrador' },
  CONTADOR: { valor: 'CONTADOR', label: 'Contador' },
  AUDITOR: { valor: 'AUDITOR', label: 'Auditor' },
};

export const COLORES_TIPO_CUENTA = {
  ACTIVO: '#3B82F6',
  PASIVO: '#EF4444',
  PATRIMONIO: '#8B5CF6',
  INGRESO: '#10B981',
  COSTO: '#F59E0B',
  GASTO: '#EF4444',
  OTRO_INGRESO: '#14B8A6',
  OTRO_GASTO: '#F97316',
};

export const COLORES_MOVIMIENTO = {
  DEBE: '#3B82F6',
  HABER: '#EF4444',
};

export const TOLERANCIA_REDONDEO = 0.01; // Q0.01