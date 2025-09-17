import React, { useState, useEffect } from 'react';
import { Category, Problem } from '../types';
import { BrainCircuitIcon, XIcon, ChevronDownIcon } from './icons';

interface SidebarProps {
  categories: Category[];
  activeProblemId: string | null;
  onProblemSelect: (problem: Problem) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ categories, activeProblemId, onProblemSelect, isOpen, onClose }) => {
  const [openCategories, setOpenCategories] = useState<Set<string>>(() => {
    const activeCategory = categories.find(c => c.problems.some(p => p.id === activeProblemId));
    return new Set<string>(activeCategory ? [activeCategory.name] : (categories.length > 0 ? [categories[0].name] : []));
  });

  useEffect(() => {
    // If a new problem is selected, ensure its category is open
    const activeCategory = categories.find(c => c.problems.some(p => p.id === activeProblemId));
    if (activeCategory && !openCategories.has(activeCategory.name)) {
      setOpenCategories(prev => new Set(prev).add(activeCategory.name));
    }
  }, [activeProblemId, categories, openCategories]);

  const toggleCategory = (categoryName: string) => {
    setOpenCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-gray-900/60 z-30 lg:hidden transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 p-4 border-r border-gray-700 flex flex-col z-40 lg:static lg:z-auto lg:w-full lg:translate-x-0 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <BrainCircuitIcon className="w-8 h-8 text-blue-accent mr-2" />
            <h1 className="text-xl font-bold text-gray-200">DSA Practice</h1>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 text-gray-400 hover:text-white" aria-label="Close sidebar">
              <XIcon className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-grow overflow-y-auto pr-2">
          {categories.map((category) => {
            const isCategoryOpen = openCategories.has(category.name);
            return (
              <div key={category.name} className="mb-3">
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="w-full flex items-center justify-between text-sm font-medium text-gray-300 px-2 py-2 rounded-md hover:bg-gray-700/50 transition-colors"
                  aria-expanded={isCategoryOpen}
                >
                  <span>{category.name}</span>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      isCategoryOpen ? '' : '-rotate-90'
                    }`}
                  />
                </button>
                {isCategoryOpen && (
                  <ul className="mt-1 space-y-1">
                    {category.problems.map((problem) => (
                      <li key={problem.id}>
                        <button
                          onClick={() => onProblemSelect(problem)}
                          className={`w-full text-left pl-6 pr-2 py-2 rounded-md text-sm transition-colors ${
                            activeProblemId === problem.id
                              ? 'bg-gray-700 text-white'
                              : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                          }`}
                        >
                          {problem.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;