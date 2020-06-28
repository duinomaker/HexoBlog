var xhr = new XMLHttpRequest();
xhr.open("GET", "https://www.toggl.com/reports/api/v2/weekly.pdf?user_agent=duinomaker@gmail.com&workspace_id=4398183", true);
xhr.setRequestHeader("authorization", "Basic YzhlYTZjODVhZTQ1NThkMjQwMGJiZjM5MDk2M2U3M2Y6YXBpX3Rva2Vu");
xhr.onreadystatechange = function () {
    console.log("(" + xhr.readyState + ", " + xhr.status + ")");
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            console.log(JSON.parse(xhr.response));
        } else {
            console.log(xhr);
        }
    }
}
xhr.send();