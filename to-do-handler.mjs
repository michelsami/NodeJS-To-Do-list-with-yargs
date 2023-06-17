import fs from 'fs';
import chalk from 'chalk';


const allToDosFilePath = 'all-to-dos.json';

const getAllToDoList = (filepath)=>{
	
	try{
		const bufferToDos = fs.readFileSync(filepath);
	const stringToDos = bufferToDos.toString();
	const jsonToDos = JSON.parse(stringToDos);
		return jsonToDos

	}catch(e){
		return [];
	}
	
}


const addNewToDo = (toDoTitle, toDoBody)=>{

	const newToDo = {
		ToDo : toDoTitle,
		toDoBody : toDoBody
	}
	const allToDos = getAllToDoList(allToDosFilePath);

	const duplicated = allToDos.find((element)=> element.ToDo === toDoTitle)

	

	if(!duplicated){
		
		console.log("To-do added")
		allToDos.push(newToDo)


		saveUpdatedToDos(allToDos);
	}else{
		debugger;
		console.log("There is no To-do with the same name, please change the To-do title and try again")
	}

	
}

const saveUpdatedToDos = (updatedArray)=>{
	const stringArray = JSON.stringify(updatedArray)
	fs.writeFileSync(allToDosFilePath, stringArray)
}


const removeToDo = (toDoTitle)=>{
	const allToDos = getAllToDoList(allToDosFilePath);
	const updatedToDoListWithoutDuplication = allToDos.filter((toDo)=> toDo.ToDo != toDoTitle);

	if(JSON.stringify(allToDos) === JSON.stringify(updatedToDoListWithoutDuplication)){
		console.log(chalk.bgYellowBright.bold("There is no To-Do with the giving title, nothing to be removed"))
	}else{
		console.log(chalk.green.inverse("To-do removed successfully"))
	}
	saveUpdatedToDos(updatedToDoListWithoutDuplication);

	
}

const listToDos = ()=>{
	const allToDos = getAllToDoList(allToDosFilePath);
	
	if (allToDos.length == 0){
		console.log(chalk.yellow.inverse.bold("There are no To-dos yet!"))

	}else{
		console.log(chalk.white.inverse("Here are your notes!"))
		allToDos.forEach((todo)=>{
			console.log(todo.ToDo)
		})
	}
}


const readToDo = (toDoTitle)=>{
	
	const allToDos = getAllToDoList(allToDosFilePath);

	const duplicated = allToDos.find((element)=> element.ToDo === toDoTitle)

	if(duplicated){
		console.log(chalk.green.inverse.bold(`Your To-Do title is "${duplicated.ToDo}"`))
		console.log(chalk.green(`Your To-Do description is "${duplicated.toDoBody}"`))
		
	}else{
		console.log(chalk.red.inverse.bold("There is no To-do with the same Title, please change the To-do title and try again"))
	}

}

export {addNewToDo , getAllToDoList, removeToDo, listToDos, readToDo};