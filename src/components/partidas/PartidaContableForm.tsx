'use client';

import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  VStack,
  useToast,
  Badge,
  Icon,
  Tooltip,
  Select,
} from '@chakra-ui/react';
import {
  useForm,
  Controller,
  useFieldArray,
  SubmitHandler,
  FormProvider,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useMemo, useEffect } from 'react';
import {
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  FileText,
  DollarSign,
  BarChart3,
} from 'lucide-react';
import { Partida, DetallePartida, partidaSchema } from '@/lib/validators';
import { COLORES_MOVIMIENTO, TOLERANCIA_REDONDEO } from '@/lib/constants';

interface PartidaFormProps {
  onSubmit?: (data: Partida) => Promise<void>;
  catalogo?: Array<{ id: string; codigo: string; nombre: string }>;
}

export function PartidaContableForm({ onSubmit, catalogo = [] }: PartidaFormProps) {
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<Partida>({
    resolver: zodResolver(partidaSchema),
    mode: 'onBlur',
    defaultValues: {
      numeroPartida: '',
      fecha: new Date(),
      descripcion: '',
      referencia: '',
      detalles: [
        { cuentaId: '', tipo: 'DEBE', monto: 0, concepto: '', referencia: '' },
        { cuentaId: '', tipo: 'HABER', monto: 0, concepto: '', referencia: '' },
      ],
    },
  });

  const {
    control,
    register,
    watch,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'detalles',
  });

  const detalles = watch('detalles');

  // ==================== CÁLCULOS EN TIEMPO REAL ====================
  const calculos = useMemo(() => {
    const totalDebe = detalles
      .filter((d) => d.tipo === 'DEBE')
      .reduce((sum, d) => sum + (d.monto || 0), 0);

    const totalHaber = detalles
      .filter((d) => d.tipo === 'HABER')
      .reduce((sum, d) => sum + (d.monto || 0), 0);

    const diferencia = Math.abs(totalDebe - totalHaber);
    const cuadra = diferencia < TOLERANCIA_REDONDEO;

    return { totalDebe, totalHaber, diferencia, cuadra };
  }, [detalles]);

  const handleAgregarLinea = (tipo: 'DEBE' | 'HABER') => {
    append({
      cuentaId: '',
      tipo,
      monto: 0,
      concepto: '',
      referencia: '',
    });
  };

  const handleEliminarLinea = (index: number) => {
    if (fields.length > 2) {
      remove(index);
    } else {
      toast({
        title: 'No permitido',
        description: 'Mínimo debe haber una línea de Debe y una de Haber',
        status: 'warning',
        duration: 3000,
      });
    }
  };

  const handleSubmitForm: SubmitHandler<Partida> = async (data) => {
    try {
      setIsSubmitting(true);
      if (onSubmit) {
        await onSubmit(data);
        toast({
          title: '✅ Partida guardada exitosamente',
          status: 'success',
          duration: 3000,
        });
        reset();
      }
    } catch (error) {
      toast({
        title: '❌ Error al guardar',
        description: error instanceof Error ? error.message : 'Intenta de nuevo',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          {/* ==================== ENCABEZADO ====================  */}
          <Box mb={8}>
            <Flex align="center" gap={3} mb={2}>
              <Icon as={FileText} w={8} h={8} color="brand.500" />
              <Heading size="lg" color="gray.800">
                Creación de Partida Contable
              </Heading>
            </Flex>
            <Text color="gray.600" fontSize="sm">
              Ingresa una nueva partida contable con validación automática de Partida Doble
            </Text>
          </Box>

          <Grid gap={6} gridTemplateColumns={{ base: '1fr', lg: '2fr 1fr' }}>
            {/* ==================== SECCIÓN IZQUIERDA: DETALLES PRINCIPALES ====================  */}
            <GridItem>
              <VStack gap={6} align="stretch">
                {/* Tarjeta: Información General */}
                <Card shadow="md" border="1px solid" borderColor="gray.200">
                  <CardHeader bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" py={4}>
                    <Heading size="md" color="white">
                      Información General
                    </Heading>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <VStack gap={4} align="stretch">
                      <FormControl isInvalid={!!errors.numeroPartida}>
                        <FormLabel fontWeight="600" fontSize="sm">
                          Número de Partida
                        </FormLabel>
                        <Input
                          placeholder="P-000001"
                          {...register('numeroPartida')}
                          bg="white"
                          border="2px solid"
                          borderColor="gray.200"
                          _focus={{
                            borderColor: 'brand.500',
                            boxShadow: '0 0 0 1px #667eea',
                          }}
                        />
                        <FormErrorMessage>{errors.numeroPartida?.message}</FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={!!errors.fecha}>
                        <FormLabel fontWeight="600" fontSize="sm">
                          Fecha
                        </FormLabel>
                        <Input
                          type="date"
                          {...register('fecha', {
                            valueAsDate: true,
                          })}
                          bg="white"
                          border="2px solid"
                          borderColor="gray.200"
                          _focus={{
                            borderColor: 'brand.500',
                            boxShadow: '0 0 0 1px #667eea',
                          }}
                        />
                        <FormErrorMessage>{errors.fecha?.message}</FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={!!errors.descripcion}>
                        <FormLabel fontWeight="600" fontSize="sm">
                          Descripción
                        </FormLabel>
                        <Textarea
                          placeholder="Describe la naturaleza de la partida..."
                          {...register('descripcion')}
                          bg="white"
                          border="2px solid"
                          borderColor="gray.200"
                          _focus={{
                            borderColor: 'brand.500',
                            boxShadow: '0 0 0 1px #667eea',
                          }}
                          rows={3}
                        />
                        <FormErrorMessage>{errors.descripcion?.message}</FormErrorMessage>
                      </FormControl>

                      <FormControl>
                        <FormLabel fontWeight="600" fontSize="sm">
                          Referencia (Opcional)
                        </FormLabel>
                        <Input
                          placeholder="Ej: Fact-001, Rec-002"
                          {...register('referencia')}
                          bg="white"
                          border="2px solid"
                          borderColor="gray.200"
                          _focus={{
                            borderColor: 'brand.500',
                            boxShadow: '0 0 0 1px #667eea',
                          }}
                        />
                      </FormControl>
                    </VStack>
                  </CardBody>
                </Card>

                {/* Tarjeta: Detalles de Movimientos */}
                <Card shadow="md" border="1px solid" borderColor="gray.200">
                  <CardHeader bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" py={4}>
                    <Flex justify="space-between" align="center">
                      <Heading size="md" color="white">
                        Detalles de Movimientos
                      </Heading>
                      <Badge colorScheme={calculos.cuadra ? 'green' : 'red'} fontSize="xs">
                        {calculos.cuadra ? '✓ Cuadra' : '✗ No cuadra'}
                      </Badge>
                    </Flex>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <VStack gap={4} align="stretch">
                      {/* Tabla de Movimientos */}
                      <Box overflowX="auto">
                        <Table size="sm">
                          <Thead>
                            <Tr bg="gray.100">
                              <Th fontSize="xs" fontWeight="700">
                                Tipo
                              </Th>
                              <Th fontSize="xs" fontWeight="700">
                                Cuenta
                              </Th>
                              <Th fontSize="xs" fontWeight="700" isNumeric>
                                Monto
                              </Th>
                              <Th fontSize="xs" fontWeight="700">
                                Concepto
                              </Th>
                              <Th fontSize="xs" fontWeight="700" w="50px">
                                Acciones
                              </Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {fields.map((field, index) => (
                              <Tr key={field.id} borderBottomWidth="1px">
                                <Td>
                                  <Badge
                                    colorScheme={detalles[index]?.tipo === 'DEBE' ? 'blue' : 'red'}
                                  >
                                    {detalles[index]?.tipo}
                                  </Badge>
                                </Td>
                                <Td>
                                  <Controller
                                    name={`detalles.${index}.cuentaId`}
                                    control={control}
                                    render={({ field }) => (
                                      <Select
                                        {...field}
                                        size="sm"
                                        placeholder="Seleccionar..."
                                        isInvalid={!!errors.detalles?.[index]?.cuentaId}
                                      >
                                        {catalogo.map((c) => (
                                          <option key={c.id} value={c.id}>
                                            {c.codigo} - {c.nombre}
                                          </option>
                                        ))}
                                      </Select>
                                    )}
                                  />
                                </Td>
                                <Td isNumeric>
                                  <Controller
                                    name={`detalles.${index}.monto`}
                                    control={control}
                                    render={({ field }) => (
                                      <Input
                                        {...field}
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        size="sm"
                                        textAlign="right"
                                        placeholder="0.00"
                                        isInvalid={!!errors.detalles?.[index]?.monto}
                                        onChange={(e) => {
                                          field.onChange(parseFloat(e.target.value) || 0);
                                        }}
                                      />
                                    )}
                                  />
                                </Td>
                                <Td>
                                  <Controller
                                    name={`detalles.${index}.concepto`}
                                    control={control}
                                    render={({ field }) => (
                                      <Input
                                        {...field}
                                        size="sm"
                                        placeholder="Detalle..."
                                      />
                                    )}
                                  />
                                </Td>
                                <Td>
                                  <Tooltip label="Eliminar línea">
                                    <Button
                                      size="sm"
                                      colorScheme="red"
                                      variant="ghost"
                                      onClick={() => handleEliminarLinea(index)}
                                    >
                                      <Icon as={Trash2} w={4} h={4} />
                                    </Button>
                                  </Tooltip>
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </Box>

                      {/* Botones para agregar líneas */}
                      <SimpleGrid columns={2} gap={2} mt={4}>
                        <Button
                          size="sm"
                          colorScheme="blue"
                          variant="outline"
                          leftIcon={<Plus size={16} />}
                          onClick={() => handleAgregarLinea('DEBE')}
                        >
                          Agregar Debe
                        </Button>
                        <Button
                          size="sm"
                          colorScheme="red"
                          variant="outline"
                          leftIcon={<Plus size={16} />}
                          onClick={() => handleAgregarLinea('HABER')}
                        >
                          Agregar Haber
                        </Button>
                      </SimpleGrid>

                      {/* Errores de validación */}
                      {errors.detalles && (
                        <Flex
                          p={3}
                          bg="red.50"
                          borderRadius="md"
                          align="start"
                          gap={2}
                        >
                          <Icon as={AlertCircle} w={5} h={5} color="red.500" mt={0.5} />
                          <VStack gap={1} align="start">
                            <Text fontSize="sm" fontWeight="600" color="red.700">
                              {errors.detalles.message}
                            </Text>
                          </VStack>
                        </Flex>
                      )}
                    </VStack>
                  </CardBody>
                </Card>
              </VStack>
            </GridItem>

            {/* ==================== SECCIÓN DERECHA: RESUMEN Y VALIDACIÓN ====================  */}
            <GridItem>
              <VStack gap={6} align="stretch" position="sticky" top={6}>
                {/* Tarjeta: Resumen de Saldos */}
                <Card shadow="lg" border="1px solid" borderColor="gray.200">
                  <CardHeader bg="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" py={4}>
                    <Heading size="md" color="white">
                      Resumen de Saldos
                    </Heading>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <VStack gap={4} align="stretch">
                      {/* Total Debe */}
                      <Box
                        p={4}
                        bg="blue.50"
                        borderRadius="lg"
                        border="2px solid"
                        borderColor="blue.200"
                      >
                        <Text fontSize="xs" fontWeight="600" color="blue.700" mb={1}>
                          TOTAL DEBE
                        </Text>
                        <Flex align="baseline" gap={1}>
                          <Text color="blue.700">Q</Text>
                          <Text fontSize="2xl" fontWeight="bold" color="blue.700">
                            {calculos.totalDebe.toFixed(2)}
                          </Text>
                        </Flex>
                      </Box>

                      {/* Total Haber */}
                      <Box
                        p={4}
                        bg="red.50"
                        borderRadius="lg"
                        border="2px solid"
                        borderColor="red.200"
                      >
                        <Text fontSize="xs" fontWeight="600" color="red.700" mb={1}>
                          TOTAL HABER
                        </Text>
                        <Flex align="baseline" gap={1}>
                          <Text color="red.700">Q</Text>
                          <Text fontSize="2xl" fontWeight="bold" color="red.700">
                            {calculos.totalHaber.toFixed(2)}
                          </Text>
                        </Flex>
                      </Box>

                      {/* Estado de Validación */}
                      <Divider my={2} />

                      <Box
                        p={4}
                        bg={calculos.cuadra ? 'green.50' : 'yellow.50'}
                        borderRadius="lg"
                        border="2px solid"
                        borderColor={calculos.cuadra ? 'green.200' : 'yellow.200'}
                      >
                        <Flex align="start" gap={2}>
                          <Icon
                            as={calculos.cuadra ? CheckCircle : AlertCircle}
                            w={5}
                            h={5}
                            color={calculos.cuadra ? 'green.600' : 'yellow.600'}
                            mt={0.5}
                          />
                          <VStack align="start" gap={1}>
                            <Text
                              fontSize="sm"
                              fontWeight="700"
                              color={calculos.cuadra ? 'green.700' : 'yellow.700'}
                            >
                              {calculos.cuadra ? '✓ Partida Cuadrada' : '⚠ Partida No Cuadra'}
                            </Text>
                            <Text fontSize="xs" color="gray.600">
                              Diferencia: Q {calculos.diferencia.toFixed(2)}
                            </Text>
                          </VStack>
                        </Flex>
                      </Box>

                      {/* Líneas Summary */}
                      <Box
                        p={3}
                        bg="gray.100"
                        borderRadius="md"
                        fontSize="xs"
                      >
                        <Flex justify="space-between" mb={1}>
                          <Text fontWeight="600">Total líneas:</Text>
                          <Text>{fields.length}</Text>
                        </Flex>
                        <Flex justify="space-between">
                          <Text fontWeight="600">Líneas Debe:</Text>
                          <Text>{detalles.filter((d) => d.tipo === 'DEBE').length}</Text>
                        </Flex>
                        <Flex justify="space-between">
                          <Text fontWeight="600">Líneas Haber:</Text>
                          <Text>{detalles.filter((d) => d.tipo === 'HABER').length}</Text>
                        </Flex>
                      </Box>
                    </VStack>
                  </CardBody>
                </Card>

                {/* Tarjeta: Acciones */}
                <Card shadow="md" border="1px solid" borderColor="gray.200">
                  <CardBody>
                    <VStack gap={3} align="stretch">
                      <Button
                        width="100%"
                        colorScheme="green"
                        size="lg"
                        fontWeight="700"
                        isDisabled={!calculos.cuadra || !isValid || isSubmitting}
                        isLoading={isSubmitting}
                        type="submit"
                        leftIcon={<CheckCircle size={20} />}
                      >
                        Guardar Partida
                      </Button>
                      <Button
                        width="100%"
                        variant="outline"
                        colorScheme="gray"
                        size="lg"
                        fontWeight="700"
                        onClick={() => reset()}
                      >
                        Limpiar Formulario
                      </Button>
                      <Button
                        width="100%"
                        variant="ghost"
                        colorScheme="gray"
                        size="sm"
                        leftIcon={<FileText size={16} />}
                      >
                        Generar PDF
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>

                {/* Info Box */}
                <Box
                  p={3}
                  bg="blue.50"
                  borderRadius="md"
                  borderLeft="4px solid"
                  borderColor="blue.500"
                  fontSize="xs"
                  color="blue.700"
                >
                  <Text fontWeight="600" mb={1}>
                    💡 Validación de Partida Doble
                  </Text>
                  <Text>
                    El total del Debe y Haber deben ser iguales para que la partida sea válida. Todos los campos marcados con * son obligatorios.
                  </Text>
                </Box>
              </VStack>
            </GridItem>
          </Grid>
        </form>
      </FormProvider>
    </Box>
  );
}
