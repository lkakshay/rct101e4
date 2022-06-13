import styles from "./CityRow.module.css";

function CityRow({data}) {
  return (
    <tr data-testid="countries-container" className={styles.container}>
      <td> {data.id} </td>
      <td> {data.name} </td>
      <td> {data.country} </td>
      <td> {data.population} </td>
    </tr>
  );
}

export default CityRow;
