import React from 'react'

const FloatingParticles = () => {
    return (
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 h-2 w-2 rounded-full bg-primary/40 animate-pulse" />
            <div className="absolute top-40 right-20 h-1 w-1 rounded-full bg-secondary/50 animate-ping" />
            <div className="absolute bottom-40 left-20 h-1.5 w-1.5 rounded-full bg-accent/40 animate-bounce" />
            <div className="absolute top-60 left-1/3 h-1 w-1 rounded-full bg-primary/30 animate-pulse" />
            <div className="absolute bottom-20 right-1/3 h-2 w-2 rounded-full bg-secondary/40 animate-ping" />
            <div className="absolute top-80 right-1/4 h-1.5 w-1.5 rounded-full bg-accent/30 animate-float" />
            <div className="absolute bottom-60 left-1/4 h-1 w-1 rounded-full bg-primary/25 animate-pulse" />
        </div>
    )
}

export default FloatingParticles
