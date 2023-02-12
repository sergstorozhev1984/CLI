const contacts = require('./contacts');
// console.log(contacts.listContacts());

const { Command } = require("commander");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.log('All CONTACTS');
      console.table(allContacts);
      break;

    case "get":
      const contactById = await contacts.getContactById(id);
      console.log(`Contact by ID: ${id}`);
      console.table(contactById);
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.log(`Contact with name: ${name}, email: ${email}, phone: ${phone} was added`);
      console.table(newContact);
      break;

    case "remove":
      const removedContact = await contacts.removeContact(id);
      console.log(`Contact with id: ${id} was removed`);
      console.table(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);