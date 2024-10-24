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
      // Convertir los datos de string a número
      lostStudents: parseFloat(props.subjectData[label] || "0"),
    }));

    this.state = {
      data: chartData,
    };
  }

  componentDidUpdate(prevProps: StudentLossChartProps) {
    if (this.props.subjectData !== prevProps.subjectData) {
      // Actualiza los datos cuando cambian las props
      const chartData = labels.map((label) => ({
        name: label,
        lostStudents: parseFloat(this.props.subjectData[label] || "0"),
      }));
      this.setState({ data: chartData });
    }
  }

  render() {
    return (
      <div className="border rounded-md">
        <ResponsiveContainer width="100%" height="100%">
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
      </div>
    );
  }
}
