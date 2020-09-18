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

    triggerClick() {
        this.fileRef.current.click()
    }

    onChangeImage(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
            this.props.setDonation({imagePreviewUrl: reader.result})
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

                    <Div style={{display:'flex'}}>
                        <div onClick={() => this.triggerClick()} style={{
                            backgroundImage: `url(${uploadPlaceHolder})`,
                            //width:"375px",
                            height: "153px",
                            borderRadius: "10px",
                            backgroundSize: "cover",
                            backgroundPosition: "center top"
                        }}/>

                        <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1" y="1" width="72" height="72" rx="10" fill="#F2F3F5"/>
                            <path
                                d="M32.6121 24.4283L41.6308 24.4291C43.7609 24.4427 44.877 24.6422 45.9565 25.1701L46.1962 25.2929C47.2768 25.8708 48.13 26.724 48.7079 27.8046C49.3066 28.924 49.5408 30.0049 49.5694 32.1374L49.5724 32.6109V41.3887L49.5694 41.8621C49.5408 43.9946 49.3066 45.0755 48.7079 46.195C48.13 47.2756 47.2768 48.1288 46.1962 48.7067C45.0767 49.3054 43.9958 49.5396 41.8633 49.5682L41.3899 49.5712H32.6121L32.1386 49.5682C30.0061 49.5396 28.9253 49.3054 27.8058 48.7067C26.7252 48.1288 25.872 47.2756 25.2941 46.195C24.6954 45.0755 24.4612 43.9946 24.4326 41.8621L24.4296 41.3887L24.4303 32.37C24.4439 30.2399 24.6434 29.1238 25.1713 28.0443L25.2941 27.8046C25.872 26.724 26.7252 25.8708 27.8058 25.2929C28.9253 24.6942 30.0061 24.4599 32.1386 24.4314L32.6121 24.4283ZM40.1312 37.0263L34.8549 43.3237C34.5741 43.6588 34.0905 43.7258 33.7315 43.4924L33.6614 43.4417L30.7489 41.1035L26.6708 45.1167C26.7128 45.2072 26.7578 45.2967 26.8058 45.3865C27.2239 46.1684 27.8324 46.7768 28.6142 47.195C29.4702 47.6528 30.3007 47.8326 32.1905 47.8546L32.6121 47.8569H41.3899L41.8115 47.8546C43.7013 47.8326 44.5318 47.6528 45.3878 47.195C46.1696 46.7768 46.7781 46.1684 47.1962 45.3865C47.4462 44.9191 47.6133 44.4593 47.7171 43.8305L40.1312 37.0263ZM41.3899 26.1426H32.6121L32.1905 26.145C30.3007 26.1669 29.4702 26.3468 28.6142 26.8046C27.8324 27.2227 27.2239 27.8312 26.8058 28.613C26.3153 29.5302 26.1439 30.4179 26.1439 32.6109V41.3887L26.1462 41.8103C26.1523 42.3362 26.1706 42.7802 26.2038 43.1654L30.0908 39.3473C30.38 39.0633 30.8249 39.023 31.1583 39.24L31.2279 39.2904L34.0798 41.5795L39.3844 35.2493C39.6764 34.9007 40.1852 34.8441 40.5451 35.1062L40.6108 35.1591L47.8564 41.6535L47.8581 41.3887V32.6109L47.8558 32.1893C47.8339 30.2994 47.654 29.469 47.1962 28.613C46.7781 27.8312 46.1696 27.2227 45.3878 26.8046C44.4706 26.3141 43.5828 26.1426 41.3899 26.1426ZM32.1439 30.7141C32.9328 30.7141 33.5724 31.3537 33.5724 32.1426C33.5724 32.9316 32.9328 33.5712 32.1439 33.5712C31.3549 33.5712 30.7153 32.9316 30.7153 32.1426C30.7153 31.3537 31.3549 30.7141 32.1439 30.7141Z"
                                fill="#3F8AE0"/>
                            <rect x="1" y="1" width="72" height="72" rx="10" stroke="black" stroke-opacity="0.12"
                                  stroke-width="0.5"/>
                        </svg>
                        <div style={{width: '100%'}}>
                        <Input top="Название" placeholder={"Введите название подкаста"} value={this.props.podcastName}
                               onChange={e => this.props.setpodcastName(e.currentTarget.value)}/>
                        </div>
                    </Div>
                    <Textarea top="Описание" value={this.props.donationDescription}
                              onChange={e => this.props.setdonationDescription(e.currentTarget.value)}/>
                    <p className={'header-main'}>Загрузите Ваш подкаст</p>
                    <p className="TextGray">Выберите готовый аудиофайл из вашего телефона и добавьте его</p>
                    <Button mode="outline">Загрузить файл</Button>
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
