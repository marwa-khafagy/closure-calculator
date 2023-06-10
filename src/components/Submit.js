import { useReducer, useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Accordion from "./Accordion";





const Submit = ({rawData}) => {
  const [data, setData] = useState(new Map())
  const [keys, setKeys] = useState(new Array())
  const [answer, setAnswer] = useState(new Map ())
  const [stack, setStack] = useState(new Map ())
  const [marked, setMarked] = useState(new Map ())

  function equals(a, b) {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    }

  const clean = (element) => {
    const tempDep = element.replaceAll(/ /g,'')
    const tempArray = tempDep.split('->')
    tempArray[0] = tempArray[0].split(',')
    tempArray[1] = tempArray[1].split(',')
    let temp = [...tempArray[1]]
    
    data.forEach((value, key) => {
        if (equals(key, tempArray[0])){
            temp = [...value,...tempArray[1]]
            setData(data.delete(key))
            return;
        }
    })

    setData(data.set(tempArray[0], temp)) 
  }
  const init = () =>{
    data.forEach((value, key) => {
        let temp = [... key, ...value]
        let dup = false
        
        answer.forEach((value2, key2) =>{
            if(equals(key2, key)){
                temp = [...value2, ...value]
                setAnswer(answer.delete(key))
                setStack(answer.delete(key))
                setMarked(answer.delete(key))
                dup = true
            }
        })

        setAnswer(answer.set(key, temp))
        setStack(stack.set(key, temp))
        setMarked(marked.set(key, new Array()))
        if(!dup){
            const tempKeys = keys.concat(key)
            setKeys(prev => ([...prev, key]))
            
        }

            

        if(key.length > 1){
            key.forEach((ind) =>{
                let match = false
                data.forEach((value3, key3) =>{
                    if(equals(key3, new Array(ind)))
                        match = true
                })

                if(!match){
                    setAnswer(answer.set(new Array(ind), new Array(ind)))
                    setStack(stack.set(new Array(ind), new Array(ind)))
                    setMarked(marked.set(new Array(ind), new Array(ind)))
                    setKeys(prev => ([...prev, new Array(ind)]))

                }
            })
        }
        return;
        
    })
  }
    const closure = () => {

      data.forEach((value, key) => {
              while(stack.get(key).length > 0){
                  const temp = stack.get(key)[stack.get(key).length - 1]
                  const temp2 = stack.get(key).filter(element => element !== temp)
                  
                  setStack(stack.delete(key))
                  setStack(stack.set(key, temp2))
      
                  if(marked.has(key) && !marked.get(key).includes(temp)){
                      if(!answer.get(key).includes(temp)){
                          const oldAns = answer.get(key)
                          setAnswer(answer.delete(key))
                          setAnswer(answer.set(key, [...oldAns, temp]))
                      }  

                      data.forEach((value2, key2) => {
                          if (equals(key2, new Array(temp))){
                              data.get(key2).map(element => {
                                  const oldStack = stack.get(key)
                                  setStack(stack.delete(key))
                                  setStack(stack.set(key, [...oldStack, element])) 
                              })
                          }
                      })
                  
                      
                      const oldMar = marked.get(key)
                      setMarked(marked.delete(key))
                      setMarked(marked.set(key, [...oldMar, temp]))
                  }
          
              }
              return;
          }
          
      )
    }
  

    const destroyFunc = useRef();
    const effectCalled = useRef(false);
    const renderAfterCalled = useRef(false);
    const [val, setVal] = useState(0);
  
    if (effectCalled.current) {
      renderAfterCalled.current = true;
    }
  
    useEffect(() => {
      // only execute the effect first time around
      if (!effectCalled.current) {
        effectCalled.current = true;
        rawData.map(clean)
        
        init()
        closure()
      }
  
      // this forces one render after the effect is run
      setVal((val) => val + 1);
  
      return () => {
        // if the comp didn't render since the useEffect was called,
        // we know it's the dummy React cycle
        if (!renderAfterCalled.current) {
          return;
        }
        if (destroyFunc.current) {
          destroyFunc.current();
        }
      };
    }, []);

  return (
    <div>
        <Accordion closure={answer}/>
        <Link className='btn' to='/'>Go Back</Link>
    </div>


)
}
Submit.propTypes = {
    rawData: PropTypes.array.isRequired,
}

export default Submit 


