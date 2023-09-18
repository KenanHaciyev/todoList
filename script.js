window.addEventListener('DOMContentLoaded', () => {
	(input = document.querySelector('.form__input')),
		(btnTrigger = document.querySelector('.form__submit')),
		(container = document.querySelector('.container'));
	const todos = [];

	btnTrigger.addEventListener('click', (e) => {
		e.preventDefault();
		fetch('https://dummyjson.com/todos')
			.then((res) => res.json())
			.then(console.log);
		// const task = input.value;
		// todos.push(task);
		// console.log(task);
		// input.value = '';

		// const list = document.createElement('div');
		// list.classList.add('todo-item');
		// todos.forEach((todoItem) => {
		// 	const todo = document.createElement('div');
		// 	todo.classList.add('todo');
		// 	todo.textContent = todoItem;
		// 	list.append(todo);
		// });
		// container.append(list);
	});
});
