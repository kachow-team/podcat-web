import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import './CreatePodcastMain.css';

const CreatePodcastMain = ({id, go}) => (
    <Panel id={id}>
        <PanelHeader>Подкасты</PanelHeader>
        <Div className={'kek'}>
            <Group title="Navigation Example">

                <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M24.5 0C37.7548 0 48.5 10.7452 48.5 24C48.5 37.2548 37.7548 48 24.5 48C11.2452 48 0.5 37.2548 0.5 24C0.5 10.7452 11.2452 0 24.5 0ZM24.5 3C12.902 3 3.5 12.402 3.5 24C3.5 35.598 12.902 45 24.5 45C36.098 45 45.5 35.598 45.5 24C45.5 12.402 36.098 3 24.5 3ZM24.5 12.5C25.3284 12.5 26 13.1716 26 14V22.5H34.5C35.3284 22.5 36 23.1716 36 24C36 24.8284 35.3284 25.5 34.5 25.5H26V34C26 34.8284 25.3284 35.5 24.5 35.5C23.6716 35.5 23 34.8284 23 34V25.5H14.5C13.6716 25.5 13 24.8284 13 24C13 23.1716 13.6716 22.5 14.5 22.5H23V14C23 13.1716 23.6716 12.5 24.5 12.5Z"
                        fill="#99A2AD"/>
                </svg>


                <p className={'header-main'}>Добавьте первый подкаст</p>

                <div className="TextGray">
                    <p>Добавляйте, редактируйте и делитесь.<br/>
                        подкастами вашего сообщества.</p>
                </div>
                <div>
                    <Button size="l" level="2" onClick={go} data-to="createpodcastform">
                        Добавить подкаст
                    </Button>
                </div>
            </Group>
        </Div>
    </Panel>
);

export default CreatePodcastMain;
