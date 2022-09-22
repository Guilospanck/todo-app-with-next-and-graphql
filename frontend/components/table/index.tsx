import Button, { ButtonColor } from '../button'
import styles from './index.module.css'

export type TableProps = {
  headers: string[],
  body: any[][], // [[id, name, cycles], [id, name, cycles], [id, name, cycles]]
  onDeleteClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => void,
  onUpdateClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => void,
}

const Table = (props: TableProps) => {
  return (
    <table key={'table'} className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {
            props.headers.map((head, idx) => <th key={`table-header-row-${idx}`} scope="col" className={styles.default_td_th}>{head}</th>)
          }

          {/* Actions */}
          {
            (props.onDeleteClick !== undefined || props.onUpdateClick !== undefined) && <th key={`table-header-actions`} scope="col" className={styles.default_td_th}>Actions</th>
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

                {/* Actions */}
                {
                  <td key={`table-body-row-${idx}-actions`} className={styles.default_td_th}>
                    {
                      props.onDeleteClick !== undefined &&
                      <Button content="Delete" color={ButtonColor.RED} onClick={(e) => props.onDeleteClick!(e, items.at(0))} />
                    }
                    {
                      props.onUpdateClick !== undefined &&
                      <Button content="Update" color={ButtonColor.BLUE} onClick={(e) => props.onUpdateClick!(e, items.at(0))} />
                    }
                  </td>
                }
              </tr>
            )
          })
        }
      </tbody>
    </table >
  )
}

export default Table