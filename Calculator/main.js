let left = null , right = null , oper  = null;  equip = false

function save(){
    const input = document.getElementById('calculator-input');
    let value = "";

    if(left === null) 
        return;
    value += left + " ";
    input.value = value;

    if(oper === null)
        return;
    value += oper + " ";
    input.value = value;

    if(right === null)
        return;
    value += oper + " ";
    input.value = value;

    if(equip){
        let result = "";
        switch(oper){
            case "+":
                result = parseInt(left) + parseInt(right)
                break;
            case "-":
                result = parseInt(left) - parseInt(right)
                break;
            case "*":
                result = parseInt(left) * parseInt(right)
                break;
            case "/":
                result = parseInt(left) / parseInt(right)
                break;
        }
        value = "= " + result;
        input.value = value;
    }
}


function inputNum (num) {
    if(oper === null){
        if(left === null){
            left = `${num}`
        }
        else{
            if(num === 0 && parseInt(left) === 0)
                return;
            left += `${num}`
        }
    }
    else{
        if(right === null){
            right += `${num}`
        }
        else{
            if(num === 0 && parseInt(right) === 0)
                return;
            right += `${num}`
        }
    }
    save();
}

function inputOp (op){
    if(left === null)
        return;
    oper = op;
}