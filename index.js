const express = require('express');
const bodyParser = require('body-parser');
const { STORE } = require('./mockData.js')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/test', (req, res) => {
  res.send('   Test Response   ')
})

app.get('/users', (req, res) => {
  const { users } = STORE
  res.send(users)
})

app.get('/users/:id', (req, res) => {
  const id = req.params.id
  const { users, items, accounts, transactions } = STORE
  const user = users.filter(user => user.id.toString() === id)[0]
  if (!user) res.send('no user')

  const userItemsById = items.reduce((acc, item) => {
    return item.user_id === user.id ? [...acc, item.id] : acc
  }, [])
  if (userItemsById.length === 0) res.send('user has no items')

  const userAccounts = accounts.filter(account => userItemsById.includes(account.item_id))
  const userAccountsById = userAccounts.map(userAccount => userAccount.id)
  const userTransactions = transactions.filter(transaction => {
    return userAccountsById.includes(transaction.account_id)
  })

  res.send({'user accounts': userAccounts, 'user\'s transactions': userTransactions})
})

app.get('/items', (req, res) => {
  const { items } = STORE
  res.send(items)
})

app.get('/accounts', (req, res) => {
  const { accounts } = STORE
  res.send(accounts)
})

app.get('/transactions', (req, res) => {
  const { transactions } = STORE
  res.send(transactions)
})

const port = 3000
app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = app;
