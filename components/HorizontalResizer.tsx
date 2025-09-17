import React from 'react';

interface HorizontalResizerProps {
  onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const HorizontalResizer: React.FC<HorizontalResizerProps> = ({ onMouseDown }) => {
  return (
    <div
      onMouseDown={onMouseDown}
      className="h-1.5 bg-gray-700 cursor-row-resize hover:bg-blue-accent transition-colors flex-shrink-0"
      aria-label="Resize panel"
      role="separator"
    />
  );
};

export default HorizontalResizer;
