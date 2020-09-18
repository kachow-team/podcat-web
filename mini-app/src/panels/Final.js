import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import './CreatePodcastMain.css';

const Final = ({id, go}) => (
    <Panel id={id}>
        <PanelHeader>Подкасты</PanelHeader>
        <Div className={'kek'}>
            <Group title="Navigation Example">

                <svg width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.5 4C41.7548 4 52.5 14.7452 52.5 28C52.5 41.2548 41.7548 52 28.5 52C15.2452 52 4.5 41.2548 4.5 28C4.5 14.7452 15.2452 4 28.5 4ZM28.5 7C16.902 7 7.5 16.402 7.5 28C7.5 39.598 16.902 49 28.5 49C40.098 49 49.5 39.598 49.5 28C49.5 16.402 40.098 7 28.5 7ZM37.4393 20.9393C38.0251 20.3536 38.9749 20.3536 39.5607 20.9393C40.1464 21.5251 40.1464 22.4749 39.5607 23.0607L25.5607 37.0607C24.9749 37.6464 24.0251 37.6464 23.4393 37.0607L16.4393 30.0607C15.8536 29.4749 15.8536 28.5251 16.4393 27.9393C17.0251 27.3536 17.9749 27.3536 18.5607 27.9393L24.5 33.8787L37.4393 20.9393Z" fill="#3F8AE0"/>
                </svg>

                <p className={'header-main'}>Подкаст добавлен</p>

                <div className="TextGray">
                    <p>Раскажите своим подписчикам <br/>о новом подкасте, чтобы получить <br/>больше слушателей.</p>
                </div>
                <div>
                    <Button size="l" level="2" onClick={go} data-to="createpodcastform">
                        Поделиться подкастом
                    </Button>
                </div>
            </Group>
        </Div>
    </Panel>
);

export default Final;
