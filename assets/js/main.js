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

// Code for the background wind map
// Get the canvas and context
// Get the canvas and context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Create an off-screen canvas for static streamlines
const staticCanvas = document.createElement('canvas');
const staticCtx = staticCanvas.getContext('2d');

// Variables for animation
let animatedStreamlines = [];
let animationStarted = false;

// Detect color scheme
const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

// Set background color
const backgroundColor = 'rgba(0, 0, 0, 0)'; // Transparent background

// Set streamline opacity based on color scheme
const streamlineOpacity = isDarkMode ? 0.8 : 0.4; // Adjust these values as needed

// Initialize Simplex Noise
const simplex = new SimplexNoise();

// Color palette without alpha values
const colorPalette = [
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

// Randomly select up to three colors from the palette
function getRandomColors(palette, numColors) {
  const shuffled = palette.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numColors);
}

const selectedColors = getRandomColors(colorPalette, 3);

// Streamline parameters
const streamlineParams = {
  stepSize: 1,          // The step size for each integration step
  maxLength: 10000,     // Maximum number of steps per streamline
  dSep: 1,              // Distance between streamlines
  gridResolution: 75,   // Controls seed point spacing
};

// Minimum streamline length
const MIN_STREAMLINE_LENGTH = 0; // Minimum number of points in a streamline

// Grid to keep track of streamline coverage
let grid, gridWidth, gridHeight;

// Global array to store streamlines
let allStreamlines = [];

// Function to get the vector at a given point
function getVector(x, y) {
  const scale = 0.00015;
  const angle = simplex.noise2D(x * scale, y * scale) * Math.PI * 2;
  return {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };
}

// Initialize the grid for streamline coverage
function initializeGrid() {
  gridWidth = Math.ceil(canvas.width / streamlineParams.dSep);
  gridHeight = Math.ceil(canvas.height / streamlineParams.dSep);
  grid = [];
  for (let i = 0; i < gridWidth; i++) {
    grid[i] = [];
    for (let j = 0; j < gridHeight; j++) {
      grid[i][j] = 0; // Initialize as a counter
    }
  }
}

// Check if a point is far enough from existing streamlines
function isFarFromStreamlines(x, y) {
  const i = Math.floor(x / streamlineParams.dSep);
  const j = Math.floor(y / streamlineParams.dSep);
  if (i < 0 || i >= gridWidth || j < 0 || j >= gridHeight) {
    return false;
  }
  // Allow up to 3 streamlines per grid cell
  return grid[i][j] < 3;
}

// Mark a point on the grid as covered by a streamline
function markPointOnGrid(x, y) {
  const i = Math.floor(x / streamlineParams.dSep);
  const j = Math.floor(y / streamlineParams.dSep);
  if (i >= 0 && i < gridWidth && j >= 0 && j < gridHeight) {
    grid[i][j] += 1; // Increment the counter
  }
}

// Compute a streamline starting from (x0, y0)
function computeStreamline(x0, y0) {
  const streamline = [];
  let x = x0;
  let y = y0;

  streamline.push({ x, y });
  markPointOnGrid(x, y);

  for (let i = 1; i < streamlineParams.maxLength; i++) {
    const vector = getVector(x, y);
    const vx = vector.x;
    const vy = vector.y;

    x += vx * streamlineParams.stepSize;
    y += vy * streamlineParams.stepSize;

    if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) {
      break;
    }

    streamline.push({ x, y });
    markPointOnGrid(x, y);

    if (!isFarFromStreamlines(x, y)) {
      break;
    }
  }

  return streamline;
}

// Generate and store all streamlines
function generateStreamlines() {
  ctx.lineWidth = 1;

  const seeds = [];
  const spacing = streamlineParams.gridResolution;

  for (let x = 0; x < canvas.width; x += spacing) {
    for (let y = 0; y < canvas.height; y += spacing) {
      seeds.push({ x, y });
    }
  }

  for (const seed of seeds) {
    if (isFarFromStreamlines(seed.x, seed.y)) {
      const streamline = computeStreamline(seed.x, seed.y);
      if (streamline.length >= MIN_STREAMLINE_LENGTH) {
        allStreamlines.push(streamline);
      }
    }
  }
}

// Function to adjust the alpha of a color
function adjustAlpha(color, alpha) {
  // Combine the per-segment alpha with the overall streamline opacity
  const combinedAlpha = alpha * streamlineOpacity;

  // Assume color is in 'rgb(r, g, b)' format
  let rgb = color.match(/rgb\((\d+), (\d+), (\d+)\)/);
  if (rgb) {
    let r = rgb[1];
    let g = rgb[2];
    let b = rgb[3];

    return `rgba(${r}, ${g}, ${b}, ${combinedAlpha})`;
  } else {
    // If parsing fails, return the original color
    return color;
  }
}

// Draw the selected streamlines on the given context with fade effect
function drawStreamlines(ctx, selectedStreamlines) {
  selectedStreamlines.forEach(streamline => {
    if (streamline.length >= MIN_STREAMLINE_LENGTH) {
      // Choose a color for each streamline without alpha
      let color = selectedColors[Math.floor(Math.random() * selectedColors.length)];
      ctx.lineWidth = 0.5 + Math.random() * 2; // Vary line width between 0.5 and 2.5

      for (let i = 1; i < streamline.length; i++) {
        let start = streamline[i - 1];
        let end = streamline[i];

        // Compute normalized position along the streamline
        let t = i / (streamline.length - 1);

        // Compute opacity for fade effect
        let opacity;
        let fadeLength = 1; // Fraction of the streamline to fade over (adjust as needed)
        if (t < fadeLength) {
          opacity = t / fadeLength;
        } else if (t > 1 - fadeLength) {
          opacity = (1 - t) / fadeLength;
        } else {
          opacity = 1;
        }

        // Adjust the alpha of the color
        let strokeStyle = adjustAlpha(color, opacity);

        ctx.strokeStyle = strokeStyle;

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      }
    }
  });
}

// Function to select random streamlines
function selectRandomStreamlines(streamlines, numToSelect) {
  const shuffled = streamlines.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numToSelect);
}

// Draw an animated streamline with a moving gradient
function drawAnimatedStreamline(ctx, animatedStreamline) {
  const streamline = animatedStreamline.streamline;
  const progress = animatedStreamline.progress;
  const windowSize = 0.45; // Adjust the window size for the gradient effect
  const color = animatedStreamline.color;

  if (streamline.length >= MIN_STREAMLINE_LENGTH) {
    ctx.lineWidth = 1.5; // Set line width for animated streamlines

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
        // Adjust the alpha of the color
        let strokeStyle = adjustAlpha(color, opacity);

        ctx.strokeStyle = strokeStyle;

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      }
    }
  }
}

// Render the wind map
function renderWindMap() {
  // Clear the off-screen canvas
  staticCtx.fillStyle = backgroundColor;
  staticCtx.fillRect(0, 0, canvas.width, canvas.height);

  initializeGrid();
  allStreamlines = [];
  generateStreamlines();

  console.log('Total streamlines generated:', allStreamlines.length);

  // Randomly select some streamlines to draw
  const numStreamlinesToDraw = 150; // Adjust as needed
  const selectedStreamlines = selectRandomStreamlines(allStreamlines, numStreamlinesToDraw);

  // Draw the selected streamlines with fade effect onto staticCtx
  drawStreamlines(staticCtx, selectedStreamlines);

  // Randomly select streamlines for animation
  animatedStreamlines = selectRandomStreamlines(allStreamlines, 150).map(streamline => ({
    streamline,
    progress: Math.random(), // Start at a random progress
    speed: 0.01 + Math.random() * 0.001, // Random speed
    color: selectedColors[Math.floor(Math.random() * selectedColors.length)],
  }));
}

// Animation loop
function animate() {
  function animationLoop() {
    // Clear the main canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the static canvas onto the main canvas
    ctx.drawImage(staticCanvas, 0, 0);

    // For each animated streamline, update progress and draw
    animatedStreamlines.forEach(animatedStreamline => {
      // Update progress
      animatedStreamline.progress += animatedStreamline.speed;
      if (animatedStreamline.progress > 1) {
        animatedStreamline.progress = 0; // Loop back to start
      }

      // Draw the animated streamline
      drawAnimatedStreamline(ctx, animatedStreamline);
    });

    // Request the next frame
    requestAnimationFrame(animationLoop);
  }

  // Start the loop
  animationLoop();
}

// Resize the canvas to fit the window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  staticCanvas.width = canvas.width;
  staticCanvas.height = canvas.height;
  renderWindMap(); // Re-render the wind map on resize

  if (!animationStarted) {
    animate(); // Start the animation
    animationStarted = true;
  }
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
