

const store = JSON.parse(localStorage.getItem('store'));
console.log(store);


let user_info = JSON.parse(localStorage.getItem('user_info'));
const profile = document.getElementById('profile');
profile.textContent = user_info[0][0][0].toUpperCase();

let recipe = JSON.parse(localStorage.getItem('recipe'));
const title = document.getElementById('title');
const rec = document.getElementById('rec1');
const fav = document.querySelector('.detail_fav');
title.textContent = recipe;


if (user_info[4]=='null') console.log('string null');
else if (user_info[4]==null) console.log('type null');
else console.log(user_info[4]);


    
    
document.getElementById('add_fav').addEventListener('click', async (event) => {
    if (user_info[4]=='NIL'){
        event.preventDefault();
    
        const user_id = user_info[1];
        const liked = recipe;
        console.log(user_id,liked);
        
        try {
            
            const response = await fetch('http://127.0.0.1:5000/addlike', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id,liked })
            });
            const result = await response.json();
            console.log(result.message);
            user_info[4]=liked;
            localStorage.setItem('user_info', JSON.stringify(user_info));
            fav.setAttribute('src','star_filled.png');
    
            
        } catch (error) {
            console.log('here1');
            console.error('Error adding user:', error);
        }

    }
    else if (user_info[4].includes(recipe)){
        const new_liked = user_info[4].replace(recipe,'')
       
        event.preventDefault();
    
    const user_id = user_info[1];
    const liked = new_liked;
    console.log(user_id,liked);
    
    try {
        
        const response = await fetch('http://127.0.0.1:5000/addlike', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id,liked })
        });
        const result = await response.json();
        console.log(result.message);
        user_info[4]=liked;
        localStorage.setItem('user_info', JSON.stringify(user_info));
        fav.setAttribute('src','star_empty.png');

        
    } catch (error) {
        console.log('here1');
        console.error('Error adding user:', error);
    }

    }

    else{

    event.preventDefault();
    
    const user_id = user_info[1];
    const liked = user_info[4]+' '+recipe;
    console.log(user_id,liked);
    
    try {
        
        const response = await fetch('http://127.0.0.1:5000/addlike', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id,liked })
        });
        const result = await response.json();
        console.log(result.message);
        user_info[4]=liked;
        localStorage.setItem('user_info', JSON.stringify(user_info));
        fav.setAttribute('src','star_filled.png');

        
    } catch (error) {
        console.log('here1');
        console.error('Error adding user:', error);
    }
}

    
});
    
      
    
    
    

const userInfoContainer = document.getElementById('recipeinfo');
const nutrect = document.getElementById('nut_rect');
const nuttext = document.getElementById('nut_text');
const ratingtext = document.getElementById('rating_text');
const rating_cont = document.querySelector('.star_container');
const yellow_container = document.querySelector('.yellow_cont');


for (i in store){
    if (store[i][0]==recipe){
    
        const imag = document.createElement('img');
        imag.setAttribute('src',store[i][3]);
        imag.className = 'image';
        rec.appendChild(imag);

        const ingText = document.createElement('div');
        ingText.className = 'text_ing';
        ingText.textContent = store[i][1];
        rec.appendChild(ingText);

        const time = document.createElement('div');
        time.className = 'time';
        time.textContent = store[i][2].toString() + ' minutes';
        rec.appendChild(time);

        const cuisine = document.createElement('div');
        cuisine.className = 'cuisine';
        cuisine.textContent = store[i][7];
        rec.appendChild(cuisine);

        const serving = document.createElement('div');
        serving.className = 'serving';
        serving.textContent = store[i][4].toString();
        rec.appendChild(serving);

        for (j=0;j<store[i][5].length;j++){
            const infoElement = document.createElement('div');
            infoElement.textContent = store[i][5][j];
            userInfoContainer.appendChild(infoElement);
        }


        let y = 650 + 120*store[i][5].length;
        console.log('body position: ',y);
        nutrect.style.top = y.toString()+'px';
        y-=90
        console.log('head position:',y);
        nuttext.style.top = y.toString()+'px';
        y+=200;
        ratingtext.style.top = y.toString()+'px';
        y+=100;
        yellow_container.style.top = y.toString()+'px';
        rating_cont.style.top = y.toString()+'px';
       
        const n = document.createElement('div');
        n.textContent = store[i][6];
        nutrect.appendChild(n);


        rating = store[i][8];
        

        for (k=0;k<rating;k++){
            
            const rate = document.createElement('img');
            rate.setAttribute('src','yellow_star.png');
            rate.className = 'star';
            yellow_container.appendChild(rate);
            
        }
        
       

        
        
        if (user_info[4]!='NIL'){
            if (user_info[4].includes(recipe)) fav.setAttribute('src','star_filled.png');
            else fav.setAttribute('src','star_empty.png');
        }
        else fav.setAttribute('src','star_empty.png');
        
       

        
    }
}

const readAloudButton = document.getElementById('read-aloud');

readAloudButton.addEventListener('click', () => {
  
        const textToRead = userInfoContainer.innerText;
        const speech = new SpeechSynthesisUtterance(textToRead);
        speechSynthesis.speak(speech);
        reading = true;
 
    
})

function change_rating(){
    yellow_container.innerHTML='';
    for (k=0;k<rating;k++){
        
        const rate = document.createElement('img');
        rate.setAttribute('src','yellow_star.png');
        rate.className = 'star';
        yellow_container.appendChild(rate);
        
    }
    for (i in store){
        if (store[i][0]==recipe){
            store[i][8] = rating;
            
            localStorage.setItem('store', JSON.stringify(store));
    }
}
}



function s1(){
    console.log('1');
    rating = 1;
    
    change_rating();
}
function s2(){
    console.log('2');
    rating = 2;
    change_rating();
}

function s3(){
    console.log('3');
    rating = 3;
    change_rating();
}
function s4(){
    console.log('4');
    rating = 4;
    change_rating();
}
function s5(){
    console.log('5');
    rating = 5;
    change_rating();
}