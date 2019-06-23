function Validat0r(settings) {

    /*
        Promisified database functionality can be plugged into the validation middleware
        If database API info was given in the settings, then populate the database APIs
    */
    if (settings.database !== undefined) {
        var database = settings.database;
        Object.keys(database).forEach(table => {
            const api = eval(`require('${__dirname}/${database[table]}');`);
            database[table] = api;
        });
    }

    /*
        Parses an array of ifObjects to form a complete conditional statement
        If the conditional statement evaluates to true
        Then a thenArray which contains one or more actions is parsed and ran
    */
    const parseIfArray = (ifArray) => {
        let command = '';

        for (let i = 0; i < ifArray.length; i++) {

            command += ` ${parseIfObject(ifArray[i])} `;

        }

        return command;
    }

    /*
        ifObjects represent an incomplete part of a conditional statement
        When combined, ifObjects represent a complete conditional statement
    */
    const parseIfObject = (ifObject) => {

        if (ifObject.hasOwnProperty('metaPath')) {

        } else if (ifObject.hasOwnProperty('expectedValue')) {

        } else {

        }
    }

    /*
        Parses an array of thenObjects which contains one or more actions
        The actions are performed if a conditional statement is true
    */
    const parseThenArray = (thenArray) => {
        let command = '';

        for (let i = 0; i < thenArray.length; i++) {

            command += ` ${parseThenObject(thenArray[i])} `;

        }

        return command;
    }

    /*
        thenObjects represent an incomplete part of an action
        When combined, thenObjects represent an action
    */
    const parseThenObject = (thenObject) => {

        if (thenObject.hasOwnProperty('assignment')) {

        } else {

        }
    }

    /*
        Parses an array of validationObjects which make up a validationSchema
        validationObjects are made up of ifArrays and thenArrays
        which outline conditionals and actions to be taken if the conditionals are true
    */
    const parseValidationSchema = (validationSchema) => {
        let valid = true;
        let toDo = '';

        for (let i = 0; i < validationSchema.length && valid; i++) {

            if (parseIfObject(metaSchemaObject.if)) {

                const parsedThen = parseThenObject(metaSchemaObject.then);

                valid && !parsedThen.valid ? valid = false : null;

                parsedThen.toDos.forEach(action => {
                    toDo += ` ${action} `;
                });
            }
        }

        return valid;
    }

    //Curry Validation Schema Into Middleware
    return validationSchema => {

        //Returns Express middleware
        return (req, res, next) => {


        }
    }
}


module.exports = Validat0r;