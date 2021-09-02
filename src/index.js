import './styles/style.scss'
import $ from 'jquery'

const countDownDate = new Date("2 Oct, 2021 15:00:00").getTime();

let x = setInterval(() => {
    const now = new Date().getTime()
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('timer').innerHTML = days + " дней " + hours + " часов " + "<br>" +
        minutes + " минут " + seconds + " секнуд ";

    if (distance < 0) {
        clearInterval(x);
        document.getElementById('timer').innerHTML = "EXPIRED";
    }

}, 1000);

jQuery(function() {
    if ($(window).width() > 400 && $(window).width() < 768) {
        $('#map').attr('width', $(window).width() - 100)
    } else if ($(window).width() > 767) {
        $('#map').attr('width', 600)
    }
})

jQuery(function() {

    var form = document.querySelector("#type");
    /*ПРОВЕРЯЕМ НАЖАТА ЛИ КНОПКА ОТПРАВКИ*/
    $('#btn_submit').on("click", function() {
        var checkboxes = document.getElementsByClassName('alco');
        var checkboxesChecked = []; // можно в массиве их хранить, если нужно использовать
        for (var index = 0; index < checkboxes.length; index++) {
            if (checkboxes[index].checked) {
                checkboxesChecked.push(checkboxes[index].value); // положим в массив выбранный
            }
        }

        let alcohol = ""

        for (const entry of checkboxesChecked) {
            alcohol += entry + ";\r"
        }

        if (alcohol === "") {
            alcohol = "Не выбрано"
        }

        var special = $('#alco_comment').val()

        // собираем данные с формы

        let car, lodging

        if ($('#car:checked').length) {
            car = "Да"
        } else {
            car = "Нет"
        }

        if ($('#lodging:checked').length) {
            lodging = "Да"
        } else {
            lodging = "Нет"
        }


        var user_name = $('#name').val();
        var companion_name = $('#companion').val();
        var text_comment = $('#text_comment').val();
        var type = new FormData(form);
        var output = "";
        for (const entry of type) {
            output = entry[1] + "\r";
        }
        // отправляем данные
        $.ajax({
            url: "mail.php", // куда отправляем
            type: "post", // метод передачи
            data: { // что отправляем
                "car": car,
                "lodging": lodging,
                "name": user_name,
                "companion_name": companion_name,
                "text_comment": text_comment,
                "type": output,
                "alcohol": alcohol,
                "special": special
            },
            error: function() {
                $("#erconts").html("Произошла ошибка!");
            },
            /* если произойдет ошибка в элементе с id erconts выведится сообщение*/
            beforeSend: function() {
                $("#erconts").html("Отправляем данные...");
            },
            success: function(result) {
                /* В случае удачной обработки и отправки выполнится следующий код*/
                $('#erconts').html(result);
                console.log("SUCC");
            }
        });
    });
});