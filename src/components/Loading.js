import React from 'react'
import { Spinner } from "@chakra-ui/core"

export default function Loading() {
    return <Spinner size="xxs" color="red.600"  thickness="8px" speed=".9s" style={{position:'absolute',zIndex:'2',top:'50%', left:'50%', transform:"translate(-50%, -50%)", marginRight:'-50%'}} />

}
