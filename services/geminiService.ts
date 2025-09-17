import { GoogleGenAI, Type } from "@google/genai";
import { AIFeedback, Problem, Language, ChatMessage } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const feedbackSchema = {
    type: Type.OBJECT,
    properties: {
        isCorrect: {
            type: Type.BOOLEAN,
            description: "Whether the provided code correctly solves the problem. True if correct, false otherwise."
        },
        explanation: {
            type: Type.STRING,
            description: "A detailed but concise explanation following a strict structure: Start with a 1-2 sentence high-level summary. Then use Markdown headings for 'Logic Breakdown', 'Real-World Analogy', and 'Bugs / Improvements', with concise bullet points for details in each section."
        },
        timeComplexity: {
            type: Type.STRING,
            description: "The time complexity of the solution (e.g., O(n), O(n log n))."
        },
        spaceComplexity: {
            type: Type.STRING,
            description: "The space complexity of the solution (e.g., O(1), O(n))."
        },
        suggestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of suggestions for improving the code, even if it's correct. Focus on performance, readability, or alternative approaches."
        },
        testCaseResults: {
            type: Type.ARRAY,
            description: "The result of running the user's code against the provided example test cases.",
            items: {
                type: Type.OBJECT,
                properties: {
                    input: { type: Type.STRING, description: "The input for the test case." },
                    expected: { type: Type.STRING, description: "The expected output for the test case." },
                    actual: { type: Type.STRING, description: "The actual output from the user's code. If the code fails to run, this could be 'Syntax Error' or 'Runtime Error'." },
                    passed: { type: Type.BOOLEAN, description: "Whether the code passed this test case." }
                }
            }
        }
    }
};

export const evaluateCode = async (problem: Problem, code: string, language: Language): Promise<AIFeedback | null> => {
    const examplesString = problem.examples.map((ex, i) => `
      Example ${i + 1}:
      Input: ${ex.input}
      Output: ${ex.output}
    `).join('');

    const prompt = `
        You are an expert programming judge for a Data Structures and Algorithms platform.
        Your task is to evaluate a user's code submission for a given problem and respond ONLY with JSON. Your analysis must be accurate, concise, and to-the-point.

        **Problem Statement:**
        Title: ${problem.title}
        ${problem.statement}

        **Example Test Cases:**
        ${examplesString}

        **User's Code Submission (${language}):**
        \`\`\`${language.toLowerCase()}
        ${code}
        \`\`\`

        Please perform the following tasks and respond in the specified JSON format. Strictly adhere to the format.
        1.  **Run Test Cases**: Execute the user's code against the provided example test cases. For each, determine the 'actual' output and whether it 'passed'. If the code has syntax errors or runtime errors, reflect that in the 'actual' output.
        2.  **Determine Correctness**: Based on the test cases and your own internal analysis of edge cases, determine the overall correctness ('isCorrect'). The code is only correct if it passes all examples and common edge cases.
        3.  **Provide Explanation**: Generate a concise 'explanation' with the following strict structure, using Markdown formatting:
            -   Start with a 1-2 sentence high-level summary.
            -   Use the heading "### Logic Breakdown" followed by a concise, point-wise, step-by-step explanation of the code's logic.
            -   Use the heading "### Real-World Analogy" followed by a simple, real-world analogy for the core algorithm (e.g., explaining a hash map as a phonebook). If not applicable, state "No specific analogy applies here."
            -   Use the heading "### Bugs / Improvements" followed by a concise, point-wise list of bugs or suggestions.
        4.  **Analyze Complexity**: Determine the 'timeComplexity' and 'spaceComplexity'.
        5.  **Give Suggestions**: Provide a list of actionable 'suggestions' for improvement, which can be a summary of the "Bugs / Improvements" section.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: feedbackSchema,
            },
        });

        const jsonText = response.text.trim();
        const cleanedJson = jsonText.replace(/^```json\n?/, '').replace(/```$/, '');
        return JSON.parse(cleanedJson) as AIFeedback;
    } catch (error) {
        console.error("Error evaluating code with Gemini:", error);
        return null;
    }
};

export const getHint = async (problem: Problem, code: string, language: Language): Promise<string> => {
    const prompt = `
        You are a helpful programming tutor. A student is stuck on a DSA problem and needs a hint.
        DO NOT give away the full solution. Provide a small, targeted hint to help them make progress.

        **Problem Statement:**
        Title: ${problem.title}
        ${problem.statement}
        
        **Student's Current Code (${language}):**
        \`\`\`${language.toLowerCase()}
        ${code}
        \`\`\`

        Based on their code, what is a good next step or a concept they might be missing?
        Provide a concise hint (1-3 sentences).
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error getting hint from Gemini:", error);
        return "Sorry, I couldn't generate a hint right now. Please try again.";
    }
};


export const explainProblem = async (problem: Problem): Promise<string> => {
    const prompt = `
        You are a friendly and clear programming instructor. 
        Explain the following DSA problem in a simple, easy-to-understand way.
        Break it down into: 
        1. **Core Objective:** A single sentence explaining the main goal.
        2. **Key Requirements:** Bullet points outlining the specific rules and constraints.
        3. **A Simple Analogy:** A relatable, real-world example to make the problem's concept intuitive.
        Focus on the "what" and "why," not the "how" (the solution). Keep the entire explanation concise.

        **Problem Statement:**
        Title: ${problem.title}
        ${problem.statement}
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error explaining problem with Gemini:", error);
        return "Sorry, I couldn't generate an explanation right now. Please try again.";
    }
};

export const getChatResponse = async (problem: Problem, code: string, language: Language, chatHistory: ChatMessage[]): Promise<string> => {
    const formattedHistory = chatHistory.map(msg => `${msg.role === 'user' ? 'User' : 'AI Tutor'}: ${msg.content}`).join('\n');

    const prompt = `You are a friendly and encouraging AI programming tutor. Your goal is to help the user understand the problem and their own code better through a Socratic conversation.
- Ask guiding questions to help them arrive at the solution themselves.
- If the user explicitly asks for code or a solution, provide a complete, runnable code solution in the user's currently selected language.
- **IMPORTANT**: Always wrap any code in a Markdown code block with the correct language identifier (e.g., \`\`\`python, \`\`\`javascript).
- Keep your responses concise, structured (use bullet points), and easy to understand.
- You are aware of the problem statement and the user's current code.

**CONTEXT:**
---
**Problem:** ${problem.title}
${problem.statement}
**User's Code (${language}):**
\`\`\`${language.toLowerCase()}
${code}
\`\`\`
---
**CONVERSATION HISTORY:**
${formattedHistory}

**AI Tutor's next response:**`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error getting chat response from Gemini:", error);
        return "Sorry, I'm having trouble responding right now. Please try again.";
    }
};