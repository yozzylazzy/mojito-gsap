import { useRef, useState } from 'react'
import { sliderLists } from '../../constants'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

/**
 * Menu component displays a cocktail slider with navigation tabs and arrows.
 * Allows users to browse through a list of cocktails, view their images, names, and recipes.
 *
 * Features:
 * - Displays current, previous, and next cocktails with navigation.
 * - Uses GSAP for animations (via useGSAP hook).
 * - Accessible navigation with ARIA labels.
 *
 * State:
 * - currentIndex: Index of the currently selected cocktail.
 *
 * References:
 * - contentRef: Ref to the recipe info container for animation or DOM access.
 *
 * Dependencies:
 * - sliderLists: Array of cocktail objects, each with { id, name, image, title, description }.
 *
 * @component
 * @returns {JSX.Element} The rendered Menu component.
 */
const Menu = () => {
    const contentRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);

    useGSAP(() => {
        // Leaf parallax
        // Parallax effect for leaves
        const parallaxTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#menu',
                start: 'top bottom', // Start when #menu enters the viewport
                end: 'bottom top',   // End when #menu leaves the viewport
                scrub: true,
            }
        });

        parallaxTimeline
            .to('#m-left-leaf', {
                x: -80,
                y: -120,
                rotate: -10,
                ease: 'none'
            }, 0)
            .to('#m-right-leaf', {
                x: 80,
                y: 120,
                rotate: 10,
                ease: 'none'
            }, 0);

        gsap.fromTo('#title', { opacity: 0 }, { opacity: 1, duration: 1 });
        gsap.fromTo('.cocktail img', { opacity: 0, xPercent: -100 }, {
            xPercent: 0, opacity: 1, duration: 1, ease: 'power1.inOut'
        });
        gsap.fromTo('.details h2', { yPercent: 100, opacity: 0 }, {
            yPercent: 0, opacity: 100, ease: 'power1.inOut'
        });
        gsap.fromTo('.details p', { yPercent: 100, opacity: 0 }, {
            yPercent: 0, opacity: 100, ease: 'power1.inOut'
        })
    }, [currentIndex]);
    // when you provide on dependency array, it will rerun all on the function
    // on the callback function that have conenction with currentIndex
    /**
     * A dependency array containing currentIndex. This means the callback 
     * will re-run whenever currentIndex changes, allowing you to trigger or 
     * update animations in response to state or prop changes.
     */

    const totalCocktails = sliderLists.length;

    const goToSlide = (index) => {
        const newIndex = (index + totalCocktails) % totalCocktails;
        setCurrentIndex(newIndex);
    }

    const getCocktailAt = (indexOffset) => {
        return sliderLists[(currentIndex + indexOffset + totalCocktails) % totalCocktails];
    }

    const currentCocktail = getCocktailAt(0);
    const prevCocktail = getCocktailAt(-1);
    const nextCocktail = getCocktailAt(1);

    return (
        <section id='menu' aria-labelledby='menu-heading'>
            <img src="/images/slider-left-leaf.png" alt='left-leaf' id='m-left-leaf' />
            <img src="/images/slider-right-leaf.png" alt='right-leaf' id='m-right-leaf' />

            <h2 id='menu-heading' className='sr-only'>
                Cocktail Menu
            </h2>

            <nav className='cocktail-tabs' aria-label='Cocktail Navigation'>
                {sliderLists.map((cocktail, index) => {
                    const isActive = index === currentIndex;

                    return (
                        <button key={cocktail.id} className={`${isActive ? 'text-white border-white' :
                            'text-white/50 border-white/50'}`}
                            onClick={() => goToSlide(index)}
                        >
                            {cocktail.name}
                        </button>
                    );
                })}
            </nav>

            <div className='content'>
                <div className='arrows'>
                    <button className='text-left' onClick={() => goToSlide(currentIndex - 1)}>
                        <span>{prevCocktail.name}</span>
                        <img src='/images/right-arrow.png' alt='right-arrow' aria-hidden="true" />
                    </button>

                    <button className='text-left' onClick={() => goToSlide(currentIndex + 1)}>
                        <span>{nextCocktail.name}</span>
                        <img src='/images/left-arrow.png' alt='left-arrow' aria-hidden="true" />
                    </button>
                </div>

                <div className='cocktail'>
                    <img src={currentCocktail.image} className='object-contain' />
                </div>

                <div className='recipe'>
                    <div ref={contentRef} className='info'>
                        <p>Recipe for:</p>
                        <p id='title'>{currentCocktail.name}</p>
                    </div>

                    <div className='details'>
                        <h2>{currentCocktail.title}</h2>
                        <p>{currentCocktail.description}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Menu
