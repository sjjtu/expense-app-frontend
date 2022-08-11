import { Link } from "react-router-dom";

const ReadOnlyRows = ({inputs, attrList, link="", handleOnEdit, id, handleOnDelete}) => {

    const onClick = (event) => {
        if (!(link=="")) window.location = link;
    };

    const onEdit = () => {
        handleOnEdit(id)
    }

    const onDelete = () => {
        handleOnDelete(id)
    }

    return (
        <tr>
            {Object.entries(inputs).map( ([key, value]) => {
                if (attrList.includes(key)) return (<td key={key}><div onClick={onClick}>{value}</div></td>)
            })}
            <td><button onClick={onEdit}>Edit</button></td>
            <td><button onClick={onDelete}>Delete</button></td>
        </tr>
            
    )
}

export default ReadOnlyRows;