const list_element = document.getElementById('list_questions');
const pagination_element = document.getElementById('pagination');
let current_page = 1;
let rows = 3;

jQuery(function ($){
    $.ajax({
        url: '/pagination',
        type: 'POST',
        data: {
            page: 2,
            size: 2,
        },
        contentType: "application/json",
        dataType: "json",
        timeout: 100000,
        success: function (data) {
            DisplayList(new Map(Object.entries(data)).getValue(), list_element, rows, current_page)
            getButtons(new Map(Object.entries(data)).getKey(), pagination_element)
        }
    })
})

function getButtons(number, wrapper){
    wrapper.innerHTML = "";

    let page_count = Math.ceil(number / rows);
    for (let i = 1; i < page_count + 1; i++) {
        let btn = new PaginationButton(i);
        wrapper.appendChild(btn);
    }
}

function PaginationButton (page) {
    var info = {
        "page" : this.page,
        "size" : 3,
    }
    $.ajax({
        url: '/pagination',
        type: 'POST',
        data: info,
        contentType: "application/json",
        dataType: "json",
        timeout: 100000,
        success: function (data) {
            pagination(page,new Map(Object.entries(data)).getValue(1))
        }
    })
}
function pagination(page, items){
    let button = document.createElement('button');
    button.innerText = page;

    if (current_page === page) button.classList.add('active');

    button.addEventListener('click', function () {
        current_page = page;
        DisplayList(items, list_element, rows);

        let current_btn = document.querySelector('.pagenumbers button.active');
        current_btn.classList.remove('active');

        button.classList.add('active');
    });

    return button;
}

function DisplayList (items, wrapper, rows) {
    wrapper.innerHTML = "";

    for (let i = 0; i < rows ; i++) {
        let item = items[i];
        addRow(item);
    }
}

function addRow(data) {

    var newRow = "";
    newRow += ('<li class="list-group-item">');
    newRow += ('<div class="container">');
    newRow += ('<div class="row">');
    newRow += ('<div class="col-sm-5">')
    newRow += ('<a href = "#">')
    newRow += ('<button type="button" class="btn btn-outline-secondary mr-1 btn-square">Голосов '+ data.countValuable +'</button>');
    if(data.countAnswer > 0 && data.helpful === true){
        newRow += ('<button type="button" class="btn btn-success btn-square">Ответов ' + data.countAnswer +'</button>');
    } else if(data.countAnswer > 0 && data.helpful === false){
        newRow += ('<button type="button" class="btn btn-outline-success btn-square">Ответов ' + data.countAnswer +'</button>');
    } else {
        newRow += ('<button type="button" class="btn btn-outline-secondary btn-square">Ответов ' + data.countAnswer +'</button>');
    }
    newRow += ('<button type="button" class="btn btn-outline-secondary ml-1 btn-square">Показов ' + data.viewCount +' </button>');
    //newRow += "&nbsp&nbsp&nbsp  ";
    newRow += ('</div>');
    newRow += ('<div class="col pl-0">');
    newRow += ('<h4>' + data.title + '</h4>');
    newRow += (getTags(data.tags));
    newRow += ('<a class="mr-5">'+ data.persistDateTime +'</a>');
    newRow += ('<a href ="#" class="mr-1"> '+ data.userId +'</a>');
    newRow += ('<a>'+ data.reputationCount+'</a>');
    newRow += ('</div>');
    newRow += ('</a>');
    newRow += ('</li>');

    $("#list_questions").append(newRow);
}

function getTags(list) {
    var tags ="";
    for (var i = 0; i < list.length; i++){
        tags += ('<button type="button" class="btn btn-primary btn-sm mr-1">'+ list[i].name +'</button>')
    }
    return tags;
}





