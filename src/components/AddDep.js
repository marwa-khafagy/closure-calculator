import { useState } from "react"

export const AddDep = ({onAdd, doneTyping, setDoneTyping, index}) => {
    const [dep, setDep] = useState('')
    const [invalidInput, setValid] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        const tempDep = dep.replaceAll(/ /g,'')
        const tempArray = tempDep.split('->')
        setValid(false)
        if(!tempArray || !tempDep.includes('->') || tempArray.length != 2 || tempArray[0].includes('-') || tempArray[1].includes('>')){
            // alert('Invalid entry, please follow the given format')
            setValid(true)
            console.log('error caught')
            return
        }
        tempArray[0] = tempArray[0].split(',')
        tempArray[1] = tempArray[1].split(',') 
        
        onAdd(dep)
        // console.log(typeof doneTyping)
        doneTyping.pop();
        setDoneTyping([...doneTyping, true])
        
        setDep('')
    }

    const remove = (e) =>{
        e.preventDefault()
        doneTyping.pop();
        setDoneTyping([...doneTyping, true])
    }

    return (
        <>
        {/* {console.log('add dep is being run')} */}
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Dependency</label>
                {invalidInput && <p style={{color: 'red', fontSize: 13, fontWeight:30000}}>Invalid input, please follow the given format</p>}
                <input className={`${invalidInput ? 'form-box-red' : ''}`} type='dep' placeholder='A, B -> X, Y' value={dep} onChange={(e) => setDep(e.target.value)}/>
            </div>
            <input type='button' value='Delete' className="btn" onClick={remove}/>
            <input type='submit' value='Save' className='btn'/>
        </form>
        </>
        
        
    )
}

