import { useDispatch, useSelector } from "react-redux"
import { increment, fetchTodos } from "./counterSlice"
import {Counter} from "./Counter"
import { useEffect } from "react"


function App() {
  const counter = useSelector(state => state.counter.value)
  const dispatch = useDispatch()
  const {loading, error, users} = useSelector((s) => s.counter)
  useEffect(() => {
    dispatch(fetchTodos())
  },[dispatch])
  if(loading){return <div>Загрузка...</div>}
  if(error){return <div>Ошибка отправки</div>}
  return (
    <>
      <p>{counter}</p>
      <button onClick = {() => dispatch(increment())}>+</button>
      <h2>Zustand запрос:</h2>
      <Counter></Counter>
      <h2>RTK запрос:</h2>
      <ul>
        {users.map((item) => (<li key={item.id}>{item.todo}</li>))}
      </ul>
   
    
    </>
  )
}

export default App
