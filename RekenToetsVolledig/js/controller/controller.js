import {Quiz} from "../model/Quiz.js";
import {QuizView} from "../view/QuizView.js";


export class Controller {
    constructor() {

        this.quiz = new Quiz();


        this.quizView = new QuizView(this.quiz);
        this.quizView.bindStartButton(this.handelStart)

        this.quizView.bindAnswer(this.handelAnswer)
        // Koppel de handlers aan de buttons
        this.quizView.bindNextQuestionButton(this.handleNextQuestion);
        this.quizView.bindPreviousQuestionButton(this.handlePreviousQuestion);
        this.quiz._commit();
        this.quizView.bindSubmitButton(this.handleSubmit);



    };

    handelStart = (element) => {
        /*Hier wordt de waarde van som gestuurd*/
        this.quiz.setSom(element)

    }
    handelAnswer = (element) => {
        this.quiz.setAnswer(element)
    }

    handleNextQuestion = () => {
        this.quiz.setNextQuestion();
    };

    handlePreviousQuestion = () => {
        this.quiz.setPreviousQuestion();
    };

    handleSubmit = () => {
        this.quizView.showResult();

    };
}

