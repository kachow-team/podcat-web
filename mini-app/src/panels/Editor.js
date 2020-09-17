import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import WaveSurfer from 'wavesurfer.js';

class Editor extends React.Component {

    render() {
        var context;

                window.AudioContext = window.AudioContext||window.webkitAudioContext;
                context = new AudioContext();

// переменные для буфера, источника и получателя
        var buffer, source, destination;

// функция для подгрузки файла в буфер
        var loadSoundFile = function(url) {
            // делаем XMLHttpRequest (AJAX) на сервер
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'arraybuffer'; // важно
            xhr.onload = function(e) {
                // декодируем бинарный ответ
                context.decodeAudioData(this.response,
                    function(decodedArrayBuffer) {
                        // получаем декодированный буфер
                        buffer = decodedArrayBuffer;
                    }, function(e) {
                        console.log('Error decoding file', e);
                    });
            };
            xhr.send();
        };

// функция начала воспроизведения
        var play = function(){
            // создаем источник
            source = context.createBufferSource();
            // подключаем буфер к источнику
            source.buffer = buffer;
            // дефолтный получатель звука
            destination = context.destination;
            // подключаем источник к получателю
            //source.connect(destination);
            // воспроизводим
            //   source.start(0);

            var gainNode = context.createGain();
            gainNode.gain.value = -0.8;
            source.connect(gainNode);
            gainNode.connect(destination);
            source.start(0);
        };

// функция остановки воспроизведения
        var stop = function(){
            source.stop(0);
        };

        loadSoundFile('sample.mp3');

        return (
            <Panel id="editor">
                <PanelHeader>Редактор</PanelHeader>
                <Button onClick={()=>play()}> Play</Button>
                <Button onClick={()=>stop()}> Stop</Button>
            </Panel>
        );
    }
}

export default Editor;
