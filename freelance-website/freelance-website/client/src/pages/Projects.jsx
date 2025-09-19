import React from 'react';

function Projects() {
  // Sample project data (would come from API in a real app)
  const projects = [
    {
      id: 1,
      title: 'E-commerce Website',
      category: 'Web Development',
      description: 'A full-featured online store with product listings, cart, and checkout.',
      imageUrl: 'https://via.placeholder.com/600x400',
      technologies: ['React', 'Node.js', 'MongoDB']
    },
    {
      id: 2,
      title: 'Mobile Fitness App',
      category: 'Mobile Development',
      description: 'An iOS and Android app for tracking workouts and nutrition.',
      imageUrl: 'https://via.placeholder.com/600x400',
      technologies: ['React Native', 'Firebase']
    },
    {
      id: 3,
      title: 'Corporate Website Redesign',
      category: 'UI/UX Design',
      description: 'Complete redesign of a corporate website to improve user experience.',
      imageUrl: 'https://via.placeholder.com/600x400',
      technologies: ['Figma', 'HTML/CSS', 'JavaScript']
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">My Projects</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(project => (
          <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
            <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                {project.category}
              </div>
              <h2 className="text-xl font-bold mb-2">{project.title}</h2>
              <p className="text-gray-700 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map(tech => (
                  <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                    {tech}
                  </span>
                ))}
              </div>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
