import { useProgress } from '@react-three/drei';
import './Menu.css';

export function Menu({ onStart }) {
    const { progress } = useProgress();

    const isLoaded = progress === 100;

    return (
        <div className='menu'>
            <div className="container-menu">
                <img 
                    src={`${import.meta.env.BASE_URL}logo-caatverse.png`}
                    alt="CaatVerse" 
                    className="header-logo" 
                />

                <h1>Explore a experiência 3D</h1>

                <button 
                    className="start-button" 
                    onClick={onStart}
                    disabled={!isLoaded}
                    style={{
                        cursor: isLoaded ? 'pointer' : 'not-allowed',
                        opacity: isLoaded ? 1 : 0.5
                    }}
                >
                    {isLoaded ? "START" : `CARREGANDO ${Math.round(progress)}%`}
                </button>

                {!isLoaded && (
                    <p className="loading-message">
                        As cenas 3D podem demorar um pouco para carregar. Por favor, aguarde enquanto preparamos sua experiência.
                    </p>
                )}
            </div>
        </div>
    );
}