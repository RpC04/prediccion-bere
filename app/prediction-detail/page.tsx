"use client"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Printer, Utensils, Sun, Calendar, TrendingUp } from "lucide-react"
import Link from "next/link"
import { PredictionTable } from "@/components/prediction-table"
import { PredictionChart } from "@/components/prediction-chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PredictionDetailPage() {
  const [currentDate] = useState(new Date())
  const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const formattedDate = `${dayNames[currentDate.getDay()]}, ${currentDate.getDate()} de ${monthNames[currentDate.getMonth()]} de ${currentDate.getFullYear()}`

  return (
    <MainLayout>
      <div className="p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-center">
            <Link href="/">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Detalle de la Predicción</h1>
              <p className="text-gray-500">{formattedDate}</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <Button variant="outline" className="flex items-center">
              <Printer className="mr-2 h-4 w-4" />
              Imprimir
            </Button>
            <Button variant="outline" className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Resto del contenido permanece igual */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-orange-50 border-orange-100">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-orange-100 mr-4">
                  <Utensils className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total de Platos</p>
                  <p className="text-2xl font-bold">100</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-100">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 mr-4">
                  <Sun className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Clima</p>
                  <p className="text-2xl font-bold">Soleado</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-100">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 mr-4">
                  <Calendar className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Tipo de Día</p>
                  <p className="text-2xl font-bold">Fin de Semana</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* El resto del contenido permanece igual */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="w-full md:w-1/3">
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm font-medium">Filtrar por:</label>
              <Select defaultValue="all">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar filtro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los platos</SelectItem>
                  <SelectItem value="main">Platos principales</SelectItem>
                  <SelectItem value="starters">Entradas</SelectItem>
                  <SelectItem value="desserts">Postres</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm font-medium">Clima:</label>
              <Select defaultValue="sunny">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar clima" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sunny">Soleado</SelectItem>
                  <SelectItem value="cloudy">Nublado</SelectItem>
                  <SelectItem value="rainy">Lluvioso</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm font-medium">Tipo de día:</label>
              <Select defaultValue="weekend">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekday">Día laborable</SelectItem>
                  <SelectItem value="weekend">Fin de semana</SelectItem>
                  <SelectItem value="holiday">Feriado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Tabs defaultValue="table" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="table">Tabla de Predicción</TabsTrigger>
            <TabsTrigger value="chart">Gráfico Comparativo</TabsTrigger>
          </TabsList>
          <TabsContent value="table">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Utensils className="mr-2 h-5 w-5 text-orange-500" />
                  Predicción Detallada para Hoy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PredictionTable />
                <div className="mt-6 bg-blue-50 p-4 rounded-md border border-blue-100">
                  <h3 className="font-medium text-blue-800 mb-2 flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Notas del Sistema:
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Se espera mayor demanda de platos frescos debido al clima caluroso.</li>
                    <li>• Los fines de semana la demanda de ceviches aumenta un 35%.</li>
                    <li>• Considere preparar ingredientes adicionales para Arroz con Pollo y Ceviche.</li>
                    <li>• La precisión de predicción para hoy es del 92% basada en datos históricos.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="chart">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Comparativa de Platos</CardTitle>
              </CardHeader>
              <CardContent>
                <PredictionChart />
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-orange-50 p-4 rounded-md border border-orange-100">
                    <h3 className="font-medium text-orange-800 mb-2">Tendencia Semanal</h3>
                    <p className="text-sm text-gray-700">
                      Los platos principales muestran un incremento del 20% los fines de semana comparado con días
                      laborables.
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-md border border-green-100">
                    <h3 className="font-medium text-green-800 mb-2">Impacto del Clima</h3>
                    <p className="text-sm text-gray-700">
                      En días soleados como hoy, las entradas frescas como el ceviche tienen un 35% más de demanda que
                      en días nublados.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Recomendaciones de Preparación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-md border-l-4 border-orange-500">
                <h3 className="font-medium mb-1">Preparación Anticipada</h3>
                <p className="text-sm text-gray-700">
                  Prepare los ingredientes base para el Arroz con Pollo y Ceviche con anticipación para reducir tiempos
                  de espera durante las horas pico.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-md border-l-4 border-blue-500">
                <h3 className="font-medium mb-1">Gestión de Inventario</h3>
                <p className="text-sm text-gray-700">
                  Asegure un 15% adicional de pescado fresco para el Ceviche, ya que la demanda suele superar las
                  expectativas en días soleados como hoy.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-md border-l-4 border-green-500">
                <h3 className="font-medium mb-1">Optimización de Personal</h3>
                <p className="text-sm text-gray-700">
                  Considere asignar un ayudante adicional para la preparación de entradas durante las horas de mayor
                  afluencia (12:00 - 14:00).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
