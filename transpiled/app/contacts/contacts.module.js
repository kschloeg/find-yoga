"use strict";
var ngmodule_1 = require("../bootstrap/ngmodule");
require("../services/dialog");
var contact_component_1 = require("./contact.component");
var contacts_component_1 = require("./contacts.component");
var editContact_component_1 = require("./editContact.component");
/**
 * This state displays the contact list.
 * It also provides a nested ui-view (viewport) for child states to fill in.
 *
 * The contacts are fetched using a resolve.
 */
var contactsState = {
    parent: 'app',
    name: "contacts",
    url: "/contacts",
    resolve: {
        // Resolve all the contacts.  The resolved contacts are injected into the controller.
        contacts: function (Contacts) { return Contacts.all(); }
    },
    data: { requiresAuth: true },
    component: contacts_component_1.contactsComponent
};
/**
 * This state displays a single contact.
 * The contact to display is fetched using a resolve, based on the `contactId` parameter.
 */
var viewContactState = {
    name: 'contacts.contact',
    url: '/:contactId',
    resolve: {
        // Resolve the contact, based on the contactId parameter value.
        // The resolved contact is provided to the contactComponent's contact binding
        contact: function (Contacts, $stateParams) { return Contacts.get($stateParams.contactId); }
    },
    component: contact_component_1.contactComponent
};
/**
 * This state allows a user to edit a contact
 *
 * The contact data to edit is injected from the parent state's resolve.
 *
 * This state uses view targeting to replace the parent ui-view (which would normally be filled
 * by 'contacts.contact') with the edit contact template/controller
 */
var editContactState = {
    name: 'contacts.contact.edit',
    url: '/edit',
    views: {
        // Relatively target the grand-parent-state's $default (unnamed) ui-view
        // This could also have been written using ui-view@state addressing: $default@contacts
        // Or, this could also have been written using absolute ui-view addressing: !$default.$default.$default
        '^.^.$default': {
            bindings: { pristineContact: "contact" },
            component: editContact_component_1.editContactComponent
        }
    }
};
/**
 * This state allows a user to create a new contact
 *
 * The contact data to edit is injected into the component from the parent state's resolve.
 */
var newContactState = {
    name: 'contacts.new',
    url: '/new',
    component: editContact_component_1.editContactComponent
};
// ...and register them with the $stateProvider
ngmodule_1.ngmodule.config(function ($stateProvider) {
    var contactsStates = [contactsState, newContactState, viewContactState, editContactState];
    contactsStates.forEach(function (state) { return $stateProvider.state(state); });
});
//# sourceMappingURL=contacts.module.js.map