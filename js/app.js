let currentQuestion = 0;
let answers = JSON.parse(localStorage.getItem("answers")) || {};

$(document).ready(function () {

    $("#startTest").click(function () {
        $("#landing").hide();
        $("#testArea").show();
        renderPalette();
        loadQuestion();
    });

    $("#nextBtn").click(function () {
        saveAnswer();
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            loadQuestion();
        }
    });

    $("#prevBtn").click(function () {
        saveAnswer();
        if (currentQuestion > 0) {
            currentQuestion--;
            loadQuestion();
        }
    });

    $("#submitTest").click(function () {
        saveAnswer();
        window.location.href = "summary.html";
    });

});

function loadQuestion() {

    let q = questions[currentQuestion];

    $("#questionNumber").text(
        `Question ${currentQuestion + 1} of ${questions.length}`
    );

    $("#questionText").text(q.question);

    let optionsHTML = "";

    q.options.forEach((opt, index) => {

        let checked = answers[q.id] == index ? "checked" : "";

        optionsHTML += `
<label class="block mb-2">
<input type="radio" name="option" value="${index}" ${checked}>
${opt}
</label>
`;

    });

    $("#options").html(optionsHTML);

    updatePalette();
}

function saveAnswer() {

    let selected = $("input[name='option']:checked").val();

    if (selected !== undefined) {

        answers[questions[currentQuestion].id] = parseInt(selected);

        localStorage.setItem("answers", JSON.stringify(answers));

    }

}

function renderPalette() {

    questions.forEach((q, index) => {

        $("#palette").append(`
<button class="paletteBtn border px-3 py-1"
data-index="${index}">
${index + 1}
</button>
`);

    });

    $(".paletteBtn").click(function () {

        saveAnswer();

        currentQuestion = $(this).data("index");

        loadQuestion();

    });

}

function updatePalette() {

    $(".paletteBtn").each(function (index) {

        let qid = questions[index].id;

        $(this).removeClass("bg-blue-500 bg-green-500");

        if (index === currentQuestion)
            $(this).addClass("bg-blue-500 text-white");

        else if (answers[qid] !== undefined)
            $(this).addClass("bg-green-500 text-white");

    });

}