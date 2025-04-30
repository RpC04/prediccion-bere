"use client"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Download, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { PredictionChart } from "@/components/prediction-chart"

export default function HistoryPage() {
  const [date, setDate] = useState(new Date())

  return (
    <MainLayout>
      <div className="p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
            <History className="mr-2 h-6 w-6 text-orange-500" />
            Historial y Análisis
          </h1>

          <div className="mt-4 md:mt-0">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={es} />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Tabs defaultValue="predictions" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="predictions">Predicciones Pasadas</TabsTrigger>
            <TabsTrigger value="trends">Tendencias</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="predictions">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Predicciones para {format(date, "PPPP", { locale: es })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 px-4 text-left font-medium text-gray-500">Plato</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-500">Predicción</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-500">Real</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-500">Precisión</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">Arroz con Pollo</td>
                        <td className="py-3 px-4">35</td>
                        <td className="py-3 px-4">33</td>
                        <td className="py-3 px-4">
                          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            94%
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Ceviche</td>
                        <td className="py-3 px-4">20</td>
                        <td className="py-3 px-4">22</td>
                        <td className="py-3 px-4">
                          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            90%
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Lomo Saltado</td>
                        <td className="py-3 px-4">15</td>
                        <td className="py-3 px-4">12</td>
                        <td className="py-3 px-4">
                          <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                            80%
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Causa Rellena</td>
                        <td className="py-3 px-4">12</td>
                        <td className="py-3 px-4">10</td>
                        <td className="py-3 px-4">
                          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            83%
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Ají de Gallina</td>
                        <td className="py-3 px-4">18</td>
                        <td className="py-3 px-4">19</td>
                        <td className="py-3 px-4">
                          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            95%
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button variant="outline" className="flex items-center">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar Reporte
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Tendencias de Demanda</CardTitle>
              </CardHeader>
              <CardContent>
                <PredictionChart />

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-md">
                    <h3 className="font-medium text-blue-800 mb-2">Plato más vendido</h3>
                    <p className="text-sm text-gray-700">
                      El <strong>Arroz con Pollo</strong> ha sido el plato más vendido en los últimos 30 días, con un
                      promedio de 32 platos por día.
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-md">
                    <h3 className="font-medium text-green-800 mb-2">Día de mayor demanda</h3>
                    <p className="text-sm text-gray-700">
                      Los <strong>sábados</strong> son los días con mayor demanda, especialmente para platos como
                      Ceviche y Arroz con Pollo.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Insights del Negocio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-orange-50 p-4 rounded-md border-l-4 border-orange-500">
                    <h3 className="font-medium text-orange-800 mb-1">Patrones Climáticos</h3>
                    <p className="text-sm text-gray-700">
                      En días soleados, la demanda de ceviches aumenta un 35% respecto a días nublados o lluviosos.
                    </p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-md border-l-4 border-purple-500">
                    <h3 className="font-medium text-purple-800 mb-1">Fines de Semana</h3>
                    <p className="text-sm text-gray-700">
                      Los fines de semana, los platos principales tienen un 40% más de demanda que durante días
                      laborables.
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-md border-l-4 border-green-500">
                    <h3 className="font-medium text-green-800 mb-1">Reducción de Desperdicios</h3>
                    <p className="text-sm text-gray-700">
                      Desde que comenzó a usar el sistema de predicción, ha reducido el desperdicio de alimentos en un
                      28%, lo que representa un ahorro aproximado de S/ 350 mensuales.
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-500">
                    <h3 className="font-medium text-blue-800 mb-1">Satisfacción del Cliente</h3>
                    <p className="text-sm text-gray-700">
                      La disponibilidad constante de platos populares ha mejorado la satisfacción del cliente, con un
                      92% de clientes atendidos sin tiempo de espera.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
