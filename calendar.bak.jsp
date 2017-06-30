<%-- <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %> --%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Server Booking</title>
<link rel='stylesheet' href='<%= request.getContextPath()%>/css/fullcalendar.min.css' />
<link rel='stylesheet' href='<%= request.getContextPath()%>/css/scheduler.min.css' />
<link rel='stylesheet' href='<%= request.getContextPath()%>/css/bootstrap.3.3.4.min.css' />
<link rel='stylesheet' href='<%= request.getContextPath()%>/css/jquery-ui.css' />
<link rel='stylesheet' href='<%= request.getContextPath()%>/css/bs-is-fun.css' />
<script src='<%= request.getContextPath()%>/js/jquery.js'></script>
<script src='<%= request.getContextPath()%>/js/moment.js'></script>
<script src='<%= request.getContextPath()%>/js/fullcalendar.js'></script>
<script src='<%= request.getContextPath()%>/js/scheduler.js'></script>
<script src='<%= request.getContextPath()%>/js/bootstrap.3.3.7.min.js'></script>
<script src='<%= request.getContextPath()%>/js/angular.1.4.6.min.js'></script>
<script src="<%= request.getContextPath()%>/js/jquery.toaster.js"></script>
<script src="<%= request.getContextPath()%>/js/jquery-ui.js"></script>
<script src="<%= request.getContextPath()%>/js/brush.js"></script>
<style>
/*#calendar {
            margin: 0;
            padding: 0;
            font-family: "Lucida Grande",Helvetica,Arial,Verdana,sans-serif;
            font-size: 14px;
        }*/
#calendar {
	margin: 50px auto;
}
</style>
</head>
<body ng-app="calendarBooking" ng-controller="calendarBookingCtrl">
  <div class="container">
    <%@ include file="UserHead.html" %>
    <div class="row clearfix">
      <div class="col-md-2 column">
        <%@ include file="UserNavigator.html" %>
      </div>
      <div class="col-md-10 column userpage-content">
        <div class="panel" id="myModalNext">
          <div class="panel-heading">
            <ul class="nav nav-pills nav-justified step step-arrow">
              <li class="active">
                  <a><span>Select Servers</span></a>
              </li>
              <li>
                  <a><span>Confirmation</span></a>
              </li>
              <li>
                  <a><span>Booking Result</span></a>
              </li>
            </ul>
          </div>
          <div class="panel-body">
            <div class="carousel slide" data-ride="carousel" data-interval="false" data-wrap="false">
              <div class="carousel-inner" role="listbox">
                <div class="item active">
                  <div class="row clearfix">
                    <div class="col-md-12 column">
                      <form class="form-horizontal" role="form"
                        name="bookServerForm">
                        <div class="form-group">
                          <label for="fs_project" class="col-sm-2 control-label">Project*</label>
                          <div class="col-sm-6">
                            <input type="text" class="form-control"
                              id="fs_project" name="project"
                              ng-model="bookServerForm_project" placeholder="please input your project name."
                               required>
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="fs_project" class="col-sm-2 control-label">Location*</label>
                          <div class="col-sm-6">
                            <label class="checkbox-inline" ng-repeat="landscape in landscapes | orderBy: landscape.location"> 
                              <input type="checkbox" name="location" data-ng-click="filterLocation(landscape)" ng-model="landscape.selected"><span ng-bind="landscape.location"></span>
                            </label>
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="fs_project" class="col-sm-2 control-label">Server Group*</label>
                          <div class="col-sm-6">
                            <label class="checkbox-inline server-group" ng-repeat="serverType in serverTypes"> 
                              <input type="checkbox" name="serverGroup" name="serverType" data-ng-click="filterServerType(landscape)"><span ng-bind="serverType.name"></span> 
                            </label> 
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div id="calendar"></div>
                </div>
                <div class="item">
                    <div class="row clearfix">
                      <div class="col-md-12 column">
                        <table class="table table-striped">
                          <thead>
                            <tr>
                              <th ng-repeat="col in tableCols"><span ng-bind="col"></span></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr ng-repeat="line in selectedServers">
                              <td>
                                <span ng-bind="line.serverId"></span>
                              </td>
                              <td>
                                <span ng-bind="line.serverType"></span>
                              </td>
                              <td>
                                <span ng-bind="line.serverName"></span>
                              </td>
                              <td>
                                <span ng-bind="line.startDateTime"></span>
                              </td>
                              <td>
                                <span ng-bind="line.endDateTime"></span>
                              </td>
                              <td>
                                <span ng-bind="line.comments"></span>
                              </td>
                              <td class="col-icon">
                                <button class="btn btn-primary" ng-click="editModalInfo(line.eventId)">
                                    <span class="glyphicon glyphicon-edit"></span> Edit
                                </button>
                              </td>
                              <td class="col-icon">
                                <button class="btn btn-danger" ng-click="deleteModalInfo(line.eventId)">
                                    <span class="glyphicon glyphicon-remove"></span> Delete
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                </div>
                <div class="item" id="result-panel">
                    <div class="panel">
                      <div class="panel-heading">
                        <h3>Successfully Booked. Redirecting to your server list in 3 secons.<!-- <span ng-bind="result"></span> --></h3>
                      </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div class="panel-footer">
            <button type="button" class="btn btn-default MN-pre">Previous</button>
            <button type="button" class="btn btn-primary MN-next">Next</button>
        </div>
        </div>
        <div class="modal fade" id="addResourceModal" tabindex="-1"
          role="dialog" aria-labelledby="addResourceModalLabel"
          aria-hidden="true" data-backdrop="static">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                  aria-hidden="true">&times;</button>
                <h4 class="modal-title">Add Server Resources</h4>
              </div>
              <div class="modal-body">
                <form class="form-horizontal" role="form">
                  <div class="form-group">
                    <label class="col-sm-3 control-label"
                      for="modal-project">Project*</label>
                    <div class="col-sm-9">
                      <input type="text" id="project"
                        class="form-control"
                        placeholder="Please select or input project."
                        ng-model="modal_project">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-3 control-label"
                      for="modal-server-type">Server Type*</label>
                    <div class="col-sm-9">
                      <input class="form-control" id="server-type"
                        type="text" readonly="readonly"
                        ng-model="modal_servertype" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-3 control-label"
                      for="modal-server-name">Server Name*</label>
                    <div class="col-sm-9">
                      <input class="form-control" id="server-name"
                        type="text" readonly="readonly"
                        ng-model="modal_servername"/>
                    </div>
                  </div>
                  <fieldset>
                    <div class="form-group">
                      <label class="col-sm-3 control-label"
                        for="modal-start-date">Start Date*</label>
                      <div class="col-sm-5">
                        <input type="text" id="start-date" 
                          class="form-control"
                          ng-model="modal_startdate">
                      </div>
                      <!--                                         <label class="col-sm-4 control-label" for="modal-start-time">Start Time*</label> -->
                      <div class="col-sm-4">
                        <select class="form-control"
                          id="modal-start-time"
                          ng-init="modal_starttime=hourList[0]"
                          ng-options="hour for hour in hourList"
                          ng-model="modal_starttime">
                        </select>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-sm-3 control-label"
                        for="modal-end-date">End Date*</label>
                      <div class="col-sm-5">
                        <input type="text" id="end-date"
                          class="form-control" ng-model="modal_enddate">
                      </div>
                      <!--                                            <label class="col-sm-4 control-label" for="modal-end-time">End Time*</label> -->
                      <div class="col-sm-4">
                        <select class="form-control" id="modal-end-time"
                          ng-init="modal_endtime= hourList[0]" 
                          ng-options="hour for hour in hourList"
                          ng-model="modal_endtime">
                        </select>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-sm-3 control-label"
                        for="modal-all-day">All Day*</label>
                      <div class="col-sm-9">
                        <input type="checkbox" id="all-day" for="modal-all-day" ng-model="modal_allday" ng-click="isSelected()"/>
                      </div>
                    </div>
                  </fieldset>
                  <div class="form-group">
                    <label class="col-sm-3 control-label"
                      for="modal_comments">Description</label>
                    <div class="col-sm-9">
                      <textarea class="form-control"
                        id="modal_description" rows="3"
                        ng-model="modal_comments"></textarea>
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default"
                  data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" ng-click="addModalInfo()">Select</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="editResourceModal" tabindex="-1"
          role="dialog" aria-labelledby="editResourceModalLabel"
          aria-hidden="true" data-backdrop="static">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                  aria-hidden="true">&times;</button>
                <h4 class="modal-title">Edit Server Resources</h4>
              </div>
              <div class="modal-body">
                <form class="form-horizontal" role="form">
                  <div class="form-group">
                    <label class="col-sm-3 control-label"
                      for="modal-edit-project">Project*</label>
                    <div class="col-sm-9">
                      <input type="text" id="eidt-project"
                        class="form-control"
                        placeholder="Please select or input project."
                        ng-model="editProject" readonly="readonly">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-3 control-label"
                      for="modal-edit-servertype">Server Type*</label>
                    <div class="col-sm-9">
                      <input class="form-control" id="edit-servertype"
                        type="text" readonly="readonly"
                        ng-model="editServerType" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-3 control-label"
                      for="modal-edit-servername">Server Name*</label>
                    <div class="col-sm-9">
                      <input class="form-control" id="edit-servername"
                        type="text" readonly="readonly"
                        ng-model="editServerName"/>
                    </div>
                  </div>
                  <fieldset>
                    <div class="form-group">
                      <label class="col-sm-3 control-label"
                        for="modal-edit-startdate">Start Date*</label>
                      <div class="col-sm-5">
                        <input type="text" id="edit-startdate" 
                          class="form-control"
                          ng-model="editStartDate">
                      </div>
<!--                       <label class="col-sm-4 control-label" for="modal-start-time">Start Time*</label> -->
                      <div class="col-sm-4">
                        <select class="form-control"
                          id="modal-edit-starttime"
                          ng-init="modal_starttime=hourList[0]"
                          ng-options="hour for hour in hourList"
                          ng-model="editStartTime">
                        </select>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-sm-3 control-label"
                        for="modal-edit-enddate">End Date*</label>
                      <div class="col-sm-5">
                        <input type="text" id="end-date"
                          class="form-control" ng-model="editEndDate">
                      </div>
<!--                                                                  <label class="col-sm-4 control-label" for="modal-end-time">End Time*</label> -->
                      <div class="col-sm-4">
                        <select class="form-control" id="modal-edit-endtime"
                          ng-init="modal_endtime= hourList[0]" 
                          ng-options="hour for hour in hourList"
                          ng-model="editEndTime">
                        </select>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-sm-3 control-label"
                        for="modal-all-day">All Day*</label>
                      <div class="col-sm-9">
                        <input type="checkbox" id="edit-allday" for="modal-all-day" ng-model="editAllDay" ng-click="isSelected()"/>
                      </div>
                    </div>
                  </fieldset>
                  <div class="form-group">
                    <label class="col-sm-3 control-label"
                      for="modal_comments">Description</label>
                    <div class="col-sm-9">
                      <textarea class="form-control"
                        id="modal-edit-description" rows="3"
                        ng-model="editComments"></textarea>
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default"data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" ng-click="saveModalInfo()">Save</button>
                <button type="button" class="btn btn-danger" ng-click="deleteModalInfo()">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <%@ include file="../common/showMessage.html"%>
  </div>
  <script type="text/javascript">
    currentPage("user_calendar_booking");
    var app = angular.module('calendarBooking', []);
    app.controller('calendarBookingCtrl', function($scope, $http){
    	var username = '<%=request.getSession().getAttribute("username")%>'; 
    	var hourOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,  19, 20, 21, 22, 23];
    	var minuteOptions = [0, 30];
    	var hourMinuteOptions = [];
    	
      for(var i = 0; i< hourOptions.length; i++){
    		for(var j = 0; j< minuteOptions.length; j++) {
    			hourMinuteOptions.push(leadZero(hourOptions[i])+':'+leadZero(minuteOptions[j]));
    		}
    	}
    	
    	function leadZero(v) {
        return v <= 9 ? '0' + v : v;
      }
    	var dateFormat = "yyyy/mm/dd";
    	var timeFormat = "HH:mm";
    	 $( function() {
    		    var dateFormat = "yy/mm/dd",
    		      from = $( "#start-date" )
    		        .datepicker({
    		          defaultDate: "+1w",
    		          changeMonth: false,
    		          numberOfMonths: 1
    		        })
    		        .on( "change", function(event) {
    		          to.datepicker( "option", "minDate", getDate($(event.target).element));
    		        }),
    		      to = $( "#end-date" ).datepicker({
    		        defaultDate: "+1w",
    		        changeMonth: false,
    		        numberOfMonths: 1
    		      })
    		      .on( "change", function(event) {
    		        from.datepicker( "option", "maxDate", getDate($(event.target).element ));
    		      });
    		 
    		    function getDate( element ) {
    		      var date;
    		      try {
    		        date = $.datepicker.parseDate( dateFormat, element.value );
    		      } catch( error ) {
    		        date = null;
    		      }
    		 
    		      return date;
    		    }
    		  });
    	$scope.tableCols = ["ServerId", "Server Type", "Hostname", "Start Time", "End Time", "Comments",];
    	
      //load locations at very first time
      $scope.landscapes = [];
      (function(){
        $http({
          url: '<%=request.getContextPath()%>/user/loadLocations',
          method: 'POST',
        }).success(function(response){
        	if(response.result) {
        		$scope.landscapes = angular.fromJson(response.message).list;
        	} else {
        		$.toaster({message: response.message, title: '', priority : 'danger'});
        	}
        }).error(function(data, status){
        	showMessage("Error", "error code: " + status + "<br>" + data);
        });
      })();
      //check and filter location
      $scope.filterLocation = function(landscape) {
    	  if (landscape.selected) {
    		  
    		} else {
    			
    		}
      }
      //load server types at very first time
      $scope.serverTypes = [];
      (function() {
    	  $http({
    		  url: '<%=request.getContextPath()%>/user/loadServerTypes',
          method: 'POST',
    	  }).success(function(response){
    		  if(response.result) {
    			  $scope.serverTypes = angular.fromJson(response.message).list;
    			} else {
    				$.toaster({message: response.message, title: '', priority : 'danger'});
    		  }
    	  }).error(function(data, status){
    		  showMessage("Error", "error code: " + status + "<br>" + data);
    	  });
    	})();
      
      $scope.mockResources = [
                               { "id": "a", "title": "Auditorium A" },
                               { "id": "b", "title": "Auditorium B", "eventColor": "green" },
                               { "id": "c", "title": "Auditorium C", "eventColor": "orange" },
                               { "id": "d", "title": "Auditorium D", "children": [
                                 { "id": "d1", "title": "Room D1" },
                                 { "id": "d2", "title": "Room D2" }
                               ] },
                               { "id": "e", "title": "Auditorium E" },
                               { "id": "f", "title": "Auditorium F", "eventColor": "red" },
                               { "id": "g", "title": "Auditorium G" }];
      console.log($scope.mockResources);
      //load all server resources
      $scope.allServerResources = [];
      var loadServerResources = $.ajax({
        url: '<%=request.getContextPath()%>/user/listServers',
        type: 'POST',
        dataType: 'json',
        success: function(response) {
          if(response.result) {
            $scope.allServerResources = angular.fromJson(response.message);
            console.log($scope.allServerResources);
          } else {
            $.toaster({message: response.message, title: '', priority : 'danger'});
          }
        },
        error: function(data, status) {
          showMessage("Error", "error code: " + status + "<br>" + data);
        }
      });
      console.log($scope.allServerResources);
      
    //load 30 days events
      $scope.allServerEvents = [];
      $scope.now = moment();
      $scope.viewDate = moment($("#calendar").fullCalendar("getDate"));
      console.log($scope.viewDate.format("YYYY/MM/DD"));
      var loadServerEvents = $.ajax({
        url: '<%=request.getContextPath()%>/user/listCalendarBackgroundEvents',
        type: 'POST',
        dataType: 'json',
        data: {
          start: $scope.viewDate.format("YYYY/MM/DD"),
          end: $scope.now.format("YYYY/MM/DD")
        },
        success: function(response){
          if(response.result) {
            $scope.allServerEvents = angular.fromJson(response.message);
            console.log($scope.allServerEvents);
          } else {
            $.toaster({message: response.message, title: '', priority : 'danger'});
          }
        },
        error: function(data, status) {
          showMessage("Error", "error code: " + status + "<br>" + data);
        }
      });
      console.log($scope.allServerEvents);
      
      $.when(loadServerResources, loadServerEvents).done(function(resources, events){
    	  console.log(angular.fromJson(resources[0].message));
    	  console.log(angular.fromJson(events[0].message));
    	  $('#calendar').fullCalendar({
	        now : moment(),
	        selectable : true,
	        selectHelper : true,
	        selectOverlap : false,
	        eventOverlap : false,
	        nowIndicator: true,
	        editable : false, // enable draggable events
	        eventLimit : true,
	        navLinks : true,
	        allDaySlot: true,
	        allDayText: 'all-day-booking',
	        aspectRatio : 1.8,
	        scrollTime : moment().subtract(2, 'hours'), // undo default 6am scrollTime
	        header : {
	          left : 'prev today next',
	          center : 'title',
	          right : 'timelineDay, timelineThreeDays, agendaWeek, month'
	        },
	        defaultView : 'timelineDay',
	        views : {
	          timelineThreeDays : {
	            type : 'timeline',
	            duration : {
	              days : 3
	            }
	          }
	        },
	        resourceLabelText : 'Server Resources',
	        resourceGroupField : 'category',
	        eventOverlap : true,
	        resources: angular.fromJson(resources[0].message),
	        eventSources: [{
	        	events: angular.fromJson(events[0].message)
	        }],
// 	        eventSources: [{
<%--             url: '<%=request.getContextPath()%>/user/listCalendarBackgroundEvents', --%>
// 	          type: 'POST',
// 	          data: {start: moment().subtract(30, 'days').format("YYYY/MM/DD"), end: moment().format("YYYY/MM/DD")},
// // 	          success: function(response) {
// // 	        	  angular.fromJson(response.message);
// // 	          },
// 	          error: function(data, status) {
// 	        	  showMessage("Error", "error code: " + status + "<br>" + data);
// 	          }
// 	        }],
          select: function(start, end, jsEvent, view, resource) {
        	  $scope.tempStartTime = "";
            $scope.tempEndTime = "";
            $scope.modal_startdate = "";
            $scope.modal_enddate = "";
            $scope.modal_starttime = [];
            $scope.modal_endtime = [];
            $scope.modal_servertype = "";
            $scope.modal_servertypeId = "";
            $scope.modal_servername = "";
            $scope.modal_serverid = "";
            start = moment(start.format('YYYY/MM/DD HH:mm'), 'YYYY/MM/DD HH:mm');
            var now = moment(moment().format('YYYY/MM/DD HH:mm'), 'YYYY/MM/DD HH:mm');
            if(view.currentRangeUnit != 'day') {
              $('#calendar').fullCalendar('unselect');
              $.toaster({ message : 'Only support day view to booking server currently.', title : '', priority : 'danger'});
              return;
            }
            if(start.isBefore(now)) {
              $('#calendar').fullCalendar('unselect');
              $.toaster({ message : 'Start time should NOT before current time.', title : '', priority : 'danger'});
              return;
            }
           $scope.modal_project = $scope.bookServerForm_project;
           if(! angular.isUndefined($scope.modal_project)) {
             $("#project").attr("readonly", "readonly");
           } else {
             $("#project").removeAttr("readonly");
           }
           $scope.modal_startdate = start.format(dateFormat.toUpperCase());
           $scope.modal_enddate = end.format(dateFormat.toUpperCase());
           $scope.modal_starttime = start.format(timeFormat);
           $scope.modal_endtime = end.format(timeFormat);
           $scope.modal_servertype = resource.category;
           $scope.modal_servername = resource.title;
           $scope.modal_serverid = resource.id;
           $scope.modal_servertypeId = resource.serverType;
           <!-- $scope.modal_username = resource.title; -->
           $scope.modal_serverIp = resource.ip;
           <!-- $scope.modal_category = resource.category; -->
           $scope.$apply();
           $("#addResourceModal").modal();
         },
         eventClick: function(event, jsEvent, view) {
           $scope.eventId = event.id;
           $scope.editModalInfo();
         }
	     });
      }).fail(function(){
    	  
      });
      
      $scope.bookServerForm_project = "";
    	$scope.hourList = hourMinuteOptions;
//     	$scope.modal_startdate = "";
//     	$scope.modal_enddate = "";
    	$scope.modal_starttime = hourMinuteOptions[0];
    	$scope.modal_endtime = hourMinuteOptions[0];
    	$scope.modal_allday = "";
    	//$scope.bookServerForm.project = "";
    	$scope.modal_servertype = "";
    	$scope.modal_servertypeId = "";
    	$scope.modal_servername = "";
    	$scope.modal_comments = "";
    	$scope.tempStartTime = "";
    	$scope.tempEndTime = "";
    	$scope.eventId = "";
    	$scope.isSelected = function() {
    		if($scope.modal_allday) {
    			$("#start-date").attr("readonly", "readonly");
    			$("#modal-start-time").attr("readonly", "readonly");
    			$("#end-date").attr("readonly", "readonly");
          $("#modal-end-time").attr("readonly", "readonly");
          $scope.tempStartTime = $scope.modal_starttime;
          $scope.tempEndTime = $scope.modal_endtime
          $scope.modal_enddate = moment($scope.modal_enddate).add('d', 1).format(dateFormat.toUpperCase());
          $scope.modal_starttime = hourMinuteOptions[0];
          $scope.modal_endtime = hourMinuteOptions[0];
          return;
    		} else {
    			$("#start-date").removeAttr("readonly");
          $("#modal-start-time").removeAttr("readonly");
          $("#end-date").removeAttr("readonly");
          $("#modal-end-time").removeAttr("readonly");
          $scope.modal_enddate = moment($scope.modal_enddate).add('d', -1).format(dateFormat.toUpperCase());
          $scope.modal_starttime = $scope.tempStartTime;
          $scope.modal_endtime = $scope.tempEndTime;
    		}
    	}
    	
    $scope.selectedServers = [];
		var eventSource = [];
		$scope.selectedEvents = [];
		function guid() {
		  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		    return v.toString(16);
		  });
		}
    $scope.addModalInfo = function() {
      var startDateTime = moment($scope.modal_startdate, [dateFormat.toUpperCase()]).add(moment($scope.modal_starttime, timeFormat));
      var endDateTime = moment($scope.modal_enddate, [dateFormat.toUpperCase()]).add(moment($scope.modal_endtime, timeFormat));
      var user = {
    		  username: username
      };
      var eventId = guid();
      var serverInfo = {
    		  project: $scope.modal_project,
    		  startDateTime: startDateTime.format('YYYY/MM/DD HH:mm:ss'),
    		  endDateTime: endDateTime.format('YYYY/MM/DD HH:mm:ss'),
    		  serverTypeId: $scope.modal_servertypeId,
    		  serverType: $scope.modal_servertype,
    		  serverName: $scope.modal_servername,
    		  serverId: $scope.modal_serverid,
    		  allDay: $scope.modal_allday,
    		  comments: $scope.modal_comments,
    		  serverIp: $scope.modal_serverIp,
    		  user: user,
    		  eventId: eventId
      };
      var event = {
    		id: eventId,
  		  resourceId: $scope.modal_serverid,
  		  title: username,
  		  serverTypeId: $scope.modal_servertypeId,
  		  allDay: $scope.modal_allday,
  		  category: $scope.modal_servertype,
  		  start: startDateTime,
  		  end: endDateTime,
  		  editable: true,
  		  startEditable: false,
  		  overlap: false,
  		  backgroundColor: "#c0c",
  			project: $scope.modal_project,
  			serverName: $scope.modal_servername,
  			comments: $scope.modal_comments
      };
      var renderEvent = event;
      function _checkBeforeAdd(serverInfo, event) {
    	  var exist = false;
    	  for(var i = 0; i < $scope.selectedServers.length; i++ ){
    		  if($scope.selectedServers[i].serverId === serverInfo.serverId) {
    			  exist = true;
    			  if(moment($scope.selectedServers[i].startDateTime, "YYYY/MM/DD HH:mm").isSame(moment(serverInfo.startDateTime, "YYYY/MM/DD HH:mm"))) {
    				  return;
    			  } else if(moment($scope.selectedServers[i].endDateTime, "YYYY/MM/DD HH:mm").isSame(moment(serverInfo.startDateTime, "YYYY/MM/DD HH:mm"))) {
    				  $scope.selectedServers[i].endDateTime = moment(serverInfo.endDateTime, "YYYY/MM/DD HH:mm:ss").format("YYYY/MM/DD HH:mm:ss");;
    				  break;
    			  } else if(moment($scope.selectedServers[i].startDateTime, "YYYY/MM/DD HH:mm").isSame(moment(serverInfo.endDateTime, "YYYY/MM/DD HH:mm"))) {
    				  $scope.selectedServers[i].startDateTime = moment(serverInfo.startDateTime, "YYYY/MM/DD HH:mm:ss").format("YYYY/MM/DD HH:mm:ss");;
    				  break;
    			  } else {
              $scope.selectedServers.push(serverInfo);
    			  }
    		  }
    	  }
    	  if(!exist) {
    		  $scope.selectedServers.push(serverInfo);
          $scope.selectedEvents.push(event);
    	  } else {
    		  for(var i=0; i< $scope.selectedEvents; i++) {
    			  if($scope.selectedEvents[i].resourceId === event.serverId) {
    				  if(moment($scope.selectedEvents[i].start, "YYYY/MM/DD HH:mm").isSame(moment(event.start, "YYYY/MM/DD HH:mm"))) {
	              return;
	            } else if(moment($scope.selectedEvents[i].end, "YYYY/MM/DD HH:mm").isSame(moment(event.start, "YYYY/MM/DD HH:mm"))) {
	            	$scope.selectedEvents[i].end = moment(event.end, "YYYY/MM/DD HH:mm:ss");
	            	renderEvent = $scope.selectedEvents[i];
	            	break;
	            } else if(moment($scope.selectedEvents[i].start, "YYYY/MM/DD HH:mm").isSame(moment(event.end, "YYYY/MM/DD HH:mm"))) {
	            	$scope.selectedEvents[i].start = moment(event.start, "YYYY/MM/DD HH:mm:ss");
	            	renderEvent = $scope.selectedEvents[i];
	            	break;
	            } else {
	              $scope.selectedEvents.push(event);
	              renderEvent = event;
	              break;
	            }
    			  }
    		  }
    	  }    	  
      };
      _checkBeforeAdd(serverInfo, event);
      eventSource[0] = renderEvent;
      $("#calendar").fullCalendar("addEventSource", eventSource);
      $("#addResourceModal").modal("hide");
      if ($scope.selectedServers.length === 0) {
        $("#myModalNext .MN-next").attr("disabled", "disabled");
      } else {
        $("#myModalNext .MN-next").removeAttr("disabled");
      }
    };
    
    $scope.editModalInfo = function(eId) {
    	var envetId = eId || $scope.eventId;
    	if(!envetId) {
        $.toaster({ message : 'Your event id could not be null.', title : '', priority : 'danger'});
        $("#editResourceModal").modal("hide");
        return;
      }
    	$scope.editProject = "";
      $scope.editServerType = "";
      $scope.editServerName = "";
      $scope.editStartDate = "";
      $scope.editStartTime = [];
      $scope.editEndDate = "";
      $scope.editEndTime = [];
      $scope.editAllDay = "";
      $scope.editComments = "";
      for(var i = 0; i < $scope.selectedEvents.length; i++) {
      	var event = $scope.selectedEvents[i];
      	if(envetId == event.id) {
          $scope.editProject = event.project;
          $scope.editServerType = event.category;
          $scope.editServerName = event.serverName;
          $scope.editStartDate = event.start.format(dateFormat.toUpperCase());
          $scope.editStartTime = event.start.format(timeFormat);
          $scope.editEndDate = event.end.format(dateFormat.toUpperCase());
          $scope.editEndTime = event.end.format(timeFormat);
          $scope.editAllDay = event.allDay;
          $scope.editComments = event.comments;
          $scope.eventId = event.id;
          if(!eId) {
           $scope.$apply();
          }
          console.log($scope.eventId)
          $("#editResourceModal").modal();
          break;
      	}
      }
    }
    
    $scope.saveModalInfo = function(eventId) {
    	var envetId = eventId || $scope.eventId;
    	if(!envetId) {
    		$.toaster({ message : 'Your event id could not be null.', title : '', priority : 'danger'});
    		$("#editResourceModal").modal("hide");
    		return;
    	}
    	for(var i = 0; i < $scope.selectedEvents.length; i++) {
    		if(envetId == $scope.selectedEvents[i].id) {
    			var startDateTime = moment($scope.editStartDate, [dateFormat.toUpperCase()]).add(moment($scope.editStartTime, timeFormat));
		      var endDateTime = moment($scope.editEndDate, [dateFormat.toUpperCase()]).add(moment($scope.editEndTime, timeFormat));
    			$scope.selectedEvents[i].start = startDateTime;
    			$scope.selectedEvents[i].end = endDateTime;
    			$scope.selectedEvents[i].allDay = $scope.editAllDay;
    			$("#calendar").fullCalendar("removeEvents", [envetId]);
    			$("#calendar").fullCalendar("renderEvent", $scope.selectedEvents[i]);
    			break;
    		}
    	}
    	for(var i = 0; i < $scope.selectedServers.length; i++) {
    		if(envetId == $scope.selectedServers[i].eventId) {
      		$scope.selectedServers[i].startDateTime = startDateTime.format("YYYY/MM/DD HH:mm:ss");
          $scope.selectedServers[i].endDateTime = endDateTime.format("YYYY/MM/DD HH:mm:ss");
          $scope.selectedServers[i].allDay = $scope.editAllDay;
          $scope.selectedServers[i].comments = $scope.editComments;
          console.log($scope.selectedServers[i]);
          break;
    		}
    	}
    	$("#editResourceModal").modal("hide");
    };
    
    $scope.deleteModalInfo = function(eventId) {
    	var eventId = eventId || $scope.eventId;
    	if(!eventId) {
        $.toaster({ message : 'Your event id could not be null.', title : '', priority : 'danger'});
        $("#editResourceModal").modal("hide");
        return;
      }
    	for(var i = 0; i < $scope.selectedEvents.length; i++) {
        if(eventId == $scope.selectedEvents[i].id) {
        	$scope.selectedEvents.splice(i, 1);
          $("#calendar").fullCalendar("removeEvents", [eventId]);
          break;
        }
      }
      for(var i = 0; i < $scope.selectedServers.length; i++) {
        if(eventId == $scope.selectedServers[i].eventId) {
        	$scope.selectedServers.splice(i, 1);
          break;
        }
      }
      $("#editResourceModal").modal("hide");
    }
    
    $("#myModalNext .panel-footer button").each(function () {
      if($scope.selectedServers.length === 0) {
    	  $("#myModalNext .MN-next").attr("disabled", "disabled");
      } else {
    	  $("#myModalNext .MN-next").removeAttr("disabled");
      }
      $(this).click(function () {
          if ($(this).hasClass("MN-next")) {
              $("#myModalNext .carousel").carousel('next');
              $("#myModalNext .step li.active").next().addClass("active");
              if($("#myModalNext .step li.active").length ===2){
              	$("#myModalNext .MN-pre").show(); 
              	$("#myModalNext .MN-next").text("Submit");
              	$("#myModalNext .MN-next").attr("ng-click", "saveBooking()");
              } else if($("#myModalNext .step li.active").length === 3) {
            	  $.ajax({
        	        url: "<%= request.getContextPath()%>/user/calendarBooking",
        	        type: "POST",
        	        dataType: "json",
        	        contentType: "application/json;charset=utf-8",
        	        data:JSON.stringify($scope.selectedServers),
        	        success: function(jsonResult){
        	          console.log(jsonResult);
        	          window.setTimeout(function() {
        	        	  window.location.href = "<%= request.getContextPath()%>/jsp/user/UserMyServers.jsp"
        	          }, 3000);
        	        }
            	  });
            	  console.log(JSON.stringify($scope.selectedServers[0]));
                $("#myModalNext .MN-next").hide();
                $("#myModalNext .MN-pre").hide();
              }
          } else {
              $("#myModalNext .carousel").carousel('prev');
              if ($("#myModalNext .step li.active").length > 1) {
                if($("#myModalNext .step li.active").length === 2) {
                  $("#myModalNext .MN-next").text("Next");
                  $("#myModalNext .MN-next").removeAttr("ng-click");
                  $("#myModalNext .MN-pre").hide();
                } else {
                	if($("#myModalNext .step li.active").length === 3) {
                		$("#myModalNext .MN-next").show();
                		$("#myModalNext .MN-next").text("Submit");
                	}
                }
                $($($("#myModalNext .step li.active"))[$("#myModalNext .step li.active").length - 1]).removeClass("active")
              } 
          }
      });
      if($("#myModalNext .step li.active").length === 1) {
      	$("#myModalNext .MN-pre").hide();
      }
    });
  });
</script>
</body>
</html>
