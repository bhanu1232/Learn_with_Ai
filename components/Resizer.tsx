import React from 'react';

interface ResizerProps {
  onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Resizer: React.FC<ResizerProps> = ({ onMouseDown }) => {
  return (
    <div
      onMouseDown={onMouseDown}
      className="w-1.5 bg-gray-700 cursor-col-resize hover:bg-blue-accent transition-colors flex-shrink-0"
      aria-label="Resize panel"
      role="separator"
    />
  );
};

export default Resizer;
