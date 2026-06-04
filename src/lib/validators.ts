import { z } from 'zod';

// ==================== VALIDADORES PARA PARTIDAS ====================

export const detallePartidaSchema = z.object({
  cuentaId: z.string().min(1, 'Cuenta es requerida'),
  tipo: z.enum(['DEBE', 'HABER']),
  monto: z
    .number()
    .positive('El monto debe ser positivo')
    .multipleOf(0.01, 'Máximo 2 decimales'),
  concepto: z.string().optional(),
  referencia: z.string().optional(),
});

export const partidaSchema = z.object({
  numeroPartida: z.string().min(1, 'Número de partida requerido'),
  fecha: z.date(),
  descripcion: z.string().min(5, 'La descripción debe tener al menos 5 caracteres'),
  referencia: z.string().optional(),
  detalles: z
    .array(detallePartidaSchema)
    .min(2, 'Mínimo 2 líneas de movimiento'),
}).refine(
  (data) => {
    const totalDebe = data.detalles
      .filter((d) => d.tipo === 'DEBE')
      .reduce((sum, d) => sum + d.monto, 0);
    
    const totalHaber = data.detalles
      .filter((d) => d.tipo === 'HABER')
      .reduce((sum, d) => sum + d.monto, 0);
    
    // Verificar que cuadren con tolerancia de 0.01
    return Math.abs(totalDebe - totalHaber) < 0.01;
  },
  {
    message: 'La partida no cuadra: El total del Debe y Haber deben ser iguales',
    path: ['detalles'],
  }
);

export type DetallePartida = z.infer<typeof detallePartidaSchema>;
export type Partida = z.infer<typeof partidaSchema>;