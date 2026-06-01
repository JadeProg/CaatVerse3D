import { KeyboardControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import './App.css'
import { Physics, RigidBody } from '@react-three/rapier'
import { useEffect, useMemo, useRef, useState } from 'react'
import { MobileControls } from './components/MobileControls'
import { CuriosityPoint } from './components/CuriosityPoint'
import { Player } from './components/Player'
import { Menu } from './components/menu/Menu'
import { DetectGpu } from './components/DetectGpu'
import { Model } from './Mapa'

import santuarioCard from './assets/imgs/SantuarioCard.png'
import ararinhaAzulCard from './assets/imgs/ArarinhaAzulCard.png'
import arvoreCard from './assets/imgs/ArvoreCard.png'
import cactosCard from './assets/imgs/CactosCard.png'

const Controls = {
  forward: 'forward',
  backward: 'backward',
  left: 'left',
  right: 'right',
}

const presets = {
  mobile: { dpr: 1.5, shadows: false },
  low: { dpr: 1, shadows: false },
  medium: { dpr: 1.25, shadows: false },
  high: { dpr: 1.5, shadows: true },
}

function BackgroundMusic({ started }) {
  const audioRef = useRef(
  new Audio(`${import.meta.env.BASE_URL}Instrumental.mp3`)
)

  useEffect(() => {
    if (started) {
      audioRef.current.loop = true
      audioRef.current.volume = 0.15
      audioRef.current.play().catch((err) => console.log('Erro ao tocar:', err))
    } else {
      audioRef.current.pause()
    }
  }, [started])

  return null
}

function App() {
  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
      { name: Controls.backward, keys: ['ArrowDown', 'KeyS'] },
      { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
      { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
    ],
    []
  )

  const [started, setStarted] = useState(false)
  const [quality, setQuality] = useState('low')
  const [activeCuriosity, setActiveCuriosity] = useState(null)

  const preset = presets[quality] || presets.low

  useEffect(() => {
    DetectGpu()
      .then((q) => {
        setQuality(q || 'low')
      })
      .catch(() => {
        setQuality('low')
      })
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {!started && <Menu onStart={() => setStarted(true)} />}

      <BackgroundMusic started={started} />

      <div className="header">
        <img 
          src={`${import.meta.env.BASE_URL}logo-caatverse.png`} 
          alt="CaatVerse" 
          className="header-logo" 
        />
        <p>Explore a experiência usando seu teclado (W, A, S, D) ou joystick</p>
      </div>

      <KeyboardControls map={map}>
        {started && <MobileControls />}

        {quality && (
          <Canvas
            shadows={preset.shadows}
            dpr={preset.dpr}
            gl={{ alpha: true }}
            camera={{ position: [0, 6, 14], fov: 45 }}
            className="sunset-canvas"
          >
            <ambientLight intensity={2} />

            <directionalLight intensity={2} position={[10, 10, 10]} />

            <Physics>
              <RigidBody type="fixed" colliders="trimesh">
                <Model scale={1} position={[-368.8, 0, -1.8]} />
              </RigidBody>

              <CuriosityPoint
                position={[-0.802, 0.01, -0.429]}
                title="Santuário das Espécies"
                text="Algumas espécies da Caatinga estão ameaçadas de desaparecer. No CaatVerse, você pode criar um ativo digital simbólico para registrar a memória dessa espécie na blockchain e lembrar outras pessoas da importância de protegê-la."
                image={santuarioCard}
                onOpen={setActiveCuriosity}
                onClose={() => setActiveCuriosity(null)}
              />

              <CuriosityPoint
                position={[1.263, 0.01, -2.189]}
                title="Umbuzeiro"
                text="É uma árvore símbolo da Caatinga. Seus frutos ajudam comunidades do semiárido. Embora não esteja oficialmente extinto, o umbuzeiro precisa de cuidado e preservação. No CaatVerse, criar um ativo digital inspirado nele ajuda a manter viva sua memória."
                image={arvoreCard}
                onOpen={setActiveCuriosity}
                onClose={() => setActiveCuriosity(null)}
              />

              <CuriosityPoint
                position={[-0.661, 0.01, -2.808]}
                title="Ararinha-azul"
                text="Segundo o ICMBio, a ararinha-azul é uma espécie endêmica da região semiárida do Baixo-Médio Vale do Rio São Francisco, dentro da Caatinga, na Bahia. Considerada extinta na natureza desde 2000, ela se tornou um símbolo da luta contra a extinção. No CaatVerse, um ativo digital inspirado nela pode manter sua memória viva na blockchain."
                image={ararinhaAzulCard}
                onOpen={setActiveCuriosity}
                onClose={() => setActiveCuriosity(null)}
              />

              <CuriosityPoint
                position={[-0.782, 0.01, 1.922]}
                title="Cactos da Caatinga"
                text="Na Caatinga, os cactos guardam vida em meio à seca. Espécies como mandacaru, xique-xique e facheiro armazenam água em seus caules e podem servir de apoio para animais e comunidades quando manejadas corretamente."
                image={cactosCard}
                onOpen={setActiveCuriosity}
                onClose={() => setActiveCuriosity(null)}
              />

              <Player />
            </Physics>
          </Canvas>
        )}
      </KeyboardControls>

      {activeCuriosity && (
        <div className="curiosity-overlay">
          <div className="curiosity-card">
            <button
              className="curiosity-close"
              onClick={() => setActiveCuriosity(null)}
            >
              ×
            </button>

              <img
              className={`curiosity-image ${
                activeCuriosity.title === 'Ararinha-azul'
                  ? 'curiosity-image-bird'
                  : activeCuriosity.title === 'Umbuzeiro'
                  ? 'curiosity-image-tree'
                  : ''
              }`}
              src={activeCuriosity.image}
              alt={activeCuriosity.title}
            />

            <h2>{activeCuriosity.title}</h2>

            <p>{activeCuriosity.text}</p>

            <button
              className="curiosity-next"
              onClick={() => setActiveCuriosity(null)}
            >
              FECHAR
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App