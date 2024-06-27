
const store = JSON.parse(localStorage.getItem('store'));
console.log(store);


let user_info = JSON.parse(localStorage.getItem('user_info'));
const profile = document.getElementById('profile_t');
profile.textContent = user_info[0][0][0].toUpperCase();

const userInfoContainer = document.getElementById('userinfo');
const arr = ['User Name: ','User ID: ','',"Contact: ",'Favourites: '];

const rec = document.querySelector('.profile_rec');

let c = 0;
let d=0;
user_info.forEach(info => {
    const infoElement = document.createElement('div');
    if (c!=2 && c!=4){

        infoElement.textContent = arr[c]+info;
        userInfoContainer.appendChild(infoElement);
        
    }
    if (c==4){
        infoElement.textContent = arr[c];
        userInfoContainer.appendChild(infoElement);
        for (i in store){
            
            if (user_info[4].includes(store[i][0])){
                d+=1;
                h = 540 + 50*d;
                rec.style.height = h.toString()+'px';
                const infoElement = document.createElement('div');
                infoElement.textContent = store[i][0];
                userInfoContainer.appendChild(infoElement);
            }
        }
    }

    c++;
    
});
