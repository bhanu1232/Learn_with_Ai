import React, { useState, useRef, useCallback } from 'react';
import { Problem, Language, Mode } from '../types';
import { PlayIcon, LightbulbIcon, BookOpenIcon, BrainCircuitIcon } from './icons';
import CodeEditor from './CodeEditor';

interface EditorPanelProps {
  problem: Problem | null;
  code: string;
  onCodeChange: (code: string) => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  onRunTest: () => void;
  onGetHint: () => void;
  isLoading: boolean;
  onExplainProblem: () => void;
}

const EditorPanel: React.FC<EditorPanelProps> = ({
  problem,
  code,
  onCodeChange,
  language,
  onLanguageChange,
  mode,
  onModeChange,
  onRunTest,
  onGetHint,
  isLoading,
  onExplainProblem,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [problemPanelHeight, setProblemPanelHeight] = useState(350);
  const isResizing = useRef(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isResizing.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing.current || !containerRef.current) return;
    
    const containerTop = containerRef.current.getBoundingClientRect().top;
    let newHeight = e.clientY - containerTop;

    const minHeight = 150;
    const maxHeight = containerRef.current.offsetHeight - 200;

    if (newHeight < minHeight) newHeight = minHeight;
    if (newHeight > maxHeight) newHeight = maxHeight;

    setProblemPanelHeight(newHeight);
  }, []);

  const handleMouseUp = useCallback(() => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  if (!problem) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 text-gray-400">
        <div className="text-center">
            <BrainCircuitIcon className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <h2 className="text-2xl font-semibold">Welcome to the DSA Practice Platform</h2>
            <p>Select a problem from the list on the left to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex-1 flex flex-col bg-gray-900 overflow-hidden">
      {/* Problem Details Panel */}
      <div style={{ height: `${problemPanelHeight}px` }} className="flex-shrink-0 overflow-y-auto">
        <div className="p-4 h-full">
            <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold text-gray-200">{problem.title}</h2>
                <div className={`flex-shrink-0 ml-4 px-3 py-1 text-sm rounded-full font-medium ${
                    problem.difficulty === 'Easy' ? 'bg-green-accent/20 text-green-accent' :
                    problem.difficulty === 'Medium' ? 'bg-yellow-accent/20 text-yellow-accent' :
                    'bg-red-accent/20 text-red-accent'
                }`}>
                    {problem.difficulty}
                </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">{problem.statement}</p>
            
            <div className="space-y-3">
              {problem.examples.map((example, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-3">
                      <p className="font-semibold text-sm text-gray-300">Example {index + 1}:</p>
                      <div className="mt-2 text-sm font-fira-code text-gray-400 space-y-1">
                          <p><span className="text-gray-500">Input:</span> {example.input}</p>
                          <p><span className="text-gray-500">Output:</span> {example.output}</p>
                          {example.explanation && <p className="mt-1 text-xs text-gray-500">Explanation: {example.explanation}</p>}
                      </div>
                  </div>
              ))}
            </div>
            
            <button onClick={onExplainProblem} className="mt-3 text-sm text-blue-accent hover:underline flex items-center gap-1">
                <BookOpenIcon className="w-4 h-4" /> Explain with AI
            </button>
        </div>
      </div>

      {/* Resizer Handle */}
      <div
        onMouseDown={handleMouseDown}
        className="h-1.5 bg-gray-700 cursor-row-resize hover:bg-blue-accent transition-colors flex-shrink-0"
        aria-label="Resize editor panel"
        role="separator"
      />

      {/* Code Editor & Actions Panel */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-grow relative bg-gray-800">
            <CodeEditor
                value={code}
                onChange={onCodeChange}
                language={language}
            />
        </div>
        <div className="p-2 border-t border-gray-700 bg-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <label htmlFor="mode-select" className="text-sm text-gray-400">Mode:</label>
                    <select 
                        id="mode-select"
                        value={mode} 
                        onChange={(e) => onModeChange(e.target.value as Mode)}
                        className="bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-accent"
                    >
                        {Object.values(Mode).map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>
                 <div className="flex items-center gap-2">
                    <label htmlFor="language-select" className="text-sm text-gray-400">Language:</label>
                    <select
                        id="language-select" 
                        value={language} 
                        onChange={(e) => onLanguageChange(e.target.value as Language)}
                        className="bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-accent"
                    >
                        {Object.values(Language).map(lang => <option key={lang} value={lang}>{lang}</option>)}
                    </select>
                </div>
            </div>
            <div className="flex items-center gap-2">
              {mode === Mode.Learning && (
                <button 
                    onClick={onGetHint} 
                    disabled={isLoading}
                    className="px-4 py-2 text-sm font-semibold text-yellow-accent bg-yellow-accent/20 rounded-md flex items-center gap-2 hover:bg-yellow-accent/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <LightbulbIcon className="w-4 h-4" />
                  Hint
                </button>
              )}
              <button 
                onClick={onRunTest}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-semibold text-white bg-green-accent rounded-md flex items-center gap-2 hover:bg-opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PlayIcon className="w-4 h-4" />
                {isLoading ? 'Evaluating...' : 'Run & Test'}
              </button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default EditorPanel;