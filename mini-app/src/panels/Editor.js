import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import WaveSurfer from 'wavesurfer.js';
import Regions from 'wavesurfer.js/dist/plugin/wavesurfer.regions';
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import './Editor.css'
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline';
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import CellButton from "@vkontakte/vkui/dist/components/CellButton/CellButton";
import Header from "@vkontakte/vkui/dist/components/Header/Header";
import FormLayoutGroup from "@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import {IOS, platform} from "@vkontakte/vkui";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";

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

const osName = platform();

class Editor extends React.Component {
    state = {
        wavesurfer: {},
        start: 0.0,
        end: 0.0,
        timecodes: [],
        playing: false
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
                    }),
                    // TimelinePlugin.create({
                    //     container: this.waveformRef.current
                    // })
                ]

            });
            this.setState({wavesurfer});

            let alias = this.setState.bind(this);

            wavesurfer.load(this.props.audio);
            //wavesurfer.load('sample2.mp3');
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
        const removePart = () => {
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
        };

        return (
            <Panel id="editor">
                <PanelHeader
                    left={<PanelHeaderButton onClick={this.props.go} data-to="createpodcastform">
                        {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                    </PanelHeaderButton>}
                >
                    Редактор
                </PanelHeader>
                <Div onClick={()=>{
                    this.state.wavesurfer.addRegion({
                        start: 0,
                        end: this.state.wavesurfer.getDuration(),
                        loop: false,
                        color: 'hsla(400, 100%, 30%, 0.5)'
                    })
                }}>
                    <div className={'timelime'} ref={this.wavetimeRef}/>
                    <div className={'editor-main'} ref={this.waveformRef}/>
                </Div>
                <Div>
                    <svg style={this.state.playing ? {} : {opacity: 0.4}} onClick={() => {
                        if (this.state.playing) {
                            this.state.wavesurfer.pause();
                            this.setState({playing: !this.state.playing})
                        } else
                        {
                            this.state.wavesurfer.play()
                            this.setState({playing: !this.state.playing})
                        }
                    }} width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="44" height="44" rx="10" fill="#3F8AE0"/>
                        <path
                            d="M29.65 19.9215C30.8314 20.6036 31.4221 20.9446 31.6203 21.3898C31.7932 21.7782 31.7932 22.2217 31.6203 22.61C31.4221 23.0553 30.8314 23.3963 29.65 24.0784L19.6 29.8808C18.4186 30.5628 17.8279 30.9039 17.3432 30.8529C16.9204 30.8085 16.5364 30.5868 16.2865 30.2428C16 29.8485 16 29.1665 16 27.8023L16 16.1976C16 14.8334 16 14.1513 16.2865 13.757C16.5364 13.4131 16.9204 13.1914 17.3432 13.1469C17.8279 13.096 18.4186 13.437 19.6 14.1191L29.65 19.9215Z"
                            fill="white"/>
                    </svg>
                    <svg style={{marginLeft:'10px'}} onMouseUp={() => removePart()} onTouchStart={() => removePart()} width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="44" height="44" rx="10" fill="#F2F3F5"/>
                        <path d="M16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z" stroke="#3F8AE0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16 31C17.6569 31 19 29.6569 19 28C19 26.3431 17.6569 25 16 25C14.3431 25 13 26.3431 13 28C13 29.6569 14.3431 31 16 31Z" stroke="#3F8AE0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M30 14L18.12 25.88" stroke="#3F8AE0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M24.47 24.48L30 30" stroke="#3F8AE0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.12 18.12L22 22" stroke="#3F8AE0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </Div>
                <Group header={<Header mode="secondary">Таймкоды</Header>}>
                    <div>
                        <CellButton
                            onClick={() => this.setState({timecodes: this.state.timecodes.concat(Math.random() * 1000000000000000000)})}
                            before={<svg style={{marginRight: '12px'}} width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1ZM12 6C11.4477 6 11 6.44772 11 7V11H7C6.48716 11 6.06449 11.386 6.00673 11.8834L6 12C6 12.5523 6.44772 13 7 13H11V17C11 17.5128 11.386 17.9355 11.8834 17.9933L12 18C12.5523 18 13 17.5523 13 17V13H17C17.5128 13 17.9355 12.614 17.9933 12.1166L18 12C18 11.4477 17.5523 11 17 11H13V7C13 6.48716 12.614 6.06449 12.1166 6.00673L12 6Z"
                                    fill="#3F8AE0"/>
                            </svg>}>Добавить таймкод</CellButton>
                    </div>
                    {this.state.timecodes.map((timecode) =>
                        <FormLayoutGroup top="Название">
                            <Div className={'meow'} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <svg
                                    onClick={() => this.setState({timecodes: this.state.timecodes.filter((item) => item !== timecode)})}
                                    width="22" height="22" viewBox="0 0 22 22" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0ZM16 10H6C5.44772 10 5 10.4477 5 11C5 11.5523 5.44772 12 6 12H16C16.5523 12 17 11.5523 17 11C17 10.4477 16.5523 10 16 10Z"
                                        fill="#E64646"/>
                                </svg>
                                <Input type="text" placeHolder="Название"/>
                                <Input type="text" placeHolder="Время"/>
                            </Div>
                        </FormLayoutGroup>
                    )}
                </Group>
            </Panel>
        );


    }
}

export default Editor;
