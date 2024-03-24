(() => {
  // $ 함수는 CSS 선택자에 해당하는 모든 요소를 반환
  const $ = (select) => document.querySelectorAll(select);

  // 드래그 가능한 요소와 컨테이너를 가져옴
  const draggables = $('.draggable');
  const containers = $('.container');

  // 각 드래그 가능한 요소에 이벤트 리스너를 추가
  draggables.forEach(el => {
    el.addEventListener('dragstart', () => {
        el.classList.add('dragging');
    });

    el.addEventListener('dragend', () => {
        el.classList.remove('dragging')
    });
  });

  // 특정 컨테이너에서 마우스 위치에 따라 드래그하는 요소를 결정하는 함수
  function getDragAfterElement(container, y) {
    // 드래그 중이 아닌 모든 드래그 가능한 요소를 가져옴
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
  
    // 마우스 위치에 가장 가까운 요소를 찾음
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect() 
      // 마우스 위치와 해당 요소의 상대적인 위치를 계산
      const offset = y - box.top - box.height / 2 
      // 가장 가까운 요소를 찾아 반환
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child } 
      } else {
        return closest
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element
  };

  containers.forEach(container => {
    container.addEventListener('dragover', e => {
      e.preventDefault()
      // 마우스 위치에 따라 드래그 가능한 요소를 찾음
      const afterElement = getDragAfterElement(container, e.clientY); 
      // 현재 드래그 중인 요소를 가져옴
      const currentDraggable = document.querySelector('.dragging'); 
      // 드래그 가능한 요소를 마우스 위치에 따라 이동
      container.insertBefore(currentDraggable, afterElement); 
    })
  });
})();
