
function ServerInfo(server) {
	this.server = server;


}

function Servers(serverInfos) {
	if (typeof serverInfos == 'undefined') {
		return;
	};
	this.serverInfos = serverInfos;

	Servers.prototype.getServers = function(){
		return serverInfos;
	}

}

function Events(serverEvents) {
	if (typeof serverEvents) {

	};
}

function CalendarBookRecords(serverInfos, serverEvents) {
	this.serverInfos = serverInfos;
	this.serverEvents = serverEvents;

	CalendarBookRecords.prototype.add = function() {

	}

	CalendarBookRecords.prototype.delete = function() {

	}


}