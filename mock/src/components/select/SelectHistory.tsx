import "../../styles/main.css";
import { histEntry } from "./Select";
import {getTable} from "../../mockedData"
/**
 * A interface for the props that are passed into SelectHistory.
 *
 * @params
 * history: an array holding the history entries that are to be
 *  outputted to the end-user in the main output area
 */
interface SelectHistoryProps {
  history: string;
}

/**
 * Builds a SelectHistory component that displays the output area according
 *  to any commands inputted by the user.
 *
 * @param props the history entries (see SelectHistoryProps for more details)
 * @returns JSX that will print a tabular view of the passed in data
 */
export function SelectHistory(props: SelectHistoryProps) {
  const key= props.history;
  const table = getTable(key);
  if (!table) {
    // If selected is the empty one, tell user to select
    if (props.history == "Select a file"){
      return (
        <div style={{ 
          wordWrap: 'break-word', 
          whiteSpace: 'normal', 
          overflowWrap: 'break-word' 
        }}>Please choose one of the tables in the dropdown menu to display it.</div>
      );
    }
    // If table is undefined or null, render a message or empty state
    return <div>No data available for the selected table.</div>;
  }
  return (
    <div className="table" style={{ overflowY: 'auto', width: '80%', margin: 'auto' , overflowX: 'auto'}}>
      <table border={1} style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            {table[0].map((header, index) => (
              <th key={index} style={{ 
                position: 'sticky', 
                top: 0, 
                backgroundColor: 'grey', 
                zIndex: 1,
                minWidth: '150px'
              }}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}