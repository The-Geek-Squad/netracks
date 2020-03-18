function getRacks() {
    $.ajax({url: "/racks/racklist", success: function(data) {
        createRacks(data);
    }})
}

function createRacks(data) {
    for(var i = 0; i < data.length; i++) {
        createRackObject(data[i]);
    }
}

function createRackObject(data) {
    let card = document.createElement('div');
    card.className = 'col-xl-4 col-lg-5';

    let rack = document.createElement('div');
    rack.className = 'card shadow mb-4';
    card.appendChild(rack);

    let title = document.createElement('div');
    title.className = "card-header py-3 d-flex flex-row align-items-center justify-content-between";

    let rtitle = document.createElement('h6');
    rtitle.className = 'm-0 font-weight-bold text-primary';
    rtitle.innerText = data.name;

    title.appendChild(rtitle);
    rack.appendChild(title);

    let body = document.createElement('div')
    body.className = 'card-body';

    let list = document.createElement('ul');
    list.className = 'list-group';

    for(var i = 0; i < data.equipment.length; i++) {
        let item = document.createElement('a');
        item.className = 'list-group-item';
        item.innerText = data.equipment[i].label;
        item.href = "#";
        list.appendChild(item);
    }
    body.appendChild(list);
    rack.appendChild(body);
    $("#RacksTop").append(card);
}

$(document).ready(function() {
    getRacks();
})