document.addEventListener('DOMContentLoaded', () => {
    const ball = document.getElementById('beach-ball');
    const gravity = 2; // Increased gravity force
    const bounceFactor = 0.7; // Damping factor when the ball hits the ground
    const halfwayUp = window.innerHeight - 600; // Halfway point of the viewport
    const groundLevel = window.innerHeight - 150; // Ground level accounting for ball height
    let position = 0; // Initial position of the ball
    let velocity = 0; // Initial velocity of the ball
    let lastTime = null; // Timestamp of the last frame
    let isHovered = false; // Flag to check if ball is hovered
    let isBouncing = false; // Flag to check if the ball is currently bouncing

    function animate(time) {
        if (lastTime) {
            // Calculate the time elapsed between frames
            const deltaTime = (time - lastTime) / 1000;

            // Apply gravity to the velocity
            velocity += gravity;

            // Update the ball's position
            position += velocity;

            // Check if the ball hits the ground
            if (position > groundLevel) {
                position = groundLevel;
                velocity *= -bounceFactor;

                // Check if the ball has come to rest
                if (Math.abs(velocity) < 1) {
                    velocity = 0;
                    isBouncing = false; // The ball has come to rest
                }
            }

            // Update the ball's CSS position
            ball.style.top = `${position}px`;
        }

        // Save the current timestamp for the next frame
        lastTime = time;
        // Request the next frame
        requestAnimationFrame(animate);
    }

    // Add hover event to jump halfway up the screen
    ball.addEventListener('mouseover', () => {
        if (!isHovered && !isBouncing) {
            position = halfwayUp;
            velocity = 0; // Reset velocity
            isHovered = true; // Set flag to true
            isBouncing = true; // Set bouncing flag to true
        }
    });

    // Add event to reset hover flag when mouse leaves the ball
    ball.addEventListener('mouseleave', () => {
        isHovered = false;
    });

    // Start the animation
    requestAnimationFrame(animate);
});
