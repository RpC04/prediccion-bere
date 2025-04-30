import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function PredictionTable() {
  const predictions = [
    { id: 1, dish: "Arroz con Pollo", quantity: 35, category: "Plato Principal", trend: "up" },
    { id: 2, dish: "Ceviche", quantity: 20, category: "Entrada", trend: "up" },
    { id: 3, dish: "Lomo Saltado", quantity: 15, category: "Plato Principal", trend: "neutral" },
    { id: 4, dish: "Causa Rellena", quantity: 12, category: "Entrada", trend: "down" },
    { id: 5, dish: "Ají de Gallina", quantity: 18, category: "Plato Principal", trend: "up" },
  ]

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Plato</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead className="text-right">Cantidad Sugerida</TableHead>
            <TableHead className="text-right">Tendencia</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {predictions.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.dish}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell className="text-right">{item.quantity}</TableCell>
              <TableCell className="text-right">
                {item.trend === "up" && <span className="text-green-500">↑</span>}
                {item.trend === "down" && <span className="text-red-500">↓</span>}
                {item.trend === "neutral" && <span className="text-gray-500">→</span>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
