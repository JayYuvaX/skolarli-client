let questions = []
let currentQuestion = 0
let answers = JSON.parse(localStorage.getItem("answers")) || {}
let time = 300

$(document).ready(function () {

    $("#startTest").click(function () {
        $("#landing").hide()
        $("#testArea").show()

        fetchQuestions()
        startTimer()
    })

    $("#nextBtn").click(function () {
        saveAnswer()

        if (currentQuestion < questions.length - 1) {
            currentQuestion++
            loadQuestion()
        }
    })

    $("#prevBtn").click(function () {
        saveAnswer()

        if (currentQuestion > 0) {
            currentQuestion--
            loadQuestion()
        }
    })

})

function fetchQuestions() {

    $.ajax({
        url: "https://skolarli-server.onrender.com/api/questions",
        method: "GET",

        success: function (data) {
            questions = data

            renderPalette()
            loadQuestion()
        },

        error: function (err) {
            console.log("Error fetching questions:", err)
        }
    })

}

function loadQuestion() {

    let q = questions[currentQuestion]

    $("#questionNumber").text(
        `Question ${currentQuestion + 1} of ${questions.length}`
    )

    $("#questionText").text(q.question)

    let optionsHTML = ""

    q.options.forEach(function (opt, index) {

        let checked = answers[q._id] == index ? "checked" : ""

        optionsHTML += `
        <label class="block">
            <input type="radio" name="option" value="${index}" ${checked}>
            ${opt}
        </label>
        `
    })

    $("#options").html(optionsHTML)

    updateProgress()
    updatePalette()

}

function saveAnswer() {

    let selected = $("input[name='option']:checked").val()

    if (selected !== undefined) {
        answers[questions[currentQuestion]._id] = selected
        localStorage.setItem("answers", JSON.stringify(answers))
    }

}

function renderPalette() {

    $("#palette").html("")

    questions.forEach(function (q, index) {

        $("#palette").append(`
            <button class="paletteBtn border p-3 rounded-lg" data-index="${index}">
                ${index + 1}
            </button>
        `)

    })

    $(".paletteBtn").click(function () {

        saveAnswer()

        currentQuestion = $(this).data("index")

        loadQuestion()

    })

}

function updateProgress() {

    let percent = ((currentQuestion + 1) / questions.length) * 100

    $("#progressBar").css("width", percent + "%")

}

function updatePalette() {

    $(".paletteBtn").each(function (index) {

        let qid = questions[index]._id

        $(this).removeClass("bg-blue-500 bg-green-500  text-white")

        if (index === currentQuestion) {
            $(this).addClass("bg-blue-500 text-white")
        }
        else if (answers[qid] !== undefined) {
            $(this).addClass("bg-green-500 text-white")
        }

    })

}

function startTimer() {

    setInterval(function () {

        time--

        let minutes = Math.floor(time / 60)
        let seconds = time % 60

        seconds = seconds < 10 ? "0" + seconds : seconds

        $("#timer").text(`${minutes}:${seconds}`)

        if (time <= 0) {
            alert("Time Up")
            window.location.href = "summary.html"
        }

    }, 1000)

    $("#submitTest").click(function () {

        saveAnswer()

        // check if no answers selected
        if (Object.keys(answers).length === 0) {
            alert("Please answer at least one question before submitting")
            return
        }

        // confirmation popup
        if (confirm("Are you sure you want to submit the assessment?")) {

            localStorage.setItem("answers", JSON.stringify(answers))

            window.location.href = "summary.html"

        }

    })
}