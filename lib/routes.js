var fs = require('fs'),
  glob = require('glob'),
  path = require('path'),
  Handlebars = require('handlebars'),
  markdown = require( "markdown" ).markdown,
  marked = require('marked');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight: function( code ) {
    return require('highlight.js').highlightAuto( code ).value;
  }
})

module.exports.init = function( server ) {

  // Setup view engine
  server.views({
    engines: {
        hbs: Handlebars
    },
    layout: true,
    layoutPath: path.join( __dirname, '../templates/layouts' ),
    path: path.join( __dirname, '../templates' )
  });

  // Setup archive partial and route
  Handlebars.registerPartial(
    'archive', fs.readFileSync( './templates/archive.hbs', 'utf8' )
  );
  server.route({
    method: 'GET',
    path: '/archive',
    handler: function( request, reply ) {
      reply.view( 'archive', { archive: true } );
    }
  });

  // Setup public static route
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
          path: 'public'
      }
    }
  });

  // Setup default/index route
  server.route({
    method: 'GET',
    path: '/',
    handler: {
      view: 'index'
    }
  });

  // Setup post routes
  glob( './posts/*.md', function( err, data ) {
    if ( err ) {
      throw err;
    }

    data.forEach(function( path ) {
      var postId, content;

      postId = path
        .replace( /\.\/posts\//, '')
        .replace( /.md/, '' )
        .replace( /^0+/, '' );

      content = marked( fs.readFileSync( path, 'utf8') );

      server.route({
        method: 'GET',
        path: '/post/' + postId,
        handler: function( request, reply ) {
          reply.view( 'post', { post: content } );
        }
      });

    });

  });

};
