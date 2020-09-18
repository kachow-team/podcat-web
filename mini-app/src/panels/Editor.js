import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import WaveSurfer from 'wavesurfer.js';
import Regions from 'wavesurfer.js/dist/plugin/wavesurfer.regions';
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import './Editor.css'
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline';

function createBuffer(originalBuffer, duration) {
    let sampleRate = originalBuffer.sampleRate
    let frameCount = duration * sampleRate
    let channels = originalBuffer.numberOfChannels

    let AudioContext = window.AudioContext          // Default
        || window.webkitAudioContext;  // Safari and old versions of Chrome

    return new AudioContext().createBuffer(channels, frameCount, sampleRate)
}

function copyBuffer(fromBuffer, fromStart, fromEnd, toBuffer, toStart) {
    var sampleRate = fromBuffer.sampleRate
    var frameCount = (fromEnd - fromStart) * sampleRate
    for (let i = 0; i < fromBuffer.numberOfChannels; i++) {
        let fromChanData = fromBuffer.getChannelData(i)
        let toChanData = toBuffer.getChannelData(i)
        for (var j = 0, f = Math.round(fromStart * sampleRate), t = Math.round(toStart * sampleRate); j < frameCount; j++, f++, t++) {
            toChanData[t] = fromChanData[f]
        }
    }
}

class Editor extends React.Component {
    state = {
        wavesurfer: {},
        start: 0.0,
        end: 0.0
    };

    constructor(props) {
        super(props);
        this.waveformRef = React.createRef();
        this.wavetimeRef = React.createRef();
    }

    componentDidMount() {
        if (this.waveformRef.current) {
            const wavesurfer = WaveSurfer.create({
                autoCenter: false,
                container: this.waveformRef.current,
                barRadius: 3,
                barWidth: 2,
                barGap: 5,
                cursorWidth: 1,
                backend: 'WebAudio',
                height: 40,
                progressColor: '#3F8AE0',
                responsive: true,
                //waveColor: '#EFEFEF',
                waveColor: '#3F8AE0',
                backgroundColor: '#F2F3F5',
                cursorColor: '#FF3347',
                scrollParent: false,
                normalize: true,
                plugins: [
                    Regions.create({
                        regions: [],
                        dragSelection: {
                            slop: 5
                        }
                    }),
                    // TimelinePlugin.create({
                    //     container: this.waveformRef.current
                    // })
                ]

            });
            this.setState({wavesurfer});

            let alias = this.setState.bind(this);

            wavesurfer.load('sample2.mp3');
            wavesurfer.on('audioprocess', function (e) {
                // console.log(e);
            });
            wavesurfer.on('region-created', function (e) {
                alias({
                    start: e.start,
                    end: e.end
                })
                console.log(`UPDATED START ${e.start}`)
            });
            wavesurfer.on('region-updated', function (e) {
                alias({
                    start: e.start,
                    end: e.end
                })
                console.log(`UPDATED END ${e.end}`)
            });
        }
    }

    render() {


        return (
            <Panel id="editor">
                <PanelHeader>Редактор</PanelHeader>
                <Div>
                    <div className={'timelime'} ref={this.wavetimeRef}/>
                    <div className={'editor-main'} ref={this.waveformRef}/>
                </Div>
                <Div>
                    <Button onClick={() => this.state.wavesurfer.play()}> Play</Button>
                    <Button onClick={() => {

                        this.state.wavesurfer.pause();
                    }
                    }> Stop</Button>
                    <Button onClick={() => {
                        this.state.wavesurfer.addRegion({
                            start: 0,
                            end: this.state.wavesurfer.getDuration(),
                            loop: false,
                            color: 'hsla(400, 100%, 30%, 0.5)'
                        })
                    }
                    }>Add reg</Button>
                    <Button onClick={() => {
                        console.log(this.state.wavesurfer.regions.list);
                        console.log('click at scissors');
                        let start = this.state.start;
                        let end = this.state.end;
                        let duration = this.state.wavesurfer.getDuration() - end + start;

                        if (duration > 0) {
                            let buffer = createBuffer(this.state.wavesurfer.backend.buffer, duration);

                            copyBuffer(this.state.wavesurfer.backend.buffer, 0, start, buffer, 0);
                            copyBuffer(this.state.wavesurfer.backend.buffer, end, duration + end, buffer, start);
                            console.log(`from ${start} to ${end} deleted duration${duration}`);
                            this.state.wavesurfer.empty();
                            this.state.wavesurfer.loadDecodedBuffer(buffer);
                            this.state.wavesurfer.clearRegions();
                        } else {
                            this.state.wavesurfer.empty();
                            console.log('emptyy')
                        }
                    }
                    }>Scissors</Button>
                </Div>
            </Panel>
        );


    }
}

export default Editor;
