import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import html2pdf from 'html2pdf.js';
import { FileText, Download, Sun, Moon } from 'lucide-react';

function App() {
  const [markdown, setMarkdown] = useState('# Welcome to MD to PDF Converter\n\nStart typing your markdown here...');
  const [isColorful, setIsColorful] = useState(true);

  const handleExportPDF = () => {
    const element = document.getElementById('markdown-preview');
    const opt = {
      margin: 1,
      filename: 'markdown-export.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className={`min-h-screen ${isColorful ? 'bg-gradient-to-br from-purple-50 to-blue-50' : 'bg-gray-50'}`}>
      <header className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className={`w-6 h-6 ${isColorful ? 'text-purple-600' : 'text-gray-700'}`} />
            <h1 className={`text-xl font-bold ${isColorful ? 'text-purple-600' : 'text-gray-700'}`}>
              MD to PDF Converter
            </h1>
          </div>
          <button
            onClick={() => setIsColorful(!isColorful)}
            className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
              isColorful ? 'text-purple-600' : 'text-gray-600'
            }`}
          >
            {isColorful ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <h2 className={`font-semibold ${isColorful ? 'text-purple-600' : 'text-gray-700'}`}>
                Markdown Input
              </h2>
              <button
                onClick={handleExportPDF}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-white transition-colors ${
                  isColorful
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'bg-gray-700 hover:bg-gray-800'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Export PDF</span>
              </button>
            </div>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="flex-1 p-4 rounded-lg border focus:ring-2 focus:ring-opacity-50 focus:border-transparent min-h-[500px] font-mono text-sm resize-none focus:outline-none"
              placeholder="Type your markdown here..."
            />
          </div>

          <div className="flex flex-col space-y-4">
            <h2 className={`font-semibold ${isColorful ? 'text-purple-600' : 'text-gray-700'}`}>
              Preview
            </h2>
            <div
              id="markdown-preview"
              className={`flex-1 p-8 rounded-lg border bg-white overflow-auto min-h-[500px] prose ${
                isColorful ? 'prose-purple' : 'prose-neutral'
              }`}
            >
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;