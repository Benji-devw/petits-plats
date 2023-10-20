
function tagElement(item) {
  const tagsWrapper = document.querySelector('.tags');
  const existingTag = tagsWrapper.querySelector(`span.tag-element[data-tag="${item}"]`);

  if (!existingTag) {
      const tag = document.createElement('span');
      tag.classList.add('tag-element', 'px-4', 'py-2', 'm-2');
      tag.textContent = item;
      tag.setAttribute('data-tag', item);

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

  tagElement(item)
  
  return liElement
}
