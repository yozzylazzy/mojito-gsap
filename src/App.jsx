import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

/**
 * ScrollTrigger is a gsap plugin for scroll (animate things base on scroll position)
 * SplitText is a gsap plugin splittext (break text in individual word)
 * If you declare or register it in the top or app, it will be declare one time, it's enough to be use on other company (globally across application)
 */

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <div className="flex-center h-[100vh]">
      <h1 className="text-3xl text-indigo-300">Hello, GSAP!</h1>
    </div>
  );
};

export default App;
