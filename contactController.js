// FileName: contactController.js

// Import contact model AKA the db.collection to query 
Contact = require('./contactModel')

// Handle index actions
exports.index = (req, res) => {
  Contact.get((err, contacts) => {
    if (err) res.json({ status: 'error', message: err })
    res.json({
      status: 'success',
      message: 'Contacts retrieved successfully',
      data: contacts
    })
  })
}

// Handle create contact actions (Create)
exports.new = (req, res) => {
  let contact = new Contact()
  contact.name = req.body.name ? req.body.name : contact.name
  contact.gender = req.body.gender
  contact.email = req.body.email
  contact.phone = req.body.phone
  // save the contact and check for errors
  contact.save((err) => {
    if (err) res.json(err)
    res.json({
      message: 'New contact created!',
      data: contact
    })
  })
}

// Handle view contact info (Retrieve)
exports.view = (req, res) => {
  Contact.findById(req.params.contact_id, (err, contact) => {
    if (err) res.send(err)
    res.json({
      message: 'Contact details loading...',
    data: contact
    })
  })
}

// Handle update contact info (Update)
exports.update = (req, res) => {
  Contact.findById(req.params.contact_id, (err, contact) => {
    if (err) res.send(err)
    contact.name = req.body.name ? req.body.name : contact.name
    contact.email = req.body.email
    contact.phone = req.body.phone
      // save the contact and check for errors
    contact.save((err) => {
      if (err) res.json(err)
      res.json({
        message: 'Contact Info updated',
        data: contact
      })
    })
  })
}

// Handle delete contact (Delete)
exports.delete = (req, res) => {
  Contact.deleteOne({ _id: req.params.contact_id }, (err, contact) => {
    if (err) res.send(err)
    res.json({
      status: 'success',
      message: 'Contact deleted'
    })
  })
}
