import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export function useLoadingStatus(actions=[]) {

    const [isLoading, setIsLoading] = useState(false);
    const loadingStates = useSelector((state)=>(state.loading));

    useEffect(() => {
        let hasPendingActions = false
        for (var action of actions) {
            const [, requestBaseName, ]  = /(.*)_(REQUEST|SUCCESS|ERROR)/.exec(action.type);
            if(loadingStates[requestBaseName]){
                hasPendingActions =true;
                break;
            }
        }
        if(hasPendingActions){
            setIsLoading(true);
        }else{
            setIsLoading(false);
        }
    });

    return isLoading;
}