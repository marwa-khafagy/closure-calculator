import React from 'react'
import { FaTimes as X} from 'react-icons/fa'

const Dep = ({dep,index, onDelete}) => {
  return (
    <div className='task'>
        <h3>
            {dep}
            {<>
                <X 
                style={{color: 'red', cursor: 'pointer'}} 
                onClick={() => onDelete(index)}
                />
            </>}
        </h3>
    </div>
    )
}
export default Dep