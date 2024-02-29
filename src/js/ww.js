// Array of SVG paths for each step
const svgPaths = [
    'https://www.wessexwater.co.uk/assets/img/consumer/svg/problem.svg',
    '/img/consumer/svg/problem2.svg',
    '/img/consumer/svg/problem3.svg',
    '/img/consumer/svg/problem4.svg'
  ];
  
  // Get all the spans containing numbers in the stepper
  const numberSpans = document.querySelectorAll('.mat-step-icon.mat-step-icon-state-number .mat-step-icon-content .ng-star-inserted');
  
  // Iterate over each span and replace its content with the corresponding SVG
  numberSpans.forEach((span, index) => {
    // Create a new SVG element
    const svg = document.createElement('img');
    // Set the SVG source based on the index
    svg.src = svgPaths[index];
    // Replace the content of the span with the SVG
    span.innerHTML = '';
    span.appendChild(svg);
  });
  
alert("running")