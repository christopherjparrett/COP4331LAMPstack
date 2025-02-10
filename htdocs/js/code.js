const urlBase = 'http://proctest.christopherjparrett.xyz/php';
const extension = 'php';



function doLogin()
{
	userId = 0;
	
	let login = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;
//	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

	let tmp = {login:login,password:password};
//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		

				saveCookie();
	
				window.location.href = "contactsPage.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "userId=" + userId + ";expires=" + date.toGMTString();
}

function CheckSamePass()
{
	
	let password = document.getElementById("password").value;
	let confirm = document.getElementById("passwordConfirm").value;

	if(password==null || password == ""){
	//the user hit button without entering password so we can just fail here
		document.getElementById("LoginResult").innerHTML = "Please enter a password";
		return;
	}
	else if(password!=confirm){
	//this means that the user input 2 different passwords
		document.getElementById("LoginResult").innerHTML = "Passwords do not match";
		return;
	}
	else{
		document.getElementById("LoginResult").innerHTML = "Success";
		//put in a function here to send user and pass to database to save it
		//we need to make sure if the username already exists it doesnt get overwritten
		return;
	
	
	
	}
}
