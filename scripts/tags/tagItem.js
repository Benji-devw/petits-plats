
function displayTag(item) {
  const tagsWrapper = document.querySelector('.tags');
  const existingTag = tagsWrapper.querySelector(`span.tag-element[data-tag="${item}"]`);

  if (!existingTag) {
      const tag = document.createElement('span');
      tag.classList.add('tag-element', 'px-4', 'py-2', 'm-2');
      tag.setAttribute('data-tag', item);

        // add icon delete in tag-element
        const icon = document.createElement('i');
        icon.classList.add('fas', 'fa-times', 'cursor-pointer');
        tag.textContent = item;
        // tag.appendChild(icon);
        
      tag.addEventListener('click', () => {
          tag.remove()
      });
      
      tagsWrapper.appendChild(tag);
  }
}


export function createTag(item) {
  const liElement = document.createElement('li');
  liElement.textContent = item;
  liElement.classList.add('item')

  displayTag(item)
  
  return liElement
}
