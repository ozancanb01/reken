import {QuizEvent} from "../model/QuizEvent.js";

export class QuizView {

    constructor(quiz) {
        this.l=1;
        this.quiz = quiz;
        this.quiz.addEventListener(QuizEvent.CHANGED, this.onQuestionsChanged);
        this.g=0;
        this.questions = this.quiz.getQuestions();
    }

    getElement(selector) {
        const element = document.querySelector(selector);
        return element
    }

    onQuestionsChanged = event => {

        this.showQuestion(event.questions[event.current]);
        this.showNav(event.questions[event.current], event.questions);

    };
    /*hier wacht op hij handeler als er gedrukt wordt dan stuurt hij waarde terug en wordt volgende pagina gelaaden */
    bindNextQuestionButton(handler) {

        this.next = this.getElement("#volgende");
        this.next.addEventListener('click', event => {
            handler();
            this.l++
        })
    }
    /*hier wacht op hij handeler als er gedrukt wordt dan stuurt hij waarde terug en wordt volgende pagina gelaaden */
    bindPreviousQuestionButton(handler) {
        this.next = this.getElement("#vorige");
        this.next.addEventListener('click', event => {
            handler();
            this.l--
        })
    }
    /*hier wacht op hij handeler als er gedrukt wordt dan stuurt hij waarde terug en wordt volgende pagina gelaaden */
    bindSubmitButton(handler) {

        this.submit = this.getElement("#inleveren");
        this.submit.addEventListener('click', event => {

            handler();

        })
    }
    /*Hier start ik de toets en gaat naar toets pagina*/
   bindStartButton(handler){
        const start=document.querySelectorAll("#start");
        start.forEach(element=>element.addEventListener('click',event=>{
            const selectElement = document.querySelector('#operator');

            if (selectElement.value==="Kies"){
                /*Als er niks wordt gekozen dan wordt er waarschuwing gegeven aan user*/
                let war =document.querySelector("#warning")
                war.style["display"]="block"
                war.style["marginLeft"]="8rem"
                war.style["marginBottom"]="1rem"
            }else {
                handler(selectElement)
                this.showQuiz()
            }
        }))
    }
    /*Hier doe ik eerste pagina weg en laat  ik de quiz zien */
    showQuiz(){
        let div = document.querySelector("#container");
        div.style['display']='none';
        let main = document.querySelector("#content");
        main.style['display']='block';
        let link =document.querySelector("#style1");
        link.href="./css/som.css";


    }
    /*Hier pak ik antwoord van user*/
    bindAnswer(handler){
        let answer=document.getElementById("answer");
        answer.addEventListener("focusout",event=>{
            handler(answer.value)
            this.addColor(answer.value)
        })
    }
    /*Hier mee laat ik vragen zien*/
    showQuestion(currentQuestion) {
        if (currentQuestion!=undefined){
            const tip=this.getElement("#tip");
            const question = this.getElement('#vraag');
            tip.innerHTML="Vraag "+currentQuestion.getQuestionID()+" : Vul het juiste antwoord in."
            question.innerHTML = currentQuestion.getQuestion()+"= ";

        }

    }
    /*Hier wordt laat ik de buttonen zoals vorige ,inleveren en volgende zien */
    showNav(currentQuestion, questions) {

        if (currentQuestion!=undefined){

            if (currentQuestion.getQuestionID() > 1) {
                this.getElement('#vorige').setAttribute('style', 'display:block');
            } else {
                this.getElement('#vorige').setAttribute('style', 'display:none');
            }

            if (currentQuestion.getQuestionID() < questions.length) {
                this.getElement('#volgende').setAttribute('style', 'display:block');
            } else {
                this.getElement('#volgende').setAttribute('style', 'display:none');
            }
            if (currentQuestion.getQuestionID() === 10) {
                this.getElement('#inleveren').style['display'] = 'block';
            }
            if (currentQuestion.getQuestionID() === 10) {
                this.getElement('#inleveren').style['display'] = 'block';
            } else {
                this.getElement('#inleveren').style['display'] = 'none';
            }
        }



    }
    /*Hier geef ik kleur aan bovenstaande rond dingen als er antwoord gegeven is */
    addColor(element){

        if(element===""){
            document.querySelector("#somNummer"+[this.l]).style.backgroundColor="orange";

        }
        else {
            document.querySelector("#somNummer"+[this.l]).style.backgroundColor=`#FFF8DC`;
        }

    }

    /*Hier wordt weergegeven of gebruiker voldoende of onvoeldende heeft*/
    showCon(){
        for (let i=0;i<10;i++){
            if (this.quiz.answerenCheck[i]==="goed"){
                this.g++
            }
        }


        let aantal=document.querySelector("#con")
       aantal.style['display']="block";
        if (this.quiz.answerenCheck[this.g>=6]){

            aantal.innerHTML="U hebt "+this.g+" van 10 vragen goed dus u heeft een voldoende";
        }
        else {
            aantal.innerHTML="U hebt "+this.g+" van 10 vragen goed dus u heeft een onvoldoende";
        }
    }

    /*Hier wordt vragen ,goede antworden en antwoorden van gebruiker weergegeven in een tabel*/
    showResult(){

        let questions = this.quiz.getQuestions();

        let contentHTML = this.getElement("#content");
        contentHTML.style['display'] = 'none';

        let result = this.getElement("#resultaat");
        result.style['display'] = 'block';


        let table = document.createElement("table");
        table.style.width = '50%';

        table.style.marginTop="8rem";
        table.style.marginLeft=`30rem`;



        let thead = table.createTHead();
        let row = thead.insertRow();

        let heads = ["nummer", "vraag", "jouw antwoord", "juiste antwoord", "oordeel"];
        for (let head in heads) {
            let th = document.createElement("th");
            th.style.backgroundColor=`#E0FFFF`;
            let text = document.createTextNode(heads[head]);
            th.appendChild(text);
            row.appendChild(th);
        }

        this.quiz.getCorrectAnswer()

        for (let i =0;i<questions.length; i++) {

            let row = table.insertRow();


            row.style.backgroundColor=`#F0FFF0`;

            let cell = row.insertCell();
            let text = document.createTextNode(questions[i].id);
            cell.appendChild(text);

            cell = row.insertCell();
            text = document.createTextNode(questions[i].question.question);
            cell.appendChild(text);


            cell = row.insertCell();
            text = document.createTextNode(this.quiz.answeren[i]);
            cell.appendChild(text);


            cell = row.insertCell();
            text = document.createTextNode(questions[i].question.answer);
            cell.appendChild(text);

            cell = row.insertCell();
            text = document.createTextNode(this.quiz.answerenCheck[i]);
            cell.appendChild(text);

        }
        this.showCon()
        result.appendChild(table);
        let playAgainButton = document.createElement('button');
        playAgainButton.id = 'start';
        playAgainButton.style.padding="1rem"
        playAgainButton.style.backgroundColor="orange"
        playAgainButton.style.color=`white`
        playAgainButton.style.border=`none`
        playAgainButton.innerHTML = 'Nog een keer';
        playAgainButton.style.marginLeft="57rem"
        playAgainButton.style.marginTop="15rem"
        playAgainButton.addEventListener('click', event => {
            location.reload();
        });
        result.appendChild(playAgainButton);
}
}