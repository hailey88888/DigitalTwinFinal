


export const particles = {
  particles: {
    number: {
      value: 50, // 개수
      density: {
        enable: true,
        value_area: 400, // 화면 중앙에 집중하도록 작은 값으로 설정
      },
    },
    size: {
      value: 2, // 크기
      random: true,
    },
    color: {
      value: ['#008080', '#009900', '#ffffff'],
    },
    move: {
      enable: true,
      speed: 2, // Adjust the speed as needed
      direction: 'none', // Movement direction: 'none', 'top', 'top-right', 'right', etc.
      random: true,
      straight: false,
      out_mode: 'bounce', // 'out' -> 'bounce'로 변경하여 화면 경계에서 튕기도록 설정
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
    opacity: {
      value: 0.7, // Set the initial opacity (value between 0 and 1)
      random: true, // Set to true if you want random opacity for each particle
      anim: {
        enable: true, // Enable opacity animation
        speed: 0.05, // Speed of the opacity animation
        opacity_min: 0.2, // Minimum opacity value in the animation
        sync: false, // Set to true to sync opacity animation across all particles
      },
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000',
      },
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: '#ffffff',
      opacity: 0.4,
      width: 1,
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse',
      },
      onclick: {
        enable: true,
        mode: 'push',
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
};
