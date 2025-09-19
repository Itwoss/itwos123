// server/routes/projects.js
const express = require('express');
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new project (admin only)
router.post('/', [auth, admin], async (req, res) => {
  try {
    const { title, description, category, imageUrl, technologies, demoUrl } = req.body;
    
    const newProject = new Project({
      title,
      description,
      category,
      imageUrl,
      technologies,
      demoUrl
    });
    
    const project = await newProject.save();
    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a project (admin only)
router.put('/:id', [auth, admin], async (req, res) => {
  try {
    const { title, description, category, imageUrl, technologies, demoUrl } = req.body;
    
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        category,
        imageUrl,
        technologies,
        demoUrl
      },
      { new: true }
    );
    
    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a project (admin only)
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json({ message: 'Project removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
