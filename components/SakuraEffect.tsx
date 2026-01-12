
import React, { useEffect, useState } from 'react';

const SakuraEffect: React.FC = () => {
  const [petals, setPetals] = useState<number[]>([]);

  useEffect(() => {
    // Generate a fixed number of IDs for petals
    setPetals(Array.from({ length: 15 }, (_, i) => i));
  }, []);

  return (
    <div className="sakura-container">
      {petals.map((id) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = 5 + Math.random() * 10;
        const size = 10 + Math.random() * 15;
        return (
          <div
            key={id}
            className="sakura"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              width: `${size}px`,
              height: `${size * 0.8}px`,
            }}
          />
        );
      })}
    </div>
  );
};

export default SakuraEffect;
