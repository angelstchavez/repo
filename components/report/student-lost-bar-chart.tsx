import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BarChart2, ArrowUpCircle, ArrowDownCircle } from "lucide-react"; // Importar iconos

const labels = [
  "2017-1",
  "2017-2",
  "2018-1",
  "2018-2",
  "2019-1",
  "2019-2",
  "2020-1",
  "2020-2",
  "2021-1",
  "2021-2",
  "2022-1",
  "2022-2",
  "2023-1",
  "2023-2",
  "2024-1",
];

interface StudentLossChartProps {
  subjectData: { [key: string]: string };
}

interface StudentLossChartState {
  data: Array<{ name: string; lostStudents: number }>;
  averageLoss: number;
  maxLoss: number;
  minLoss: number;
}

export default class StudentLossChart extends PureComponent<
  StudentLossChartProps,
  StudentLossChartState
> {
  constructor(props: StudentLossChartProps) {
    super(props);

    // Transformar los datos para el gráfico
    const chartData = labels.map((label) => ({
      name: label,
      lostStudents: parseFloat(props.subjectData[label] || "0"),
    }));

    // Calcular las métricas
    const { averageLoss, maxLoss, minLoss } = this.calculateMetrics(chartData);

    this.state = {
      data: chartData,
      averageLoss,
      maxLoss,
      minLoss,
    };
  }

  componentDidUpdate(prevProps: StudentLossChartProps) {
    if (this.props.subjectData !== prevProps.subjectData) {
      // Actualiza los datos cuando cambian las props
      const chartData = labels.map((label) => ({
        name: label,
        lostStudents: parseFloat(this.props.subjectData[label] || "0"),
      }));
      const { averageLoss, maxLoss, minLoss } =
        this.calculateMetrics(chartData);
      this.setState({ data: chartData, averageLoss, maxLoss, minLoss });
    }
  }

  // Función para calcular la media, el máximo y el mínimo
  calculateMetrics(data: Array<{ name: string; lostStudents: number }>) {
    const totalLoss = data.reduce((sum, entry) => sum + entry.lostStudents, 0);
    const averageLoss = totalLoss / data.length;
    const maxLoss = Math.max(...data.map((entry) => entry.lostStudents));
    const minLoss = Math.min(...data.map((entry) => entry.lostStudents));
    return { averageLoss, maxLoss, minLoss };
  }

  render() {
    return (
      <div className="border rounded-md p-4">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            width={800}
            height={300}
            data={this.state.data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              tickFormatter={(value) => `${value}%`} // Mostrar el valor como porcentaje
            />
            <Tooltip
              formatter={(value: number) => `${value}%`} // Mostrar porcentajes en el tooltip
            />
            <Legend />
            <Bar
              dataKey="lostStudents"
              fill="#03A64A"
              activeBar={<Rectangle fill="#03d860" stroke="#03d860" />}
            />
          </BarChart>
        </ResponsiveContainer>

        {/* Tarjetas verticales con datos */}
        <div className="flex justify-center mt-8 gap-4">
          {/* Tarjeta para la media */}
          <div className="bg-blue-100 p-4 rounded-md text-center shadow-lg flex flex-col items-center">
            <BarChart2 size={32} className="text-blue-600 mb-2" />
            <h3 className="text-blue-600 font-bold text-xl">Media</h3>
            <p className="text-xl font-semibold">
              {this.state.averageLoss.toFixed(2)}%
            </p>
          </div>

          {/* Tarjeta para el mayor valor */}
          <div className="bg-green-100 p-4 rounded-md text-center shadow-lg flex flex-col items-center">
            <ArrowUpCircle size={32} className="text-green-600 mb-2" />
            <h3 className="text-green-600 font-bold text-xl">Mayor valor</h3>
            <p className="text-xl font-semibold">
              {this.state.maxLoss.toFixed(2)}%
            </p>
          </div>

          {/* Tarjeta para el menor valor */}
          <div className="bg-red-100 p-4 rounded-md text-center shadow-lg flex flex-col items-center">
            <ArrowDownCircle size={32} className="text-red-600 mb-2" />
            <h3 className="text-red-600 font-bold text-xl">Menor valor</h3>
            <p className="text-xl font-semibold">
              {this.state.minLoss.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    );
  }
}
