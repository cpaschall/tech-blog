const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#art-title').value.trim();
    const artText = document.querySelector('#art-text').value.trim();
  
    if (title && artText) {
      const response = await fetch(`/api/articles`, {
        method: 'POST',
        body: JSON.stringify({ title, artText }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create blog post');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  document.querySelector('.new-article-form').addEventListener('submit', newFormHandler);
  
  document.querySelector('.article-list').addEventListener('click', delButtonHandler);
  