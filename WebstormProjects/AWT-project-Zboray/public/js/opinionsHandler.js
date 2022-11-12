/**
 * Class for  handling a list (an array) of visitor opinions in local storage
 * The list is filled from a form and rendered to html
 * A template literal is used to render the opinions list
 * @author Stefan Korecko (2021)
 */
export default class OpinionsHandler {

    /**
     * constructor
     * @param opinionsFormElmId - id of a form element where a new visitor opinion is entered
     * @param opinionsListElmId - id of a html element to which the list of visitor opinions is rendered
     */
    constructor(opinionsFormElmId, opinionsListElmId){ //("openForm","opinionsContainer")
        this.opinionsvalue = [];

        this.opinionsElm = document.getElementById(opinionsListElmId);
        this.opinionsFrmElm = document.getElementById("openForm");
    }

    /**
     * initialisation of the list of visitor opinions and form submit setup
     */
    init(){
        if (localStorage.NewForm) {
            this.opinionsvalue = JSON.parse(localStorage.NewForm);
        }

        this.opinionsElm.innerHTML = this.opinionArray2html(this.opinionsvalue);


        this.opinionsFrmElm.addEventListener("submit", event => this.procesopenNewFormData(event));
    }

    /**
     * Processing of the form data with a new visitor opinion
     * @param event - event object, used to prevent normal event (form sending) processing
     */
    procesopenNewFormData(event){
        //1.prevent normal event (form sending) processing
        event.preventDefault();

        //2. Read and adjust data from the form (here we remove white spaces before and after the strings)
        const nopName = this.opinionsFrmElm.elements["nameID"].value.trim(); // this.opinionsFrmElm.elements["login"] can be used, too
        const nopEmail = this.opinionsFrmElm.elements["emailID"].value.trim();
        const nopOpinion = this.opinionsFrmElm.elements["textareaId"].value.trim(); // this.opinionsFrmElm.elements["comment"] can be used, too
        const nopPict = this.opinionsFrmElm.elements["picture"].value.trim();

        //3. Verify the data
        if(nopName==="" || nopOpinion===""){
            window.alert("Please, enter both your name and opinion");
            return;
        }

        //3. Add the data to the array opinions and local storage
        const newOpinion =
            {
                name: nopName,
                email: nopEmail,
                opinion: nopOpinion,
                picture: nopPict,
                created: new Date()
            };

        console.log("New opinion:\n "+JSON.stringify(newOpinion));

        this.opinionsvalue.push(newOpinion);

        localStorage.NewForm = JSON.stringify(this.opinionsvalue);


        //4. Update HTML
        this.opinionsElm.innerHTML+=this.opinion2html(newOpinion);



        //5. Reset the form
        this.opinionsFrmElm.reset(); //resets the form
    }

    /**
     * creates html code for one opinion using a template literal
     * @param opinion - object with the opinion
     * @returns {string} - html code with the opinion
     */
    opinion2html(opinion){
        const opinionTemplate=
            `
			<section>
			   <h3>${opinion.name} <i>(${(new Date(opinion.created)).toDateString()})</i></h3>
               <h4>${opinion.email}</h4>
			   <p>${opinion.opinion}</p>
			   <p><img src="${opinion.picture}"></p>
	
			</section>`;
        return opinionTemplate;
    }

    /**
     * creates html code for all opinions in an array using the opinion2html method
     * @param sourceData -  an array of visitor opinions
     * @returns {string} - html code with all the opinions
     */
    opinionArray2html(sourceData){
        return sourceData.reduce((htmlWithOpinions,opn) => htmlWithOpinions+ this.opinion2html(opn),"");
    }

}
