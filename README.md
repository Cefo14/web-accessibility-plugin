# Web Accessibility Plugin

> A simple, lightweight accessibility plugin alternative. Easy to integrate with customizable text options, visual filters, and navigation tools.

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## 🌟 Features

- **🔤 Font Customization**: Adjust font size, weight, spacing, and line height to improve readability
- **🎨 Visual Filters**: Apply filters to reduce visual fatigue with brightness, contrast, saturation, and sepia adjustments
- **📄 Content Highlighting**: Highlight headings and links to improve navigation and content scanning
- **🖼️ Image Controls**: Hide images to reduce distractions and focus on text content
- **⚡ Easy Integration**: Simple to implement in any website with minimal configuration required
- **🪶 Lightweight**: Only 58KB minified (20KB gzipped) - minimal impact on your website's performance
- **🔓 Open Source**: Free and open source under GPL-3.0 license

## 🚀 Quick Start

### CDN Installation (Recommended)

Include the plugin via CDN and initialize it in your HTML:

```html
<!-- 1. Include the CDN script -->
<script src="https://cdn.jsdelivr.net/gh/Cefo14/web-accessibility-plugin@master/release/web-accessibility-plugin.min.cjs.js"></script>

<!-- 2. Add a container element -->
<div id="accessibility-root"></div>

<!-- 3. Initialize the plugin -->
<script>
  window.addEventListener('load', function () {
    if (typeof window.WebAccessibilityPlugin === 'undefined') return;
    var container = document.getElementById('accessibility-root');
    var webAccessibilityPlugin = new window.WebAccessibilityPlugin(container);
    webAccessibilityPlugin.render();
  });
</script>
```

## 📖 Usage Examples

### Basic HTML Implementation

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Accessible Website</title>
</head>
<body>
  <div id="content">
    <h1>Welcome to my website</h1>
    <p>This content will be enhanced with accessibility features.</p>
  </div>
  
  <!-- Accessibility plugin container -->
  <div id="accessibility-root"></div>
  
  <script src="https://cdn.jsdelivr.net/gh/Cefo14/web-accessibility-plugin@master/release/web-accessibility-plugin.min.cjs.js"></script>
  <script>
    window.addEventListener('load', function () {
      if (typeof window.WebAccessibilityPlugin === 'undefined') return;
      var container = document.getElementById('accessibility-root');
      var plugin = new window.WebAccessibilityPlugin(container);
      plugin.render();
    });
  </script>
</body>
</html>
```

## 🔧 Development

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Setup

```bash
# Clone the repository
git clone https://github.com/Cefo14/web-accessibility-plugin.git
cd web-accessibility-plugin

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Build as module/library
pnpm build:module
```

### Project Structure

```text
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── helpers/            # Utility functions
├── i18n/              # Internationalization
├── styles/            # CSS modules and global styles
├── types/             # TypeScript type definitions
└── WebAccessibilityPlugin/  # Main plugin component
```

### Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm build:module` - Build as library module
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues

## 🤝 Contributing

We welcome contributions! Feel free to submit issues or pull requests. Please follow these guidelines:

1. Fork the repository
2. Create a new branch for your feature or fix
3. Make your changes and commit them
4. Push to your fork and submit a pull request

## 📄 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [GitHub Repository](https://github.com/Cefo14/web-accessibility-plugin)
- [Issues](https://github.com/Cefo14/web-accessibility-plugin/issues)
- [Live Demo](https://cefo14.github.io/web-accessibility-plugin/)

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/Cefo14/web-accessibility-plugin/issues) for existing solutions
2. Create a new issue if your problem isn't already addressed
3. Contact the maintainer: <cefo14@protonmail.com>

---

Made with ❤️ by [Cefo14](https://github.com/Cefo14)
