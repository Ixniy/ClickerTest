export const newParticles = Array(5).fill().map(() => ({

    id: Math.random().toString(36).substring(2, 9),
    x: Math.random() * 250 - 150, 
    y: Math.random() * 250 - 150, 
    size: Math.random() * 20 + 5,
    createdAt: Date.now(),
}));