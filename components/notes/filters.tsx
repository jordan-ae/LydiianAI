import React, { useState } from 'react';
import { Folder, Search, Calendar, Edit, User } from 'lucide-react';

const Filters = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('');

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const filters = [
    { name: 'Collections', icon: <Folder className="w-4 h-4 mr-2" /> },
    { name: 'Contains', icon: <Search className="w-4 h-4 mr-2" /> },
    { name: 'Date', icon: <Calendar className="w-4 h-4 mr-2" /> },
    { name: 'Edited by', icon: <Edit className="w-4 h-4 mr-2" /> },
    { name: 'Created by', icon: <User className="w-4 h-4 mr-2" /> },
  ];

  return (
    <div className="flex space-x-2">
      {filters.map((filter, index) => (
        <div
          key={index}
          className="flex items-center px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer"
          onClick={() => handleFilterClick(filter.name)}
        >
          {filter.icon}
          {filter.name}
        </div>
      ))}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">{activeFilter} Filter</h2>
            <p>Modal content for {activeFilter} filter goes here.</p>
            <button
              className="mt-4 px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters; 