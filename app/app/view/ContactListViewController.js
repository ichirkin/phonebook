/*
 * File: app/view/ContactListViewController.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Phonebook.view.ContactListViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.contactlist',

    onRowDblClick: function(grid, record) {
        if ( USER['group'] != 'ADMIN' ) {
            return false;
        }
        this.editRow(record);
    },
    editRow: function(record) {
        if ( record ) {
            var vm = this.getViewModel(),
                win = Ext.create('Phonebook.view.ContactForm', {
                    viewModel: {
                        type: 'contactform',
                        stores: {
                            contacts: vm.getStore('contacts')
                        },
                        links: {
                            theContact: record
                        }
                    }
                });

            win.show();
        }
    },

    onAddButtonClick: function(button, e, eOpts) {
        var vm = this.getViewModel(),
            win = Ext.create('Phonebook.view.ContactForm', {
                viewModel: {
                    type: 'contactform',
                    stores: {
                        contacts: vm.getStore('contacts')
                    }
                }
            });
        win.show();
    },

    onRemoveButtonClick: function(button, e, eOpts) {
        var records = button.up('panel').getSelectionModel().getSelection();

        this.removeRow(records.shift());
    },

    removeRow: function(record) {
        var vm = this.getViewModel();


        Ext.Msg.confirm('Внимание!', 'Вы действительно хотите удалить контакт?', function (btn) {
            if ( btn == 'yes' ) {
                record.drop();
                record.save();
            }
        });
    },

    logout: function() {
        window.location = '/site/logout';
    }

});
