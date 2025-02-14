'use client'
interface LoaderProps {
    loader: {
        colorLoader: string;
        typeLoader: string;
        strokeWidth: string;
    }
    width: string;
    height: string;
}

export default function Loader({ loader, width, height }: LoaderProps) {
    return (
        <div className={`${width} ${height} flex flex-col items-center justify-center`}>
            <svg className='w-1/2 h-1/2' style={{ display: loader?.typeLoader === 'infinityLoader' ? 'block' : 'none' }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 300 150">
                <path
                    fill="none"
                    stroke={loader?.colorLoader}
                    strokeWidth={loader?.strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray="300 385"
                    strokeDashoffset="0"
                    d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z">
                    <animate
                        attributeName="stroke-dashoffset"
                        calcMode="spline"
                        dur="2"
                        values="685;-685"
                        keySplines="0 0 1 1"
                        repeatCount="indefinite">
                    </animate>
                </path>
            </svg>
            <svg className='w-1/2 h-1/2' style={{ display: loader?.typeLoader === 'Ripples' ? 'block' : 'none' }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 200">
                <circle
                    fill="none"
                    strokeOpacity="1"
                    stroke={loader?.colorLoader}
                    strokeWidth=".5"
                    cx="100"
                    cy="100"
                    r="0">
                    <animate
                        attributeName="r"
                        calcMode="spline"
                        dur="1"
                        values="1;80"
                        keyTimes="0;1"
                        keySplines="0 .2 .5 1"
                        repeatCount="indefinite">
                    </animate>
                    <animate
                        attributeName="stroke-width"
                        calcMode="spline"
                        dur="2"
                        values="0;25"
                        keyTimes="0;1"
                        keySplines="0 .2 .5 1"
                        repeatCount="indefinite">
                    </animate>
                    <animate
                        attributeName="stroke-opacity"
                        calcMode="spline"
                        dur="2"
                        values="1;0"
                        keyTimes="0;1"
                        keySplines="0 .2 .5 1"
                        repeatCount="indefinite">
                    </animate>
                </circle>
            </svg>
            <svg className='w-1/2 h-1/2' style={{ display: loader?.typeLoader === 'Bouncing' ? 'block' : 'none' }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 200">
                <circle
                    fill={loader?.colorLoader}
                    stroke={loader?.colorLoader}
                    strokeWidth={loader?.strokeWidth}
                    r="10"
                    cx="40"
                    cy="65">
                    <animate
                        attributeName="cy"
                        calcMode="spline"
                        dur="2"
                        values="65;135;65;"
                        keySplines=".5 0 .5 1;.5 0 .5 1"
                        repeatCount="indefinite" begin="-.4">
                    </animate>
                </circle>
                <circle
                    fill={loader?.colorLoader}
                    stroke={loader?.colorLoader}
                    strokeWidth={loader?.strokeWidth}
                    r="10"
                    cx="100"
                    cy="65">
                    <animate
                        attributeName="cy"
                        calcMode="spline"
                        dur="2"
                        values="65;135;65;"
                        keySplines=".5 0 .5 1;.5 0 .5 1"
                        repeatCount="indefinite"
                        begin="-.2">
                    </animate>
                </circle>
                <circle
                    fill={loader?.colorLoader}
                    stroke={loader?.colorLoader}
                    strokeWidth={loader?.strokeWidth}
                    r="10"
                    cx="160"
                    cy="65">
                    <animate
                        attributeName="cy"
                        calcMode="spline"
                        dur="2"
                        values="65;135;65;"
                        keySplines=".5 0 .5 1;.5 0 .5 1"
                        repeatCount="indefinite"
                        begin="0">
                    </animate>
                </circle>
            </svg>
        </div>
    )
}