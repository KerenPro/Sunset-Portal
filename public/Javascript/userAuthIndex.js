/**check user Authentication and Redirect Navbar**/
//Private redirection
const privateNav = document.getElementById("private-link");
privateNav.addEventListener("click", (event) => {
    console.log("I'm inside the check Auth User");
    const user = firebase.auth().currentUser;

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const userEmail = user.email;
            console.log(`Sign in user is ${userEmail}`);
            window.location.href = "./Includes/private.html";
        } else {
            console.log("I need to redirect");
            window.location.href = "./Includes/signUpSignIn.html";
        }
    });
});

//Lessons redirection
const lessonsNav = document.getElementById("lessons-link");
lessonsNav.addEventListener("click", (event) => {
    console.log("I'm inside the check Auth User");
    const user = firebase.auth().currentUser;

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const userEmail = user.email;
            console.log(`Sign in user is ${userEmail}`);
            window.location.href = "./Includes/Lessons.html";
        } else {
            console.log("I need to redirect");
            window.location.href = "./Includes/signUpSignIn.html";
        }
    });
});

//Rent Main Page redirection
const rentHomepageNav = document.getElementById("rent-homepage-link");
rentHomepageNav.addEventListener("click", (event) => {
    console.log("I'm inside the check Auth User");
    const user = firebase.auth().currentUser;

    firebase
        .auth()
        .onAuthStateChanged((user) => {
            if (user) {
                const userEmail = user.email;
                console.log(`Sign in user is ${userEmail}`);
                window.location.href = "./Includes/RentMainPage.html";
            } else {
                console.log("I need to redirect");
                window.location.href = "./Includes/signUpSignIn.html";
            }
        })
        .then(() => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    const userEmail = firebase.auth().currentUser.email;
                    firebase
                        .firestore()
                        .collection("Users")
                        .doc(`${userEmail}`)
                        .get()
                        .then((doc) => {
                            const userName = doc.data().name;
                            document.getElementById(
                                "helloUser"
                            ).innerHTML = `???????? ${userName}`;
                        });
                } else {
                    document.getElementById("helloUser").innerHTML = "???????? ????????";
                }
            });
        });
});

/**check user Authentication and Redirect services**/
//Lessons redirection
const lessonsService1 = document.getElementById("lessons-link-service1");
lessonsService1.addEventListener("click", (event) => {
    console.log("I'm inside the check Auth User");
    const user = firebase.auth().currentUser;

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const userEmail = user.email;
            console.log(`Sign in user is ${userEmail}`);
            window.location.href = "./Includes/Lessons.html";
        } else {
            console.log("I need to redirect");
            window.location.href = "./Includes/signUpSignIn.html";
        }
    });
});

//Lessons redirection
const lessonsService2 = document.getElementById("lessons-link-service2");
lessonsService2.addEventListener("click", (event) => {
    console.log("I'm inside the check Auth User");
    const user = firebase.auth().currentUser;

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const userEmail = user.email;
            console.log(`Sign in user is ${userEmail}`);
            window.location.href = "./Includes/Lessons.html";
        } else {
            console.log("I need to redirect");
            window.location.href = "./Includes/signUpSignIn.html";
        }
    });
});

//Rent Main Page redirection
const rentHomepageService = document.getElementById(
    "rent-homepage-link-service"
);
rentHomepageService.addEventListener("click", (event) => {
    console.log("I'm inside the check Auth User");
    const user = firebase.auth().currentUser;

    firebase
        .auth()
        .onAuthStateChanged((user) => {
            if (user) {
                const userEmail = user.email;
                console.log(`Sign in user is ${userEmail}`);
                window.location.href = "./Includes/RentMainPage.html";
            } else {
                console.log("I need to redirect");
                window.location.href = "./Includes/signUpSignIn.html";
            }
        })
        .then(() => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    const userEmail = firebase.auth().currentUser.email;
                    firebase
                        .firestore()
                        .collection("Users")
                        .doc(`${userEmail}`)
                        .get()
                        .then((doc) => {
                            const userName = doc.data().name;
                            document.getElementById(
                                "helloUser"
                            ).innerHTML = `???????? ${userName}`;
                        });
                } else {
                    document.getElementById("helloUser").innerHTML = "???????? ????????";
                }
            });
        });
});

/**Sign Out**/
const signOutBtn = document.getElementById("signout-btn");
signOutBtn.addEventListener("click", (event) => {
    firebase
        .auth()
        .signOut()
        .then(() => {
            alert("???????????? ????????????");
            window.location.href = "./index.html";
        })
        .catch((error) => {
            // An error happened.
        });
});
//updating for firebase
