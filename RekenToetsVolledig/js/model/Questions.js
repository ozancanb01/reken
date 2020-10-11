export class Questions {



    constructor() {

    }

    /*Hier wordt de +,-,/,* sommen gecreëerd*/
    plusSommen(){
        let vragen = [];
        let object={
            question:"",
            answer:""
        }
        for (let i=0;i<10;i++){
            let a= Math.floor(Math.random()*99)+1;
            let b= Math.floor(Math.random()*99)+1;
            let c =a+b;
            vragen[i]= object={
                question: a +" + " +b,
                answer:c
            }
        }
        return vragen
    }
    minSommen(){
        let vragen =[];
        let object={
            question:'',
            answer:''
        };
        for (let i=0;i<10;i++){
            let a=Math.floor(Math.random()*99)+1;
            let b=Math.floor(Math.random()*99)+1;
            if (a>=b){
                let c =a-b;
                vragen[i]= object={
                    question: a +" - " +b,
                    answer:c
                }
            }else{
                i--;
            }
        }
        return vragen;
    }
    deelSommen(){
       let vragen=[];
       let object={
           question:'',
           answer:''
       };
       for (let i=0;i<10;i++){
           let a=Math.floor(Math.random()*40)+2;
           let b=Math.floor(Math.random()*40)+2;
           if (a>=b){
               let c =a/b;
               let d = Math.round(c)
               vragen[i]= object={
                   question: a +" : " +b,
                   answer:d
               }
           }else{
               i--;
           }
       }

        return vragen;
    }
    keerSommen(){
        let vragen=[];
        let object={
            question:'',
            answer:''
        };
        for (let i=0;i<10;i++){
            let a=Math.floor(Math.random()*99)+1;
            let b=Math.floor(Math.random()*99)+1;
            let c=a*b;
            vragen[i]= object={
                question:a+" x "+b,
                answer: c
            }
        }
        return vragen
    }
}
