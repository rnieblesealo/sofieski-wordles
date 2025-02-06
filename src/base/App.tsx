import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home"

function App() {
  // NOTE: routes must be inside browser router context
  // this gives routes necessary context info to handle things like url changes 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
