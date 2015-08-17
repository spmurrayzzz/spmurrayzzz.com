var plan = require('flightplan'),
  cfg = require('./.flightplanrc'),
  baseHost = '.cloud.projectdecibel.com';

plan.target( 'production', {
  host: 'spmurrayzzz.com',
  username: 'ubuntu',
  privateKey: cfg.privateKey
});

plan.remote( 'default', function( remote ) {
  remote.with( 'cd /home/ubuntu/spmurrayzzz.com', function() {
    remote.exec('git checkout master');
    remote.exec('git pull --rebase');
    remote.exec('npm install');
    remote.sudo('restart spmurrayzzz');
  });
});
