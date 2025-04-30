"use client"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileUp, CheckCircle, AlertCircle } from "lucide-react"

export default function DataUploadPage() {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState(null)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setUploadStatus(null)
    }
  }

  const handleUpload = () => {
    if (!file) return

    setUploading(true)

    // Simulate upload process
    setTimeout(() => {
      setUploading(false)
      setUploadStatus("success")
      // In a real app, you would process the file here
    }, 2000)
  }

  return (
    <MainLayout>
      <div className="p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Cargar Datos</h1>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="mr-2 h-5 w-5 text-orange-500" />
              Subir Archivo de Ventas
            </CardTitle>
            <CardDescription>
              Sube un archivo CSV o Excel con los datos de ventas para mejorar las predicciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload" className="flex flex-col items-center justify-center cursor-pointer">
                <FileUp className="h-12 w-12 text-gray-400 mb-3" />
                <p className="text-sm text-gray-500 mb-1">
                  {file ? file.name : "Arrastra un archivo o haz clic para seleccionar"}
                </p>
                <p className="text-xs text-gray-400">Formatos soportados: CSV, Excel (.xlsx, .xls)</p>
              </label>
            </div>

            {file && (
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <h3 className="font-medium text-gray-700 mb-2">Archivo seleccionado:</h3>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600">{file.name}</span>
                  <span className="ml-2 text-xs text-gray-500">({(file.size / 1024).toFixed(2)} KB)</span>
                </div>
              </div>
            )}

            {uploadStatus === "success" && (
              <div className="bg-green-50 text-green-700 p-4 rounded-md mb-6 flex items-start">
                <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">¡Archivo cargado correctamente!</p>
                  <p className="text-sm mt-1">Los datos han sido procesados y las predicciones actualizadas.</p>
                </div>
              </div>
            )}

            {uploadStatus === "error" && (
              <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6 flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Error al cargar el archivo</p>
                  <p className="text-sm mt-1">Verifica el formato del archivo e intenta nuevamente.</p>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <Button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="bg-orange-500 hover:bg-orange-600"
              >
                {uploading ? "Procesando..." : "Procesar Datos"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
