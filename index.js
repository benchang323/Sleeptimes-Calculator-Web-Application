/* Buttons */
const calcBtn = document.getElementById('calc-btn'); // 1. Spec: The "Calculate" button (calc-btn) should hide the input prompt and image sections, and display the result section.
const returnBtn = document.getElementById('return-btn'); // 2. Spec: The "Return" button (return-btn) should hide the result section and display the input prompt and image sections.

/* Sections */
const promptSection = document.getElementById('prompt-section');
const imgContainer = document.getElementById('img-container');
const resultSection = document.getElementById('result-section');
const goBedTimeDiv = document.getElementById('bedtime-hours-div');

/* Event Listeners */
calcBtn.addEventListener('click', calcBedTimes)

// Return to Main Page
returnBtn.addEventListener("click", () => { // 2. Spec: The "Return" button (return-btn) should hide the result section and display the input prompt and image sections.
    promptSection.classList.remove("hidden"); 
    imgContainer.classList.remove("hidden");
    resultSection.classList.add("hidden");
});

function calcBedTimes() { // 3. Spec: The JavaScript file (index.js) must contain a function named calcBedTimes that dynamically displays (that is, updates the DOM to display) six potential "go to bed" times based on the user's input.
    // Retrieve Input
    const hours = parseInt(document.getElementById('hour-dropdown').value, 10);
    const minutes = parseInt(document.getElementById('minute-dropdown').value, 10);
    const timeOfDay = document.getElementById('ampm-dropdown').value;

    // Convert to 24 Hour Time
    let newHours = hours;
    if (timeOfDay === "PM" && hours !== 12) {
        newHours += 12;
    } else if (timeOfDay === "AM" && hours === 12) {
        newHours = 0;
    }

    // Format to Date Object
    const wakeUpTime = new Date();
    wakeUpTime.setHours(newHours);
    wakeUpTime.setMinutes(minutes);
    wakeUpTime.setSeconds(0);
    wakeUpTime.setMilliseconds(0);

    // Store Bedtime
    const goBedTime = new Date(wakeUpTime);

    // Account for Falling Asleep
    // 5. Spec: The app should account for the average 14 minutes it takes to fall asleep. Therefore, the time shown should be the bedtime, not the time it takes to fall asleep. For example, if I want to wake up at 8:00 AM and get 6 sleep cycles, I must go to bed at 10:36 PM.
    goBedTime.setMinutes(wakeUpTime.getMinutes() - 14);
    
    // Clear Previous Results
    goBedTimeDiv.innerHTML = "";  

    // Get 6 Cycles
    // 4. Spec: Each suggested "go to bed" time should correspond to a different number of sleep cycles, ranging from a bedtime that results in getting 6 sleep cycles to 1.
    for (let i = 6; i >= 1; i--) {
        // Calculate for each cycle
        goBedTime.setMinutes(goBedTime.getMinutes() - (i*90));

        // Format to en-US
        const goBedTimeString = goBedTime.toLocaleTimeString("en-US", {
            timeStyle: "short",
        });

        // Reset for next cycle
        goBedTime.setTime(wakeUpTime.getTime());
        goBedTime.setMinutes(wakeUpTime.getMinutes() - 14);
        
        // Add value to DOM
        const cycleDiv = document.createElement("div");
        cycleDiv.classList.add("cycle");
        cycleDiv.setAttribute("id", `cycle-${i}`);
        cycleDiv.textContent = goBedTimeString;
        goBedTimeDiv.appendChild(cycleDiv);
    }

    // Display Results
    // 1. Spec: The "Calculate" button (calc-btn) should hide the input prompt and image sections, and display the result section.
    promptSection.classList.add("hidden"); 
    imgContainer.classList.add("hidden"); 
    resultSection.classList.remove("hidden"); 
}

// 6. Spec: The app should be free of JavaScript errors and run smoothly. Additionally, the code should be efficient and avoid unnecessary calculations.
// 7. Spec: The deployed app should not have visible errors or debugging messages printed to the console.
// 8. Spec: The submission should exhibit good practices for writing readable code, such as consistent indentation, descriptive naming, and code comments (when needed).