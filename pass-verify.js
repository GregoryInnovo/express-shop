const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPassword = 'dev_fr2nt_3nd';
  // const hash = '$2b$10$5r.e.T/yhQtVwOFQi.l3xOAyKaipLi.SkxsASVEyK4OXoln3Wl/k2';
  const hash = '$2b$10$MHvPrnvn3mN6tniRbYfsk.SrdkG2Af0Tu4g1eKcmd1ix4KL1FhqDO';

  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword();
