export const createStarBursts = (buttonElement, count = 3) => {
    const rect = buttonElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    return Array(count).fill().map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 50;
        return {
            id: Date.now() + i,
            x: centerX,
            y: centerY,
            tx: Math.cos(angle) * distance,
            ty: Math.sin(angle) * distance
        };
    });
};