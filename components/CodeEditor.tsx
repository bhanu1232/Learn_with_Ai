import React, { useEffect, useRef } from 'react';
import { Language } from '../types';

// Ace editor is loaded from a CDN script in index.html, so we declare it globally.
declare const ace: any;

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: Language;
}

const languageToMode: Record<Language, string> = {
  [Language.Python]: 'python',
  [Language.JavaScript]: 'javascript',
  [Language.Java]: 'java',
  [Language.CPP]: 'c_cpp',
};

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, language }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const aceEditorRef = useRef<any>(null);

  useEffect(() => {
    if (editorRef.current) {
      const editor = ace.edit(editorRef.current);
      aceEditorRef.current = editor;
      
      ace.require('ace/ext/language_tools');

      editor.setTheme("ace/theme/tomorrow_night");
      editor.session.setMode(`ace/mode/${languageToMode[language]}`);
      editor.setValue(value, -1); // -1 moves cursor to the start
      editor.setOptions({
        fontSize: "14px",
        fontFamily: "'Fira Code', monospace",
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showPrintMargin: false,
        wrap: true,
      });
      
      editor.renderer.setShowGutter(true);

      editor.on('change', () => {
        onChange(editor.getValue());
      });

      return () => {
        editor.destroy();
      };
    }
  }, []); // Run only once on mount

  // Effect to update language mode when it changes
  useEffect(() => {
    if (aceEditorRef.current) {
      aceEditorRef.current.session.setMode(`ace/mode/${languageToMode[language]}`);
    }
  }, [language]);

  // Effect to update editor value when the external state changes (e.g., new problem selected)
  useEffect(() => {
    if (aceEditorRef.current && aceEditorRef.current.getValue() !== value) {
      aceEditorRef.current.setValue(value, 1); // 1 moves cursor to the end
    }
  }, [value]);

  return <div ref={editorRef} className="w-full h-full" />;
};

export default CodeEditor;
