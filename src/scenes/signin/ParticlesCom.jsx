import Particles from "react-tsparticles";
import { particles } from "./particles";
import { loadSlim } from "tsparticles-slim";
import { useCallback, useState } from "react";

export const ParticlesCom = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
      }, []);
    return(
        
        <Particles options={particles} init={particlesInit} style={{ position: 'relative', width: '80%', height: '100%' }}
                        // style={{position:'absolute'}}
                        />
    );
}