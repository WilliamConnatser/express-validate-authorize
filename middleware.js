class Valid {
    constructor(settings) {
        this.knex = settings.knex;
        this.userData = settings.user;
        this.userRole = settings.userRole;
    }

    /*

        CONVERSION

    */

    convertBoolean = (target) => {

        //Use an equality operator to convert into a proper boolean value
        if (isString(target)) {
            return (target.toLowerCase() === 'true' || target === '1');
        } else {
            return (target === 1);
        }
    }

    convertRange = (target) => {

        //Split by - delimiter
        //Convert each array item to a number
        //Will return an array with two numbers
        return target.split('-').map(numString => {
            return parseInt(numString, 10);
        });
    }

    /*

        DATA TYPE CHECKERS

    */

    isArray = (target) => {
        return Array.isArray(target);
    }

    isBoolean = (target) => {
        if (typeof target === 'boolean') {
            return true;
        } else if (isString(target) &&
            (target.toLowerCase() === 'true' ||
                target.toLowerCase() === 'false' ||
                target === '0' ||
                target === '1')) {
            return true;
        } else if (isInteger(target) && (target === 0 || target === 1)) {
            return true;
        } else {
            return false;
        }
    }

    isInteger = (target) => {
        try {
            //Convert before checking in case it's a String via a query param
            target = parseInt(target, 10);
        }
        //If an error occurs it's not a number
        catch (err) {
            return false;
        }
        return Number.isInteger(target);
    }

    isJson = (target) => {
        //If it's not a string then it's not JSON
        if (!isString(target)) {
            return false;
        } else {
            try {
                //Attempt to parse the target
                JSON.parse(target);
            } catch (err) {
                return false;
            }
            //If JSON.parse doesn't throw an error
            return true;
        }
    }

    isObject = (target) => {
        return target === Object(target);
    }

    isString = (target) => {
        return Object.prototype.toString.call(target) === "[object String]";
    }

    isRange = (target) => {

        //If it's in string form
        if (isString(target)) {

            //Make sure the delimiter is present
            if (!target.includes('-')) {
                return false;
            } else {

                //Split reduce while attempting to convert the string delimited by - to a number
                //Will return false if 
                return target.split('-').reduce((prev, curr) => {
                    return isNaN(Number(curr)) || !prev ? false : true;
                }, true);
            }
        } else if (isArray(target)) {
            //Else if it's in array form

            //Ranges can only have 2 items
            if (target.length !== 2) {
                return false;
            } else {

                //Test both values are integers
                let valid = true;
                target.forEach(item => {
                    if (!isInteger(item)) {
                        valid = false;
                    }
                });
                return valid;
            }
        } else {

            //If it's not a string or a number then it's not a range
            return false;
        }
    }

    /*
        Database Utility Methods
    */
    existsWhere = (table, filter) => {
        return this
            .knex(table)
            .where(filter)
            .first()
            .then(data => {
                return data !== undefined;
            });
    }

    uniqueWhere = (table, filter) => {
        this.existsWhere(table, filter)
            .then(data => {
                //Return the opposite of existsWhere
                return !data;
            });
    }

    getWhere = (table, filter) => {
        return this
            .knex(table)
            .where(filter)
            .then(data => {
                return data;
            });
    }

    /*
        Express Middleware
    */
    validate = (validationSchema) => {

        //Curry Validation Schema Into Middleware
        return (validationSchema) => {

            //Returns Express middleware
            return (req, res, next) => {

            }
        }
    }
}