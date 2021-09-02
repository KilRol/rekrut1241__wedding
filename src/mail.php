<?php
/*ПОМЕЩАЕМ ДАННЫЕ ИЗ ПОЛЕЙ В ПЕРЕМЕННЫЕ*/

$car = $_POST["car"];
$lodging = $_POST["lodging"];
$parking = $_POST["parking"];
$name = $_POST["name"];
$companion_name = $_POST["companion_name"];
$text_comment = $_POST["text_comment"];
$type = $_POST["type"];
$alcohol = $_POST["alcohol"];
$special = $_POST["special"];

/*ЗДЕСЬ ПРОВЕРЯЕМ ЕСЛИ ХОТЯ БЫ ОДНО ИЗ ПОЛЕЙ НЕ ЗАПОЛНЕНО МЫ ВОЗВРАЩАЕМ СООБЩЕНИЕ*/
if ($name == "" or $type == "") {
    echo "Заполните все поля";
} else {
    /*ЕСЛИ ВСЕ ПОЛЯ ЗАПОЛНЕНЫ НАЧИНАЕМ СОБИРАТЬ ДАННЫЕ ДЛЯ ОТПРАВКИ*/
    $to = "whataboutwedding@gmail.com"; /* Адрес, куда отправляем письма*/
    $subject = "Письмо с обратной связи"; /*Тема письма*/
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n";
    $headers .= "From: <admin@a0575050.xsph.ru>\r\n";/*ОТ КОГО*/

    /*ВО ВНУТРЬ ПЕРЕМЕННОЙ $message ЗАПИСЫВАЕМ ДАННЫЕ ИЗ ПОЛЕЙ */
    $message .= "Способ представления: " . $type . "\r\n<br/>";
    $message .= "Имя пользователя: " . $name . "\r\n<br/>";
    if ($companion_name != "") {
        $message .= "Имя спутника: " . $companion_name . "\r\n<br/>";
    }
    $message .= "На личном автомобиле: " . $car . "\r\n<br/>";
    $message .= "Нужен ночлег: " . $lodging . "\r\n<br/>";
    $message .= "Предпочтения по алкоголю: " . $alcohol . "\r\n<br/>";
    if ($special != "") {
        $message .= "Особые предпочтения по напиткам: " . $special . "\r\n<br/>";
    }
    if ($text_comment != "") {
        $message .= "Дополнительная информация: " . $text_comment . "\r\n<br/>";
    }

    /*ДЛЯ ОТЛАДКИ ВЫ МОЖЕТЕ ПРОВЕРИТЬ ПРАВИЛЬНО ЛИ ЗАПИСАЛИCM ДАННЫЕ ИЗ ПОЛЕЙ*/

    $send = mail($to, $subject, $message, $headers);

    /*ЕСЛИ ПИСЬМО ОТПРАВЛЕНО УСПЕШНО ВЫВОДИМ СООБЩЕНИЕ*/
    if ($send == "true") {
        echo "Ваше сообщение отправлено.\r\n";
    }
    /*ЕСЛИ ПИСЬМО НЕ УДАЛОСЬ ОТПРАВИТЬ ВЫВОДИМ СООБЩЕНИЕ ОБ ОШИБКЕ*/ else {
        echo "Не удалось отправить, попробуйте снова!";
    }
}
