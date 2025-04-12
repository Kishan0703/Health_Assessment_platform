document.addEventListener("DOMContentLoaded", function () {
    const questionsContainer = document.getElementById("questions");

    // Define 10 health-related questions
    const questions = [
        { text: "How often do you exercise per week?", options: ["Never", "1-2 times", "3-5 times", "More than 5 times"] },
        { text: "How many hours do you sleep on average per night?", options: ["Less than 4", "4-6", "7-8", "More than 8"] },
        { text: "Do you smoke?", options: ["Yes", "No", "Occasionally"] },
        { text: "How often do you consume alcohol?", options: ["Never", "Rarely", "Weekly", "Daily"] },
        { text: "How many servings of fruits and vegetables do you eat daily?", options: ["None", "1-2 servings", "3-5 servings", "More than 5 servings"] },
        { text: "Do you experience stress frequently?", options: ["Never", "Sometimes", "Often", "Always"] },
        { text: "How often do you visit a doctor for a check-up?", options: ["Never", "Once a year", "Twice a year", "More than twice a year"] },
        { text: "Do you have any chronic health conditions?", options: ["No", "Yes, but controlled", "Yes, and it's serious"] },
        { text: "How much water do you drink daily?", options: ["Less than 1L", "1-2L", "3-4L", "More than 4L"] },
        { text: "Do you take any dietary supplements?", options: ["No", "Yes, occasionally", "Yes, regularly"] }
    ];

    // Generate and add questions dynamically
    questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");

        const questionLabel = document.createElement("p");
        questionLabel.textContent = `${index + 1}. ${q.text}`;
        questionDiv.appendChild(questionLabel);

        q.options.forEach(option => {
            const label = document.createElement("label");
            const input = document.createElement("input");
            input.type = "radio";
            input.name = `q${index}`;
            input.value = option;
            label.appendChild(input);
            label.appendChild(document.createTextNode(option));
            questionDiv.appendChild(label);
        });

        questionsContainer.appendChild(questionDiv);
    });

    document.getElementById("healthForm").addEventListener("submit", function (event) {
        event.preventDefault();
        calculateHealthScore();
    });

    function calculateHealthScore() {
        let score = 0;
        questions.forEach((q, index) => {
            const selected = document.querySelector(`input[name="q${index}"]:checked`);
            if (selected) {
                score += selected.value === "Never" || selected.value === "No" || selected.value === "Less than 4" ? 1 :
                         selected.value === "1-2 times" || selected.value === "4-6" || selected.value === "Rarely" ? 2 :
                         selected.value === "3-5 times" || selected.value === "7-8" || selected.value === "3-5 servings" ? 3 :
                         4; // Best answer category
            }
        });

        displayResults(score);
    }

    function displayResults(score) {
        document.getElementById("result").style.display = "block";
        document.getElementById("healthMetrics").innerHTML = `<p>Your Health Score: <strong>${score} / 40</strong></p>`;
        document.getElementById("statusText").textContent = score >= 30 ? "Excellent health!" : score >= 20 ? "Good, but can improve!" : "Needs improvement. Consider lifestyle changes.";
    }
});
