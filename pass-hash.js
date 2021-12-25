const bcrypt = require('bcrypt');

async function hashPassword() {
  const myPassword = 'dev_fr2nt_3nd';
  const hash = await bcrypt.hash(myPassword, 10);
  console.log(hash);
}

hashPassword();
