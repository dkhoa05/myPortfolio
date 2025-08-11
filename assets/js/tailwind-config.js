// Custom Tailwind config for CDN build
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0F4C81',
        primaryHover: '#093459',
        accent: '#2E8BC0',
        bgLight: '#F5F7FA',
        bgDark: '#0B172A',
        text: '#1C1C1C',
        textSecondary: '#6B7280',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: { '0%': {opacity:0, transform:'translateY(20px)'}, '100%': {opacity:1, transform:'translateY(0)'} },
        slideUp: { '0%': {opacity:0, transform:'translateY(30px)'}, '100%': {opacity:1, transform:'translateY(0)'} },
        slideInLeft: { '0%': {opacity:0, transform:'translateX(-30px)'}, '100%': {opacity:1, transform:'translateX(0)'} },
        slideInRight: { '0%': {opacity:0, transform:'translateX(30px)'}, '100%': {opacity:1, transform:'translateX(0)'} },
        bounceGentle: { '0%,100%': {transform:'translateY(0)'}, '50%': {transform:'translateY(-10px)'} },
        float: { '0%,100%': {transform:'translateY(0)'}, '50%': {transform:'translateY(-20px)'} },
        glow: { '0%': { boxShadow:'0 0 20px rgba(15,76,129,0.45)' }, '100%': { boxShadow:'0 0 30px rgba(46,139,192,0.75)'} },
      }
    }
  }
}