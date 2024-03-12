import {
  Viro3DObject,
  ViroARScene,
  ViroARSceneNavigator,
  ViroAmbientLight,
  ViroAnimations,
  ViroBox,
  ViroDirectionalLight,
  ViroMaterials,
  ViroSphere,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from "@viro-community/react-viro";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

ViroMaterials.createMaterials({
  pig:{
    shininess: 2.0,
    lightingModel: "Blinn",
    diffuseTexture: require("./res/gltf_embedded_0.png"),
  }
});

ViroAnimations.registerAnimations({
  loopRotate: {
    properties: {
      rotateY: "+=45",
    },
    duration: 2000,
  },
});

const HelloWorldSceneAR = () => {
  const [state, setState] = useState({
    text: "Loading AR...",
    tracking: false,
  });
  const [pigPos, setPigPos] = useState({
    x: 0,
    y: -0.1,
    z: -1,
  });

  function onInitialized(state: any, reason: ViroTrackingReason) {
    console.log("onInitialized", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setState({
        text: "Hello Code The Dream!",
        tracking: true,
      });
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      {state.tracking && (
        <>
          <ViroAmbientLight
            color={"#FFFFFF"}
            intensity={150}
          ></ViroAmbientLight>
          <ViroDirectionalLight
            color="#FFFFFF"
            direction={[0.5, -1, 0.5]}
            castsShadow={true}
          ></ViroDirectionalLight>
          <Viro3DObject
            source={require("./res/minecraft_-_pig.glb")}
            type="GLB"
            position={[pigPos.x, pigPos.y, pigPos.z]}
            scale={[0.03,0.03,0.03]}
            materials={["pig"]}
            onDrag={(position) =>
              setPigPos({
                x: position[0],
                y: position[1],
                z: position[2],
              })
            }
            animation={{ name: "loopRotate", run: true, loop: true }}
          >
          </Viro3DObject>
        </>
      )}
    </ViroARScene>
  );
};

export const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: HelloWorldSceneAR,
        }}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
};

var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Arial",
    fontSize: 25,
    color: "#ffffff",
    textAlign: "center",
  },
});

export default App;
