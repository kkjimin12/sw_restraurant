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
    return(
        <div className="tableBox">
            {tableData.map(({type,number}) => (
                <TableGroup key={number} type={type} number={number} date={date} time={time}/>
            ))}
        </div>
    );
};

export default TableGrid;