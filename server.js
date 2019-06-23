//TOdo: Remove.. for testing only
const Validat0r = require('../validation');

const validat0r = Validat0r({
    database: {
        //Outline all of your database tables in the following schema:
        //tableName: "path/to/your/database/api"
        categories: '../apis/db/categories',
        challenges: '../apis/db/challenges',
        challenges_categories: '../apis/db/challengesCategories',
        users: '../apis/db/users',
        user_submissions: '../apis/db/userSubmissions'
    },
    user: {
        // Path where can user info object can be obtained
        path: 'req.headers.user',
        // Property where the user id can be obtained on the user object
        id: 'id',
        // Property where the user's role can be obtained on the user object
        role: 'role'
    }
});