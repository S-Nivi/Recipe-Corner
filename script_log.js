document.getElementById('userLog').addEventListener('submit', async (event) => {
    event.preventDefault();
   
    const user_id = document.getElementById('user_id').value;
    const password = document.getElementById('password').value;
 
    try {
        const response = await fetch('http://127.0.0.1:5000/checkuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id, password})
        });
        const result = await response.json();
        
        if (result.message[0][2]==parseInt(password)){
            localStorage.setItem('user_info', JSON.stringify(result.message[0]));
            console.log("verified");
            location.href = "ingred.html";
        }
        else{
            console.log('here');
            alert("Kindly recheck your login credentials");
        }
    } catch (error) {
        alert("Kindly recheck your login credentials");
    }
});




