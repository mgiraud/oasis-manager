const middleware = {}

middleware['authenticated'] = require('../app/middleware/authenticated.ts')
middleware['authenticated'] = middleware['authenticated'].default || middleware['authenticated']

middleware['hasPermissions'] = require('../app/middleware/hasPermissions.ts')
middleware['hasPermissions'] = middleware['hasPermissions'].default || middleware['hasPermissions']

middleware['isAdmin'] = require('../app/middleware/isAdmin.ts')
middleware['isAdmin'] = middleware['isAdmin'].default || middleware['isAdmin']

middleware['notAuthenticated'] = require('../app/middleware/notAuthenticated.ts')
middleware['notAuthenticated'] = middleware['notAuthenticated'].default || middleware['notAuthenticated']

export default middleware
