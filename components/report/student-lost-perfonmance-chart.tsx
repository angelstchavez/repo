import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface StudentLossAreaChartProps {
  subjectData: { [key: string]: number }; // Cambiar el tipo a número para representar los datos
}

interface StudentLossAreaChartState {
  data: Array<{ name: string; uv: number }>; // Cambiar el tipo a 'uv'
  averageLoss: number;
  maxLoss: number;
  minLoss: number;
}

export default class StudentLossAreaChart extends PureComponent<
  StudentLossAreaChartProps,
  StudentLossAreaChartState
> {
  constructor(props: StudentLossAreaChartProps) {
    super(props);

    // Transformar los datos para el gráfico
    const chartData = Object.keys(props.subjectData).map((label) => ({
      name: label,
      uv: props.subjectData[label], // Usar directamente el valor
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

  componentDidUpdate(prevProps: StudentLossAreaChartProps) {
    if (this.props.subjectData !== prevProps.subjectData) {
      // Actualiza los datos cuando cambian las props
      const chartData = Object.keys(this.props.subjectData).map((label) => ({
        name: label,
        uv: this.props.subjectData[label], // Usar directamente el valor
      }));
      const { averageLoss, maxLoss, minLoss } =
        this.calculateMetrics(chartData);
      this.setState({ data: chartData, averageLoss, maxLoss, minLoss });
    }
  }

  // Función para calcular la media, el máximo y el mínimo
  calculateMetrics(data: Array<{ name: string; uv: number }>) {
    const totalLoss = data.reduce((sum, entry) => sum + entry.uv, 0);
    const averageLoss = totalLoss / data.length;
    const maxLoss = Math.max(...data.map((entry) => entry.uv));
    const minLoss = Math.min(...data.map((entry) => entry.uv));
    return { averageLoss, maxLoss, minLoss };
  }

  render() {
    return (
      <div className="border rounded-md p-4">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            width={500}
            height={400}
            data={this.state.data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
