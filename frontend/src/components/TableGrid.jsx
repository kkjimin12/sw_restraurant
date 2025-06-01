import { useEffect, useState} from 'react';
import TableGroup from '../components/TableGroup'

const tableData = [
    {type:'four', number: '01'},
    {type:'four', number: '02'},
    {type:'two', number: '03'},
    {type:'four', number: '04'},
    {type:'four', number: '05'},
    {type:'two', number: '06'},
    {type:'six', number: '07'},
    {type:'two', number: '08'},
];
const TableGrid = ({date,time}) => {
    const [reservedTables, setReservedTables] = useState([]);
    useEffect(() => {
        const fetchReservations = async() => {
            try{
                const response = await fetch(`http://localhost:5000/api/reserved-tables?date=${date}&time=${time}`);
                const data = await response.json();
                if(data.success){
                    setReservedTables(data.reserved_tables.map(String));
                }
                console.log("예약된 테이블:", data.reserved_tables);

            }catch(e){
                console.error(e);
            }
        };
        fetchReservations();
        
    },[date,time]);
    
    return(
        <div className="tableBox">
            {tableData.map(({type,number}) => (
                <TableGroup key={number} type={type} number={number} date={date} time={time} reserved={reservedTables.includes(`${number} 테이블`)}/>
            ))}
        </div>
    );
};

export default TableGrid;