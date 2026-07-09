class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

//task1

async function loadJson(url) {
    let response = await fetch(url)
    if(response.status == 200) {
        return await response.json(); //Why use await here?
        return response.json();
    } else {
        throw new HttpError(response);
    }
    
}

loadJson('https://javascript.info/no-such-user.json')
  .catch(console.log); // Error: 404
  
loadJson('https://api.github.com/users/JatinKr-tech')
    .then(console.log)
    .catch(console.log); // Error: 404

//task2

async function demoGithubUser() {
    try {
        let name = await prompt("Enter a name?", "iliakan");
        let user = await loadJson(`https://api.github.com/users/${name}`);
        console.log((`Full name: ${user.name}.`));
    } catch (err) {
        if (err instanceof HttpError && err.response.status == 404) {
        console.log("No such user, please reenter.");
        return demoGithubUser();
      } else {
        throw err;
      }
    }
}

// demoGithubUser();

//

async function demoGithubUser2() {

    let user;
    while(true){

        try {
            let name = await prompt("Enter a name?", "iliakan");
            user = await loadJson(`https://api.github.com/users/${name}`);
            break;
        } catch (err) {
            if (err instanceof HttpError && err.response.status == 404) {
            console.log("No such user, please reenter.");
          } else {
            throw err;
          }
        }
    }
    
    console.log((`Full name: ${user.name}.`));
    return user;
}

demoGithubUser2();

//task3

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
    wait().then(result=>console.log(result+5))
}
f()