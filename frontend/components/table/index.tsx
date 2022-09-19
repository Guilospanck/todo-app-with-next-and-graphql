import styles from './index.module.css'

export type TableProps = {
  headers: string[],
  body: any[][] // [[id, name, cycles], [id, name, cycles], [id, name, cycles]]
}

const Table = (props: TableProps) => {
  return (
    <table key={'table'} className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {
            props.headers.map((head, idx) => <th key={`table-header-row-${idx}`} scope="col" className={styles.default_td_th}>{head}</th>)
          }
        </tr>
      </thead>
      <tbody>
        {
          props.body.map((items, idx) => {
            return (
              <tr key={`table-body-row-${idx}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                {
                  items.map((item, secIdx) => <td key={`table-body-row-${idx}-column-${secIdx}`} className={styles.default_td_th}>{item}</td>)
                }
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default Table