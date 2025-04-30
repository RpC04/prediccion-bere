import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { HelpCircle, Video, FileText, Mail, Phone } from "lucide-react"

export default function HelpPage() {
  return (
    <MainLayout>
      <div className="p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center mb-6">
          <HelpCircle className="mr-2 h-6 w-6 text-orange-500" />
          Ayuda y Soporte
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-orange-50 border-orange-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Video className="mr-2 h-5 w-5 text-orange-500" />
                Tutorial en Video
              </CardTitle>
              <CardDescription>Aprende a usar el sistema con nuestros videos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center mb-4">
                <Video className="h-12 w-12 text-gray-400" />
              </div>
              <Button className="w-full bg-orange-500 hover:bg-orange-600">Ver Tutoriales</Button>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <FileText className="mr-2 h-5 w-5 text-blue-500" />
                Guía Rápida
              </CardTitle>
              <CardDescription>Documentación paso a paso para usar el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 text-xs font-medium">
                    1
                  </span>
                  <span>Revisar las predicciones diarias</span>
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 text-xs font-medium">
                    2
                  </span>
                  <span>Ajustar cantidades si es necesario</span>
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 text-xs font-medium">
                    3
                  </span>
                  <span>Cargar datos de ventas reales</span>
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 text-xs font-medium">
                    4
                  </span>
                  <span>Revisar análisis e insights</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Descargar Guía Completa
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Preguntas Frecuentes</CardTitle>
            <CardDescription>Respuestas a las dudas más comunes</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>¿Cómo funciona el sistema de predicción?</AccordionTrigger>
                <AccordionContent>
                  El sistema utiliza datos históricos de ventas, información climática y patrones de comportamiento para
                  predecir la demanda de cada plato. Cuantos más datos tenga, más precisas serán las predicciones.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>¿Cómo puedo cargar mis datos de ventas?</AccordionTrigger>
                <AccordionContent>
                  Puede cargar sus datos en formato CSV o Excel desde la sección "Cargar Datos". El sistema procesará
                  automáticamente la información y actualizará las predicciones.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>¿Qué hago si la predicción parece incorrecta?</AccordionTrigger>
                <AccordionContent>
                  Puede ajustar manualmente las cantidades si considera que la predicción no es adecuada. Además,
                  asegúrese de cargar regularmente los datos reales de ventas para mejorar la precisión del sistema.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>¿Puedo acceder al sistema desde mi celular?</AccordionTrigger>
                <AccordionContent>
                  Sí, el sistema está diseñado para funcionar en dispositivos móviles. Puede acceder desde cualquier
                  navegador en su teléfono o tablet.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>¿Cómo interpreto los gráficos y análisis?</AccordionTrigger>
                <AccordionContent>
                  Los gráficos muestran tendencias de demanda por día y tipo de plato. Las barras más altas indican
                  mayor demanda. En la sección "Insights" encontrará interpretaciones automáticas de estos datos.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contacto de Soporte</CardTitle>
            <CardDescription>¿Necesita ayuda adicional? Contáctenos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start p-4 border rounded-md">
                <Mail className="h-5 w-5 text-orange-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Correo Electrónico</h3>
                  <p className="text-sm text-gray-500 mb-2">Respuesta en 24 horas</p>
                  <p className="text-sm font-medium">soporte@predicciongastronomica.com</p>
                </div>
              </div>

              <div className="flex items-start p-4 border rounded-md">
                <Phone className="h-5 w-5 text-orange-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Teléfono</h3>
                  <p className="text-sm text-gray-500 mb-2">Lunes a Viernes, 9:00 - 18:00</p>
                  <p className="text-sm font-medium">+51 123 456 789</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
