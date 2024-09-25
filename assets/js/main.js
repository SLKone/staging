
const desktopOffset = 200;
const mobileOffset = 88;

/**
 * Applies smooth scrolling with an offset for anchor links.
 */
function handleAnchorClick(e) {
    const targetId = e.target.getAttribute('href');
    
    if (targetId && targetId.startsWith('#')) {
        e.preventDefault();

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offset = window.innerWidth >= 768 ? desktopOffset : mobileOffset;
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
        }
    }
}

/**
 * Uses event delegation to handle anchor clicks globally.
 */
function offsetAnchorLinks() {
    document.body.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
            handleAnchorClick(e);
        }
    });
}

/**
 * Adjusts the scroll position on page load if there's an anchor in the URL.
 */
function offsetScrollOnPageLoad() {
    if (window.location.hash) {
        const targetId = window.location.hash;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Run this after the page content is fully loaded
            const offset = window.innerWidth >= 768 ? desktopOffset : mobileOffset;
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
        }
    }
}

// Call the functions after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    offsetAnchorLinks();
    offsetScrollOnPageLoad();
});


// Toggle mobile menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-navigation');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const header = document.getElementById('header'); // Get the header element

    menu.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');

    // Lock body scroll when menu is open
    if (!menu.classList.contains('hidden')) {
        document.body.style.overflow = 'hidden'; // Lock body scroll
        header.classList.add("shadow-lg", "bg-white", "dark:bg-currant");
    } else {
        document.body.style.overflow = ''; // Unlock body scroll
        // Only remove classes if the scroll position is above the threshold
        if (window.scrollY <= topThreshold) {
            header.classList.remove("shadow-lg", "bg-white", "dark:bg-currant");
        }
    }
    
    // Ensure the menu can still scroll
    menu.style.overflowY = 'auto'; // Allow vertical scrolling in the menu
}

// Scroll add shadow to header
const topThreshold = 10;

window.addEventListener("scroll", () => {
  const header = document.getElementById('header');
  if (window.scrollY > topThreshold) {
    header.classList.add("shadow-lg", "bg-white", "dark:bg-currant");
  } else {
    header.classList.remove("shadow-lg", "bg-white", "dark:bg-currant");
  }
});

// Windmap visualization
class WindMapVisualization {
    constructor(canvas) {
      // Store the canvas and context
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
  
      // Create an off-screen canvas for static streamlines
      this.staticCanvas = document.createElement('canvas');
      this.staticCtx = this.staticCanvas.getContext('2d');
  
      // Variables for animation
      this.animatedStreamlines = [];
      this.animationStarted = false;
  
      // Detect color scheme
      this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
      // Read parameters from data attributes
      this.readParameters();
  
      // Initialize Simplex Noise
      this.simplex = new SimplexNoise();
  
      // Grid variables
      this.grid = [];
      this.gridWidth = 0;
      this.gridHeight = 0;
  
      // Global array to store streamlines
      this.allStreamlines = [];
  
      // Start the visualization
      this.init();
  
      // Listen for color scheme changes
      if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
          this.isDarkMode = e.matches;
          this.readParameters();
          this.renderWindMap();
        });
      }
    }
  
    readParameters() {
      // Read data attributes from the canvas element
      const dataset = this.canvas.dataset;
  
      // Determine the suffix based on the color scheme
      const modeSuffix = this.isDarkMode ? 'Dark' : 'Light';
  
      // Helper function to read parameters with consideration of mode-specific attributes
      const getParam = (paramName, defaultValue) => {
        const modeParam = dataset[`${paramName}${modeSuffix}`];
        if (modeParam !== undefined) {
          return modeParam;
        }
        const generalParam = dataset[paramName];
        return generalParam !== undefined ? generalParam : defaultValue;
      };
  
      // Parse parameters, with default values if not specified
      this.animate = getParam('animate', 'true') !== 'false';
      this.numStreamlines = parseInt(getParam('numStreamlines', '150'), 10);
      this.numAnimated = parseInt(getParam('numAnimated', '5'), 10);
      this.numColors = parseInt(getParam('numColors', '3'), 10);
  
      const colorsParam = getParam('colors', null);
      this.colorValues = colorsParam
        ? colorsParam.split(';').map(color => color.trim())
        : [
            'rgb(0, 101, 72)',    // emerald
            'rgb(55, 123, 191)',  // navy
            'rgb(249, 166, 24)',  // tangerine
            'rgb(255, 213, 74)',  // mustard
            'rgb(242, 149, 106)', // sand
            'rgb(239, 81, 39)',   // cinnabar
            'rgb(193, 77, 108)',  // blush
            'rgb(247, 39, 143)',  // coral
            'rgb(130, 7, 118)',   // plum
          ];
  
      this.scale = parseFloat(getParam('scale', '0.00015'));
  
      // Set background color
      this.backgroundColor = 'rgba(0, 0, 0, 0)'; // Transparent background
  
      // Set streamline opacity based on data attribute or color scheme
      const dataOpacity = getParam('opacity', null);
      if (dataOpacity !== null) {
        this.streamlineOpacity = parseFloat(dataOpacity);
        if (isNaN(this.streamlineOpacity) || this.streamlineOpacity < 0 || this.streamlineOpacity > 1) {
          console.warn(`Invalid opacity value: ${dataOpacity}. Using default value.`);
          this.streamlineOpacity = this.isDarkMode ? 0.8 : 0.4;
        }
      } else {
        // Default opacity values if not specified
        this.streamlineOpacity = this.isDarkMode ? 0.8 : 0.4;
      }
  
      // Set animation speed based on data attribute or default
      const dataSpeed = getParam('speed', null);
      if (dataSpeed !== null) {
        this.speed = parseFloat(dataSpeed);
        if (isNaN(this.speed) || this.speed <= 0) {
          console.warn(`Invalid speed value: ${dataSpeed}. Using default speed.`);
          this.speed = 0.005; // Default speed
        }
      } else {
        // Default speed if not specified
        this.speed = 0.005;
      }
  
      // Streamline parameters
      this.streamlineParams = {
        stepSize: 1,          // The step size for each integration step
        maxLength: 10000,     // Maximum number of steps per streamline
        dSep: 1,              // Distance between streamlines
        gridResolution: 75,   // Controls seed point spacing
      };
  
      // Minimum streamline length
      this.MIN_STREAMLINE_LENGTH = 0; // Minimum number of points in a streamline
  
      // Randomly select colors
      this.selectedColors = this.getRandomColors(this.colorValues, this.numColors);
  
      // Debugging Logs
      console.log('Current Mode:', this.isDarkMode ? 'Dark' : 'Light');
      console.log('Animate:', this.animate);
      console.log('Number of Streamlines:', this.numStreamlines);
      console.log('Number of Animated Streamlines:', this.numAnimated);
      console.log('Selected Colors:', this.selectedColors);
      console.log('Scale:', this.scale);
      console.log('Opacity:', this.streamlineOpacity);
      console.log('Speed:', this.speed);
    }
  
    getRandomColors(palette, numColors) {
      // Validate colors
      const validColors = palette.filter(color => {
        const s = new Option().style;
        s.color = color;
        if (s.color === '') {
          console.warn(`Invalid color skipped: ${color}`);
          return false;
        }
        return true;
      });
  
      if (validColors.length < numColors) {
        console.warn(`Requested ${numColors} colors, but only ${validColors.length} are valid. Using available colors.`);
      }
  
      const shuffled = validColors.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, numColors);
    }
  
    init() {
      // Set up the canvas size
      this.resizeCanvas();
  
      // Add event listener for window resize
      window.addEventListener('resize', () => this.resizeCanvas());
    }
  
    resizeCanvas() {
      // Use clientWidth and clientHeight to get the displayed size
      this.canvas.width = this.canvas.clientWidth;
      this.canvas.height = this.canvas.clientHeight;
      this.staticCanvas.width = this.canvas.width;
      this.staticCanvas.height = this.canvas.height;
      this.renderWindMap(); // Re-render the wind map on resize
  
      if (this.animate && !this.animationStarted) {
        this.animateLoop(); // Start the animation
        this.animationStarted = true;
      }
    }
  
    renderWindMap() {
      // Clear the off-screen canvas
      this.staticCtx.fillStyle = this.backgroundColor;
      this.staticCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  
      this.initializeGrid();
      this.allStreamlines = [];
      this.generateStreamlines();
  
      console.log('Total streamlines generated:', this.allStreamlines.length);
  
      // Randomly select some streamlines to draw
      const selectedStreamlines = this.selectRandomStreamlines(this.allStreamlines, this.numStreamlines);
      this.drawStreamlines(this.staticCtx, selectedStreamlines);
  
      if (this.animate) {
        // Randomly select streamlines for animation
        this.animatedStreamlines = this.selectRandomStreamlines(this.allStreamlines, this.numAnimated).map(streamline => ({
          streamline,
          progress: Math.random(), // Start at a random progress
          speed: this.speed,        // Use the speed parameter
          color: this.selectedColors[Math.floor(Math.random() * this.selectedColors.length)],
        }));
      } else {
        // If animation is disabled, clear any existing animated streamlines
        this.animatedStreamlines = [];
      }
    }
  
    initializeGrid() {
      this.gridWidth = Math.ceil(this.canvas.width / this.streamlineParams.dSep);
      this.gridHeight = Math.ceil(this.canvas.height / this.streamlineParams.dSep);
      this.grid = [];
      for (let i = 0; i < this.gridWidth; i++) {
        this.grid[i] = [];
        for (let j = 0; j < this.gridHeight; j++) {
          this.grid[i][j] = 0; // Initialize as a counter
        }
      }
    }
  
    isFarFromStreamlines(x, y) {
      const i = Math.floor(x / this.streamlineParams.dSep);
      const j = Math.floor(y / this.streamlineParams.dSep);
      if (i < 0 || i >= this.gridWidth || j < 0 || j >= this.gridHeight) {
        return false;
      }
      // Allow up to 3 streamlines per grid cell
      return this.grid[i][j] < 3;
    }
  
    markPointOnGrid(x, y) {
      const i = Math.floor(x / this.streamlineParams.dSep);
      const j = Math.floor(y / this.streamlineParams.dSep);
      if (i >= 0 && i < this.gridWidth && j >= 0 && j < this.gridHeight) {
        this.grid[i][j] += 1; // Increment the counter
      }
    }
  
    getVector(x, y) {
      const scale = this.scale;
      const angle = this.simplex.noise2D(x * scale, y * scale) * Math.PI * 2;
      return {
        x: Math.cos(angle),
        y: Math.sin(angle),
      };
    }
  
    computeStreamline(x0, y0) {
      const streamline = [];
      let x = x0;
      let y = y0;
  
      streamline.push({ x, y });
      this.markPointOnGrid(x, y);
  
      for (let i = 1; i < this.streamlineParams.maxLength; i++) {
        const vector = this.getVector(x, y);
        const vx = vector.x;
        const vy = vector.y;
  
        x += vx * this.streamlineParams.stepSize;
        y += vy * this.streamlineParams.stepSize;
  
        if (x < 0 || x > this.canvas.width || y < 0 || y > this.canvas.height) {
          break;
        }
  
        streamline.push({ x, y });
        this.markPointOnGrid(x, y);
  
        if (!this.isFarFromStreamlines(x, y)) {
          break;
        }
      }
  
      return streamline;
    }
  
    generateStreamlines() {
      const seeds = [];
      const spacing = this.streamlineParams.gridResolution;
  
      for (let x = 0; x < this.canvas.width; x += spacing) {
        for (let y = 0; y < this.canvas.height; y += spacing) {
          seeds.push({ x, y });
        }
      }
  
      for (const seed of seeds) {
        if (this.isFarFromStreamlines(seed.x, seed.y)) {
          const streamline = this.computeStreamline(seed.x, seed.y);
          if (streamline.length >= this.MIN_STREAMLINE_LENGTH) {
            this.allStreamlines.push(streamline);
          }
        }
      }
    }
  
    drawStreamlines(ctx, selectedStreamlines) {
      selectedStreamlines.forEach(streamline => {
        if (streamline.length >= this.MIN_STREAMLINE_LENGTH) {
          // Choose a color for each streamline
          let color = this.selectedColors[Math.floor(Math.random() * this.selectedColors.length)];
          ctx.lineWidth = 0.5 + Math.random() * 2; // Vary line width between 0.5 and 2.5
  
          ctx.strokeStyle = color; // Set the color
  
          for (let i = 1; i < streamline.length; i++) {
            let start = streamline[i - 1];
            let end = streamline[i];
  
            // Compute normalized position along the streamline
            let t = i / (streamline.length - 1);
  
            // Compute opacity for fade effect
            let opacity;
            let fadeLength = 0.1; // Fraction of the streamline to fade over (adjust as needed)
            if (t < fadeLength) {
              opacity = t / fadeLength;
            } else if (t > 1 - fadeLength) {
              opacity = (1 - t) / fadeLength;
            } else {
              opacity = 1;
            }
  
            // Combine the per-segment opacity with the overall streamline opacity
            let combinedAlpha = opacity * this.streamlineOpacity;
  
            // Apply the combined alpha using globalAlpha
            ctx.globalAlpha = combinedAlpha;
  
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
          }
  
          // Reset globalAlpha to 1 after drawing
          ctx.globalAlpha = 1;
        }
      });
    }
  
    selectRandomStreamlines(streamlines, numToSelect) {
      const shuffled = streamlines.slice().sort(() => 0.5 - Math.random());
      return shuffled.slice(0, numToSelect);
    }
  
    drawAnimatedStreamline(ctx, animatedStreamline) {
      const streamline = animatedStreamline.streamline;
      const progress = animatedStreamline.progress;
      const windowSize = 0.2; // Adjust the window size for the gradient effect
      const color = animatedStreamline.color;
      const speed = animatedStreamline.speed;
  
      if (streamline.length >= this.MIN_STREAMLINE_LENGTH) {
        ctx.lineWidth = 1.5; // Set line width for animated streamlines
        ctx.strokeStyle = color; // Set the color
  
        for (let i = 1; i < streamline.length; i++) {
          let start = streamline[i - 1];
          let end = streamline[i];
  
          // Compute normalized position along the streamline
          let t = i / (streamline.length - 1);
  
          // Compute distance from the current progress
          let distance = Math.abs(t - progress);
          // Handle wrapping around
          if (distance > 0.5) {
            distance = 1 - distance;
          }
  
          // Compute opacity based on distance
          let opacity;
          if (distance < windowSize / 2) {
            opacity = 1 - (distance / (windowSize / 2));
          } else {
            opacity = 0;
          }
  
          if (opacity > 0) {
            // Combine the per-segment opacity with the overall streamline opacity
            let combinedAlpha = opacity * this.streamlineOpacity;
  
            // Apply the combined alpha using globalAlpha
            ctx.globalAlpha = combinedAlpha;
  
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
          }
        }
  
        // Reset globalAlpha to 1 after drawing
        ctx.globalAlpha = 1;
      }
    }
  
    animateLoop() {
      const animationLoop = () => {
        // Clear the main canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
        // Draw the static canvas onto the main canvas
        this.ctx.drawImage(this.staticCanvas, 0, 0);
  
        // For each animated streamline, update progress and draw
        this.animatedStreamlines.forEach(animatedStreamline => {
          // Update progress
          animatedStreamline.progress += animatedStreamline.speed;
          if (animatedStreamline.progress > 1) {
            animatedStreamline.progress = 0; // Loop back to start
          }
  
          // Draw the animated streamline
          this.drawAnimatedStreamline(this.ctx, animatedStreamline);
        });
  
        // Request the next frame
        requestAnimationFrame(animationLoop);
      };
  
      // Start the loop
      animationLoop();
    }
  }
  
  // Initialize the visualization for each canvas element with class 'windmap-canvas'
  document.querySelectorAll('.windmap-canvas').forEach(canvas => {
    new WindMapVisualization(canvas);
  });
  