function updatePlaceholder() {
    var searchType = document.getElementById("searchType").value;
    var searchInput = document.getElementById("searchInput");
}

function updateAction() {
    var searchType = document.getElementById("searchType").value;
    var form = document.getElementById("searchForm");

    if (searchType === "citizen") {
        form.action = "/citizenSearch";
    } else {
        form.action = "/citizenRoomSearch";
    }
}
