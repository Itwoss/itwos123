import React from "react";

function Projects() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">My Projects</h1>
      <p className="text-lg text-gray-600 mb-6">
        Here are some of my recent projects.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">E-commerce Website</h2>
          <p className="text-gray-600">A full-featured online store built with React and Node.js.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Portfolio Site</h2>
          <p className="text-gray-600">A responsive portfolio website for a photographer.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Mobile App</h2>
          <p className="text-gray-600">A React Native app for tracking fitness activities.</p>
        </div>
      </div>
    </div>
  );
}

export default Projects;
