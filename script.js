


document.getElementById('userForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const user_id = document.getElementById('user_id').value;
    const password = document.getElementById('password').value;
    const mobile = document.getElementById('mobile').value;
    try {
        const response = await fetch('http://127.0.0.1:5000/adduser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name,user_id, password,mobile })
        });
        const result = await response.json();
        location.href = "login.html";

        
    } catch (error) {
        console.error('Error adding user:', error);
    }
});



