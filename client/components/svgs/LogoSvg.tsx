
import React from 'react'

const LogoSvg = () => {
    return (
        <svg className = "logo-svg" viewBox="0 0 317 210" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="96.7731" y="5" width="70.48" height="188.697" transform="rotate(28.0637 96.7731 5)" fill="#C4C4C4"/>
            <rect x="159" y="38.097" width="70.36" height="188.697" transform="rotate(-28.06 159 38.097)" fill="#C4C4C4"/>
            <ellipse cx="158.5" cy="93.5" rx="89.5" ry="61.5" fill="#C4C4C4"/>
            <path d="M97.3187 104L81 75L119.44 79.9457L147 104H97.3187Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
            <g filter="url(#filter0_b)">
                <path d="M221.743 103.892L238.507 73.2109L199.229 78.3294L171 103.733L221.743 103.892Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <filter id="filter0_b" x="166.498" y="68.4984" width="76.51" height="39.9475" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feGaussianBlur in="BackgroundImage" stdDeviation="2"/>
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur" result="shape"/>
            </filter>
            </defs>
        </svg>
    )
}

export default LogoSvg