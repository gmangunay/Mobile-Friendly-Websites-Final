// change these values for your Airtable account
const apiKey = 'keyePOLdz1mbh0sfG';
const baseValue = 'appVAeiJ74LgTN8Vd';
const table = 'Table 1';


// get ready to use Airtable
const Airtable = require('airtable');
const base = new Airtable({apiKey}).base(baseValue);


/**
 * get the values from the table, and pass them to the submitToAirtable function
 * @param {string} formID 
 */
function handleSubmit(formID){
    const form = document.getElementById(formID)
    const fields = form.querySelectorAll('input, textarea')

    let data = {};

    fields.forEach((field,i) => {
        const {name, value, defaultValue} = field;
        
        if (name && value){
            data[name] = value;
        }
        
        field.value = defaultValue;
    })
    
    submitToAirtable(data);
}


/**
 * create a new record in Airtable based on the data object
 * @param {Object} data 
 */
 function submitToAirtable(data){
    base(table).create([
        {"fields": data}
    ], 
    (err, records) => {
        if (err) {
            console.error(err);
            return;
        }
        records.forEach(function (record) {
            console.log(record.getId());
        });
    });
}