import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

/**
 * ScrollTrigger is a gsap plugin for scroll (animate things base on scroll position)
 * SplitText is a gsap plugin splittext (break text in individual word)
 * If you declare or register it in the top or app, it will be declare one time, it's enough to be use on other company (globally across application)
 */

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      
    </main>
  );
};

export default App;
