import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import './CreateHelpHome.css';

const CreateHelpHome = ({ id, go }) => (
    <Panel id={id}>
        <PanelHeader>Пожертвования</PanelHeader>
        <Div className={'kek'}>
        <Group title="Navigation Example">
            <Div className="TextGray">
                <p>У вас пока нет добрых дел.<br />
                Начните доброе дело.</p>
            </Div>
            <Div>
                <Button size="l" level="2" onClick={go} data-to="donationtype">
                    Создать сбор
                </Button>
            </Div>
            <Div>
            </Div>
        </Group>
        </Div>
    </Panel>
);

export default CreateHelpHome;
