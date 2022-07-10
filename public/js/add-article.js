async function newFormHandler(event) {
    event.preventDefault();
    const title = document.querySelector('#art_title').value;
    const art_body = document.querySelector('#post-text').value;
    const response = await fetch('/', {
        method: 'POST',
        body: JSON.stringify({
            title,
            art_body,
            // date_created
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    //if the article is added, the 'homepage' template will be rerendered
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to add article');
    }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
  
