

const fs = require('fs');
const path = require('path');

const structure = {
  "profiles": [
    "basic",
    "work",
    "development",
    "preferences",
    "relationships"
  ],
  "events": [
    "general"
  ],
  "locations": [
    "places"
  ],
  "resources": [
    "apps",
    "devices",
    "books",
    "movies",
    "videos",
    "communities",
    "music",
    "articles",
    "channels",
    "documents"
  ],
  "environment": [
    "general"
  ]
};

const baseDir = 'memory_areas';

const createFolders = (base, categories) => {
  if (!fs.existsSync(base)) {
    fs.mkdirSync(base);
  }

  for (const category in categories) {
    const categoryPath = path.join(base, category);
    if (!fs.existsSync(categoryPath)) {
      fs.mkdirSync(categoryPath);
    }

    categories[category].forEach(subcategory => {
      const subcategoryPath = path.join(categoryPath, subcategory);
      if (!fs.existsSync(subcategoryPath)) {
        fs.mkdirSync(subcategoryPath);
      }
    });
  }
};

createFolders(baseDir, structure);

console.log('Folder structure created successfully.');
