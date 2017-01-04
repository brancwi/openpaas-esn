(function() {
  'use strict';

  angular.module('esn.calendar')
         .controller('calEventDateConsultationController', calEventDateConsultationController);

  function calEventDateConsultationController() {
    var self = this,
        isAllDay = self.event.allDay,
        isOverOneDayOnly = self.event.isOverOneDayOnly(),
        eventStart = self.event.start,
        eventEnd = self.event.end;

    activate();

    ////////////

    function activate() {
      formatStartDate();
      formatEndDate();
    }

    function formatStartDate() {
      if (!isAllDay && isOverOneDayOnly) {
        self.start = eventStart.format('MMM D hh:mma');
        self.startVerbose = eventStart.format('MMMM D hh:mma');
      } else if (isOverOneDayOnly) {
        self.start = self.startVerbose = eventStart.format('MMMM D');
      } else {
        self.start = eventStart.format('MMM D');
        self.startVerbose = eventStart.format('MMMM D');
      }
    }

    function formatEndDate() {
      if (!isAllDay && isOverOneDayOnly) {
        self.end = self.endVerbose = eventEnd.format('hh:mma');
      } else if (!isAllDay && !isOverOneDayOnly) {
        self.end = eventEnd.format('MMM D');
        self.endVerbose = eventEnd.format('MMMM D');
      } else if (!isOverOneDayOnly) {
        self.end = eventEnd.clone().subtract(1, 'day').format('MMM D');
        self.endVerbose = eventEnd.clone().subtract(1, 'day').format('MMMM D');
      }
    }
  }
})();
