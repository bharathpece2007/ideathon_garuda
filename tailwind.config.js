/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        garuda: {
          navy: '#140e34',
          sidebar: '#17113a',
          sidebarHover: '#261e56',
          purple: '#281a62',
          pill: '#1e1445',
          pillHover: '#2e206b',
          accent: '#6366f1',
          canvas: '#e9edf7',
          surface: '#f3f6fc',
          card: '#ffffff',
          peach: '#fed8c7',
          peachLight: '#fff2ec',
          sky: '#d7ecfc',
          skyLight: '#f0f7ff',
          mint: '#ddf5e8',
          mintLight: '#f2fbf6',
          amber: '#fef3c7',
          amberLight: '#fffbeb',
          rose: '#fde2e4',
          roseLight: '#fff5f6'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'dashboard': '0 25px 60px -15px rgba(22, 17, 56, 0.12), 0 10px 25px -5px rgba(22, 17, 56, 0.08)',
        'float': '0 12px 35px -8px rgba(26, 20, 66, 0.14)',
        'pill': '0 8px 24px -4px rgba(30, 20, 69, 0.3)',
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.03)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      }
    },
  },
  plugins: [],
}
