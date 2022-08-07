import { Link } from "react-router-dom";

const ReadOnlyRows = ({inputs, link, handleOnEdit, id}) => {

    const onChange = (event) => 3;

    const onEdit = () => {
        handleOnEdit(id)
    }

    return (
        <tr onChange={onChange}>
            {Object.entries(inputs).map( ([key, value]) => {
                if (key.includes("_")) return // for example _id should not be displayed here
                return (<td key={key}>{value}</td>)
            })}
            <td><button onClick={onEdit}>Edit</button></td>
        </tr>
            
    )
}

export default ReadOnlyRows;