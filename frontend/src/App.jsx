import { Routes, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<h2>Home Page</h2>} />
      </Route>
    </Routes>
  )
}

export default App