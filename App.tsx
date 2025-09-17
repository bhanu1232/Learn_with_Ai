import React, { useState, useCallback, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import EditorPanel from './components/EditorPanel';
import AiPanel from './components/AiPanel';
import OutputPanel from './components/OutputPanel';
import { Problem, Language, Mode, TestResult, ChatMessage } from './types';
import { DSA_PROBLEMS, DEFAULT_CODE, ALL_PROBLEMS } from './constants';
import { evaluateCode, getHint, explainProblem, getChatResponse } from './services/geminiService';
import { MenuIcon } from './components/icons';
import { useMediaQuery } from './hooks/useMediaQuery';
import Resizer from './components/Resizer';
import HorizontalResizer from './components/HorizontalResizer';

const App: React.FC = () => {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(ALL_PROBLEMS[0]);
  const [code, setCode] = useState<string>(DEFAULT_CODE[Language.Python]);
  const [language, setLanguage] = useState<Language>(Language.Python);
  const [mode, setMode] = useState<Mode>(Mode.Learning);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isHintLoading, setIsHintLoading] = useState<boolean>(false);
  
  // Chat state
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  // Responsive state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'ai'>('editor');

  // Panel resizing state
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [sidebarWidth, setSidebarWidth] = useState(288);
  const [aiPanelWidth, setAiPanelWidth] = useState(448);
  const [outputPanelHeight, setOutputPanelHeight] = useState(350);
  const verticalResizerRef = useRef<null | 'sidebar' | 'ai'>(null);
  const horizontalResizerRef = useRef(false);

  useEffect(() => {
    if (selectedProblem) {
      setCode(DEFAULT_CODE[language]);
      setTestResult(null);
      setAiExplanation(null);
      setChatHistory([]);
      setMobileView('editor');
    }
  }, [selectedProblem, language]);

  const handleProblemSelect = useCallback((problem: Problem) => {
    setSelectedProblem(problem);
    setIsSidebarOpen(false);
  }, []);

  const handleLanguageChange = useCallback((lang: Language) => {
    setLanguage(lang);
  }, []);

  const handleRunTest = async () => {
    if (!selectedProblem || !code) return;
    setIsLoading(true);
    setTestResult(null);
    setAiExplanation(null);
    const feedback = await evaluateCode(selectedProblem, code, language);
    setTestResult({
      status: feedback ? (feedback.isCorrect ? 'Pass' : 'Fail') : 'Error',
      feedback: feedback ?? null,
    });
    setIsLoading(false);
    setMobileView('ai');
  };

  const handleGetHint = async () => {
    if (!selectedProblem || !code) return;
    setIsHintLoading(true);
    setTestResult(null);
    setAiExplanation(null);
    const hint = await getHint(selectedProblem, code, language);
    setAiExplanation(hint);
    setIsHintLoading(false);
    setMobileView('ai');
  };

  const handleExplainProblem = async () => {
    if (!selectedProblem) return;
    setIsHintLoading(true);
    setTestResult(null);
    setAiExplanation(null);
    const explanation = await explainProblem(selectedProblem);
    setAiExplanation(explanation);
    setIsHintLoading(false);
    setMobileView('ai');
  };

  const handleSendMessage = async (message: string) => {
    if (!selectedProblem) return;
    const newHistory: ChatMessage[] = [...chatHistory, { role: 'user', content: message }];
    setChatHistory(newHistory);
    setIsChatLoading(true);
    const aiResponse = await getChatResponse(selectedProblem, code, language, newHistory);
    setChatHistory(prevHistory => [...prevHistory, { role: 'model', content: aiResponse }]);
    setIsChatLoading(false);
  };

  // --- Vertical Resizing Logic ---
  const handleMouseMoveVertical = useCallback((e: MouseEvent) => {
    if (verticalResizerRef.current === 'sidebar') {
      let newWidth = e.clientX;
      if (newWidth < 220) newWidth = 220;
      if (newWidth > 500) newWidth = 500;
      setSidebarWidth(newWidth);
    } else if (verticalResizerRef.current === 'ai') {
      let newWidth = window.innerWidth - e.clientX;
      if (newWidth < 320) newWidth = 320;
      if (newWidth > 800) newWidth = 800;
      setAiPanelWidth(newWidth);
    }
  }, []);

  const handleMouseUpVertical = useCallback(() => {
    verticalResizerRef.current = null;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    document.removeEventListener('mousemove', handleMouseMoveVertical);
    document.removeEventListener('mouseup', handleMouseUpVertical);
  }, [handleMouseMoveVertical]);

  const handleMouseDownVertical = useCallback((resizer: 'sidebar' | 'ai') => {
    verticalResizerRef.current = resizer;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', handleMouseMoveVertical);
    document.addEventListener('mouseup', handleMouseUpVertical);
  }, [handleMouseMoveVertical, handleMouseUpVertical]);


  // --- Horizontal Resizing Logic ---
  const handleMouseMoveHorizontal = useCallback((e: MouseEvent) => {
    if (!horizontalResizerRef.current) return;
    let newHeight = e.clientY;
    const mainRect = document.querySelector('main')?.getBoundingClientRect();
    if (mainRect) {
        newHeight = e.clientY - mainRect.top;
    }
    if (newHeight < 150) newHeight = 150;
    const maxHeight = (mainRect?.height || window.innerHeight) - 200;
    if (newHeight > maxHeight) newHeight = maxHeight;
    setOutputPanelHeight(newHeight);
  }, []);

  const handleMouseUpHorizontal = useCallback(() => {
    horizontalResizerRef.current = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    document.removeEventListener('mousemove', handleMouseMoveHorizontal);
    document.removeEventListener('mouseup', handleMouseUpHorizontal);
  }, [handleMouseMoveHorizontal]);
  
  const handleMouseDownHorizontal = useCallback(() => {
    horizontalResizerRef.current = true;
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', handleMouseMoveHorizontal);
    document.addEventListener('mouseup', handleMouseUpHorizontal);
  }, [handleMouseMoveHorizontal, handleMouseUpHorizontal]);


  if (isDesktop) {
    return (
      <div className="flex h-screen w-screen bg-gray-900 text-gray-200 flex-row overflow-hidden">
        <div style={{ width: `${sidebarWidth}px` }} className="h-full flex-shrink-0">
          <Sidebar
            categories={DSA_PROBLEMS}
            activeProblemId={selectedProblem?.id || null}
            onProblemSelect={handleProblemSelect}
            isOpen={true}
            onClose={() => {}}
          />
        </div>
        <Resizer onMouseDown={() => handleMouseDownVertical('sidebar')} />
        <main className="flex-1 flex flex-row min-w-0">
          <div className="flex-1 min-w-0 h-full flex">
            <EditorPanel
              problem={selectedProblem}
              code={code}
              onCodeChange={setCode}
              language={language}
              onLanguageChange={handleLanguageChange}
              mode={mode}
              onModeChange={setMode}
              onRunTest={handleRunTest}
              onGetHint={handleGetHint}
              isLoading={isLoading}
              onExplainProblem={handleExplainProblem}
            />
          </div>
          <Resizer onMouseDown={() => handleMouseDownVertical('ai')} />
          <div style={{ width: `${aiPanelWidth}px` }} className="h-full flex-shrink-0 flex flex-col">
              <div style={{ height: `${outputPanelHeight}px` }} className="flex-shrink-0 overflow-hidden">
                <OutputPanel
                    testResult={testResult}
                    aiExplanation={aiExplanation}
                    isLoading={isLoading}
                    isHintLoading={isHintLoading}
                />
              </div>
              <HorizontalResizer onMouseDown={handleMouseDownHorizontal} />
              <div className="flex-1 min-h-0">
                <AiPanel
                    chatHistory={chatHistory}
                    isChatLoading={isChatLoading}
                    onSendMessage={handleSendMessage}
                />
              </div>
          </div>
        </main>
      </div>
    );
  }

  // Mobile Layout
  return (
    <div className="flex h-screen w-screen bg-gray-900 text-gray-200 flex-col overflow-hidden">
      <header className="flex-shrink-0 flex items-center justify-between p-2 border-b border-gray-700 bg-gray-800 z-20">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-md hover:bg-gray-700"
          aria-label="Open problem list"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
        <div className="flex bg-gray-700 rounded-md p-0.5">
          <button
            onClick={() => setMobileView('editor')}
            className={`px-4 py-1 text-sm rounded-md transition-colors ${mobileView === 'editor' ? 'bg-gray-900 text-gray-200 shadow' : 'text-gray-400'}`}
          >
            Editor
          </button>
          <button
            onClick={() => setMobileView('ai')}
            className={`px-4 py-1 text-sm rounded-md transition-colors ${mobileView === 'ai' ? 'bg-gray-900 text-gray-200 shadow' : 'text-gray-400'}`}
          >
            AI Result
          </button>
        </div>
        <div className="w-10"></div>
      </header>

      <Sidebar
        categories={DSA_PROBLEMS}
        activeProblemId={selectedProblem?.id || null}
        onProblemSelect={handleProblemSelect}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <main className="flex-1 flex flex-col min-w-0">
        <div className={`flex-1 min-w-0 h-full ${mobileView === 'editor' ? 'flex' : 'hidden'}`}>
          <EditorPanel
            problem={selectedProblem}
            code={code}
            onCodeChange={setCode}
            language={language}
            onLanguageChange={handleLanguageChange}
            mode={mode}
            onModeChange={setMode}
            onRunTest={handleRunTest}
            onGetHint={handleGetHint}
            isLoading={isLoading}
            onExplainProblem={handleExplainProblem}
          />
        </div>
        <div className={`w-full h-full flex-shrink-0 flex flex-col ${mobileView === 'ai' ? 'flex' : 'hidden'}`}>
            <div className="h-1/2 flex-shrink-0 border-b border-gray-700">
                <OutputPanel
                    testResult={testResult}
                    aiExplanation={aiExplanation}
                    isLoading={isLoading}
                    isHintLoading={isHintLoading}
                />
            </div>
            <div className="flex-1 min-h-0">
                <AiPanel
                    chatHistory={chatHistory}
                    isChatLoading={isChatLoading}
                    onSendMessage={handleSendMessage}
                />
            </div>
        </div>
      </main>
    </div>
  );
};

export default App;