import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'Nombre',
    cell: (row: any) => row.name,
    sortable: true,
    sortActive: true // Esta es la columna activa para el ordenamiento
  },
  {
    name: 'Edad',
    cell: (row: any) => row.age,
    sortable: true,
    sortActive: false // Esta columna no está activa para el ordenamiento
  }
];

const data = [
  { name: 'Juan', age: 25 },
  { name: 'Ana', age: 23 },
  { name: 'Pedro', age: 27 }
];

function App() {
  return (
    <div className="App">
      <DataTable
        title="Ejemplo de react-data-table"
        columns={columns}
        data={data}
      />
    </div>
  );
}

export default App;
