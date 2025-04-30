"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDownIcon, ArrowUpIcon, Users, DollarSign, Utensils, Sun, Calendar } from "lucide-react"
import { PredictionTable } from "@/components/prediction-table"
import { PredictionChart } from "@/components/prediction-chart"
import Link from "next/link"

export function DashboardContent() {
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
    <div className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">¡Buenos días, Doña Bere!</h1>
          <p className="text-gray-500">{formattedDate}</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center bg-orange-50 p-2 rounded-md">
          <Sun className="text-yellow-500 mr-2" />
          <span className="text-sm font-medium">Clima: Soleado</span>
          <span className="mx-2">|</span>
          <Calendar className="text-blue-500 mr-2" />
          <span className="text-sm font-medium">Sábado - Alta demanda</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Desperdicio reducido"
          value="28%"
          icon={<ArrowDownIcon className="h-4 w-4 text-green-500" />}
          description="Esta semana"
          trend="decrease"
        />
        <MetricCard
          title="Clientes atendidos sin espera"
          value="92%"
          icon={<Users className="h-4 w-4 text-blue-500" />}
          description="Satisfacción alta"
          trend="increase"
        />
        <MetricCard
          title="Ahorro estimado"
          value="S/ 350"
          icon={<DollarSign className="h-4 w-4 text-green-500" />}
          description="Este mes"
          trend="increase"
        />
      </div>

      <Tabs defaultValue="prediction" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="prediction">Predicción del Día</TabsTrigger>
          <TabsTrigger value="analysis">Análisis</TabsTrigger>
        </TabsList>
        <TabsContent value="prediction">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Utensils className="mr-2 h-5 w-5 text-orange-500" />
                Platos Recomendados para Hoy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PredictionTable />
              <div className="mt-4 flex justify-end">
                <Button className="bg-orange-500 hover:bg-orange-600" asChild>
                  <Link href="/prediction-detail">Ver Detalle de la Predicción</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analysis">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Análisis de Demanda</CardTitle>
            </CardHeader>
            <CardContent>
              <PredictionChart />
              <p className="mt-4 text-sm text-gray-500 bg-blue-50 p-3 rounded-md">
                <strong>Nota:</strong> Se espera mayor demanda de platos frescos debido al clima caluroso.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="bg-orange-50 p-4 rounded-md border border-orange-100">
        <h3 className="font-medium text-orange-800 mb-2">Consejo del día:</h3>
        <p className="text-sm text-gray-700">
          Basado en el historial, los sábados soleados como hoy tienen un 30% más de demanda de ceviches y platos
          frescos. Considere preparar ingredientes adicionales para estos platos.
        </p>
      </div>
    </div>
  )
}

function MetricCard({ title, value, icon, description, trend }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className="p-2 bg-gray-100 rounded-md">{icon}</div>
        </div>
        <div className="mt-2 flex items-center">
          {trend === "increase" ? (
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 text-green-500 mr-1" />
          )}
          <span className="text-xs text-gray-500">{description}</span>
        </div>
      </CardContent>
    </Card>
  )
}
