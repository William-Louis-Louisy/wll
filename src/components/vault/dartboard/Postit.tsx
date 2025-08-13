import React from "react";

export default function Postit({ count = 0 }) {
  // Générer les groupes de 5 encoches en grille
  const generateTallyMarks = (total: number) => {
    if (total === 0) return null;

    const groups = Math.floor(total / 5);
    const remainder = total % 5;
    const marks = [];

    // Configuration de la grille (ex: 4 colonnes)
    const cols = 4;
    const groupWidth = 20;
    const groupHeight = 25;

    // Ajouter les groupes complets de 5
    for (let i = 0; i < groups; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const x = col * (groupWidth + 5);
      const y = row * (groupHeight + 5);

      marks.push(
        <g key={`group-${i}`} transform={`translate(${x}, ${y})`}>
          {/* 4 traits verticaux */}
          <line x1="2" y1="2" x2="2" y2="18" stroke="#333" strokeWidth="1.5" />
          <line x1="6" y1="2" x2="6" y2="18" stroke="#333" strokeWidth="1.5" />
          <line
            x1="10"
            y1="2"
            x2="10"
            y2="18"
            stroke="#333"
            strokeWidth="1.5"
          />
          <line
            x1="14"
            y1="2"
            x2="14"
            y2="18"
            stroke="#333"
            strokeWidth="1.5"
          />
          {/* Trait diagonal */}
          <line x1="0" y1="5" x2="16" y2="15" stroke="#333" strokeWidth="2" />
        </g>
      );
    }

    // Ajouter les traits restants dans la même grille
    if (remainder > 0) {
      const groupIndex = groups;
      const row = Math.floor(groupIndex / cols);
      const col = groupIndex % cols;
      const x = col * (groupWidth + 5);
      const y = row * (groupHeight + 5);

      for (let i = 0; i < remainder; i++) {
        marks.push(
          <line
            key={`remainder-${i}`}
            x1={x + 2 + i * 4}
            y1={y + 2}
            x2={x + 2 + i * 4}
            y2={y + 18}
            stroke="#333"
            strokeWidth="1.5"
          />
        );
      }
    }

    return marks;
  };

  // Calculer les dimensions nécessaires pour le SVG
  const cols = 4;
  const totalGroups = Math.ceil(count / 5);
  const rows = Math.ceil(totalGroups / cols);
  const svgWidth = Math.min(cols * 25, 110);
  const svgHeight = Math.max(rows * 30, 20);

  return (
    <div className="absolute hidden xl:block z-40 bottom-4 right-4 2xl:right-24 2xl:bottom-24">
      <div className="bg-blue-200 border-blue-300 w-32 h-32 p-3 border-2 rounded-sm shadow-lg shadow-blue-300/50 transform rotate-1 relative">
        <div className="h-full flex items-center justify-center">
          {count > 0 && (
            <svg
              width={svgWidth}
              height={Math.min(svgHeight, 100)}
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="mx-auto"
            >
              {generateTallyMarks(count)}
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
