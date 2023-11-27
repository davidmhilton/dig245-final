
/* javascript */
var fortunes = [];
window.onload = readData();
var training = [];
learning();
generateFortune();

function readData(){
    fortunes = fortuneDB.split("\n");
}

function learning(){

    for (let i = 0; i < fortunes.length; i++ ){
        let words = fortunes[i].split(" ");
        for(let j = 0; j < words.length-2; j++){
            let sq = [words[j], words[j+1]];
            let next = words[j+2]
            let repeat = false
            for (let a = 0; a < training.length; a++){
                if(sq[0] === training[a].sequence[0] && sq[1] === training[a].sequence[1]){
                    training[a].rest.push(next);
                    repeat = true;
                    break;
                }
            }
            if (repeat === false){
                training.push({
                    sequence: sq,
                    rest: [next]
                });
            }
        }
    }
    // console.log(training);
    // for (let a  = 0; a < training.length; a++){
    //     console.log(training[a].sequence);
    //     console.log(training[a].rest);
    // }
}

function generateFortune(){
    let first_word = "";
    while (/[A-Z]/.test(first_word) === false){
        let rand_index = Math.floor(Math.random()*training.length);
        let obj = training[rand_index]; 
        first_word = obj.sequence[0];
        current_sequence = obj.sequence;
    }
    let generated_fortune = [current_sequence[0], current_sequence[1]];
    let next_word = "";
    // while (next_word.indexOf('.') === -1){
    while(location !== -1){
        var location = training.findIndex(function(obj) {
            if(obj.sequence[0] === current_sequence[0] && obj.sequence[1] === current_sequence[1]){
                return obj;
            }
        });
        if (location === -1){
            continue;
        }
        let object = training[location];
        let toPick = object.rest;
        let index = Math.floor(Math.random()*toPick.length);
        next_word = toPick[index];
        generated_fortune.push(next_word);
        current_sequence = [current_sequence[1], next_word];
        console.log(current_sequence);
    }
    console.log(generated_fortune);
}

let fortuneButton = document.getElementById("genFortune");

// fortuneButton.addEventListener({

// })
