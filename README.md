☕ Kawaii Coffee Cup Web Component

A delightful, responsive Kawaii-style Coffee Cup Web Component built with vanilla JavaScript and inline SVG. Just drop it into your HTML and bring a little joy to your web projects!

✨ Features

Zero Dependencies: Built entirely with vanilla JavaScript using the Web Components API (HTMLElement and Shadow DOM).

Responsive & Scalable: SVG-based design ensures perfect crispness at any size. Automatically scales down for mobile viewports.

Realistic Vapor Animation: Uses an SVG Gaussian Blur filter (<feGaussianBlur>) to create a mesmerizing, soft steam effect.

Floating Animation: The cup gently levitates with a pulsating ground shadow for a magical, 3D feel.

Interactive: Click or tap the cup to toggle a happy, squinting face animation!

Customizable Theme: Easily change the size and mug color directly via HTML attributes.

🚀 Installation & Usage

Using this component is incredibly easy. No build tools or package managers are required.

1. Include the Script

Simply link the JavaScript file in your HTML document, preferably right before the closing </body> tag.

<script src="coffee-cup-icon.js"></script>


2. Add the Tag

Once the script is loaded, you can use the <coffee-cup-icon> tag anywhere in your HTML!

<!-- Default cup -->
<coffee-cup-icon></coffee-cup-icon>


🎨 Customization

The component accepts two main attributes that you can use to customize its appearance:

size: Sets the width of the component (default is 250px).

color: Sets the fill color of the mug and its handle (default is #fef9f3).

Examples:

Matcha Green Cup (Smaller Size):

<coffee-cup-icon size="150px" color="#dce775"></coffee-cup-icon>


Pastel Pink Cup (Large Size):

<coffee-cup-icon size="300px" color="#ffcdd2"></coffee-cup-icon>


🛠️ Technical Details

Shadow DOM: The component uses an open Shadow DOM (this.attachShadow({ mode: 'open' })). This means all of the internal CSS and SVG structures are encapsulated and won't clash with the rest of your website's styles.

Reactivity: The component observes the size and color attributes. If you change these attributes dynamically via JavaScript later on, the component will automatically re-render to reflect the new values.
