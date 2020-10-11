import {Question} from './Question.js'
import {Questions} from './Questions.js'
import {QuizEvent} from "./QuizEvent.js";



export class Quiz extends EventTarget{

    constructor() {
        super();
        this.questions=[];
        this.answerenCheck=[] ;
        this.currentIndex=0;
        this.questionsArray=[];
        this.answeren=[];
        this.waarde=0;

    }
    /*Hier kijk ik welke som de gebruiker wil en dat wordt dan in Questions gemaakt en wordt terug gestuurd naar this.questions*/
    setSom(element){

        this.ques=new Questions();


        if (element.value==="+"){
            this.questions=this.ques.plusSommen();
            this.reset()

            return this.questions
        }
        else if (element.value==="-"){
            this.questions=this.ques.minSommen();
            this.reset()
            return this.questions
        }
        else if (element.value==="X"){
            this.questions=this.ques.keerSommen()
            this.reset()
            return this.questions
        }
        else if (element.value==="/") {
            this.questions=this.ques.deelSommen();
            this.reset()
            return this.questions
        }else {
        }

    }

    reset(){

        let id = 1;
        for(let question of this.questions) {
            this.questionsArray.push(new Question(id++, question));

        }
        this.currentIndex = 0;
        this._commit();
    }

    /*Hier kijk ik of de antwoorden goed of fouten zijn en dat sla ik in array op.*/
    getCorrectAnswer(){


      for (let b=0;b<10;b++){
          if (this.questions[b].answer===parseInt(this.answeren[b])){

              this.answerenCheck[b]="goed";


          }else if (this.answeren[b]===undefined){
              this.answeren[b]="Geen Antword gegeven"
              this.answerenCheck[b]="fout"
          }

          else{
              this.answerenCheck[b]="fout"
          }
      }
    }

    /*Hier zet ik de vorige vraag terug*/
    setPreviousQuestion() {
        this.currentIndex--;
        this._commit();

        this.waarde--
    }
    /*Hier zet ik de volgende vraag*/
    setNextQuestion() {
        this.currentIndex++;
        this._commit();
    }
    /*Hier krijg ik waarde van antwoord via view en dat sla ik in array op*/
  setAnswer(answer){
      if (answer===""){
          this.answeren[this.waarde]="0";
          this.waarde++
      }else if (answer===undefined){
      }else {
          this.answeren[this.waarde]=answer;
          this.waarde++;
      }
    }
    getQuestions() {
        return this.questionsArray;
    }
    _commit() {
        this.dispatchEvent(new QuizEvent(this.questionsArray, this.currentIndex))
    }

}
