let id = 55
let direction = 0 //stock la direction du serpent
const historique = []
let compteurMouvement = 0
let compteurLongueurCorp = 0
let mathRandom = 0
const directionOppose = direction === 40 && e.keyCode === 38 || direction === 38 && e.keyCode === 40 || direction === 39 && e.keyCode === 37 || direction === 37 && e.keyCode === 39 
document.getElementById(`${id}`).style.background = "blue"

const snakeHead = (e) => { 
    
    move = () => {
        compteurLongueurCorp === 0 && (document.getElementById(`${id}`).style.background = null)       
///////////Bas
        if (e.keyCode === 40 && direction !== 38) {             
            if(id % 15 === 0){
                id = id - 14
            }else { 
                id = id + 1                                              
            } direction = 40
/////////Haut            
        }else if (e.keyCode === 38 && direction !== 40) {         
            if((id - 1) % 15 === 0){
                id = id + 14
            }else { 
                id = id - 1  
            }direction = 38  
/////////Droite            
        }else if (e.keyCode === 39 && direction !== 37) {         
            if(id >= 211 && id <= 225){
                id = id - 210
            }else { 
                id = id + 15                 
            }direction = 39
////////Gauche                
        }else if (e.keyCode === 37 && direction !== 39) {
            if(id >=1 && id <= 15){
                id = id + 210
            }else{  
                id = id - 15                          
            }direction = 37
        }
////////Game over
        for(let i = historique.length - compteurLongueurCorp - 1; i<historique.length - 1; i++){
            if(id === historique[i]){
                clearInterval(interval)
                document.getElementById("gameOver").style.visibility = "visible"
                for(let i=1; i<=225;i++){
                    document.getElementById(`${i}`).style.background = null
                }
                compteurMouvement = 0
                compteurLongueurCorp = 0                              
            } 
        }
        document.getElementById('score').textContent=`Score:  ${compteurLongueurCorp}`
        document.getElementById(`${id}`).style.background = "blue" 
        compteurMouvement = compteurMouvement + 1              
        if(compteurLongueurCorp !== 0){
            (document.getElementById(`${historique[compteurMouvement - 1]}`).style.background = "pink")
        }
////////Met en memoire toutes les cases ou est passé la tete du serpent
        historique[compteurMouvement] = id

        if(compteurLongueurCorp > 0){
            snakeBody()
        } 
////////Regarder si le serpent mange la nourriture si oui fait apparaître un nouvel aliment    
        if(id === mathRandom){    
            let div = document.getElementById(`${mathRandom}`)
            let img = document.getElementById(`img${compteurLongueurCorp }`)
            div.removeChild(img)
            document.getElementById(`${id}`).style.background = "blue"
            compteurLongueurCorp = compteurLongueurCorp + 1
            snakeFood()
        }
        // e.preventDefault()
    } 
////Arrete le setInterval a chaque changement de direction
    stop()
    stop = () => {
        clearInterval(interval)
    }
    
////Permet au serpent d'avancer tout droit tout seul    
    var interval = setInterval(move, 200)    
}
    document.addEventListener('keydown', snakeHead);
///////////////////////////////////////////////////////////////////////////////////

//Fait apparaître la nourriture
const snakeFood = () => { 
    mathRandom = Math.floor(Math.random() * 225)
    mathRandom === 0 && snakeFood()

////Empeche la nourriture d'apparaitre dans le corp du serpent
    for(let i = historique.length - (compteurLongueurCorp + 2) ; i<historique.length; i++){
        if(mathRandom === historique[i]){
            snakeFood()            
        }
    } 
    const food = document.createElement("img")
    food.src = './souris.jpg.png'
    const block = document.getElementById(`${mathRandom}`)
    block.appendChild(food).setAttribute("id", `img${compteurLongueurCorp}`)
}
snakeFood()

////////////////////////////////////////////////////////////////////////////////////

const snakeBody = () => {
    document.getElementById(`${historique[compteurMouvement - (compteurLongueurCorp + 1)]}`).style.background = null
}

