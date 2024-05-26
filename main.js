const body = document.body;

// Cursor
const cursor = document.createElement('div');
cursor.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  width: 10px; 
  height: 10px; 
  background-color: pink; 
  border: none; 
  border-radius: 50%;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
  z-index: 9999;
  transition: width 0.1s ease, height 0.1s ease; 
`;

body.addEventListener('mousemove', (event) => {
  cursor.style.top = `${event.clientY}px`;
  cursor.style.left = `${event.clientX}px`;

  const target = document.elementFromPoint(event.clientX, event.clientY);
  if (target && (target.matches('a[href]') || target.matches('button'))) {
    cursor.style.width = '50px'; 
    cursor.style.height = '50px'; 
  } else {
    cursor.style.width = '10px'; 
    cursor.style.height = '10px'; 
  }
});

body.appendChild(cursor);

// Title
const textElement = document.getElementById('name');
textElement.style.opacity = 0;
function animateText(duration = 1000, callback) {
  const startTime = performance.now();
  const targetOpacity = 1;  
  const animate = () => {
    const elapsedTime = performance.now() - startTime;
    const progress = elapsedTime / duration;
    textElement.style.opacity = Math.min(progress, 1); 
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else if (callback) {
      callback();
    }
  };
  animate();
}
setTimeout(() => animateText(), 500);

// About Me
/*
const aboutTitle = document.querySelector('.about-title');
const aboutContent = document.querySelector('.about-content');
aboutTitle.style.opacity = 0;
aboutContent.style.opacity = 0;
function animateElement(element, duration = 250) {
  const startTime = performance.now();
  const targetOpacity = 1;  
  const animate = () => {
    const elapsedTime = performance.now() - startTime;
    const progress = elapsedTime / duration;
    element.style.opacity = Math.min(progress, 1);  
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  animate();
}
setTimeout(() => animateElement(aboutTitle), 200);
setTimeout(() => animateElement(aboutContent), 400);
*/

// Projects
const projectsTitle = document.querySelector('.projects-title');
const projects = document.querySelectorAll('.projects li');
const options = {
  root: null,  
  threshold: 0.5, 
};
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target); 
    }
  });
}, options);
observer.observe(projectsTitle); 
projects.forEach(project => observer.observe(project));

document.querySelectorAll('.projects a').forEach(anchor => {
    anchor.addEventListener('mouseover', function() {
        this.querySelector('img').style.filter = 'brightness(50%)';
    });
    anchor.addEventListener('mouseout', function() {
        this.querySelector('img').style.filter = 'brightness(100%)';
    });
});


