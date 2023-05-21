import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
const pdata = [
  {
    name: 'Health',
    shops: 13,
    availablity: 10
  },
  {
    name: 'Education',
    shops: 15,
    availablity: 12
  },
  {
    name: 'Accessories',
    shops: 5,
    availablity: 10
  },
  {
    name: 'Beverages',
    shops: 10,
    availablity: 5
  },
  {
    name: 'Restaurent',
    shops: 9,
    availablity: 4
  },
  {
    name: 'Event Management',
    shops: 10,
    availablity: 8
  },
];

function Dashboard() {
  return (
    <>
      <h3 className="chart-heading mt-3 mb-3">Dashboard</h3>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart data={pdata}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" interval={'preserveStartEnd'} tickFormatter={(value) => value} />
          <YAxis />
          <Tooltip contentStyle={{ backgroundColor: 'yellow' }} />
          <Legend />
          <Line type="monotone" dataKey="shops" stroke="red" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="availablity" stroke="green" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" aspect={3}>
        <AreaChart
          data={pdata}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="shops" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>

    </>
  );
}

export default Dashboard;