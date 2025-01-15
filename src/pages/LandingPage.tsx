import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Terminal, Zap, Globe, Moon, Sun, Save } from 'lucide-react';
import { Theme } from '../types';

interface LandingPageProps {
  theme: Theme;
  onThemeToggle: () => void;
}

export function LandingPage({ theme, onThemeToggle }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="relative z-10">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="relative inline-flex items-center justify-center p-4 mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-xl rounded-full"></div>
                <Code2 className="relative w-20 h-20 text-purple-600 animate-pulse" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full animate-bounce shadow-lg"></div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                <span className="block text-gray-900 dark:text-white">Welcome to</span>
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                  CodeVamp
                </span>
              </h1>

              <div className="relative inline-block">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25"></div>
                <div className="relative px-6 py-2 bg-white dark:bg-gray-800 rounded-lg">
                  <p className="text-lg md:text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold">
                    Developed by Aniruddh Joshi
                  </p>
                </div>
              </div>
            </div>
            
            <p className="mt-8 max-w-2xl mx-auto text-xl text-center text-gray-600 dark:text-gray-300">
              Experience the next generation of online coding. Write, compile, and execute code in multiple languages with our powerful, modern compiler.
            </p>
            
            <div className="mt-10 flex justify-center">
              <Link
                to="/editor"
                className="inline-flex items-center px-8 py-4 border-0 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Start Coding Now
                <Terminal className="ml-3 mr-1 h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the component remains the same */}
      {/* Features Section */}
      <div className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Powerful Features
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Everything you need for seamless code development
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <Feature
                icon={Code2}
                title="Multiple Languages"
                description="Support for C, C++, Java, Python, and JavaScript with intelligent syntax highlighting"
                gradient="from-purple-600 to-pink-600"
              />
              <Feature
                icon={Zap}
                title="Real-time Compilation"
                description="Lightning-fast compilation with instant feedback and error reporting"
                gradient="from-pink-600 to-purple-600"
              />
              <Feature
                icon={Globe}
                title="Modern Interface"
                description="Clean, intuitive design with dark mode support and responsive layout"
                gradient="from-purple-600 to-pink-600"
              />
              <Feature
                icon={Save}
                title="Code History"
                description="Save and access your previous code snippets with automatic version tracking"
                gradient="from-pink-600 to-purple-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2">
              <Code2 className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                CodeVamp
              </span>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <span className="text-gray-600 dark:text-gray-300 font-medium">
                Developed by Aniruddh Joshi
              </span>
              <button
                onClick={onThemeToggle}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {theme === 'dark' ? (
                  <Sun className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Moon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Feature({ icon: Icon, title, description, gradient }: {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <div className="relative group">
      <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 opacity-25 group-hover:opacity-100 transition-opacity blur"></div>
      <div className="relative p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${gradient}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
}