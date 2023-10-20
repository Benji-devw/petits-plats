
function createTag(item) {
  const tagsWrapper = document.querySelector('.tags');
  const existingTag = tagsWrapper.querySelector(`span.tag-element[data-tag="${item}"]`);
  // let arr = []
  if (!existingTag) {
      const tag = document.createElement('span');
      tag.classList.add('tag-element', 'px-4', 'py-2', 'm-2');
      tag.textContent = item;
      tag.setAttribute('data-tag', item);
      // tag.addEventListener('click', () => {
      //     // arr.push(tag.textContent)
      //     console.log(tag.textContent);
      // });
      tagsWrapper.appendChild(tag);
  }
}


export function createLiElement(item, type) {
  const liElement = document.createElement('li');
  liElement.textContent = item;
  liElement.classList.add('item')
  liElement.addEventListener('click', () => {
      createTag(item, type)
  })
  return liElement
}
