import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const VSSMock: any = {}

// eslint-disable-next-line no-string-literal
VSSMock['VssSDKVersion'] = 2;

// eslint-disable-next-line no-string-literal
VSSMock['VssSDKRestVersion'] = "4.1-mocked";

VSSMock.init = (options: IExtensionInitializationOptions) => { };
VSSMock.ready = (callback: () => void) => { callback(); };
VSSMock.notifyLoadSucceeded = () => { };
VSSMock.notifyLoadFailed = (error: any) => { console.error(error); };

// eslint-disable-next-line arrow-return-shorthand
VSSMock.getContribution = () => { return { id: "instanceId123" }; };

// eslint-disable-next-line callable-types
VSSMock.register = (instanceId: string, instance: object | { (contextData?: any): object; }) => { };
VSSMock.unregister = (instanctId: string) => { };

// eslint-disable-next-line arrow-return-shorthand
VSSMock.getWebContext = () => { return { project: { id: "Team1" } }; };
VSSMock.resize = () => { };

// eslint-disable-next-line ban-types
VSSMock.require = (modules: string[] | string, callback?: Function) => { if (callback) { callback(modules); } };

// eslint-disable-next-line
(window as any)['VSS'] = VSSMock;
const VSS = VSSMock;

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});
