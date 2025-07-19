import figlet from 'figlet';

figlet('CLI POWER', function (err, data) {
  if (err) {
    console.error('Figlet error:', err);
    return;
  }
  console.log(data);
});
