import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import GetStarted from './pages/GetStarted'
import Deploy from './pages/Deploy'
import Skills from './pages/Skills'
import HowTo from './pages/HowTo'
import Caution from './pages/Caution'
import TokenContext from './pages/TokenContext'
import DbConnect from './pages/DbConnect'
import ClaudeMd from './pages/ClaudeMd'
import MCP from './pages/MCP'
import Example from './pages/Example'
import Pricing from './pages/Pricing'

export default function App() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.left = mouseX - 6 + 'px'
      cursor.style.top = mouseY - 6 + 'px'
    }

    // 링은 부드럽게 따라오도록
    const animate = () => {
      ringX += (mouseX - ringX - 18) * 0.12
      ringY += (mouseY - ringY - 18) * 0.12
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    animate()
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <BrowserRouter>
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/how-to" element={<HowTo />} />
        <Route path="/caution" element={<Caution />} />
        <Route path="/token-context" element={<TokenContext />} />
        <Route path="/deploy" element={<Deploy />} />
        <Route path="/db-connect" element={<DbConnect />} />
        <Route path="/claude-md" element={<ClaudeMd />} />
        <Route path="/mcp" element={<MCP />} />
        <Route path="/example" element={<Example />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </BrowserRouter>
  )
}
