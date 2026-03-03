1) Why are we using clamp instead of media queries?
It allows us to scale font sizes between a min and max value, based on the width of the viewport, thus creating a fluid transition.
Media queries require multiple breakpoint to jump between fixed sizes, while clamp handles responsivnes in a line of code.

2) Why did we use minmax instead of fixed columns?
Minmax defines a range that allows colums to shrink to a min size, for example 300px, but at the same time expand to fill available space, with the use of 1fr.
This way, the layout will not break on small screens, while the grid also looks balanced on bigger monitors without the need for manual adjustments.

3) Why is it important to implement a mobile-first? website?
It ensures that the most essential content and lightweight styles are loaded first, which improves performance on (slower) mobile networks.
It is easier to add complex layers with increasing screen size than to undo/remodel desktop styles to fit a small screen of a phone. 

4) What happens if we remove the variables that were defined at the beginning?
Functions will no longer have values to reference, which would cause properties (colors, spacing) to revert to browser defaults.
This would destroy visual theme and forces to manually update every individual color (hex) code or pixel value if you want to make a change.
