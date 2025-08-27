import React from 'react'

const FloatingParticles = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute top-20 left-10 h-2 w-2 rounded-full bg-primary/60 animate-pulse shadow-lg shadow-primary/30" />
            <div className="absolute top-40 right-20 h-1 w-1 rounded-full bg-secondary/70 animate-ping shadow-md shadow-secondary/40" />
            <div className="absolute bottom-40 left-20 h-1.5 w-1.5 rounded-full bg-accent/60 animate-bounce shadow-lg shadow-accent/30" />
            <div className="absolute top-60 left-1/3 h-1 w-1 rounded-full bg-primary/50 animate-pulse shadow-md shadow-primary/30" />
            <div className="absolute bottom-20 right-1/3 h-2 w-2 rounded-full bg-secondary/60 animate-ping shadow-lg shadow-secondary/30" />
            <div className="absolute top-80 right-1/4 h-1.5 w-1.5 rounded-full bg-accent/50 animate-bounce shadow-md shadow-accent/40" />
            <div className="absolute bottom-60 left-1/4 h-1 w-1 rounded-full bg-primary/45 animate-pulse shadow-sm shadow-primary/30" />
        </div>
    )
}

export default FloatingParticles
