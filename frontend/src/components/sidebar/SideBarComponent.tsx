import React from "react";
import "./SideBarComponent.css";
import {ModuleNamesConstants} from "../../constants/ModuleNamesConstants";
import {RoutesConstants} from "../../constants/RoutesConstants";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import {GenericUtils} from "../../utils/GenericUtils";
import {LocalStorageConstants} from "../../constants/LocalStorageConstants";
import DeleteAccount from "../delete-account/DeleteAccount";
import {Navigate} from "react-router";

type Module = {
    name: ModuleNamesConstants | string;
    to: RoutesConstants;
    isPrivate?: boolean;
    isHidden?: boolean;
}

export class SideBarComponent extends React.Component<unknown, {
    redirect: boolean,
    to: string
}> {
    constructor(props: Record<string, unknown>) {
        super(props);
        this.state = {
            redirect: false,
            to: '',
        }
    }

    private readonly token: string | null = localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN);
    private readonly modules: Array<Module> = [
        {
            name: ModuleNamesConstants.HOME,
            to: RoutesConstants.HOME,
        },
        {
            name: ModuleNamesConstants.PROFILE,
            to: RoutesConstants.PROFILE,
            isPrivate: true,
            isHidden: true,
        },
        {
            name: ModuleNamesConstants.TRANSACTIONS,
            to: RoutesConstants.TRX_TRANSACTIONS
        },
        {
            name: ModuleNamesConstants.CATEGORIZED_TRANSACTIONS,
            to: RoutesConstants.CATEGORIZED_TRANSACTIONS,
            isPrivate: true,
        },
        {
            name: ModuleNamesConstants.BLOCK_HISTORY,
            to: RoutesConstants.BLOCK_HISTORY,
        },
        {
            name: ModuleNamesConstants.BLOCK_TRANSACTIONS,
            to: RoutesConstants.BLOCK_TRANSACTIONS,
        },
        {
            name: ModuleNamesConstants.TRC20_CONTRACTS,
            to: RoutesConstants.TRC20_CONTRACTS,
            isPrivate: true,
        },
        {
            name: ModuleNamesConstants.TRC20_CONTRACT_TRANSACTIONS,
            to: RoutesConstants.CONTRACT_TRANSACTIONS,
            isPrivate: true,
        },
    ]

    redirect = (to: string) => {
        this.setState({to, redirect: true});
    }

    render() {
        const login = GenericUtils.resolveLogin();
        return (
            <div className={"sidebar"}>
                <h1 className={"sidebar-tittle"}>TRON Pulse</h1>
                <div>
                    {
                        this.modules.map(m => {
                            const button_variant = m.to === window.location.pathname ? 'contained' : 'outlined';
                            return (
                                <div key={m.name} className={"sidebar-button-container"}>
                                    <Button
                                        variant={button_variant}
                                        className={'sidebar-button'}
                                        style={{display: m.isHidden && !this.token ? 'none' : 'inherit'}}
                                        disabled={m.isPrivate && !this.token}
                                        onClick={() => this.redirect(m.to)}
                                    >{m.name}</Button>
                                </div>

                            )
                        })
                    }</div>
                <div className={"sidebar-footer"}>
                    {!login.isLogged ?
                        <>
                            <Link to={RoutesConstants.LOGIN} className={"auth-buttons"}>
                                <Button variant="contained">Login</Button>
                            </Link>
                            <Link to={RoutesConstants.REGISTER} className={"auth-buttons"}>
                                <Button variant="contained">Sign up</Button>
                            </Link>
                        </>
                        :
                        <></>
                    }
                </div>
                {this.state.redirect ? <Navigate to={this.state.to}/> : <></>}
            </div>
        );
    }
}

export default SideBarComponent;