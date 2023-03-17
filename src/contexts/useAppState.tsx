import React, { createContext, useContext, useEffect, useState } from 'react';
import { Wallet } from '../wallet/wallet';

const AppStateContext = createContext({});

const AppStateProvider = props => {
    const [wallet, setWallet] = useState<Wallet | null>(null);
    const [phrase, setPhrase] = useState('');
    const [ethBalance, setETHBalance] = useState('');
    const [usdcBalance, setUSDCBalance] = useState('');
    const [ethReciever, setETHReciever] = useState('');
    const [solReciever, setSOLReciever] = useState('');
    const [solHDAccounts, setSOLHDAccounts] = useState([]);
    // console.log('solHDAccounts In context: ', solHDAccounts);
    const [ethHDAccounts, setETHHDAccounts] = useState([]);

    return (
        <AppStateContext.Provider
            value={{
                wallet,
                setWallet,
                phrase,
                setPhrase,
                ethBalance,
                setETHBalance,
                usdcBalance,
                setUSDCBalance,
                ethReciever,
                setETHReciever,
                solReciever,
                setSOLReciever,
                setSOLHDAccounts,
                setETHHDAccounts,
                solHDAccounts,
                ethHDAccounts,

            }}>
            {props.children}
        </AppStateContext.Provider>
    );
};

const useAppState = () => {
    return useContext(AppStateContext);
};

export { AppStateProvider, useAppState };
