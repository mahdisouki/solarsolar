const Service = require('../models/Service.model');
// Create Service
exports.createService = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Get paths for icon and main image
    const icon = req.files.icon ? req.files.icon[0].path.replace(/\\/g, '/') : null; // Get the icon path if uploaded
    const mainImagePath = req.files.mainImage ? req.files.mainImage[0].path.replace(/\\/g, '/') : null; 
    const images = req.files.images ? req.files.images.map(file => file.path.replace(/\\/g, '/')) : []; // Assuming you want to store multiple images as well

    const service = new Service({ title, description, icon, mainImage: mainImagePath, images });
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Error creating service' });
  }
};


// Get all services
exports.getServices = async (req, res) => {
  try {
    let services = await Service.find();

    // Adjust icon URLs to include the base URL
    services = services.map(service => {
      service.icon = service.icon ? `${req.protocol}://${req.get('host')}/${service.icon.replace(/\\/g, '/')}` : null;
      return service;
    });

    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching services' });
  }
};

// Get service by ID
exports.getServiceById = async (req, res) => {
  try {
    const { id } = req.params; 
    const service = await Service.findById(id); 

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    service.icon = service.icon ? `${req.protocol}://${req.get('host')}/${service.icon.replace(/\\/g, '/')}` : null;
    service.mainImage = service.mainImage ? `${req.protocol}://${req.get('host')}/${service.mainImage.replace(/\\/g, '/')}` : null; // Add this line for main image
    res.status(200).json(service);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching service' });
  }
};

