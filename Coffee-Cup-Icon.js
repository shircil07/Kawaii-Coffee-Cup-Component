/**
 * Kawaii Coffee Cup Custom Element
 * Version 1.0: Original 2D Vector Style + Realistic Gaussian Vapor + Heart Handle
 */
class CoffeeCupIcon extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        
        // Click interaction: Toggles the happy face
        this.addEventListener('click', () => {
            this.classList.toggle('happy');
        });
    }

    static get observedAttributes() {
        return ['size', 'color'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const size = this.getAttribute('size') || '250px';
        const color = this.getAttribute('color') || '#fef9f3'; 
        
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: inline-block;
                width: ${size};
                max-width: 100%; 
                height: auto;
                transition: width 0.3s ease;
                cursor: pointer; 
                -webkit-tap-highlight-color: transparent;
            }

            @media (max-width: 600px) {
                :host {
                    width: 180px;
                    max-width: 90vw;
                }
            }

            svg {
                width: 100%;
                height: 100%;
                display: block;
                overflow: visible; /* Allows vapor to go outside the box */
            }

            /* Cup Styles (Original 2D Flat Look) */
            .cup-fill { 
                fill: ${color}; 
                transition: fill 0.3s ease; 
            } 
            
            /* NEW: Stroke class for the heart handle */
            .handle-stroke {
                fill: none;
                stroke: ${color};
                transition: stroke 0.3s ease;
            }

            .outline { 
                fill: none; 
                stroke: var(--main-stroke, #5d4037); 
                stroke-width: 11; 
                stroke-linecap: round; 
                stroke-linejoin: round; 
            }
            .coffee-liquid { fill: #8b5a2b; stroke: var(--main-stroke, #5d4037); stroke-width: 10; }
            
            /* Face Styles */
            .eye { fill: #332211; }
            .blush { fill: #ffadad; opacity: 0.9; }
            .mouth-open { fill: #332211; transition: transform 0.2s ease; transform-origin: center;}
            .tongue { fill: #ff8a80; }
            
            .happy-eye {
                fill: none;
                stroke: #332211;
                stroke-width: 6;
                stroke-linecap: round;
                display: none; 
            }

            /* Interactive State */
            :host(.happy) .normal-eye-group { display: none; }
            :host(.happy) .happy-eye { display: block; }
            :host(.happy) .mouth-open { transform: scale(1.1) translateY(-2px); } 

            .face-group {
                animation: faceWiggle 4s infinite ease-in-out;
                transform-origin: center;
            }

            @keyframes faceWiggle {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(5px); }
            }

            /* Realistic Vapor Animation */
            .vapor {
                transform-origin: bottom center;
                opacity: 0;
                animation: vapor-flow 5s infinite cubic-bezier(0.3, 0.1, 0.3, 1);
            }

            .v-1 { animation-delay: 0s; animation-duration: 5.5s; }
            .v-2 { animation-delay: 1.8s; animation-duration: 4.8s; }
            .v-3 { animation-delay: 3.2s; animation-duration: 6.5s; }

            @keyframes vapor-flow {
                0% { 
                    transform: translateY(15px) scaleX(0.7) scaleY(0.5); 
                    opacity: 0; 
                }
                30% { 
                    opacity: 0.8; 
                }
                70% { 
                    opacity: 0.5; 
                }
                100% { 
                    transform: translateY(-110px) scaleX(1.4) scaleY(1.8); 
                    opacity: 0; 
                }
            }

            /* NEW: Floating Animation and Glossy Highlights */
            .floating-cup {
                animation: float 4s ease-in-out infinite;
                transform-origin: center;
            }

            .ground-shadow {
                fill: rgba(0, 0, 0, 0.08);
                animation: shadowPulse 4s ease-in-out infinite;
                transform-origin: center 395px;
            }

            .glass-highlight {
                fill: none;
                stroke: white;
                stroke-linecap: round;
                opacity: 0.45;
            }

            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }

            @keyframes shadowPulse {
                0%, 100% { transform: scaleX(1); opacity: 0.08; }
                50% { transform: scaleX(0.9); opacity: 0.04; }
            }
        </style>
        
        <svg viewBox="0 0 400 450" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
            <defs>
                <!-- Gaussian Blur filter for the steam -->
                <filter id="steam-blur" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="8" />
                </filter>
            </defs>

            <!-- Beautiful Blurred Steam -->
            <g filter="url(#steam-blur)">
                <path class="vapor v-1" d="M 170,140 Q 150,90 180,40 T 170,-40" fill="none" stroke="rgba(255, 255, 255, 0.85)" stroke-width="18" stroke-linecap="round" />
                <path class="vapor v-2" d="M 210,140 Q 240,80 200,30 T 220,-50" fill="none" stroke="rgba(255, 255, 255, 0.85)" stroke-width="22" stroke-linecap="round" />
                <path class="vapor v-3" d="M 190,140 Q 170,100 210,50 T 190,-30" fill="none" stroke="rgba(255, 255, 255, 0.85)" stroke-width="14" stroke-linecap="round" />
            </g>

            <!-- NEW: Ground shadow beneath the cup -->
            <ellipse cx="200" cy="395" rx="140" ry="15" class="ground-shadow" />

            <!-- NEW: Wrapping cup in floating animation group -->
            <g class="floating-cup">
                <!-- Original 2D Cup Shape -->
                <ellipse cx="200" cy="370" rx="145" ry="40" class="cup-fill" />
                <ellipse cx="200" cy="370" rx="145" ry="40" class="outline" />

                <!-- Heart-Shaped Handle (Half-Heart Silhouette) -->
                <path d="M 310,160 C 400,100 430,220 300,310" fill="none" stroke="var(--main-stroke, #5d4037)" stroke-width="42" stroke-linecap="round" />
                <path d="M 310,160 C 400,100 430,220 300,310" class="handle-stroke" stroke-width="20" stroke-linecap="round" />
                
                <!-- Heart Handle Gloss Highlight -->
                <path d="M 335,145 C 375,125 395,185 355,245" class="glass-highlight" stroke-width="6" />

                <path d="M70,140 C70,140 330,140 330,140 C330,140 330,280 320,300 C305,330 250,345 200,345 C150,345 95,330 80,300 C70,280 70,140 70,140 Z" class="cup-fill" />
                <path d="M70,140 L330,140 C330,280 330,300 320,310 C300,335 260,345 200,345 C140,345 100,335 80,310 C70,300 70,280 70,140 Z" class="outline" />
                
                <!-- NEW: Cup Body Gloss Highlight -->
                <path d="M 95,170 Q 95,250 115,310" class="glass-highlight" stroke-width="12" />
                
                <ellipse cx="200" cy="140" rx="122" ry="48" class="coffee-liquid" />

                <!-- NEW: Coffee Liquid Gloss Highlights -->
                <ellipse cx="130" cy="135" rx="20" ry="8" fill="white" opacity="0.4" transform="rotate(-10 130 135)" />
                <ellipse cx="160" cy="125" rx="6" ry="3" fill="white" opacity="0.4" transform="rotate(-10 160 125)" />

                <!-- Original Face Group -->
                <g class="face-group">
                    <g class="normal-eye-group">
                        <g>
                            <circle cx="155" cy="240" r="14" class="eye" />
                            <circle cx="150" cy="233" r="4" fill="white" />
                        </g>
                        <g>
                            <circle cx="245" cy="240" r="14" class="eye" />
                            <circle cx="240" cy="233" r="4" fill="white" />
                        </g>
                    </g>

                    <!-- Happy eyes (Hidden by default) -->
                    <path d="M142,240 Q155,225 168,240" class="happy-eye" />
                    <path d="M232,240 Q245,225 258,240" class="happy-eye" />

                    <circle cx="120" cy="260" r="15" class="blush" />
                    <!-- NEW: Cheek Sparkles -->
                    <circle cx="115" cy="256" r="3" fill="white" opacity="0.8" />
                    
                    <circle cx="280" cy="260" r="15" class="blush" />
                    <!-- NEW: Cheek Sparkles -->
                    <circle cx="275" cy="256" r="3" fill="white" opacity="0.8" />

                    <path d="M185,260 Q200,290 215,260 Z" class="mouth-open" />
                    <path d="M192,276 Q200,284 208,276 Z" class="tongue" />
                </g>
            </g>
        </svg>
        `;
    }
}

if (!customElements.get('coffee-cup-icon')) {
    customElements.define('coffee-cup-icon', CoffeeCupIcon);
}
