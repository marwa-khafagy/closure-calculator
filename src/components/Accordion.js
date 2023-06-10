import { useRef, useState, useEffect } from 'react'
import { IoIosArrowDown as Arrow, IoIosArrowUp as ArrowDown } from "react-icons/io";

const AccordionItem = ({ index, handleToggle , active, item }) => {
    const contentEl = useRef(null);
    const { header, text} = item;   

    return (
        <div className='rc-accordian-card'>
            <header 
                className={active === index ? 'active' : ''}
                onClick={() => handleToggle(index)}
            >
                <h2>{header.toString()}</h2>
                <span className='material-symbols-outlined'>{active === index ? <ArrowDown/> :<Arrow/>}</span>
            </header>
            <div
                ref={contentEl}
                className={`collapse ${active === index ? "show" : ""}`}
                style={
                    active === index
                        ? {height : contentEl.current.scrollHeight}
                        : {height: '0px'}
                }
            >
                <p style={{fontSize: 17,  overflow: "auto"}}>{"{"}{text.toString()}{"}"}</p>
                
            </div>
        </div>
    )
}

const Accordion = ({ closure }) => {
    const [active, setActive] = useState(null);
    const [closures, setClosure] = useState([]);

    const handleToggle = (index) => {
        if (active === index){
            setActive(null);
        }
        else{
            setActive(index)
        }
    };

    useEffect(() => {
        {closure.forEach((value, key) => {
            setClosure(closures => [...closures, {
                header : key,
                text : value   
            }])

        })}
      }, []);

    return (
        <div className='task'>
        <h3>
        Closures
        </h3>
        <article>
            {closures.map((item, index) => {
                return(
                    <AccordionItem 
                        index={index}
                        active={active}
                        handleToggle={handleToggle}
                        item={item}
                    />
                )
            })}
        </article>

        </div>
    )
}

export default Accordion

