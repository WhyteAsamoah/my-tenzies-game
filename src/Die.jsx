export default function Die(props) {
    
    const styles = {
        backgroundColor: props.held ? "#59E391" : "white"
    }

    // create a 3x3 grid for dot positions
    const dots = [
        [false, false, false],
        [false, false, false],
        [false, false, false]
    ]

    // set the appropriate dots based on the die value
    if (props.value === 1) {
        dots[1][1] = true; // Single center dot
    } else if (props.value === 2) {
        dots[0][0] = dots[2][2] = true; // Two diagonal dots
    } else if (props.value === 3) {
        dots[0][0] = dots[1][1] = dots[2][2] = true; // Three diagonal dots
    } else if (props.value === 4) {
        dots[0][0] = dots[0][2] = dots[2][0] = dots[2][2] = true; // Four corner dots
    } else if (props.value === 5) {
        dots[0][0] = dots[0][2] = dots[1][1] = dots[2][0] = dots[2][2] = true; // Four corners + center
    } else if (props.value === 6) {
        dots[0][0] = dots[0][2] = dots[1][0] = dots[1][2] = dots[2][0] = dots[2][2] = true; // Two columns of three dots
    }

    const dotElements = dots.map((row, rowIndex) =>
        row.map((isVisible, colIndex) => (
            <div 
                key={`${rowIndex}-${colIndex}`} 
                className={`dot ${isVisible ? "" : "hide"}`}  // Applying "dot" and "hide" class
            ></div>
        ))
    );

    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            {dotElements}
        </div>
    )
}