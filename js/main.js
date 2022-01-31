// The appendChild() method appends(add) a node as the last child of a node. Note: Append means "Baad Ma" & Prepend means "Pehla".

										//-------------------------------------		Local Storage & Session Storage 	----------------------------------
// The localStorage and sessionStorage properties allow to save key/value pairs in a web browser.
 // The localStorage Object stores data with no expiration date. The data will not be deleted when the browser is closed, and will be available the next day, week, or year.
// On the other hand, sessionStorage Object is the vice-versa of localStorage Object.

 
const addBtn = document.querySelector('.addNote');

const updateData = ()=>{
	let textAreaData = document.querySelectorAll('.write-note');			//We've to use querySelectorAll in order to get all Elements of class '.write-note' at once stored in the array of NodeList, Instead of taking individual. 
	// console.log(textAreaData);											//NodeList(2) [textarea.write-note.hidden, textarea.write-note.hidden]
	
	let  textData = [];														//textData variable will require to store textAreaData one by one instead of once
		
	//	Note: forEach method is one of the several ways to loop through arrays, which takes usually takes 4 arguments(currentValue, indexNo.currentValue, requiredArray, this) under callBack function
	textAreaData.forEach((singleData)=>{									//Since, textAreaData is now a NodeList & forEach is the method of NodeList prototype.
		// console.log(singleData.value);									//Here, I'll get the current value of text field.
		
		return textData.push(singleData.value);                         	//it will return singleData back to textData & add it using push() method. textData=[singleData];					
	});								
	
	//LocalStorage (Going to store user's textData)
	localStorage.setItem('UserData', JSON.stringify(textData));			//JSON.stringify() method help in storing individual textData as string by convertingitfrom an array or object.
		
}
	
const addNote = (getBackData=' ')=>{
	const note = document.createElement('div');							//createElement()method of DOM object help to create a new HTML Element. Here, I've created a new 'div' Element
	const noteClass = note.classList.add('note');						//2). add() method of classList property added a new value of class in <div>. Output: <div class="note"></div>
	const htmlData = `
		<span class="fa delete-btn">&#xf00d;</span>
		<span class="fa save-btn">&#xf0c7;</span>
		<span class="fa edit-btn">&#xf044;</span>
		<div class="display-note ${getBackData?'':'hidden'}"></div>
		<textarea class="write-note ${getBackData? 'hidden':''}" autofocus="true"></textarea>`;

	document.body.children[2].appendChild(note);						//3). appendChild() method added 'note'. Output: <div class="notes-container"> <div class="note"></div> </div>

	note.insertAdjacentHTML('afterbegin',htmlData);				//insertAdjacentHTML('afterbegin') function will help in getting HTML DATA inside note Elementto print in the Document.
	// We've to keep the above instruction at the top before delcaring references of it's note Element. Because first it'll print in the document then only we can acces it references.
	
	
// Getting the References after generated HTMLData on the Document using insertAdjacentHTML();. Here, I'm getting references of all Elements laying under 'note' Element. 
	const editBtn = note.querySelector('.edit-btn');
	const saveBtn = note.querySelector('.save-btn');
	const delBtn = note.querySelector('.delete-btn');
	const displayNote = note.querySelector('.display-note');
	const textArea = note.querySelector('.write-note');

		//Getting Back Data from Local Storage
			if(getBackData){
				 textArea.value = getBackData;
				displayNote.innerHTML = textArea.value;
			displayNote.classList.remove('hidden');
			textArea.classList.add('hidden');
		}if(getBackData == ' '){
			displayNote.classList.add('hidden');
			textArea.classList.remove('hidden');
		}
		

		editBtn.addEventListener('click', ()=>{
			textArea.classList.remove('hidden');
			displayNote.classList.add('hidden');
		})

		let getText = ()=>{
			
		textArea.addEventListener('change',(event)=>{
			// console.log(getBackData);
			let textValue = event.target.value;		//event is the Object of all events. value is the property of target property of event Object.	Output: User's input text.
			displayNote.innerHTML = `${textValue}`;
			
			
			
	
			displayNote.classList.remove('hidden');
			textArea.classList.add('hidden');
			
			//LocalStorage's Function calling 
			updateData();
		});
		};
		saveBtn.addEventListener('click', getText());

	

		delBtn.addEventListener('click',()=>{
			note.remove();											  //remove() method will help to completely delete the genereated Element i.e. ('note' Element) from the document. 
			updateData();
		})
	
}

const UserData = JSON.parse(localStorage.getItem('UserData'));		//convert string into original format i.e. Here's Array.
if(UserData){
UserData.forEach((getBackData)=>{					//forEach() method help in getting data of array i.e. UserData one by one in a loop.
	// console.log(getBackData);
	addNote(getBackData);
})
}

addBtn.addEventListener('click', ()=>{
	addNote();
});
