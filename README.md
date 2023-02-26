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

*Интересный **факт**: нужно еще задать ```JAVA_HOME```*. По крайней мере, так дела обстоят на Linux. Для моей конкретной машины он задан в файле **./env**. Вообще-то, там могут понадобиться и другие переменные. Тут уже нужно лезть в документацию Quasar. Но вот то, что задано в моем **.zshrc**:
```sh
PATH=$(REMOVE_PART="/opt/google/android-sdk/" sh -c 'echo ":$PATH:" | sed "s@:$REMOVE_PART:@:@g;s@^:\(.*\):\$@\1@"')
export ANDROID_HOME=~/Android/Sdk
export ANDROID_SDK_ROOT=~/Android/Sdk
export PATH=${PATH}:$ANDROID_SDK_ROOT/tools:$ANDROID_SDK_ROOT/platform-tools 
 ```
 Возможно, это тоже имеет сюда отношение.
