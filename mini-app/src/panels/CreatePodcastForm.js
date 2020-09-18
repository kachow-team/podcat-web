import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';

import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import Textarea from "@vkontakte/vkui/dist/components/Textarea/Textarea";
import Select from "@vkontakte/vkui/dist/components/Select/Select";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import {IOS, platform} from "@vkontakte/vkui";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import './CreatePodcastForm.css'

//import uploadPlaceHolder from '../img/uploadPlaceholder.svg';
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Checkbox from "@vkontakte/vkui/dist/components/Checkbox/Checkbox";
import uploadPlaceHolder from '../img/uploadPlaceHolder.svg'

const osName = platform();

class CreatePodcastForm extends React.Component {

    state = {
        file: '',
        imagePreviewUrl: ''
    };

    fileRef = React.createRef();
    fileRefAudio = React.createRef();

    triggerClick() {
        this.fileRef.current.click()
    }

    triggerClickAudio() {
        this.fileRefAudio.current.click()
    }

    onChangeImage(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                imagefile: file,
                imagePreviewUrl: reader.result
            });
            // this.props.setDonation({imagePreviewUrl: reader.result})
        };

        reader.readAsDataURL(file)
    }

    onChangeAudio(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                audiofile: file,
                audioPreviewUrl: reader.result
            });
            //console.log(this.state.audiofile);
            //console.log(this.state.audioPreviewUrl);
            //this.props.setDonation({imagePreviewUrl: reader.result})
        };

        reader.readAsDataURL(file)
    }

    render() {
        return (
            <Panel id="createpodcastform">
                <PanelHeader
                    left={<PanelHeaderButton onClick={this.props.go} data-to="createpodcastmain">
                        {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                    </PanelHeaderButton>}
                >
                    Новый подкаст
                </PanelHeader>

                <FormLayout className={'FormMain'}>


                    <input id='selectImage' hidden type="file" ref={this.fileRef} style={{padding: 0}}
                           onChange={(e) => this.onChangeImage(e)}/>
                    <input id='selectAudio' hidden type="file" ref={this.fileRefAudio} style={{padding: 0}}
                           onChange={(e) => this.onChangeAudio(e)}/>

                    <div style={{display: 'flex', marginLeft: '12px'}}>
                        <div onClick={() => this.triggerClick()} style={{
                            backgroundImage: `url(${!!this.state.imagePreviewUrl ? this.state.imagePreviewUrl : uploadPlaceHolder})`,
                            width: '72px',
                            height: '72px',
                            borderRadius: "10px",
                            backgroundSize: "cover",
                            backgroundPosition: "center top"
                        }}/>

                        <div style={{width: '80%', display: 'flex', flexDirection: 'column'}}>
                            <div className="FormLayout__row-top" style={{alignSelf: 'flex-start'}}>Название</div>
                            <Input top="Название" placeholder={"Введите название подкаста"}
                                   value={this.props.podcastName}
                                   onChange={e => this.props.setpodcastName(e.currentTarget.value)}/>
                        </div>
                    </div>
                    <Textarea top="Описание" value={this.props.donationDescription}
                              onChange={e => this.props.setdonationDescription(e.currentTarget.value)}/>


                    {!!this.state.audioPreviewUrl ? (
                        <Div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}>
                                <svg style={{marginRight:'12px'}} width="48" height="48" viewBox="0 0 48 48" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <rect width="48" height="48" rx="10" fill="#F2F3F5"/>
                                    <path
                                        d="M24 16C27.3137 16 30 18.6863 30 22V28C30 30.9727 27.8381 33.4405 25.0008 33.9169L25 35.5C25 36.0523 24.5523 36.5 24 36.5C23.4477 36.5 23 36.0523 23 35.5L23.0002 33.9171C20.1624 33.4411 18 30.9731 18 28V22C18 18.6863 20.6863 16 24 16ZM24 18C21.7909 18 20 19.7909 20 22H22.5C23.0523 22 23.5 22.4477 23.5 23C23.5 23.5523 23.0523 24 22.5 24H20V26H22.5C23.0523 26 23.5 26.4477 23.5 27C23.5 27.5523 23.0523 28 22.5 28H20C20 30.2091 21.7909 32 24 32C26.2091 32 28 30.2091 28 28H27C26.4477 28 26 27.5523 26 27C26 26.4872 26.386 26.0645 26.8834 26.0067L27 26H28V24H27C26.4477 24 26 23.5523 26 23C26 22.4872 26.386 22.0645 26.8834 22.0067L27 22H28C28 19.7909 26.2091 18 24 18ZM24 12C29.1894 12 33.4556 15.9529 33.9518 21.0119C34.8229 21.1112 35.5 21.8515 35.5 22.75V27.25C35.5 28.2165 34.7165 29 33.75 29C32.7835 29 32 28.2165 32 27.25V22C32 17.5817 28.4183 14 24 14C19.5817 14 16 17.5817 16 22V27.25C16 28.2165 15.2165 29 14.25 29C13.2835 29 12.5 28.2165 12.5 27.25V22.75C12.5 21.8515 13.1771 21.1112 14.0489 21.0114C14.5444 15.9529 18.8106 12 24 12Z"
                                        fill="#99A2AD"/>
                                </svg>
                                {this.state.audiofile.name}
                            </div>
                            <p className={"TextGray"}>Вы можете добавить таймкоды и скорректировать подкаст в режиме
                                редактирования</p>
                            <Button size={'xl'} mode="outline" onClick={this.props.go} data-to="editor"> Редактировать
                                аудиозапись</Button>
                        </Div>
                    ) : (
                        <Div>
                            <p className={'header-main'}> Загрузите Ваш подкаст</p>
                            <p className={"TextGray"}> Выберите готовый аудиофайл из вашего телефона и добавьте его</p>
                            <Button mode="outline" style={{width: '148px', height: '36px'}}
                                    onClick={() => this.triggerClickAudio()}>Загрузить файл</Button>
                        </Div>
                    )
                    }
                    <Checkbox>Ненормативный контент</Checkbox>
                    <Checkbox>Исключить эпизод из экспорта</Checkbox>
                    <Checkbox>Трейлер подкаста</Checkbox>

                    <Select placeholder="Кому доступен этот подкаст" value={this.props.donationAuthor}
                            onChange={e => this.props.setdonationAuthor(e.currentTarget.value)}>
                        <option
                            value="user">{!!this.props.user ? `${this.props.user.first_name} ${this.props.user.last_name}` : 'Андрей Иванов'}</option>
                        <option value="fr">Друзьям</option>
                        <option value="my">Только мне</option>
                    </Select>


                    <Button size="xl" onClick={this.props.go} data-to="targetdonation">Далее</Button>

                </FormLayout>
            </Panel>
        );
    }
}

export default CreatePodcastForm;
