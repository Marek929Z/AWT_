/*let nameUser = prompt("Ako sa voláš?");
alert("Ahoj " + nameUser + " môžeš vstúpiť");
*/
let messages = [];

if(localStorage.NewForm){
        messages=JSON.parse(localStorage.NewForm);
}

const procesopenNewFormData=(event)=> {
        event.preventDefault();
        // precitanie dat a ulozenie do konstant
        const newForm = document.getElementById("openForm");
        const nopname = newForm["username"].value.trim();
        const nopemail = newForm["email"].value.trim();
        const nopidzoznam = newForm["pole"].value.trim();
        const noppicture = newForm["picture"].value.trim();
        const nopbezec1 = document.getElementById("rekre").value.trim();
        const nopbezec2 = document.getElementById("akti").value.trim();
        const nopbezec3 = document.getElementById("profi").value.trim();
        const nopcheck1 = newForm["checkbox1"].value.trim();
        const nopcheck2 = newForm["checkbox2"].value.trim();
        const nopopinion = newForm["textarea1"].value.trim();

        if(nopname==="" || nopopinion ===""){
                window.alert("Prosim zadajte svoje meno a váš názor na stránku");
                return;
        }

        const newMessage = {
                name: nopname,
                email: nopemail,
                opinion: nopopinion,
                picture: noppicture,
                zoznam: nopidzoznam,
                bezec1: nopbezec1,
                bezec2: nopbezec2,
                bezec3: nopbezec3,
                check1: nopcheck1,
                check2: nopcheck2,
                created: new Date()
        };

        messages.push(newMessage);
        localStorage.setItem("NewForm", JSON.stringify(messages));
        newForm.reset();

}
document.addEventListener("DOMContentLoaded", ()=>{
        document.getElementById("sub").addEventListener("click", procesopenNewFormData);
});

//vypis aj do console
console.log(messages);

/*
function vlozUdaje(meno, email, nazor){
        let vlozDiv = document.getElementById("vlozeneData");
        let vytvorDiv = document.createElement("div");
        let vytvorPmeno = document.createElement("p");
        let vytvorPemail = document.createElement("p");
        let vytvorPnazor = document.createElement("span");

        vytvorPmeno.innerText = "Názor používateľa "  + meno ;
        vytvorPemail.innerText = email;
        vytvorPnazor.innerText = nazor;

        vytvorDiv.appendChild(vytvorPmeno);
        vytvorDiv.appendChild(vytvorPnazor);

        return vlozDiv.appendChild(vytvorDiv);
}

*/