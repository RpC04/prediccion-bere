"use client"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Settings, Sun, Moon, Users } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddUserDialog, EditUserDialog } from "@/components/user-dialog"

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [alertThreshold, setAlertThreshold] = useState([20])
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [editUserOpen, setEditUserOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setEditUserOpen(true)
  }

  return (
    <MainLayout>
      <div className="p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center mb-6">
          <Settings className="mr-2 h-6 w-6 text-orange-500" />
          Configuración
        </h1>

        <Tabs defaultValue="general" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
            <TabsTrigger value="users">Usuarios</TabsTrigger>
            <TabsTrigger value="integrations">Integraciones</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Configuración General</CardTitle>
                <CardDescription>Personaliza la apariencia y comportamiento del sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Modo Oscuro</Label>
                    <p className="text-sm text-gray-500">Cambia a un tema oscuro para reducir la fatiga visual</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="h-5 w-5 text-gray-500" />
                    <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                    <Moon className="h-5 w-5 text-gray-500" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-base">Idioma</Label>
                  <Select defaultValue="es">
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Seleccionar idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-base">Formato de Fecha</Label>
                  <Select defaultValue="dd-mm-yyyy">
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Seleccionar formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                      <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Notificaciones</CardTitle>
                <CardDescription>Personaliza cómo y cuándo recibir alertas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Notificaciones</Label>
                    <p className="text-sm text-gray-500">Recibe alertas sobre predicciones y cambios importantes</p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-base">Umbral de Alerta (%)</Label>
                    <span className="text-sm font-medium">{alertThreshold}%</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    Recibir alertas cuando la predicción supere el promedio en este porcentaje
                  </p>
                  <Slider value={alertThreshold} onValueChange={setAlertThreshold} min={5} max={50} step={5} />
                </div>

                <div className="space-y-3">
                  <Label className="text-base">Horario de Recordatorio</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="reminder-time" className="text-sm text-gray-500">
                        Hora
                      </Label>
                      <Input id="reminder-time" type="time" defaultValue="08:00" />
                    </div>
                    <div>
                      <Label htmlFor="reminder-days" className="text-sm text-gray-500">
                        Días
                      </Label>
                      <Select defaultValue="all">
                        <SelectTrigger id="reminder-days">
                          <SelectValue placeholder="Seleccionar días" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos los días</SelectItem>
                          <SelectItem value="weekdays">Lunes a Viernes</SelectItem>
                          <SelectItem value="weekends">Fines de semana</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Usuarios</CardTitle>
                <CardDescription>Administra quién tiene acceso al sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                        <Users className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="font-medium">Doña Bere</p>
                        <p className="text-sm text-gray-500">Administrador</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleEditUser({
                          name: "Doña Bere",
                          email: "bere@ejemplo.com",
                          role: "admin",
                          status: "active",
                        })
                      }
                    >
                      Editar
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Users className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium">Carlos</p>
                        <p className="text-sm text-gray-500">Asistente</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleEditUser({
                          name: "Carlos",
                          email: "carlos@ejemplo.com",
                          role: "assistant",
                          status: "active",
                        })
                      }
                    >
                      Editar
                    </Button>
                  </div>

                  <Button className="mt-4 bg-orange-500 hover:bg-orange-600" onClick={() => setAddUserOpen(true)}>
                    Añadir Usuario
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Integraciones</CardTitle>
                <CardDescription>Conecta con servicios externos para mejorar las predicciones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <h3 className="font-medium">API de Clima</h3>
                      <p className="text-sm text-gray-500">
                        Obtén datos climáticos en tiempo real para mejorar las predicciones
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <h3 className="font-medium">Sistema de Ventas</h3>
                      <p className="text-sm text-gray-500">
                        Conecta con tu sistema de ventas para sincronizar datos automáticamente
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <h3 className="font-medium">Calendario de Feriados</h3>
                      <p className="text-sm text-gray-500">Incluye feriados y eventos especiales en las predicciones</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <AddUserDialog open={addUserOpen} onOpenChange={setAddUserOpen} />
      <EditUserDialog open={editUserOpen} onOpenChange={setEditUserOpen} user={selectedUser} />
    </MainLayout>
  )
}
