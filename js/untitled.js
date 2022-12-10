import { annotate } from 'https://unpkg.com/rough-notation?module';
window.addEventListener('load', () =>{
    const annotations = {
        'highlight-1': { type: 'underline', color: '#82b29a'},
        'highlight-2': { type: 'underline', color: '#485f92'},
        'highlight-3': { type: 'box', color: '#82b29a' },
        
      
    };  
    // Set the variables
    var iOSupported = "IntersectionObserver" in window; /* true if supported */
    var box = document.querySelectorAll('.notation');
    
    // Check if IntersectionObserver is supported by the browser
    if (!iOSupported) {
        return;
    }

    // Set the config options 
    const config = {
        root: null, // sets the framing element to the viewport
        rootMargin: '0% 0% -25% 0%', // the animation will be triggered when at 25% from the bottom of the viewport
        threshold: 0 
    };
    
    // Init the observer
    let observer = new IntersectionObserver((entries) => {
        entries.forEach((item) => {
            let annotationType = item.target.dataset.notationType;
            let annotation = annotate(item.target, annotations[annotationType]);
        
            if (item.isIntersecting) {
                // Show the annotation when intersecting and stop observing after it.
                annotation.show();
                observer.unobserve(item.target);

            } else {
                // Add an action when the target is not intersecting anymore.

            }    
        });  
    }, config);


    box.forEach((item) => {
        observer.observe(item);
    });
})