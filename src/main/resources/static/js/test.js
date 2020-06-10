$(document).ready(function () {
    getTable();

    function getTable(){
        $.ajax({
            url: '/pagination',
            dataType: 'json',
            type: 'POST',
            data: {
                page: 2,
                size: 2,
            },
            success: function (data1) {
                let data2 = new Map(Object.entries(data1));
                let data = {}
                for (let amount of data2.values()) {
                    data = amount;
                }
                for (var i = 0; i < data.length; i++) {
                    var row = $('<tr><td>' + data[i].countValuable + '</td><td>' + data[i].countAnswer + '</td><td>' + data[i].viewCount + '</td></tr>');
                    $('#myTable').append(row);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('Error: ' + textStatus + ' - ' + errorThrown);
            }
        });
    }
})
