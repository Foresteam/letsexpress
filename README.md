# Let's Express (Quasar)
## Yet another todo app

## Как же собрать это чудо?
Установка:
NPM, Yarn, Java 11. Не стоит также забывать и про еще одну интересную вещь: JLink (иначе ничего не соберется, кто бы мог подумать...). Установить его можно так: ```yay -S extra/jdk11-openjdk```

Далее:
```sh
yarn install
yarn android:dev
```
И молиться.

*Интересный **факт**: нужно еще задать ```JAVA_HOME```*. По крайней мере, так дела обстоят на Linux. Для моей конкретной машины он задан в файле **./env**
