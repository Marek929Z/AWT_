export default  class ValuesManager{
    /**
     * constructor
     * @param valuesFormElmId - id of a form element where a new visitor value is entered
     * @param valuesListElmId - id of a html element to which the list of visitor values is entered
     */
    constructor(valuesFormElmId, valuesListElmId){  //("IndexForm", "valuesContainer")
        this.values = [];

        this.valuesElm = document.getElementById(valuesListElmId);
        this.valuesFrmElm = document.getElementById("openForm");
    }

    /**
     * initialisation of the list of visitor values and form submit setup
     */
    init(){
        if(localStorage.NewForm){
            this.values = JSON.parse(localStorage.NewForm);
        }

        this.valuesElm.innerHTML = this.valuesArray2html(this.values);

        this.valuesFrmElm.addEventListener("submit", event => this.procesopenNewFormData(event));
    }

    /**
     * Processing of the form data with a new visitor value
     * @param event - event object, used to prevent normal event (form sending) processing
     */
    procesopenNewFormData(event){
        //1. Prevent from sending values
        event.preventDefault();

        //2. Read and adjust data from the form + remove white spaces
        const userName = this.valuesFrmElm.elements["name"].value.trim();
        const userEmail = this.valuesFrmElm.elements["email"].value.trim();
        const userTextA1 = this.valuesFrmElm.elements["textarea22"].value.trim();

        //3. Verify the data
        if(userName ==="" || userEmail==="" || userTextA1===""){
            window.alert("Fill in required fields.");
            return false;
        }

        //4. Add the data to the array values and local storage
        const newValues = {
            name: userName,
            email: userEmail,
            textContent: userTextA1,
            created: new Date()
        }
        console.log("New values are:\n" + JSON.stringify(newValues));
        this.values.push(newValues);
        localStorage.NewForm = JSON.stringify(this.values);

        //5. Update HTML
        this.valuesElm.innerHTML+=this.values2html(newValues);

        //6. Reset the form
        this.valuesFrmElm.reset();
    }

    /**
     * Creates html code for one value using a template literal
     * @param value - object with the value
     * @returns {string} - html code with the opinion
     */

    values2html(value){
        const valueTemplate =
            `<section>
                <h2>${value.name}<i>(${new Date(value.created)})</i></h2>
                <p>${value.email}</p>
                <p>${value.textContent}</p>
            </section>`;
        return valueTemplate;
    }

    /**
     * Creates html code for all values in an array using the values2html method
     * @param sourceData - an array of visitor values
     * @returns {string} - html code with all values
     */
    valuesArray2html(sourceData){
        return sourceData.reduce((htmlWithValues, val) => htmlWithValues + this.values2html(val), "");
    }
}