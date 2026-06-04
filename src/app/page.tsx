'use client';

import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  Divider,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
  Badge,
  Progress,
} from '@chakra-ui/react';
import {
  BarChart3,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  FileText,
  Settings,
  LogOut,
} from 'lucide-react';
import { PartidaContableForm } from '@/components/partidas/PartidaContableForm';
import { useState } from 'react';

// Mock data para catálogo de cuentas (será reemplazado por BD en Phase 2)
const CATALOGO_MOCK = [
  { id: '1', codigo: '1100', nombre: 'Bancos' },
  { id: '2', codigo: '1200', nombre: 'Cuentas por Cobrar' },
  { id: '3', codigo: '2100', nombre: 'Cuentas por Pagar' },
  { id: '4', codigo: '3100', nombre: 'Capital' },
  { id: '5', codigo: '4100', nombre: 'Ingresos por Servicios' },
  { id: '6', codigo: '5100', nombre: 'Costo de Ventas' },
  { id: '7', codigo: '6100', nombre: 'Gastos Operativos' },
];

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  return (
    <Box minH="100vh" bg="gray.50">
      {/* ==================== HEADER ====================  */}
      <Flex
        as="header"
        bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        color="white"
        px={8}
        py={6}
        justify="space-between"
        align="center"
        shadow="lg"
      >
        <Flex align="center" gap={3}>
          <Icon as={BarChart3} w={8} h={8} />
          <VStack align="start" gap={0}>
            <Heading size="lg">ERP Financiero Contable</Heading>
            <Text fontSize="xs" opacity={0.8}>
              Sistema de Gestión Integral
            </Text>
          </VStack>
        </Flex>
        <HStack gap={3}>
          <Button variant="ghost" size="sm" leftIcon={<Settings size={18} />}>
            Configuración
          </Button>
          <Button variant="ghost" size="sm" leftIcon={<LogOut size={18} />}>
            Salir
          </Button>
        </HStack>
      </Flex>

      <Box p={8}>
        {/* ==================== SECCIÓN: DASHBOARD SUPERIOR ====================  */}
        {!showForm ? (
          <VStack gap={8} align="stretch">
            {/* Tarjeta de Bienvenida */}
            <Card shadow="md" border="1px solid" borderColor="gray.200">
              <CardBody>
                <VStack align="start" gap={4}>
                  <Heading size="md">👋 Bienvenido al ERP Financiero</Heading>
                  <Text color="gray.600">
                    Sistema profesional de contabilidad y auditoría diseñado para contadores y auditores. 
                    Esta es la Phase 1 con validación de Partida Doble en tiempo real.
                  </Text>
                  <Button
                    colorScheme="brand"
                    size="lg"
                    onClick={() => setShowForm(true)}
                    leftIcon={<FileText size={20} />}
                  >
                    Crear Nueva Partida Contable
                  </Button>
                </VStack>
              </CardBody>
            </Card>

            {/* Cards de estadísticas */}
            <SimpleGrid columns={{ base: 1, md: 4 }} gap={6}>
              <Card shadow="md" border="1px solid" borderColor="gray.200">
                <CardHeader bg="blue.50" pb={3}>
                  <Icon as={BarChart3} color="blue.500" w={6} h={6} />
                </CardHeader>
                <Divider />
                <CardBody>
                  <Text fontSize="sm" color="gray.600" mb={1}>
                    Partidas Registradas
                  </Text>
                  <Heading size="lg">0</Heading>
                  <Progress value={0} size="sm" mt={2} />
                </CardBody>
              </Card>

              <Card shadow="md" border="1px solid" borderColor="gray.200">
                <CardHeader bg="green.50" pb={3}>
                  <Icon as={CheckCircle} color="green.500" w={6} h={6} />
                </CardHeader>
                <Divider />
                <CardBody>
                  <Text fontSize="sm" color="gray.600" mb={1}>
                    Aprobadas
                  </Text>
                  <Heading size="lg">0</Heading>
                  <Progress value={0} size="sm" mt={2} colorScheme="green" />
                </CardBody>
              </Card>

              <Card shadow="md" border="1px solid" borderColor="gray.200">
                <CardHeader bg="yellow.50" pb={3}>
                  <Icon as={AlertCircle} color="yellow.500" w={6} h={6} />
                </CardHeader>
                <Divider />
                <CardBody>
                  <Text fontSize="sm" color="gray.600" mb={1}>
                    En Revisión
                  </Text>
                  <Heading size="lg">0</Heading>
                  <Progress value={0} size="sm" mt={2} colorScheme="yellow" />
                </CardBody>
              </Card>

              <Card shadow="md" border="1px solid" borderColor="gray.200">
                <CardHeader bg="purple.50" pb={3}>
                  <Icon as={TrendingUp} color="purple.500" w={6} h={6} />
                </CardHeader>
                <Divider />
                <CardBody>
                  <Text fontSize="sm" color="gray.600" mb={1}>
                    Período Actual
                  </Text>
                  <Heading size="lg">2026-06</Heading>
                  <Badge colorScheme="purple" mt={2} fontSize="xs">
                    Activo
                  </Badge>
                </CardBody>
              </Card>
            </SimpleGrid>

            {/* Info sobre Catálogo de Cuentas */}
            <Card shadow="md" border="1px solid" borderColor="gray.200">
              <CardHeader bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" pb={3}>
                <Heading size="md" color="white">
                  Catálogo de Cuentas (Guatemala - SAT)
                </Heading>
              </CardHeader>
              <Divider />
              <CardBody>
                <VStack align="start" gap={3}>
                  <Text fontSize="sm" color="gray.600">
                    El sistema incluye un catálogo de cuentas precargado según clasificación SAT:
                  </Text>
                  <Grid templateColumns="repeat(2, 1fr)" gap={3} width="full">
                    {[
                      { rango: '1000-1999', tipo: 'Activos' },
                      { rango: '2000-2999', tipo: 'Pasivos' },
                      { rango: '3000-3999', tipo: 'Patrimonio' },
                      { rango: '4000-4999', tipo: 'Ingresos' },
                      { rango: '5000-5999', tipo: 'Costos' },
                      { rango: '6000-6999', tipo: 'Gastos' },
                    ].map((item) => (
                      <Box key={item.rango} p={3} bg="gray.50" borderRadius="md">
                        <Text fontSize="xs" fontWeight="600" color="brand.600">
                          {item.rango}
                        </Text>
                        <Text fontSize="sm">{item.tipo}</Text>
                      </Box>
                    ))}
                  </Grid>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        ) : (
          <Box>
            <Button
              mb={4}
              variant="outline"
              onClick={() => setShowForm(false)}
            >
              ← Volver al Dashboard
            </Button>
            <PartidaContableForm catalogo={CATALOGO_MOCK} />
          </Box>
        )}
      </Box>

      {/* ==================== FOOTER ====================  */}
      <Flex
        as="footer"
        bg="gray.800"
        color="gray.300"
        px={8}
        py={6}
        mt={12}
        justify="space-between"
        align="center"
      >
        <Text fontSize="sm">
          ERP Financiero Contable v1.0 | Proyecto de Ingeniería en Sistemas
        </Text>
        <Text fontSize="xs">© 2026 - Desarrollado con profesionalismo 🚀</Text>
      </Flex>
    </Box>
  );
}