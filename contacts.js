const path = require('path')
const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const contactsPath = path.resolve('db', 'contacts.json');

async function listContacts(){
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const contactById = contacts.find(item => item.id === contactId);
    return contactById || null;
  }
  
  async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(({id}) => id === contactId);
    if (index === -1) return null;
    const [newContacts] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContacts;
  }
  
  async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;

  }







module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}