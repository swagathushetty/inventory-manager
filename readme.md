# Inventory manager manual v1.0

### requirements

To run the app you require Node to be installed in your machine
https://nodejs.org/en/download/

---

### to run the app

go to your terminal and command line and type

```
$node index.js command
```

NOTE- **command** is a placeholder. dont type command as is

---

eg

```
$ node index.js UK:B123AB1234567:Gloves:120:Mask:10
```

---

### format of command

<purchase_country>:<optional_passport_number>:<item_type>:<number_of_units_to_be_ordered>:<item_type>:<number_of_units_to_be_ordered>
eg-
`UK:B123AB1234567:Gloves:120:Mask:10`
`Germany:AAB123456789:Mask:50:Gloves:25`

NOTE-if command not entered in proper format the program will not work. The commands are also case sensitive. For united kingdom use 'UK' and for germany use 'Germany'

---

> written by swagath shetty
