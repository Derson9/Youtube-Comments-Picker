import React from 'react';
import Header from './components/Header';
import CommentPicker from './components/CommentPicker';
import { CommentsProvider } from './context/CommentsContext';
import { ThemeProvider } from './context/ThemeContext';
import { Github } from 'lucide-react';

function App() {
  return (
    <ThemeProvider>
      <CommentsProvider>
        <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2740%27%20height%3D%2740%27%20viewBox%3D%270%200%2040%2040%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M0%200c5.6%200%2010%204.4%2010%2010V0h10c0%205.6-4.4%2010-10%2010H0V0zm0%2020c5.6%200%2010%204.4%2010%2010V20h10c0%205.6-4.4%2010-10%2010H0V20zm20-10c5.6%200%2010%204.4%2010%2010V10h10c0%205.6-4.4%2010-10%2010H20V10z%27%20fill%3D%27%23000%27%20fill-opacity%3D%270.08%27%20fill-rule%3D%27evenodd%27%2F%3E%3C%2Fsvg%3E')] opacity-50 dark:opacity-10 pointer-events-none bg-[length:40px_40px]"></div>
          <Header />
          <main className="container mx-auto px-4 py-8 relative">
            <CommentPicker />
          </main>
          <footer className="bg-gray-100 dark:bg-gray-800 py-6 text-center text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200 relative">
            <p>© {new Date().getFullYear()} YouTube Comment Picker. HamzaALthaher, All rights reserved.</p>
            <a 
              href="https://github.com/Derson9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
            >
              <Github size={18} />
              <span>Derson9</span>
            </a>
          </footer>
        </div>
      </CommentsProvider>
    </ThemeProvider>
  );
}

export default App;