"use client"

import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function PredictionChart() {
  return (
    <ChartContainer
      config={{
        "Platos Principales": {
          label: "Platos Principales",
          color: "hsl(var(--chart-1))",
        },
        Entradas: {
          label: "Entradas",
          color: "hsl(var(--chart-2))",
        },
        Postres: {
          label: "Postres",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[300px]"
    >
      <BarChart
        accessibilityLayer
        data={[
          { day: "Lunes", "Platos Principales": 45, Entradas: 30, Postres: 15 },
          { day: "Martes", "Platos Principales": 50, Entradas: 25, Postres: 20 },
          { day: "Miércoles", "Platos Principales": 40, Entradas: 20, Postres: 15 },
          { day: "Jueves", "Platos Principales": 55, Entradas: 35, Postres: 25 },
          { day: "Viernes", "Platos Principales": 65, Entradas: 40, Postres: 30 },
          { day: "Sábado", "Platos Principales": 75, Entradas: 50, Postres: 35 },
          { day: "Domingo", "Platos Principales": 60, Entradas: 45, Postres: 30 },
        ]}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Legend />
        <Bar dataKey="Platos Principales" fill="var(--color-Platos Principales)" radius={4} />
        <Bar dataKey="Entradas" fill="var(--color-Entradas)" radius={4} />
        <Bar dataKey="Postres" fill="var(--color-Postres)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
