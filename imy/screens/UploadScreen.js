import flappyBgImage from "../assets/flappy_bg.jpg"
import { useState } from 'react'
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p'

const UploadScreen = ({ navigation }) => {
    let [fontsLoaded] = useFonts({
      PressStart2P_400Regular,
      Prompt_400Regular,
    });

    return (
        <>
        hi
        </>
    )


}