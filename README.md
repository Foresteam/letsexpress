# Let's Express (Quasar)
## Yet another todo app
## Как же собрать это чудо?
* *Где ваши бинарники?*
* *Ваша Жаба слишком старая*
* *Ваша Жаба слишком новая*
* *Ваша Жаба делает неправильное "ква"*
* *Попробуйте запустить --ide. Меня не волнует, что она не установлена*
* *А Android studio все собирает...*

Установка:
NPM, Yarn, Java 11. Не стоит также забывать и про еще одну интересную вещь: JLink (иначе ничего не соберется, кто бы мог подумать...). Установить его можно так: ```yay -S extra/jdk11-openjdk```

Далее:
```sh
yarn install
source ./env # специфичен для конкретной машины
yarn android:dev
```
И молиться.

*Интересный **факт**: нужно еще задать ```JAVA_HOME```*. По крайней мере, так дела обстоят на Linux. Для моей конкретной машины он задан в файле **./env**. Вообще-то, там могут понадобиться и другие переменные. Тут уже нужно лезть в документацию Quasar.
