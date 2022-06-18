async function newFormHandler(event) {
    event.preventDefault();
    const user_name = document.querySelector('#user_name').value;
    const password = document.querySelector('#password').value;
    const response = await fetch('/', {
        method: 'POST',
        body: JSON.stringify({
            user_name,
            password
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    //if the user is added, the 'homepage' template will be rerendered
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to add user');
    }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
  
