'use client';

import { useState, useEffect, useRef } from 'react';
import './ElectricBorder.css';

export default function ElectricBorder() {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [speed, setSpeed] = useState(6);
  const [chaos, setChaos] = useState(30);
  const [color, setColor] = useState('#FF00FF');
  const [isMobile, setIsMobile] = useState(false);
  
  // Refs for the filter elements to query animate elements (desktop and mobile)
  const filterRef = useRef<SVGFilterElement>(null);
  const mobileFilterRef = useRef<SVGFilterElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--electric-border-color', color);
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    document.documentElement.style.setProperty('--electric-border-rgb', `${r}, ${g}, ${b}`);
  }, [color]);

  // Update animation speed via DOM manipulation instead of React re-renders
  useEffect(() => {
    const updateFilter = (filter: SVGFilterElement | null) => {
      if (filter) {
        // Query all animate elements - try both direct and nested queries
        const animates = filter.querySelectorAll('animate');
        if (animates.length >= 4) {
          // Update dur attributes for all animations
          animates[0].setAttribute('dur', `${speed}s`);
          animates[1].setAttribute('dur', `${speed}s`);
          animates[2].setAttribute('dur', `${speed}s`);
          animates[3].setAttribute('dur', `${speed}s`);
          
          // Update begin attributes
          animates[0].setAttribute('begin', `-${speed * 0.3}s`);
          animates[1].setAttribute('begin', `-${speed * 0.7}s`);
          animates[2].setAttribute('begin', `-${speed * 0.5}s`);
          animates[3].setAttribute('begin', `-${speed * 0.2}s`);
        }
      }
    };
    
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      // Update both desktop and mobile filters
      updateFilter(filterRef.current);
      updateFilter(mobileFilterRef.current);
      
      // Also try querying by ID as fallback for mobile
      if (isMobile) {
        const mobileFilterById = document.getElementById('ramin-electric-displace-mobile') as SVGFilterElement;
        if (mobileFilterById) {
          updateFilter(mobileFilterById);
        }
      }
    });
  }, [speed, isMobile]);

  // Update chaos (displacement scale) via DOM manipulation
  useEffect(() => {
    const updateFilter = (filter: SVGFilterElement | null) => {
      if (filter) {
        const displacementMap = filter.querySelector('feDisplacementMap');
        if (displacementMap) {
          displacementMap.setAttribute('scale', String(chaos));
        }
      }
    };
    
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      // Update both desktop and mobile filters
      updateFilter(filterRef.current);
      updateFilter(mobileFilterRef.current);
      
      // Also try querying by ID as fallback for mobile
      if (isMobile) {
        const mobileFilterById = document.getElementById('ramin-electric-displace-mobile') as SVGFilterElement;
        if (mobileFilterById) {
          updateFilter(mobileFilterById);
        }
      }
    });
  }, [chaos, isMobile]);

  return (
    <div className="electric-border-wrapper">
      <main className="main-container">
        <svg className="svg-container">
          <defs>
            {/* Desktop filter */}
            <filter 
              ref={filterRef} 
              id="ramin-electric-displace" 
              colorInterpolationFilters="sRGB" 
              x="-20%" 
              y="-20%" 
              width="140%" 
              height="140%"
            >
              <feTurbulence type="turbulence" baseFrequency="0.018" numOctaves="8" result="noise1" seed="3" />
              <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
                <animate 
                  attributeName="dy" 
                  values="650; 0" 
                  dur="6s" 
                  repeatCount="indefinite" 
                  calcMode="linear" 
                  begin="-1.8s" 
                />
              </feOffset>
              <feTurbulence type="turbulence" baseFrequency="0.018" numOctaves="8" result="noise2" seed="3" />
              <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
                <animate 
                  attributeName="dy" 
                  values="0; -650" 
                  dur="6s" 
                  repeatCount="indefinite" 
                  calcMode="linear" 
                  begin="-4.2s" 
                />
              </feOffset>
              <feTurbulence type="turbulence" baseFrequency="0.022" numOctaves="9" result="noise3" seed="5" />
              <feOffset in="noise3" dx="0" dy="0" result="offsetNoise3">
                <animate 
                  attributeName="dx" 
                  values="520; 0" 
                  dur="6s" 
                  repeatCount="indefinite" 
                  calcMode="linear" 
                  begin="-3s" 
                />
              </feOffset>
              <feTurbulence type="turbulence" baseFrequency="0.022" numOctaves="9" result="noise4" seed="5" />
              <feOffset in="noise4" dx="0" dy="0" result="offsetNoise4">
                <animate 
                  attributeName="dx" 
                  values="0; -520" 
                  dur="6s" 
                  repeatCount="indefinite" 
                  calcMode="linear" 
                  begin="-1.2s" 
                />
              </feOffset>
              <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
              <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
              <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />
              <feDisplacementMap 
                in="SourceGraphic" 
                in2="combinedNoise" 
                scale="30" 
                xChannelSelector="R" 
                yChannelSelector="B" 
              />
            </filter>
            {/* Mobile filter - smoother with lower numOctaves and reduced animation values */}
            <filter 
              ref={mobileFilterRef}
              id="ramin-electric-displace-mobile" 
              colorInterpolationFilters="sRGB" 
              x="-20%" 
              y="-20%" 
              width="140%" 
              height="140%"
            >
              <feTurbulence type="turbulence" baseFrequency="0.018" numOctaves="5" result="noise1" seed="3" />
              <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
                <animate 
                  attributeName="dy" 
                  values="300; 0" 
                  dur="6s" 
                  repeatCount="indefinite" 
                  calcMode="linear" 
                  begin="-1.8s" 
                />
              </feOffset>
              <feTurbulence type="turbulence" baseFrequency="0.018" numOctaves="5" result="noise2" seed="3" />
              <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
                <animate 
                  attributeName="dy" 
                  values="0; -300" 
                  dur="6s" 
                  repeatCount="indefinite" 
                  calcMode="linear" 
                  begin="-4.2s" 
                />
              </feOffset>
              <feTurbulence type="turbulence" baseFrequency="0.022" numOctaves="6" result="noise3" seed="5" />
              <feOffset in="noise3" dx="0" dy="0" result="offsetNoise3">
                <animate 
                  attributeName="dx" 
                  values="250; 0" 
                  dur="6s" 
                  repeatCount="indefinite" 
                  calcMode="linear" 
                  begin="-3s" 
                />
              </feOffset>
              <feTurbulence type="turbulence" baseFrequency="0.022" numOctaves="6" result="noise4" seed="5" />
              <feOffset in="noise4" dx="0" dy="0" result="offsetNoise4">
                <animate 
                  attributeName="dx" 
                  values="0; -250" 
                  dur="6s" 
                  repeatCount="indefinite" 
                  calcMode="linear" 
                  begin="-1.2s" 
                />
              </feOffset>
              <feGaussianBlur in="offsetNoise1" stdDeviation="1" result="smoothNoise1" />
              <feGaussianBlur in="offsetNoise2" stdDeviation="1" result="smoothNoise2" />
              <feGaussianBlur in="offsetNoise3" stdDeviation="1" result="smoothNoise3" />
              <feGaussianBlur in="offsetNoise4" stdDeviation="1" result="smoothNoise4" />
              <feComposite in="smoothNoise1" in2="smoothNoise2" result="part1" />
              <feComposite in="smoothNoise3" in2="smoothNoise4" result="part2" />
              <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />
              <feDisplacementMap 
                in="SourceGraphic" 
                in2="combinedNoise" 
                scale="30" 
                xChannelSelector="R" 
                yChannelSelector="B" 
              />
            </filter>
          </defs>
        </svg>

        <div className="card-container-wrapper">
          <button
            className="configure-button"
            onClick={() => setIsConfigOpen(!isConfigOpen)}
            aria-label="Configure"
          >
            <svg data-testid="geist-icon" height="16" strokeLinejoin="round" style={{ color: 'currentColor' }} viewBox="0 0 16 16" width="16">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.75 5.5C11.7165 5.5 12.5 4.7165 12.5 3.75C12.5 2.7835 11.7165 2 10.75 2C9.7835 2 9 2.7835 9 3.75C9 4.7165 9.7835 5.5 10.75 5.5ZM10.75 0.75C12.1479 0.75 13.3225 1.70608 13.6555 3H15.25H16V4.5H15.25H13.6555C13.3225 5.79392 12.1479 6.75 10.75 6.75C9.35212 6.75 8.17754 5.79392 7.84451 4.5H0.75H0V3H0.75H7.84451C8.17754 1.70608 9.35212 0.75 10.75 0.75ZM15.25 13H16V11.5H15.25L8.15549 11.5C7.82245 10.2061 6.64788 9.25 5.25 9.25C3.85212 9.25 2.67755 10.2061 2.34451 11.5H0.75H0V13H0.75H2.34451C2.67755 14.2939 3.85212 15.25 5.25 15.25C6.64788 15.25 7.82246 14.2939 8.15549 13L15.25 13ZM7 12.2513C7 12.2509 7 12.2504 7 12.25C7 12.2496 7 12.2491 7 12.2487C6.99929 11.2828 6.21606 10.5 5.25 10.5C4.2835 10.5 3.5 11.2835 3.5 12.25C3.5 13.2165 4.2835 14 5.25 14C6.21606 14 6.99929 13.2172 7 12.2513Z" fill="currentColor"></path>
            </svg>
          </button>

          {isConfigOpen && (
            <div className="config-panel">
          <div className="config-control">
            <label className="config-label">Electric Border Color</label>
            <div className="color-picker-wrapper">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="color-picker"
              />
              <div className="color-preview" style={{ backgroundColor: color }}></div>
            </div>
          </div>

          <div className="config-control">
            <label className="config-label">Speed: {speed}s</label>
            <div className="slider-wrapper">
              <input
                type="range"
                min="1"
                max="12"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="slider"
              />
              <div className="slider-fill" style={{ width: `${(speed / 12) * 100}%` }}></div>
              <div className="slider-handle" style={{ left: `calc(${(speed / 12) * 100}% - 9px)` }}></div>
            </div>
          </div>

          <div className="config-control">
            <label className="config-label">Chaos: {chaos}</label>
            <div className="slider-wrapper">
              <input
                type="range"
                min="0"
                max="100"
                value={chaos}
                onChange={(e) => setChaos(Number(e.target.value))}
                className="slider"
              />
              <div className="slider-fill" style={{ width: `${chaos}%` }}></div>
              <div className="slider-handle" style={{ left: `calc(${chaos}% - 9px)` }}></div>
            </div>
          </div>
        </div>
      )}

          <div className="card-container">
        <div className="inner-container">
          <div className="border-outer">
            <div className="main-card"></div>
          </div>
          <div className="glow-layer-1"></div>
          <div className="glow-layer-2"></div>
        </div>

        <div className="overlay-1"></div>
        <div className="overlay-2"></div>
        <div className="background-glow"></div>

        <div className="content-container">
          <div className="content-top">
            <div className="badge-pill">
              Eye-catching
            </div>
            <p className="title">Electric Border</p>
          </div>

          <hr className="divider" />

          <div className="content-bottom">
            <p className="description">In case subtle wasn&apos;t the goal.</p>
          </div>
        </div>
      </div>
        </div>
    </main>
    </div>
  );
}

