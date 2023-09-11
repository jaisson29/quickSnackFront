import DataTable from 'react-data-table-component';

// A super simple expandable component.
const ExpandedComponent = ({ data }) => <pre>{data.title}</pre>;

const columns = [
  {
    name: 'Title',
    selector: (row) => (
      <>
        <p>{row.title}</p>
        <p>{row.year}</p>
      </>
    ),
  },
  {
    name: 'Year',
    selector: (row) => row.year,
  },
];

const data = [
  {
    id: 1,
    title: 'Beetlejuice',
    year: '1988',
  },
  {
    id: 2,
    title: 'Ghostbusters',
    year: '1984',
  },
];

export default function Home() {
  return (
    <DataTable
      columns={columns}
      data={data}
      expandableRows
      expandableRowsComponent={ExpandedComponent}
    />
  );
}
