
// const yargs = require("yargs");
// const handlerFunctions = require("./to-do-handler.mjs")

import yargs from "yargs";
import { hideBin } from 'yargs/helpers'
import {addNewToDo , getAllToDoList, removeToDo, listToDos, readToDo} from "./to-do-handler.mjs";

//console.log(handlerFunctions)


const yarg = yargs(hideBin(process.argv));
yarg.version('1.0.0')

// add new to do 
yarg.command({
	command: "add",
	describe: "adding new to do to list",
	builder: {
		title : {
			describe : "To do title",
			demandOption : true,
			type: 'string'
		},
		body: {
			describe : "To do body description",
			demandOption : true,
			type: 'string'
		},
	},
	handler: function(argv){

		addNewToDo(argv.title, argv.body)

		console.log("adding done title ==>", argv.title)
		console.log("adding done body ==>", argv.body)
	}
})


// remove 
yarg.command({
	command: "remove",
	describe: "removing To-Do from list",
	builder: {
		title : {
			describe : "To do title",
			demandOption : true,
			type: 'string'
		},
		
	},

	handler(argv){
		
		removeToDo(argv.title)

		//console.log("To-do removed successfully ==>", argv.title)
		
	}
})


// read 
yarg.command({
	command: "read",
	describe: "read the To-Do title and body",
builder:{
	title:{
		describe : "To do title",
		demandOption : true,
		type: 'string'
	}
},
	handler(argv){
		
		readToDo(argv.title)
	}
})


// list 
yarg.command({
	command: "list",
	describe: "show the list of all To-Dos",
	
	handler(){
		
		listToDos();
	}
})

yarg.parse()



