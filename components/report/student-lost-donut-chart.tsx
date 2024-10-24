/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { PureComponent } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

interface StudentLossDonutChartProps {
  subjectData: { [key: string]: string };
}

interface StudentLossDonutChartState {
  data: Array<{ name: string; lostStudents: number }>;
  averageLoss: number;
  maxLoss: number;
  minLoss: number;
}

export default class StudentLossDonutChart extends PureComponent<
  StudentLossDonutChartProps,
  StudentLossDonutChartState
> {
  constructor(props: StudentLossDonutChartProps) {
    super(props);

    // Transformar los datos para el gráfico
    const chartData = Object.keys(props.subjectData).map((label) => ({
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

  componentDidUpdate(prevProps: StudentLossDonutChartProps) {
    if (this.props.subjectData !== prevProps.subjectData) {
      // Actualiza los datos cuando cambian las props
      const chartData = Object.keys(this.props.subjectData).map((label) => ({
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
          <PieChart width={400} height={400}>
            <Pie
              data={this.state.data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={150}
              fill="#8884d8"
              dataKey="lostStudents"
            >
              {this.state.data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
