import React from 'react';
import { TestResult, TestCaseResult } from '../types';
import { CheckCircleIcon, XCircleIcon, BrainCircuitIcon, ClockIcon, DatabaseIcon } from './icons';

interface OutputPanelProps {
  testResult: TestResult | null;
  aiExplanation: string | null;
  isLoading: boolean;
  isHintLoading: boolean;
}

const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 p-4">
        <svg className="animate-spin h-8 w-8 text-blue-accent mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="font-semibold text-lg text-gray-300">AI is thinking...</p>
        <p className="text-sm">Analyzing your code against test cases.</p>
    </div>
);

const Section: React.FC<{ title: string, icon?: React.ReactNode, children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="border-t border-gray-700">
        <h4 className="px-4 py-2 text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2 bg-gray-900/30">
            {icon} {title}
        </h4>
        <div className="p-4">
            {children}
        </div>
    </div>
);

const TestCase: React.FC<{ result: TestCaseResult, index: number }> = ({ result, index }) => (
    <div className="bg-gray-900/50 p-3 rounded-lg">
        <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-sm text-gray-300">Test Case {index + 1}</p>
            {result.passed ? (
                <div className="flex items-center gap-1 text-green-accent text-xs font-bold">
                    <CheckCircleIcon className="w-4 h-4" /> PASS
                </div>
            ) : (
                <div className="flex items-center gap-1 text-red-accent text-xs font-bold">
                    <XCircleIcon className="w-4 h-4" /> FAIL
                </div>
            )}
        </div>
        <div className="text-xs font-fira-code space-y-1 text-gray-400">
            <p><span className="text-gray-500">Input:    </span>{result.input}</p>
            <p><span className="text-gray-500">Expected: </span>{result.expected}</p>
            <p><span className={`text-gray-500`}>Actual:   </span><span className={!result.passed ? 'text-red-accent' : ''}>{result.actual}</span></p>
        </div>
    </div>
)

const OutputPanel: React.FC<OutputPanelProps> = ({ testResult, aiExplanation, isLoading, isHintLoading }) => {
    
    const renderContent = () => {
        if (isLoading || isHintLoading) {
            return <LoadingSpinner />;
        }

        if (aiExplanation) {
           return (
            <div className="p-4 prose prose-invert prose-sm bg-gray-900/30 rounded-lg m-4">
              <h3 className="text-lg font-semibold text-blue-accent mb-2">AI Hint & Explanation</h3>
              <div className="text-gray-300 whitespace-pre-wrap">{aiExplanation}</div>
            </div>
           )
        }
    
        if (!testResult) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 p-6">
                    <BrainCircuitIcon className="w-16 h-16 mb-4 text-gray-600" />
                    <h2 className="text-xl font-semibold">Output Panel</h2>
                    <p>Your test results and hints will appear here.</p>
                </div>
            );
        }
        
        const { status, feedback } = testResult;
    
        if (!feedback) {
           return (
            <div className="flex flex-col items-center justify-center text-center text-red-400 p-6 bg-red-accent/10 rounded-lg m-4">
              <XCircleIcon className="w-12 h-12 mb-4" />
              <h2 className="text-xl font-semibold">Evaluation Error</h2>
              <p>The AI assistant failed to evaluate your code. Please try again.</p>
            </div>
          );
        }
    
        return (
          <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
            {status === 'Pass' ? (
              <div className="p-4 bg-green-accent/10">
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="w-8 h-8 text-green-accent" />
                  <h3 className="text-2xl font-bold text-green-accent">Accepted</h3>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-red-accent/10">
                <div className="flex items-center gap-3">
                  <XCircleIcon className="w-8 h-8 text-red-accent" />
                  <h3 className="text-2xl font-bold text-red-accent">Wrong Answer</h3>
                </div>
              </div>
            )}
            
            {feedback.testCaseResults && feedback.testCaseResults.length > 0 && (
                 <Section title="Test Cases">
                     <div className="space-y-2">
                        {feedback.testCaseResults.map((res, i) => <TestCase key={i} result={res} index={i} />)}
                     </div>
                 </Section>
            )}
            
            <Section title="AI Explanation">
                <div className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed prose prose-invert prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: feedback.explanation.replace(/### (.*)/g, '<h5 class="font-semibold text-gray-200 mt-3 mb-1">$1</h5>') }} />
            </Section>
    
            <Section title="Complexity Analysis">
                <div className="flex gap-6 text-sm">
                    <div className="flex items-center gap-2">
                        <ClockIcon className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="font-medium text-gray-400">Time</p>
                            <p className="font-semibold text-gray-200">{feedback.timeComplexity}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-2">
                        <DatabaseIcon className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="font-medium text-gray-400">Space</p>
                            <p className="font-semibold text-gray-200">{feedback.spaceComplexity}</p>
                        </div>
                    </div>
                </div>
            </section>
    
            {feedback.suggestions && feedback.suggestions.length > 0 && (
                <Section title="Suggestions">
                    <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                        {feedback.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                </Section>
            )}
          </div>
        );
    }
    
    return (
        <div className="w-full h-full bg-gray-800 overflow-y-auto">
            {renderContent()}
        </div>
    );
};
    
export default OutputPanel;
