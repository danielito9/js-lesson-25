import { useCounter, useFetch } from "./useCounterStore"
import { useEffect } from "react"
export const Counter = () => {
    const {count, plus, minus} = useCounter()
    const {todos,error,loating, zapros} = useFetch()
    useEffect(() => {
        zapros()
      }, [zapros])    
  if (loating) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>
    return<>
        <p>{count}</p>
        <button onClick={plus}>+</button>
        <button onClick={minus}>-</button>
        <button onClick={zapros}>Запрос</button>
        <div>
            
            <ul>
                {todos.map((item) => (
                    <li>{item.todo}</li>
                ))}    
            </ul>
        </div>
    
    </>
}