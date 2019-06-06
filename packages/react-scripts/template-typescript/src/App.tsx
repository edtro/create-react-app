import React from 'react';
import logo from './logo.svg';
import './App.css';

interface IAppProps { }

interface IAppState {
    vss: boolean;
    hasErrors: boolean;
    isLoading: boolean;
}

class App extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);

        this.state = {
            vss: false,
            hasErrors: false,
            isLoading: true
        };

        // bind the methods
        this.loadAsType.bind(this);

        this.handleInit.bind(this);
        this.handleError.bind(this);
        this.handleSuccess.bind(this);
    }

    public componentDidMount() {
        // get the type        
        const urlParams = this.getUrlParams(['type']);
        const type = urlParams['type'];

        // apply the type
        if (typeof VSS !== 'undefined' && type === 'TheType') { // example: type === 'board'

            this.setState({ vss: true });

            // eslint-disable-next-line no-undef
            VSS.init({ explicitNotifyLoaded: true, usePlatformScripts: true, usePlatformStyles: true, extensionReusedCallback: this.loadAsType });

            // eslint-disable-next-line no-undef
            VSS.ready(() => {

                // eslint-disable-next-line no-undef
                this.loadAsType(VSS.getContribution());                
            });

        }
        else {
            // handle this as a success.
            this.handleSuccess();
        }
    }

    public componentWillUnmount() {
        // eslint-disable-next-line no-undef
        VSS.unregister(VSS.getContribution().id);
    }

    public render() {
        const control = this.renderControl();
        this.resize(true);

        return control;
    }

    private renderControl(): any {
        if (this.state.hasErrors) {
            return (
                <div>
                    <p>This component has loading errors. Please review the console log.</p>
                </div>
            );
        }
        else if (this.state.isLoading) {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            );
        }
        return (
            <div>
                {this.renderType()}
            </div>
        );
    }

    private renderType(): any {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }

    private resize( wait: boolean = false) {
        if (this.state.vss) {
            /*
            // note: resize in a dialog does not work
            setTimeout(() => {
                try {
                    // https://api.jquery.com/root-selector/ to select <html> of the iframe
                    jQuery(":root").css("height", "Auto");
    
                    // eslint-disable-next-line no-undef
                    VSS.resize();
    
                    jQuery(":root").css("height", "100%");
                }
                catch{ }
            }, wait ? 500 : 0);
            */

            // eslint-disable-next-line no-undef
            VSS.resize();
        }
    }

    private loadAsType(contribution: Contribution) {
        try {
            let contributionId = "";
            if (typeof contribution !== 'undefined' && contribution !== null) {
                contributionId = contribution.id;
            }

            const contributionHandler = (() => {
                return {
                    loaded: (param: any) => {
                        console.warn(JSON.stringify(param));
                        this.handleSuccess();
                    },
                    other: (param: any) => {
                        console.warn(JSON.stringify(param));
                    }
                };
            });

            // eslint-disable-next-line no-undef
            VSS.register(contributionId, contributionHandler);
            
            // eslint-disable-next-line no-undef
            VSS.notifyLoadSucceeded();   
        }
        catch (error) {
            this.handleError(error);
        }
    }

    private getUrlParams(expectedProperties: string[]): any {
        const params = {};
        for (const property of expectedProperties) {
            (params as any)[property] = null;
        }

        const query = window.location.search.substring(1);
        const varPairs = query.split('&');
        for (const varPair of varPairs) {
            const pair = varPair.split('=');
            if (decodeURIComponent(pair[0]) !== "") {
                (params as any)[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
            }
        }

        return params;
    }

    private handleInit() {
        try {
            this.setState({
                isLoading: true,
                hasErrors: false
            });
        }
        catch (ex) { }
        this.resize();
    }

    private handleError(error: string) {
        console.error(error);
        if (this.state.vss) {
            try {
                // eslint-disable-next-line no-undef
                VSS.notifyLoadFailed(error);
            }
            catch (ex) { }
        }

        try {
            this.setState({
                isLoading: false,
                hasErrors: true
            });
        }
        catch (ex) { }
        this.resize();
    }

    private handleSuccess() {
        this.setState({
            isLoading: false
        });
        this.resize();        
    }
}

export default App;