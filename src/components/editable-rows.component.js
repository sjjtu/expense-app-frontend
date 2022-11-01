import React, { Component }  from 'react';
import { Link } from "react-router-dom";
import Select from 'react-select';

const EditableRows = ({inputs, attrList, handleOnSave, id, catList=[], usersList=[]}) => {

    const onChange = (event) => {
        inputs[event.target.name] = event.target.name==="users" ? [event.target.value] : event.target.value
        console.log(inputs[event.target.name])
    };

    const onSave = () => {
        delete inputs["_editable"];
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
                if(key=="users" || key=="user") return (
                    <td><Select 
                        name={key}
                        defaultValue={inputs[key].map(user=>({'value': user, 'label':user}))}
                        options={usersList.map(user=>({'value': user, 'label':user}))} 
                        isMulti 
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(e)=>(inputs[key]=e.map(opt=>opt.value))}/>
                    </td>
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