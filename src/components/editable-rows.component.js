import { Link } from "react-router-dom";

const EditableRows = ({inputs, attrList, handleOnSave, id, catList=[]}) => {

    const onChange = (event) => {
        inputs[event.target.name] = event.target.value;
        console.log(inputs[event.target.name])
    };

    const onSave = () => {
        delete inputs["_editable"];
        console.log(inputs);
        handleOnSave(id, inputs)
    }

    return (
        <tr onChange={onChange}>
            {Object.entries(inputs).map( ([key, value]) => {
                if (key=="category") return (
                    <td><select name={key} defaultValue={inputs[key]}>
                        {catList.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select></td>
                )
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