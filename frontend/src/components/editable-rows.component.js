import { Link } from "react-router-dom";

const EditableRows = ({inputs, attrList, handleOnSave, id}) => {

    const onChange = (event) => {
        inputs[event.target.name] = event.target.value;
    };

    const onSave = () => {
        delete inputs["_editable"];
        console.log(inputs);
        handleOnSave(id, inputs)
    }

    return (
        <tr onChange={onChange}>
            {Object.entries(inputs).map( ([key, value]) => {
                if (attrList.includes(key)) return (<td><input
                    type="text"
                    name={key}
                    defaultValue={value}
                /></td>)
            })}
            <td><button onClick={onSave}>Save</button></td>
        </tr>
            
            
    )
}

export default EditableRows;