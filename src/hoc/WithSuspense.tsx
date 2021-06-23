import React, {Suspense} from "react";
import Preloader from "../components/Common/Preloader/Preloader";

export function withSuspenseComponent <WCP>(Component:React.ComponentType<WCP>) {
    return (props:WCP) => {
        return <Suspense fallback={<Preloader/>}><Component {...props}/></Suspense>;
    }
}