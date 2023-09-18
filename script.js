window.addEventListener('DOMContentLoaded', () => {
	const input = document.querySelector('.form__input');
	const addBtn = document.querySelector('.form__submit');
	const list = document.querySelector('.list');
	const path = 'https://dummyjson.com/todos';
	let todos = [];

	const createTodoElements = () => {
		list.innerHTML = '';
		todos.forEach(todoItem => {
			const todo = document.createElement('li');
			todo.classList.add('todo');
			todo.textContent = todoItem.todo;

			const deleteSpan = document.createElement('span');
			deleteSpan.textContent = '❌';
			deleteSpan.setAttribute('id', todoItem.id);
			deleteSpan.classList.add('deleteSpan');
			todo.prepend(deleteSpan);

			const isChecked = document.createElement('input');
			isChecked.setAttribute('type', 'checkbox');
			isChecked.setAttribute('id', todoItem.id);
			isChecked.classList.add('checkbox');
			todo.prepend(isChecked);

			list.append(todo);
		});

		document.querySelectorAll('.deleteSpan').forEach(item => {
			item.addEventListener('click', () => {
				deleteData(item.getAttribute('id'));
			});
		});

		document.querySelectorAll('.checkbox').forEach(item => {
			item.addEventListener('change', e => {
				updateData(item.getAttribute('id'));
				if (e.target.checked) {
					item.parentElement.classList.add('checked');
				} else {
					item.parentElement.classList.remove('checked');
				}
			});
		});
	};

	const addTodo = () => {
		addBtn.addEventListener('click', e => {
			e.preventDefault();
			if (!input.value.trim()) {
				return;
			}

			const todo = {
				todo: input.value,
				completed: false,
				userId: 100,
			};
			input.value = '';
			postData(todo);
		});
	};

	const getData = async () => {
		try {
			await fetch(`${path}?limit=10`)
				.then(res => res.json())
				.then(data => (todos = data.todos));
			createTodoElements();
		} catch (e) {
			console.error(e);
		}
	};

	const postData = async body => {
		try {
			await fetch(`${path}/add`, {
				method: 'POST',
				body: JSON.stringify(body),
				headers: { 'Content-Type': 'application/json' },
			})
				.then(resp => resp.json())
				.then(data => todos.push(data)); //For every new post dummyjson generate the same id: 151 - doesn't matter you created
			createTodoElements(); // just 1 todo or 10 - all of them will have the same id
		} catch (e) {
			console.error(e);
		}
	};

	const deleteData = async id => {
		try {
			await fetch(`${path}/${id}`, {
				method: 'DELETE',
			})
				.then(res => res.json())
				.then(() => {
					todos = todos.filter(todo => todo.id != id);
					createTodoElements();
				});
		} catch (e) {
			console.error(e);
		}
	};

	const updateData = async id => {
		try {
			const todo = todos.find(todo => todo.id == id);
			await fetch(`${path}/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					completed: !todo.completed,
				}),
			})
				.then(res => res.json())
				.then(data => (todo.completed = data.completed));
		} catch (e) {
			console.error(e);
		}
	};

	getData();
	addTodo();
});
