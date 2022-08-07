import { Link } from "react-router-dom";

const EditableRows = ({inputs, handleOnSave, id}) => {

    const onChange = (event) => {
        inputs[event.target.name] = event.target.value;
    };

    const onSave = () => {
        delete inputs["_editable"];
        // console.log(inputs);
        handleOnSave(id, inputs)
    }

    return (
        <tr onChange={onChange}>
            {Object.entries(inputs).map( ([key, value]) => {
                if (key.includes("_")) return
                return (<td><input
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