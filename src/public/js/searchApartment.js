const updateAction = () => {
    var searchType = document.getElementById("searchType").value;
    var form = document.getElementById("searchForm");

    if (searchType === "apartment") {
        form.action = "/apartmentSearch";
    } else {
        form.action = "/ownerSearch";
    }
}
