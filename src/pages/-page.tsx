import { useState } from 'react'
import './page.css'
import { NavLink } from 'react-router-dom'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="index-page">
      <div className="card">
        <button onClick={() => { setCount((count) => count + 1); }}>
          count is {count}
        </button>
      </div>
      <h2>
        <NavLink to={'/posts'}>测试文章列表页</NavLink>
      </h2>
    </div>
  )
}
