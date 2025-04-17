import { useState } from 'react';
import { ThemeProvider } from 'styled-components';

// Styles
import { GlobalStyles } from './styles/GlobalStyles';
import { lightTheme, darkTheme } from './styles/theme';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Skills from './components/Skills';
import Contact from './components/Contact';

import Footer from './components/Footer';

interface ThemeType {
  light: 'light';
  dark: 'dark';
}

function App() {
  const [theme, setTheme] = useState<ThemeType['light'] | ThemeType['dark']>('dark');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      
      <Header 
        toggleTheme={toggleTheme} 
        currentTheme={theme} 
      />
      
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Skills />
        <Contact />
       
      </main>
      
      <Footer />
    </ThemeProvider>
  );
}

export default App;