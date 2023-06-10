import Dep from "./Dep"

const Deps = ({data , onDelete}) => {
  return (
    <>
        {data.map((dep, index) => (
                <Dep key={index} dep={dep} index={index} onDelete={onDelete}/>
            ))}
    </>
  )
}

export default Deps
