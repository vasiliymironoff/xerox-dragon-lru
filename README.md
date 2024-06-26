# xerox-dragon-lru
 Визуализация протокола кеш-когерентности xerox dragon с политикой замещения lru

## Запуск
- заходим в program/caches/ и открываем файл "dragon 100.html" в браузере

## Компиляция 
- скачиваем VivioIDE (https://www.scss.tcd.ie/Jeremy.Jones/VivioJS/vivio.htm) 
- открываем файл program/caches/dragon.viv 
- компилируем и запускаем 

## Задание

Итак, несмотря на всё происходящее, мы с вами должны работать дальше над общей целью — получением знаний.

Всем студентам необходимо распределиться на максимум 16 рабочих групп (состав группы — от 4 до 6 человек), для распределения принадлежность потенциальных участников одной рабочей группы к одной или разным учебным группам не важна. Рабочие группы должны будут поделить между собой предложенные варианты таким образом, чтобы один вариант достался не более чем одной рабочей группе, работа двух рабочих групп над одним вариантом не допускается — в таком случае обе рабочие группы не получат аттестацию по этому заданию.

Каждый вариант представляет собой сочетание протокола кэш-когерентности и политики замещения из приведённого перечня (см. вложение), отмеченное в соответствующей клетке символом «+». Другие сочетания использовать не нужно — такие работы не будут проверяться.

Что нужно сделать? Реализовать модель, демонстрирующую работу подсистемы памяти в симметричной многопроцессорной системе. В качестве эталона можно использовать такой демонстратор: https://www.scss.tcd.ie/Jeremy.Jones/vivio/caches/MESIHelp.htm — здесь показана работа протокола MESI с кэшем прямого отображения и без политик замещения.

Условия вашей работы более сложные:
1) протокол кэш-когерентности и политика замещения определяются выбранным вариантом;
2) число процессоров в системе — 4;
3) объем основной памяти — 16 адресуемых ячеек по 1 байт;
4) размер строки памяти и кэша — 1 байт;
5) число строк кэша — 4;
6) ассоциативность кэша — 2.

Все необходимые атрибуты для фиксации и обновления времени последнего обращения к строке или частоты обращения к ней вы определяете самостоятельно, единицей времени во всех случаях является такт машинного времени.

Модель обязательно должна отображать:
1) содержимое и адрес каждой ячейки основной памяти;
2) тэг, данные и состояние каждой строки кэша (возможные состояния определяются протоколом из вашего варианта);
3) счётчик метрики политики замещения для каждой строки кэша;
4) запросы по шинам адреса, данных, состояний и ответы на них (схематично, как в эталонной модели, без комментирования каждого запроса и ответа);
5) общий счётчик тактов машинного времени с момента запуска или сброса.

Команды управления, принимаемые от пользователя: для каждого процессора операции чтения и записи памяти по указанному (выбранному) адресу, общий сброс состояния модели, возможность «продвижения» по тактам вручную. Обратите внимание, что в эталонной модели реализована возможность выполнять операции на нескольких процессорах одновременно — в вашей модели это тоже должно быть реализовано. Начальное состояние кэшей — все строки пусты, начальное состояние памяти — все ячейки содержат значение «0». По аналогии с эталонной моделью операция записи выполняет инкремент значения на «1».

Языки программирования, фрэймворки, средства визуализации — любые, лишь бы я мог запустить ваше приложение на своём рабочем ПК. Если для этого потребуется какое-то дополнительно ПО — лучше будет собрать всё в виде образа виртуальной машины или контейнера. Красивая анимация, раскрашивание и другие декорации не требуются и не принимаются в расчёт при оценивании работы.

Работа должна сопровождаться отчётом. В отчёте, помимо содержательной части, должно быть указано распределение задач по участникам рабочей группы (это можно сделать в заключении или в приложении).

Крайний срок приёма работы — 18.04.2024 23:59, но примерно за неделю-полторы до этого срока необходимо будет предоставить информацию о выполнении работы. Для этого мы согласуем очные встречи.

Также предлагаю вам достаточно оперативно определиться с составами рабочих групп и распределением вариантов, чтобы как можно скорее начать первичный анализ исходных данных и сформулировать первые уточняющие вопросы. Для ответов на них и более интерактивного обсуждения возможно будет согласовать очные встречи в самое ближайшее время.

Коллеги, задачка непростая, для одного человека — сложная, поэтому каждый участник группы должен внести свой вклад и откладывать начало работы «на потом» не следует. В конце концов, при проверке могут обнаружиться грубые ошибки, на их исправление тоже потребуется время.


## Замечания
1) [+] После первого чтения какой-то строки из памяти и последующего чтения этой же строки должны получить в обоих кэшах строку в состоянии SC, но у меня при проверке получается в первом кэше (куда строка была считана впервые) сначала правильное состояние VE, а после чтения другим процессором состояние меняется, почему-то, на SD. Из описания протокола (https://ctho.org/toread/forclass/18-742/3/p273-archibald.pdf, страница 9 в файле или 281 в документе) следует, что в обоих кэшах строка должна быть в состоянии SC, ведь мы только читали её, не модифицируя.
2) [+] Похоже, сами значения, хранящиеся в строках, сделаны глобальной общей переменной, потому что при модификации новой, ранее не запрошенной строки, получается инкремент не от нуля, а от значения в другой строке.
3) [+] Поскольку состояния I в данном протоколе не существует, нужно в начале работы оставить состояния пустых строк кэша незаполненными.
4) [+] Что-то не так с политикой замещения: в нескольких случаях вытесняется последняя (только что загруженная) строка, а должна вытесняться более «старая».
5) [+] Нужно как-то выделить наборы строк кэша (2-хканальный множественно-ассоциативный кэш, поэтому нужно как-то обозначить эти два набора), чтобы было понятно, строки с какими адресами куда именно могут быть помещены.
6) [+] В кэше вместо адресов нужно указать теги (в нашем случае это старшие 3 бита адреса).
7) [+] Когда у вас, например, в одном кэше есть строка в SD, а в другом — она же была в SC, но оказалась вытеснена, тогда при записи строки, в кэше, где она осталась в единственном экземпляре в SD, она должна перейти в состояние D, а не оставаться в SD, ведь её копии в других кэшах больше нет. (По аналогии, если есть две строки в SC, то при вытеснении одной из них, другая переходит в VE)


