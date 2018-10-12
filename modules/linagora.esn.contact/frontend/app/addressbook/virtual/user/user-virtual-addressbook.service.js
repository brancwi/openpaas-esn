(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact').factory('ContactUserVirtualAddressBook', ContactUserVirtualAddressBook);

  function ContactUserVirtualAddressBook(ContactVirtualAddressBook, ContactUserShell, ContactVirtualUsersLoaderService) {
    var addressbook = new ContactVirtualAddressBook('linagora.esn.contact.virtual.users', 'Users', loadNextItems);

    function loadNextItems(options) {
      return ContactVirtualUsersLoaderService.list(options).then(function(result) {
        if (result && result.data && result.data.length) {
          result.data = result.data.map(function(user) {
            return new ContactUserShell(user, addressbook);
          });
        }

        return result;
      });
    }

    return addressbook;
  }
})(angular);
