import "../../styles/main.css";
import { histEntry } from "./Select";
import {getTable} from "../../mockedData"
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

/**
 * A interface for the props that are passed into SelectHistory.
 *
 * @params
 * history: an array holding the history entries that are to be
 *  outputted to the end-user in the main output area
 */
interface SelectHistoryProps {
  history: string;
  mode: string
}

function generateRandomRGBA(): string {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const a = Math.random().toFixed(2); // Alpha between 0.00 and 1.00

  return `rgba(${r}, ${g}, ${b}, ${a})`;
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
  const mode=props.mode;
  let allHeadersInvalid = true;
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
  if (mode == "Select display mode") {
    return (
      <div style={{
          wordWrap: 'break-word',
          whiteSpace: 'normal',
          overflowWrap: 'break-word'
        }}>
        Please choose a display mode.
      </div>
    );
  }
  if (mode == "Table"){
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
    const labels = table.slice(1).map(row => row[0]);
    const headers = table[0].slice(1);
    const invalidHeaders: string[] = [];
    let datasets = headers.map((header, colIndex) => {
      // Extract the data for this specific column (skip the first row, which is the header)
      const data = table
        .slice(1)
        .map((row) => parseFloat(row[colIndex + 1])); // Use colIndex + 1 to skip the first column (State)\

      if (data.some((value) => isNaN(value))){
        invalidHeaders.push(header);
      } else {
        allHeadersInvalid = false;
      }
      // Assign each dataset a unique color and label based on the header
      const color = generateRandomRGBA();

      return {
        label: header,
        data: data,
        backgroundColor: color, // Use modulo to cycle through colors
        borderColor: color,
        borderWidth: 1
      };
    });
    datasets = datasets.filter((dataset) =>
      !dataset.data.some((value) => isNaN(value))
    );
    const data = {
      labels,
      datasets
    }
    let options; 
    if (mode == "Vertical Bar Chart"){
      options = {
        plugins: {
          legend: {
            display: true,
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: false,
          },
          y: {
            stacked: false,
          },
        },
      };
    } else if (mode == "Stacked Bar Chart") {
      options = {
        plugins: {
          legend: {
            display: true,
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      };
    }
    
    let message = <div></div>;
    if (allHeadersInvalid) {
      message = <div>Selected dataset contains no numerical Y values.</div>;
    } else if (invalidHeaders.length != 0){
      message = (
        <div>
          Couldn't parse the following headers: {invalidHeaders.join(", ")}
        </div>
      );
    }
    // If there is invalid data, show a message instead of the chart
    

    return (
      <div>
        {message}
        {!allHeadersInvalid && <Bar options={options} data={data} />}
    </div>
    );
}