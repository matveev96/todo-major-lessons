import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";

type PropsType = {
	title: string
	tasks: TaskType[]
	removeTask: (taskId: string) => void
	changeFilter: (filter: FilterValuesType) => void
	addTask: (title: string) => void
	changeIsDone: (taskId: string, isDone: boolean) => void
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask, changeIsDone}: PropsType) => {
	const [taskTitle, setTaskTitle] = useState('')
	const [error, setError] = useState<string | null>(null);
	const [filterButtonStyle, setFilterButtonStyle] = useState('');

	const addTaskHandler = () => {
		if(taskTitle.trim()) {
			addTask(taskTitle.trim())
			setTaskTitle('')
		} else {
			setError('Title is required')
		}

	}

	const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(event.currentTarget.value)
		setError(null)
	}

	const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			addTaskHandler()
		}
	}

	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		changeFilter(filter)
		setFilterButtonStyle(filter)
	}

	const onChangeHandler = (taskId: string ,checked: boolean) => {
		changeIsDone(taskId, checked)
	}

	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input
					value={taskTitle}
					className={error ? 'error' : ''}
					onChange={changeTaskTitleHandler}
					onKeyUp={addTaskOnKeyUpHandler}
				/>
				<Button title={'+'} onClick={addTaskHandler}/>
				{error && <div className={'errorMessage'}>{error}</div>}
			</div>

			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{tasks.map((task) => {

							const removeTaskHandler = () => {
								removeTask(task.id)
							}
							// const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
							// 	changeIsDone(task.id, event.currentTarget.checked)
							// }

							return <li key={task.id} className={task.isDone ? 'isDone' : ''}>
								<input type="checkbox" checked={task.isDone} onChange={(event)=>onChangeHandler(task.id, event.currentTarget.checked)}/>
								<span>{task.title}</span>
								<Button onClick={removeTaskHandler} title={'x'}/>
							</li>
						})}
					</ul>
			}
			<div>
				<Button title={'All'} className={filterButtonStyle === 'all' ? 'activeFilter' : ''} onClick={()=> changeFilterTasksHandler('all')}/>
				<Button title={'Active'} className={filterButtonStyle === 'active' ? 'activeFilter' : ''} onClick={()=> changeFilterTasksHandler('active')}/>
				<Button title={'Completed'} className={filterButtonStyle === 'completed' ? 'activeFilter' : ''} onClick={()=> changeFilterTasksHandler('completed')}/>
			</div>
		</div>
	)
}
