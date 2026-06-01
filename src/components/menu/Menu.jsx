import { useProgress } from '@react-three/drei';
import './Menu.css';

export function Menu({ onStart }) {
    // Esse hook monitora o carregamento de arquivos no Canvas
    const { progress } = useProgress();

    // Verificamos se já carregou tudo
    const isLoaded = progress === 100;

    return (
        <div className='menu'>
            <div className="container-menu">
                <img src="/logo-caatverse.png" alt="CaatVerse" className="header-logo" />
                <h1>Explore a experiência 3D</h1>
                
                <button 
                    className="start-button" 
                    onClick={onStart}
                    // O botão fica desativado enquanto não estiver carregado
                    disabled={!isLoaded}
                    style={{
                        cursor: isLoaded ? 'pointer' : 'not-allowed',
                        opacity: isLoaded ? 1 : 0.5
                    }}
                >
                    {isLoaded ? "START" : `CARREGANDO ${Math.round(progress)}%`}
                </button>
            </div>
        </div>
    );
}