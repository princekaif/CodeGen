import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';

// Import themes
import { githubDark, githubLight } from '@uiw/codemirror-theme-github';
import { bespin } from '@uiw/codemirror-theme-bespin';
import { duotoneDark, duotoneLight } from '@uiw/codemirror-theme-duotone';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { xcodeDark, xcodeLight } from '@uiw/codemirror-theme-xcode';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { okaidia } from '@uiw/codemirror-theme-okaidia';

// Import languages
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';

// Import autocomplete and basic setup
import { autocompletion, CompletionContext } from '@codemirror/autocomplete';
import { indentUnit } from '@codemirror/language';
import { EditorState } from '@codemirror/state';

const API_KEY = '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'; // Replace with your actual OpenAI API key

const fetchSuggestions = async (input) => {
  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',  // Ensure this is a valid model
        prompt: input,
        max_tokens: 50,
        n: 1,
        stop: null,
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    // Ensure data and choices are defined before calling .map
    if (data.choices && data.choices.length > 0) {
      return data.choices.map(choice => choice.text.trim()).filter(text => text);
    } else {
      console.error("No choices in response:", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
};

const CodeEditor = ({ currentLanguage, currentTheme, currentCode, setCurrentCode }) => {
  const [theme, setTheme] = useState(githubDark);
  const [language, setLanguage] = useState(javascript);

  useEffect(() => {
    if (currentLanguage === 'cpp') setLanguage(cpp);
    if (currentLanguage === 'java') setLanguage(java);
    if (currentLanguage === 'javascript') setLanguage(javascript);
    if (currentLanguage === 'python') setLanguage(python);
  }, [currentLanguage]);

  useEffect(() => {
    if (currentTheme === 'githubDark') setTheme(githubDark);
    if (currentTheme === 'githubLight') setTheme(githubLight);
    if (currentTheme === 'bespin') setTheme(bespin);
    if (currentTheme === 'duotoneDark') setTheme(duotoneDark);
    if (currentTheme === 'duotoneLight') setTheme(duotoneLight);
    if (currentTheme === 'dracula') setTheme(dracula);
    if (currentTheme === 'xcodeDark') setTheme(xcodeDark);
    if (currentTheme === 'xcodeLight') setTheme(xcodeLight);
    if (currentTheme === 'vscodeDark') setTheme(vscodeDark);
    if (currentTheme === 'okaidia') setTheme(okaidia);
  }, [currentTheme]);

  let timeoutId;
  const getCompletion = async (context) => {
    clearTimeout(timeoutId);  // Clear previous timeout
    timeoutId = setTimeout(async () => {
      const input = context.matchBefore(/\w*$/);
      if (!input) return null;
  
      const suggestions = await fetchSuggestions(input.text);
      return {
        from: input.from,
        to: input.to,
        options: suggestions.map(suggestion => ({ label: suggestion, type: 'keyword' })),
      };
    }, 500);  // Wait for 500ms after the user stops typing
  };
  

  return (
    <CodeMirror
      value={currentCode}
      height="100%"
      theme={theme}
      extensions={[
        language,
        indentUnit.of('        '),
        EditorState.tabSize.of(8),
        autocompletion({
          override: [getCompletion],
        }), // Enable autocompletion with custom fetch
      ]}
      onChange={(value) => setCurrentCode(value)}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLineGutter: true,
        highlightSpecialChars: true,
        history: true,
        foldGutter: true,
        drawSelection: true,
        dropCursor: true,
        allowMultipleSelections: true,
        indentOnInput: true,
        syntaxHighlighting: true,
        bracketMatching: true,
        closeBrackets: true,
        autocompletion: true, // Enable autocompletion in basic setup
        rectangularSelection: true,
        crosshairCursor: true,
        highlightActiveLine: true,
        highlightSelectionMatches: true,
        closeBracketsKeymap: true,
        defaultKeymap: true,
        searchKeymap: true,
        historyKeymap: true,
        foldKeymap: true,
        completionKeymap: true,
        lintKeymap: true,
      }}
    />
  );
};

export default CodeEditor;
