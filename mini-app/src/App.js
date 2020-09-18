import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';
import CreatePodcastMain from "./panels/CreatePodcastMain";
import Editor from "./panels/Editor";
import CreatePodcastForm from "./panels/CreatePodcastForm";

const App = () => {
	const [activePanel, setActivePanel] = useState('createpodcastmain');
	const [fetchedUser, setUser] = useState(null);

	//const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [popout, setPopout] = useState(null);

	const [audio, setAudio] = useState(null);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<View activePanel={activePanel} popout={popout}>

			<CreatePodcastMain id='createpodcastmain' go={go} />
			<CreatePodcastForm id='createpodcastform' go={go} setAudio={setAudio} />
			<Editor id='editor' fetchedUser={fetchedUser} go={go} audio={audio} />
			<Home id='home' fetchedUser={fetchedUser} go={go} />
			<Persik id='persik' go={go} />
		</View>
	);
};

export default App;

