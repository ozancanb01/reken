export class Question {
    constructor(id,question) {
        this.id = id;
        this.question = question;


    }

    //getquestion id heelt de id van question op
    getQuestionID() {
        return this.id;
    }
    //getquestion haalt de array met vragen opn
    getQuestion() {
        return this.question.question;
    }


}