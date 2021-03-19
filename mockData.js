let uuid = 0;
let uiid = 0;
let uaid = 0;
let utid = 0;
let num = 0;

const NAMES = [
  'mock', 'john', 'su', 'chan', 'manos', 'yu', 'shum', 'ya'
]

// store skeleton (default values)
const STORE = {
  users: [],
  items: Array(14).fill({}), //14
  accounts: Array(33).fill({}), //33
  transactions: Array(72).fill({}) //72
}

// populate users
for (var i = 0; i < NAMES.length; i++) {
  STORE.users.push({ id: ++uuid, name: `${NAMES[i]}`, email: `${NAMES[i]}@${NAMES[i]}.com` })
}

// utility functions
const accountNameGenerator = (prefix) => {
  return `${prefix}${num++}`
}

const assignRandUserId = () => {
  const maxRange = STORE.users.length
  return Math.floor(Math.random() * Math.floor(maxRange));
}

const assignRandAccountId = () => {
  const maxRange = STORE.accounts.length
  return Math.floor(Math.random() * Math.floor(maxRange));
}

const assignRandItemId = () => {
  const maxRange = STORE.items.length
  return Math.floor(Math.random() * Math.floor(maxRange));
}

const randomAmountValue = () => {
  return Math.floor(Math.random()*100) + 100;
}

// populate store
for (var i = 0; i < STORE.items.length; i++) {
  STORE.items[i] = {
    id: ++uiid,
    name: accountNameGenerator('item'),
    user_id: assignRandUserId()
  }
}

for (var i = 0; i < STORE.accounts.length; i++) {
  STORE.accounts[i] = {
    id: ++uaid,
    name: accountNameGenerator('account'),
    item_id: assignRandItemId()
  }
}

for (var i = 0; i < STORE.transactions.length; i++) {
  STORE.transactions[i] = {
    id: ++utid,
    name: accountNameGenerator('transaction'),
    amount: randomAmountValue(),
    account_id: assignRandAccountId()
  }
}

/*
const STORE = {
  items: [ // x 14
    { id: ++uiid, name: accountNameGenerator('item'), user_id: assignRandUserId()},
  ],
  accounts: [ // x 33
    {id: ++uaid, name: accountNameGenerator('account'), item_id: assignRandItemId()},
  ],
  transactions: [ // x 72
    {id: ++utid, name: accountNameGenerator('transaction'), amount: randomAmountValue(), account_id: assignRandAccountId() },
  ]
}
*/

module.exports.STORE = STORE

console.log('mock data ready!')
