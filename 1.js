// Task 1

const btnGetUsers = document.querySelector("#btnGetUsers");
const btnAddUser = document.querySelector("#btnAddUser");
const btnRemoveUser = document.querySelector("#btnRemoveUser");
const btnUpdateUser = document.querySelector("#btnUpdateUser");

const ourTable = document.querySelector("#table-row").textContent.trim();
const compiled = _.template(ourTable);

const updateView = users => {
  let htmlString = "";

  users.forEach(user => {
    htmlString += compiled(user);
  });

  userTableBody.innerHTML = htmlString;
};

let myData = [];


const userList = () => 
	fetch("http://fecore.net.ua/rest/")
		.then(response => {
			if (response.ok) return response.json();
			throw new Error("Error");
		})
		.then(data => {
			myData = data;
		})
		.catch(error => {
			console.error("Error: ", error);
		});

userList();


const getUsers = () => {
	updateView(myData);
};

btnGetUsers.addEventListener("click", getUsers);


const AddUser = () => {

	function uniId (firstKey) {
		return firstKey.id != document.querySelector("#userId").value;
	}

	if (myData.every(uniId)) {
		myData.push({id: document.querySelector("#userId").value, name: document.querySelector("#userName").value, score: document.querySelector("#userScore").value});	
		console.log(myData);
	}

};

btnAddUser.addEventListener("click", AddUser);


const removeUser = () => {

	for (let key in myData) {
		if (document.querySelector("#removeId").value == myData[key].id) {
			myData.splice(key,1);
			console.log(myData);
		}
	}

};

btnRemoveUser.addEventListener("click", removeUser);


const updateUser = () => {

	for (let key in myData) {
		if (document.querySelector("#changeUserId").value == myData[key].id) {
			myData[key].id = document.querySelector("#changeUserId").value;
			myData[key].name = document.querySelector("#changeUserName").value;
			myData[key].score = document.querySelector("#changeUserScore").value;
			console.log(myData[key]);
		}
	}

};

btnUpdateUser.addEventListener("click", updateUser);