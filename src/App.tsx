import './App.css'
import ComputerSystemOverview from './components/ComputerSystemOverview'
import InstructionCycleAnimation from './components/InstructionCycleAnimation'

function App() {
  return (
    <>
      <header className="app-header">
        <h1>计算机组成原理探索</h1>
        <p>通过交互式可视化学习计算机系统的核心概念</p>
      </header>

      <main className="app-container">
        <section className="card">
          <ComputerSystemOverview />
        </section>

        <hr className="section-divider" />

        <section className="card">
          <InstructionCycleAnimation />
        </section>
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} 计算机组成原理教学平台 | 探索计算机系统的核心</p>
      </footer>
    </>
  )
}

export default App
