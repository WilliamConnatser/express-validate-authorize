# express-validate-authorize
# **Under Construction... come back later!**

## An easy to implement and extensible Express API middleware that validates user input and permissions

### The middleware iterates over a "Validation Schema" which defines endpoint-specific, router-specific, and/or Express instance-specific user input validation and permissions.

# Low-Level Design
```
[ //Validation Schema
    { //Validation Object
        if: [ //If Array
            { //If Object
                ...
            },
            ...
        ],
        then: [ //Then Array
            { //Then Object
                ...
            },
            ...
        ]
    },
    ...
]
```

## Validation Schemas
---
 - Validation Schemas are an array of Validation Objects which outlines all of the validation conditionals, actions, and responses
 - There can only be one Validation Schema per endpoint, one Validation Schema per router, and/or one Validation Schema per Express API instance.
 - You may use built-in validation functions which return Validation Objects
 - Alternatively, you may define custom rules by writing your own Validation Objects if the library doesn't have the functionality you need built in

## Validation Objects
 - Validation Objects are an array of Validation Objects make up a Validation Schema
 - Validation Objects define a single rule of an overall Validation Schema
 - Validation Objects are made up of two parts: one If Array and one Then Array
 - The If Array and Then Array outline conditionals and the actions to be taken if the conditionals are true

## If Arrays
 - If Arrays are an array of If Objects which can be combined to form a complete conditional statement
 - If the conditional statement evaluates to true...
 - Then a Then Array (which contain one or more actions) is parsed and ran

## If Objects
 - If Objects represent an incomplete part of a conditional statement
 - When combined in the order they are defined...
 - If Objects represent a complete conditional statement that can be evaluated

## Then Arrays
  - Then Objects contain one or more actions or responses
  - The actions and responses are executed if the accompanying conditional statement is evaluated to be true

# Using Built-In Rules
 - Defined using key-value pairs
 - The key is the path of the variable starting after the `req` object
 - The value is the rules that the variable must meet
 - Rules can be chained together as necessary [IE. validat0r.required().number().range(1,100).userRole('admin')]
```
{
    'query.banana': validat0r.required() //Required request param
    'body.banana': validat0r.unique(databaseTable, databaseColumn) //Must be unique
    'params.banana': validat0r.exists(databaseTable, databaseColumn) //DB row must exist
    'headers.banana': validat0r.userRole(userRole) //Restrict to a certain role (admin, user, etc.)
    'query.banana': validat0r.range(min,max) //Must be within a certain range, inclusive
    'query.banana': validat0r.min(number) //Must be equal to or above this number
    'params.banana': validat0r.max(number) //Must be equal to or below this number
    'params.banana': validat0r.number() //Must be a Number
    'headers.banana': validat0r.integer() //Must be an integer
    'body.banana': validat0r.boolean() //Must be a Boolean
    'headers.banana': validat0r.string() //Must be a String
    'body.banana': validat0r.alphanumeric() //Must be letters or numbers
    'body.banana': validat0r.json() //Must be JSON
    'query.banana': validat0r.defaultTo(defaultValue) //Default to a certain value if undefined
    'params.banana': validat0r.defaultToRole(userRole, defaultValue) //Default to a certain value for specific roles
    'query.banana': validat0r.forceTo(defaultValue) //Reassign to a certain value
    'params.banana': validat0r.forceToRole(userRole, defaultValue) //Reassign to a certain value for specific roles
    'body.banana': validat0r.regex(regexString) //Must match a regular expression
    'params.banana': validat0r.email(email) //Must be an email

}
```

# Defining Custom Rules

```
{ //Validation Object
    if: [ //If Array

        { //If Object
            expectedValue: Boolean || String || Number || Array || JSON || undefined || null
            expectedValueType: String ('literal' || 'regex')
            dataType: String ('boolean' || 'string' || 'number' || 'array' || 'json' || 'undefined' || 'null')

            conditional: String ('if' || 'else' || 'else if')
            comparisonOperator: String ('>' || '>=' || '<' || '<=' || '==' || '===' || '!==')
            logicalOperator: String ('||' || '&&')
            groupingOperator: String ('(' || ')')

            metaPath: String ('query' || 'body' || 'params' || 'headers' || 'db')
            macroPath: String (Anything after 'req.query' || 'req.body' || 'databaseTable' (etc. for all dataTypes) *IN DOT NOTATION*)
                - Can be property names or functions- IE. .length or .slice(0,1) or database API functions IE. users.getOne()
            microPath: String (Anything passed into a function)
            databasePath: String ('users' || 'categories' || 'challenges' || 'user_submissions' || 'challenges_categories')
        }
    ],
    then: [ //Then Array
        { //Then Object
            assignment: {
                metaPath: String ('query' || 'body' || 'params' || 'headers')
                macroPath: String (Anything after 'req.query' || 'req.body' || 'databaseTable' (etc. for all dataTypes) *IN DOT NOTATION*)
                        - Can be property names or functions- IE. .length or .slice(0,1) or database API functions IE. users.getOne()
                microPath: String (Anything passed into a function)
                databasePath: String ('users' || 'categories' || 'challenges' || 'user_submissions' || 'challenges_categories')
                value: Boolean || String || Number || Array || JSON || undefined || null
            },
            rejectRequest: {
                consoleLog: Boolean
                throwError: Boolean
                errorMessage: String
                errorMessageWithLabel: String
                errorCode: Integer
            }
        }
    ]
}
```

