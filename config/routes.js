/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

 module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  'post /register': 'UsersController.register',
  'get /list': 'UsersController.list',
  'post /login': 'UsersController.login',
  // 'post /createNote': 'NoteController.createNote',
  'post /listAllNotes': 'NotesController.listAllNotes',
  'put /editANote': 'NotesController.editANote',
  'put /updatePassword': 'UsersController.updatePassword',
  'delete /deleteAllNotes': 'NotesController.deleteAllNotes',
  'put /deleteANote': 'NotesController.deleteANote',
  'put /addANote': 'NotesController.addANote',
  'post /listByUser/:uname' : 'UsersController.listByUser',
  'get /getPassword' : 'UsersController.getPassword',
  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
