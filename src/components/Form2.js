import React from 'react'
import { AddDep } from './AddDep'
import { useState } from 'react'
import Button from './Button'

const Form2 = ({onAdd}) => {
    const [doneTyping, setDoneTyping] = useState(new Array(false))
    return (
        <>
            {!doneTyping[doneTyping.length - 1] ? <AddDep onAdd={onAdd} doneTyping={doneTyping} setDoneTyping={setDoneTyping} index={doneTyping.length -1}/> : 
            <Button func={() => {
                setDoneTyping([...doneTyping, false])
                {<AddDep onAdd={onAdd} doneTyping={doneTyping} setDoneTyping={setDoneTyping} index={doneTyping.length -1} />}
            }
            } text='Add new Dependency'/> 
            }
        </>

    )
}

export default Form2
